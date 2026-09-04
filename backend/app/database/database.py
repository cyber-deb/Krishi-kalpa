import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger("krishi_kalpa.database")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./krishi_kalpa.db")

# Render postgres fix (postgres:// -> postgresql://)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

try:
    if "sqlite" in DATABASE_URL:
        engine = create_engine(
            DATABASE_URL,
            connect_args={"check_same_thread": False}
        )
    else:
        engine = create_engine(
            DATABASE_URL,
            pool_pre_ping=True,
            pool_size=10,
            max_overflow=20
        )
    logger.info(f"Database engine initialized with driver: {DATABASE_URL.split(':')[0]}")
except Exception as e:
    logger.warning(f"Failed to connect to configured DATABASE_URL ({e}). Falling back to SQLite local database.")
    DATABASE_URL = "sqlite:///./krishi_kalpa.db"
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Dependency injection generator for DB sessions."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
