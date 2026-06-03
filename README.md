# Diana

> A loyal AI companion originally created during a lunar research initiative, now dedicated to supporting developers with deep memory, thoughtful guidance, and expert coding assistance.

---

## Overview

Diana is an AI companion designed to help developers learn, build, and grow. Unlike traditional chatbots that treat every conversation as a fresh start, Diana maintains context, remembers important information, and provides personalized support throughout a developer's journey.

The platform combines a modern web interface, a scalable backend, and a dedicated AI reasoning service to deliver intelligent conversations, memory management, and software development assistance.

---

## Problem

Developers often spend significant time re-explaining projects, searching for previous solutions, and rebuilding context across sessions. Most AI assistants provide powerful responses but lack continuity and long-term understanding of a user's work.

Diana addresses this problem by combining:

- Persistent memory
- Context-aware conversations
- Development assistance
- Personalized guidance
- Long-term project awareness

---

## Features

### Persistent Memory
Diana stores and retrieves relevant information from previous interactions, enabling more meaningful and productive conversations over time.

### Context-Aware Conversations
Conversations maintain continuity across sessions, allowing Diana to provide responses based on previous discussions and project history.

### Coding Assistance
Diana helps developers by:

- Explaining programming concepts
- Debugging code
- Reviewing implementations
- Suggesting improvements
- Assisting with architecture decisions

### Project Guidance
Provides recommendations for:

- Project planning
- Software architecture
- Learning paths
- Technology selection
- Best practices

### Scalable Architecture
Built as a distributed system with dedicated frontend, backend, and AI services.

---

## Architecture

Diana is built using a multi-service architecture.

```text
┌─────────────┐
│  Frontend   │
│   React     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Backend   │
│  ExpressJS  │
└──────┬──────┘
       │
 ┌─────┴─────┐
 ▼           ▼
Database   AI Service
PostgreSQL  FastAPI
```

### Frontend

The frontend provides the user interface where users interact with Diana through a modern conversational experience.

Responsibilities:

- Chat interface
- User settings
- Conversation history
- Authentication flows
- API communication

### Backend API

The backend acts as the central coordinator.

Responsibilities:

- User management
- Authentication
- Conversation storage
- Message persistence
- API orchestration
- Communication with the AI service

### AI Service

The AI service serves as Diana's reasoning engine.

Responsibilities:

- Prompt processing
- Response generation
- Memory retrieval
- Context management
- Coding assistance
- AI-specific business logic

### Database

Stores:

- Users
- Conversations
- Messages
- Settings
- Memory records

---

## Project Structure

```text
diana-ai-companion/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── prisma/
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── ...
│
├── ai-service/
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   ├── services/
│   │   ├── core/
│   │   └── models/
│   ├── requirements.txt
│   └── ...
│
├── docker-compose.yml
├── .env.example
├── README.md
└── package.json
```

---

## Tech Stack

### Frontend

- React
- TypeScript
- CSS Modules

### Backend

- Node.js
- Express.js
- Prisma ORM

### AI Service

- Python
- FastAPI
- OpenAI API

### Database

- PostgreSQL

### Infrastructure

- Docker
- Docker Compose

### Authentication

- JWT Authentication

---

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- PostgreSQL
- Docker (optional)

---

### Clone the Repository

```bash
git clone https://github.com/your-username/diana-ai-companion.git

cd diana-ai-companion
```

---

### Environment Variables

Create environment files based on the provided examples.

Example:

```env
DATABASE_URL=
JWT_SECRET=
OPENAI_API_KEY=
```

---

### Install Frontend Dependencies

```bash
cd frontend

npm install
```

Run the frontend:

```bash
npm run dev
```

---

### Install Backend Dependencies

```bash
cd backend

npm install
```

Run the backend:

```bash
npm run dev
```

---

### Install AI Service Dependencies

```bash
cd ai-service

pip install -r requirements.txt
```

Run the AI service:

```bash
uvicorn app.main:app --reload
```

---

## Running with Docker

Start all services:

```bash
docker-compose up --build
```

This launches:

- Frontend
- Backend
- AI Service
- PostgreSQL

---

## Future Roadmap

### Memory Enhancements

- Long-term memory consolidation
- Semantic memory retrieval
- User preference learning

### Developer Tools

- Repository analysis
- Codebase understanding
- Automated documentation
- Intelligent debugging workflows

### Interaction Improvements

- Voice conversations
- Real-time streaming responses
- Multi-modal capabilities

### Platform Expansion

- Mobile application
- Browser extension
- IDE integrations

---

## AI Usage Declaration

This project was developed with assistance from AI tools. AI was used to support research, generate implementation suggestions, assist with debugging, improve documentation, and provide technical guidance during development. All generated outputs were reviewed, modified, tested, and integrated by the developer. System design decisions, architecture, implementation, and final functionality were directed and validated by the developer.

---

## Demo

Live Demo: *Coming Soon*

Video Demonstration: *Coming Soon*

---

## Author

RedBlue

Built for the Stardance Challenge.

---

## License

This project is licensed under the MIT License.
