from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQL_DB_URL = 'sqlite:///./ullubiy.db'
SQL_DB_URL = "postgresql://postgres:172007@localhost:5432/users"
# engine = create_engine(SQL_DB_URL, connect_args={"check_same_thread": False})
engine = create_engine(SQL_DB_URL)
session_local = sessionmaker(autoflush=False, autocommit=False, bind=engine)

Base = declarative_base()
