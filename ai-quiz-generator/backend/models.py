from typing import List, Dict, Optional
from pydantic import BaseModel, Field

class keyEntities(BaseModel):
    people: List[str] = []
    organizations: List[str] = []
    locations: List[str] = []

class QuizQuestion(BaseModel):
    question: str 
    options: List[str] = Field(..., min_items=4, max_items=4)
    answer: str 
    difficulty: str # easy | medium | hard
    explanation: str

class QuizOutput(BaseModel):
    id: Optional[int] = None
    url: str 
    title: str
    summary: str 
    key_entities: keyEntities
    sections: List[str]
    quiz: List[QuizQuestion] = Field(..., min_items=5, max_items=10)
    related_topics: List[str] = Field(..., min_items=3)