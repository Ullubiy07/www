from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from config import getEnv

DB_USER = getEnv('DB_USER')
DB_PASSWORD = getEnv('DB_PASSWORD')
DB_NAME = getEnv('DB_NAME')
DB_SERVER = getEnv('DB_SERVER')

SQL_DB_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}/{DB_NAME}"

engine = create_engine(SQL_DB_URL)
session_local = sessionmaker(autoflush=False, autocommit=False, bind=engine)

class Base(DeclarativeBase): pass


# psql -h localhost -p 5432 -U postgres -d users