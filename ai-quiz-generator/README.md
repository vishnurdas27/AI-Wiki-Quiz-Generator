# 🧠 AI Wiki Quiz Generator  
> Generate intelligent, structured quizzes from any Wikipedia article using AI.

---

## 📘 Overview

**AI Wiki Quiz Generator** is a **full-stack web application** built with  
🧩 **FastAPI (Python)** on the backend and ⚛️ **React (JavaScript)** on the frontend.  

The backend handles Wikipedia scraping, AI-powered quiz generation using **Gemini via LangChain**,  
and database storage with **PostgreSQL**. The frontend provides an intuitive interface  
to generate, view, and interact with quizzes in real time.

**AI Wiki Quiz Generator** automatically creates multiple-choice quizzes from any Wikipedia article URL.  
It scrapes the article, sends the content to an AI model (**Gemini via LangChain**),  
and generates a structured quiz with explanations, difficulty levels, and related topics.---

## ✨ Features

- 🧾 **AI-Generated Quizzes** — 5–10 fact-checked MCQs directly from Wikipedia text  
- 🧠 **Gemini LLM Integration** via LangChain for structured JSON outputs  
- 🧹 **BeautifulSoup Scraper** for clean text extraction (no API)  
- 💾 **Persistent Storage** in PostgreSQL (Quiz History + Details)  
- 💻 **Modern UI** built with React + Tailwind + Styled Components  
- 📜 **History View** with modal quiz previews  
- 🧩 **Take Quiz Mode** for interactive answering and scoring  
- 🪶 **Dark Mode Ready** layout with smooth gradient and glass effects  

---


### 🧩 Architecture

````bash
ai-quiz-generator/
├── backend/              # FastAPI + LangChain + DB
│   ├── main.py           # API entry point
│   ├── scraper.py        # Wikipedia text extractor
│   ├── llm_quiz_generator.py  # Gemini + LangChain chain
│   ├── database.py       # SQLAlchemy + PostgreSQL models
│   ├── models.py         # Pydantic schemas
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/             # React + Tailwind + Styled Components
│   ├── src/
│   │   ├── tabs/         # GenerateQuizTab, HistoryTab
│   │   ├── components/   # Modal, QuizDisplay, Styled, etc.
│   │   ├── services/     # API calls
│   │   └── App.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── sample_data/          # Example outputs & URLs
└── README.md

---


---

## ⚙️ Tech Stack

| Layer | Technology | Purpose |
|:---|:---|:---|
| **Frontend** | React, Tailwind CSS, Styled Components | Interactive UI |
| **Backend** | FastAPI (Python) | REST API for quiz generation |
| **AI / LLM** | LangChain + Gemini API | Quiz generation and parsing |
| **Scraping** | BeautifulSoup4 | Extract clean Wikipedia content |
| **Database** | PostgreSQL + SQLAlchemy | Store quiz history and JSON data |
| **Environment** | Python 3.10+, Node 18+, Vite | Development setup |

---

### 🔌 Core Pipeline

```text
Wikipedia URL ➜ Scraper ➜ Clean Article Text
             ➜ LangChain (Gemini) ➜ Quiz JSON
             ➜ PostgreSQL Storage ➜ REST API ➜ React UI

## 🔗 API Endpoints

### **POST /generate_quiz**

Generate a quiz from a Wikipedia article.

**Request Body:**
```json
{
  "url": "[https://en.wikipedia.org/wiki/Alan_Turing](https://en.wikipedia.org/wiki/Alan_Turing)",
  "force": false
}
