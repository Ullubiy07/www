from fastapi import FastAPI, HTTPException, Path, Query, Body, Depends
from typing import Optional, List, Dict, Annotated

from sqlalchemy.orm import Session
from datebase import engine, session_local

from models import Base, User, Post
from schemas import UserCreate, User as DbUser, PostCreate, PostEdit, Post as DbPost

from fastapi.middleware.cors import CORSMiddleware




from fastapi.middleware.wsgi import WSGIMiddleware



app = FastAPI()



Base.metadata.create_all(bind=engine)



def get_db():
    db = session_local()
    
    try:
        yield db
    finally:
        db.close()



origins = [
           'http://localhost:3000',
           'http://127.0.0.1:3000',

           'http://localhost:8050/',
           'http://127.0.0.1:8050/'
       ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/users/{name}/{password}", response_model=DbUser)
async def users(name: str, password: str, db: Session = Depends(get_db)) -> DbUser:
    db_user = db.query(User).filter(User.name == name and User.password == password).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User was not found")
    return db_user


@app.post("/add_user", response_model=DbUser)
async def create_user(user: UserCreate, db: Session = Depends(get_db)) -> DbUser:
    db_user = User(name=user.name, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user





@app.get("/posts", response_model=List[DbPost])
async def posts(db: Session = Depends(get_db)):
    return db.query(Post).all()


@app.post("/add_post", response_model=DbPost)
async def create_post(post: PostCreate, db: Session = Depends(get_db)) -> DbPost:
    db_user = db.query(User).filter(User.id == post.author_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User was not found")
    
    db_post = Post(title=post.title, topic=post.topic, content=post.content, author_id=post.author_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)

    return db_post


@app.delete("/delete_post/{id}", response_model=Dict)
async def delete_post(id: int, db: Session = Depends(get_db)) -> Dict:
    post = db.query(Post).filter(Post.id == id).first()
    if post is None:
        raise HTTPException(status_code=404, detail="Post was not found")
    db.delete(post)
    db.commit()
    return {"message": "Post succesfully uninstalled"}


@app.put("/edit_post/{id}", response_model=Dict)
async def edit_post(id: int, post: PostEdit, db: Session = Depends(get_db)) -> Dict:
    old_post = db.query(Post).filter(Post.id == id).first()
    if old_post is None:
        raise HTTPException(status_code=404, detail="Post was not found")
    old_post.title = post.title
    old_post.topic = post.topic
    old_post.content = post.content
    old_post.author_id = post.author_id
    db.commit()
    db.refresh(old_post)
    return {"message": "Post succesfully edited"}








@app.get("/graph_nodes", response_model=List)
async def graph_nodes() -> List:
    return [['1', '1'], ['2', '2'], ['3', '3'], ['4', '4']]

@app.get("/graph_edges", response_model=List)
async def graph_nodes() -> List:
    return [['1', '2']]
