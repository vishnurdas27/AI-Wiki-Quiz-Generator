import os 
from datetime import datetime
from sqlalchemy import create_engine, Integer, String, DateTime, Text
from sqlalchemy.orm import declarative_base,sessionmaker,Mapped,mapped_column
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL=os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    DATABASE_URL = "postgresql://ai_wiki_quiz_db_user:mBNSTijJom35Cyh8k52OzugkmjzS4U1S@dpg-d46orb63jp1c73amv160-a/ai_wiki_quiz_db"

if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is not set.")

engine = create_engine(DATABASE_URL,pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    url: Mapped[str] = mapped_column(String(1000), index=True, unique=True)
    title: Mapped[str] = mapped_column(String(512), index=True)
    date_generated: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    scraped_content: Mapped[str | None] = mapped_column(Text)
    full_quiz_data: Mapped[str] = mapped_column(Text)

def init_db():
    Base.metadata.create_all(engine) 