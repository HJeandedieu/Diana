<div align="center">

# 🌙 Diana

**The AI companion that remembers.**

_A memory-aware assistant built for developers who are tired of re-explaining everything, every time._

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)
![Status](https://img.shields.io/badge/status-in--development-blueviolet)
![Built for](https://img.shields.io/badge/built%20for-Stardance%20Challenge-1a1a2e)

</div>

---

## Why Diana

Most AI assistants forget you the second the tab closes. You re-explain your stack, re-paste your code, re-tell the same story about that one bug — every single session.

**Diana doesn't.**

She remembers your projects, your decisions, your style — and picks up exactly where you left off. Less context-rebuilding. More building.

---

## What She Does

|                        |                                                                 |
| ---------------------- | --------------------------------------------------------------- |
| **Persistent Memory**  | Retains context across sessions — no more déjà vu conversations |
| **Context-Aware Chat** | Conversations build on real history, not a blank slate          |
| **Coding Assistant**   | Debugs, reviews, explains, and architects alongside you         |
| **Project Guidance**   | Helps plan, choose tech, and stay on the best path forward      |
| **Built to Scale**     | Distributed architecture designed for real growth               |

---

## How She's Built

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Frontend   │ ───▶ │   Backend    │ ───▶ │  AI Service  │
│    React     │      │  Express.js  │      │   FastAPI    │
└──────────────┘      └──────┬───────┘      └──────────────┘
                              │
                       ┌──────▼───────┐
                       │  PostgreSQL  │
                       └──────────────┘
```

| Layer          | Stack                            |
| -------------- | -------------------------------- |
| **Frontend**   | React · TypeScript · CSS Modules |
| **Backend**    | Node.js · Express · Prisma       |
| **AI Service** | Python · FastAPI · OpenAI API    |
| **Database**   | PostgreSQL                       |
| **Infra**      | Docker · Docker Compose          |
| **Auth**       | JWT                              |

---

## Quick Start

```bash
git clone https://github.com/Hjeandedieu/diana.git
cd diana
```

**One-command launch (recommended):**

```bash
docker-compose up --build
```

**Or run each service manually:**

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && npm install && npm run dev

# AI Service
cd ai-service && pip install -r requirements.txt && uvicorn app.main:app --reload
```

> Requires Node.js 20+, Python 3.11+, PostgreSQL (or Docker to skip all that).

Set up your `.env` files with `DATABASE_URL`, `JWT_SECRET`, and `OPENAI_API_KEY` before launch.

---

## What's Next

- Semantic memory retrieval & long-term consolidation
- Repository & codebase understanding
- Voice + real-time streaming conversations
- Mobile app, browser extension, IDE integrations

---

## About This Project

Diana was built solo by **RedBlue** for the **Stardance Challenge**, with AI tools assisting along the way — for research, debugging support, and documentation. Every architectural decision, line of integrated code, and final feature was directed, reviewed, and shipped by the developer.

---

<div align="center">

**License:** MIT &nbsp;·&nbsp; **Demo:** Coming Soon &nbsp;·&nbsp; **Author:** [RedBlue](https://github.com/hjeandedieu)

</div>
