from fastapi import APIRouter
from app.models.memory import Request, Response, MemoryItem
from app.models.chat import SummarizeRequest, SummarizeResponse



memory_router = APIRouter()

@memory_router.post("/extract-memory")
def extract_memory(request: Request):
    return Response(memories=[MemoryItem(
        type="Project",
        content="Initialised new AI chat",
        importance=8
    )])
    
@memory_router.post("/summarize")
def summarize(request: SummarizeRequest ):
    return SummarizeResponse(summary="User worked on FastAPI service for Diana")