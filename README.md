# FinPlay - Financial Education Chatbot

An interactive chatbot application that helps users learn about finance in Egypt through conversations, quizzes, and rewards.

## Features

- AI-powered chatbot with financial expertise
- Text-to-speech support for responses
- Quiz system for learning assessment
- Rewards program for engagement
- Mobile-friendly interface

## Setup Instructions

### Backend Setup

1. Install Python dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Start the backend server:
```bash
python app.py
```

The backend will run on http://127.0.0.1:8080

### Frontend Setup

1. Install Node.js dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at the provided local URL.

## Architecture

- Frontend: React + TypeScript + Vite
- Backend: Flask + LangChain + Ollama
- Database: ChromaDB for vector storage
- API: RESTful endpoints for chat interactions

## Development

- Frontend code is in `src/`
- Backend code is in `backend/`
- API endpoints:
  - POST `/ai` - Chat endpoint
  - POST `/ask_pdf` - PDF question answering
  - POST `/pdf` - PDF upload and processing