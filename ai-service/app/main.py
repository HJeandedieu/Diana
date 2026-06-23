import uvicorn
from fastapi import FastAPI
from app.routers.chat import chat_router
from app.routers.memory import memory_router
from app.core.config import settings

app = FastAPI()

app.include_router(chat_router)
app.include_router(memory_router)

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.PORT,
        reload=True
    )