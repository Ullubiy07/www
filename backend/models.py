from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from datebase import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    password = Column(String)



class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    topic = Column(String)
    content = Column(String)

    author_id = Column(Integer, ForeignKey("users.id"))
    author = relationship("User")