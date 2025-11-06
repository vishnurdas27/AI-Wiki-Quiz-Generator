import os 
from typing import Dict, Any
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from models import QuizOutput

load_dotenv()

MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
API_KEY = os.getenv("GOOGLE_API_KEY")
if not API_KEY:
    raise RuntimeError("GOOGLE_API_KEY not set in environment")

llm = ChatGoogleGenerativeAI(model=MODEL_NAME, api_key=API_KEY, temperature=0.2)

parser = JsonOutputParser(pydantic_object=QuizOutput)

PROMPT_TEMPLATE = """
You are an assistant that generates a fact-checked multiple-choice quiz from a Wikipedia article.
Follow ALL rules:

1) Base everything ONLY on the provided article text. If information is missing, say so by excluding it.
2) Create 5–10 MCQs with exactly four options each. Label correct answers precisely as they appear in the article.
3) Vary difficulty across easy/medium/hard. Keep explanations short and cite which section or paragraph mentions the fact.
4) Extract key entities (people, organizations, locations), list top-level sections, and a concise article summary.
5) Suggest 3–8 related Wikipedia topics for further reading.
6) Output MUST be valid JSON that matches this schema:
{format_instructions}

ARTICLE_TITLE: {title}
ARTICLE_URL: {url}
ARTICLE_TEXT (truncated if very long):
"""

MAX_CHARS = int(os.getenv("ARTICLE_CHARS_LIMIT", 18000))

def build_chain() -> Any:
    prompt = PromptTemplate(
        template=PROMPT_TEMPLATE+ "{article_text}",
        input_variables=["title", "url", "article_text"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    return prompt | llm | parser

chain= build_chain()

def generate_quiz_payload(url: str, title: str, summary: str, body_text: str) -> Dict:
    article_text = (summary + "\n\n" + body_text)[:MAX_CHARS]
    payload = chain.invoke({
    "title": title,
    "url": url,
    "article_text": article_text,
    })
    payload["id"] = None
    return payload