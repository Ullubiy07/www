from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# SQL_DB_URL = 'sqlite:///./ullubiy.db'
SQL_DB_URL = "postgresql://Ullubiy:172007@db/postgres"
# engine = create_engine(SQL_DB_URL, connect_args={"check_same_thread": False})
engine = create_engine(SQL_DB_URL)
session_local = sessionmaker(autoflush=False, autocommit=False, bind=engine)

class Base(DeclarativeBase): pass


# psql -h localhost -p 5432 -U postgres -d users