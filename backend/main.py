from fastapi import FastAPI, HTTPException, Path, Query, Body, Depends
from typing import Optional, List, Dict, Annotated

from sqlalchemy.orm import Session
from datebase import engine, session_local

from models import Base, User
from schemas import UserCreate, User as DbUser

from fastapi.middleware.cors import CORSMiddleware
import subprocess
from config import getEnv

app = FastAPI()

Base.metadata.create_all(bind=engine)



def get_db():
    db = session_local()
    
    try:
        yield db
    finally:
        db.close()



origins = [
    getEnv('FRONTEND_URL')
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


@app.post("/graph-dist")
async def calc(input: str):
    process = subprocess.Popen(
        ["./graph"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True
    )
    out, err = process.communicate(input)
    return out