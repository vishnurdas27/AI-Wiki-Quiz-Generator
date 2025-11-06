import os 
import json 
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from database import SessionLocal, init_db, Quiz
from scraper import scrape_wikipedia
from llm_quiz_generator import generate_quiz_payload

load_dotenv()
init_db()

app= FastAPI(title="AI Wiki Quiz Generator", version="1.0.0")

origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "*").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    url: str
    force: bool = False


@app.post("/generate_quiz")
def generate_quiz(body: GenerateRequest):
    session = SessionLocal()
    try:
        existing = session.query(Quiz).filter(Quiz.url == body.url).one_or_none()
        if existing and not body.force:
            return json.loads(existing.full_quiz_data)
        
        try:
            title, summary, body_text = scrape_wikipedia(body.url)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Scrape failed: {e}")
        
        if not body_text:
            raise HTTPException(status_code=422,detail="Could not extract article body text.")
        
        try:
            payload = generate_quiz_payload(body.url,title,summary,body_text)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"LLM generation failed: {e}")
        
        payload["title"] = title 

        data_str = json.dumps(payload, ensure_ascii=False)
        if existing:
            existing.title = title
            existing.scraped_content = body_text
            existing.full_quiz_data = data_str
            session.add(existing)
            session.commit()
            return payload
        else:
            rec = Quiz(url=body.url, title=title, scraped_content=body_text, full_quiz_data=data_str)
            session.add(rec)
            session.commit()
            payload["id"] = rec.id
            return payload
    finally:
        session.close()


@app.get("/history")
def history():
    session = SessionLocal()
    try:
        rows = session.query(Quiz).order_by(Quiz.date_generated.desc()).all()
        return [
            {
                "id": r.id,
                "url": r.url,
                "title": r.title,
                "date_generated": r.date_generated.isoformat(),
            }
            for r in rows
        ]
    finally:
        session.close()


@app.get("/quiz/{quiz_id}")
def get_quiz(quiz_id: int):
    session = SessionLocal()
    try:
        r = session.get(Quiz, quiz_id)
        if not r:
            raise HTTPException(status_code=404, detail="Quiz not found")
        return json.loads(r.full_quiz_data)
    finally:
        session.close()