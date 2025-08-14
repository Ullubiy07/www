from fastapi import FastAPI, HTTPException, Path, Query, Body, Depends
from typing import Optional, List, Dict, Annotated

from sqlalchemy.orm import Session

from models import Base, User, Post
from datebase import engine, session_local
from schemes import UserCreate, User as DbUser, PostCreate, Post as DbPost
# from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

Base.metadata.create_all(bind=engine)



def get_db():
    db = session_local()
    
    try:
        yield db
    finally:
        db.close()



# origins = [
#            "http://localhost:3000"
#        ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


@app.post("/add_user/", response_model=DbUser)
async def create_user(user: UserCreate, db: Session = Depends(get_db)) -> DbUser:
    db_user = User(name=user.name, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


@app.post("/add_post/", response_model=DbPost)
async def create_post(post: PostCreate, db: Session = Depends(get_db)) -> DbPost:
    db_user = db.query(User).filter(User.id == post.author_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User was not found")
    
    db_post = Post(info=post.info, job=post.job, author_id=post.author_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)

    return db_post


@app.get("/posts", response_model=List[DbPost])
async def posts(db: Session = Depends(get_db)):
    return db.query(Post).all()




# @app.get("/items")
# async def items() -> List[Post]:
#     return [Post(**post) for post in posts]


# @app.post("/items/add")
# async def add_item(post: PostCreate) -> Post:
#     author = next((user for user in users if user['id'] == post.author_id), None)
#     if not author:
#         raise HTTPException(status_code=404, detail='User was not found')
#     new_post_id = len(posts) + 1
#     new_post = {'id': new_post_id, 'info': post.info, 'job': post.job, 'author': author}
#     posts.append(new_post)
#     return Post(**new_post)


# @app.get("/items/{id}")
# async def items(id: Annotated[int, Path(..., title='ID of post', ge=1, le=1000)]) -> Post:
#     for post in posts:
#         if post['id'] == id:
#             return Post(**post)
#     raise HTTPException(status_code=404, detail="Post was not found")


# @app.post("/user/add")
# async def add_user(user: Annotated[UserCreate, Body(..., example={
#     'name': 'UserName',
#     'age': 1
# })]) -> User:
#     new_user_id = len(users) + 1
#     new_user = {'id': new_user_id, 'name': user.name, 'age': user.age}
#     users.append(new_user)
#     return User(**new_user)


# @app.get("/search")
# async def search(post_id: Annotated[Optional[int], Query(title="ID of post to search for", ge=1, le=1000)]) -> Dict[str, Optional[Post]]:
#     if post_id:
#         for post in posts:
#             if post['id'] == post_id:
#                 return {"data": Post(**post)}
#         raise HTTPException(status_code=404, detail="Post was not found")
#     else:
#         return {"data": None}