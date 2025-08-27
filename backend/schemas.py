from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    password: str


class UserCreate(UserBase):
    pass


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class PostBase(BaseModel):
    title: str
    topic: str
    content: str
    author_id: int


class PostCreate(PostBase):
    pass

class PostEdit(PostBase):
    pass

class Post(PostBase):
    id: int
    author: User

    class Config:
        orm_mode = True



