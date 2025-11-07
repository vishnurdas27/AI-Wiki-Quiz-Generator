# 🧠 AI Wiki Quiz Generator

A full-stack web application that automatically generates multiple-choice quizzes from any Wikipedia article URL. Built with FastAPI (Python) on the backend and React on the frontend, using Gemini via LangChain for AI-powered content generation.

## 🌐 Live Demo

🔗 **[View the live project](https://tinyurl.com/ai-quiz-generator55)**



## ✨ Features

* 🧾 **AI-Generated Quizzes:** Generates 5–10 multiple-choice questions from any Wikipedia article.
* 🧠 **LLM Integration:** Uses Google's Gemini via LangChain for structured JSON output.
* 🧹 **Web Scraper:** Uses BeautifulSoup to extract clean text content.
* 💾 **Persistent Storage:** Saves all generated quizzes in a PostgreSQL database.
* 📜 **History View:** Browse and review all previously generated quizzes.
* 🧩 **Take Quiz Mode:** Interactive answering, scoring, and review with explanations.
* 🪶 **Modern UI:** Built with React, Tailwind CSS, and includes dark mode.

---

## ⚙️ Tech Stack

* **Backend:** FastAPI (Python), SQLAlchemy
* **Frontend:** React, Tailwind CSS, Vite
* **AI/LLM:** LangChain, Google Gemini
* **Database:** PostgreSQL
* **Scraping:** BeautifulSoup4, Requests

---

## 🚀 Setup and Local Installation

### Prerequisites

* Python 3.10+
* Node.js 18+
* A running PostgreSQL database

---

### 1. Clone the Repository
### 2. Backend Setup (FastAPI)

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Create and activate a virtual environment:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Set up your environment variables. Copy the example file:
    ```bash
    cp .env.example .env
    ```
5.  Edit the `.env` file with your credentials:
    ```
    DATABASE_URL="postgresql://user:password@localhost/your_db_name"
    GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
    ```
6.  Run the backend server. The database tables will be created automatically on startup.
    ```bash
    uvicorn main:app --reload
    ```
    > Backend will be running at `http://127.0.0.1:8000`

---

### 3. Frontend Setup (React)

1.  Open a **new terminal** and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the frontend development server:
    ```bash
    npm run dev
    ```
    > Frontend will be running at `http://localhost:5173` (or a similar port).

---

## 🔌 API Endpoints

The backend (`main.py`) serves the following key endpoints:

* **`POST /generate_quiz`**
    * **Body:** `{ "url": "https://en.wikipedia.org/wiki/Alan_Turing" }`
    * **Response:** The full JSON quiz data for the newly generated quiz.
* **`GET /history`**
    * **Response:** A JSON list of all previously generated quizzes (metadata only: `id`, `title`, `url`, `date_generated`).
* **`GET /quiz/{quiz_id}`**
    * **Response:** The full JSON quiz data for a single quiz, retrieved by its ID.

---

## 🧪 Testing Steps (Manual)

1.  **Generate a Quiz:**
    * Go to the "Generate Quiz" tab.
    * Paste a Wikipedia URL (e.g., `https://en.wikipedia.org/wiki/Alan_Turing`).
    * Click "Generate Quiz".
    * Observe the loading state, then see the "Take Quiz" mode appear.
2.  **Take Quiz:**
    * Answer the questions and click "Submit".
    * Verify the score is calculated correctly and explanations are shown.
    * Click "Retake Quiz" to reset.
3.  **Check History:**
    * Go to the "History" tab.
    * Verify the "Alan Turing" quiz is now in the history table.
4.  **View Details:**
    * Click "Details" on the "Alan Turing" row.
    * A modal should open showing the quiz in "Review Mode" (not takeable).

---

## 📄 License

MIT © 2025 – [Vishnu R Das](https://github.com/vishnurdas27)

```bash
git clone [https://github.com/vishnurdas27/AI-Wiki-Quiz-Generator.git](https://github.com/vishnurdas27/AI-Wiki-Quiz-Generator.git)
cd AI-Wiki-Quiz-Generator
