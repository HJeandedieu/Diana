from fastapi import APIRouter
from models.memory import Request, Response, MemoryItem, SummarizeRequest, SummarizeResponse



memory_router = APIRouter()

@memory_router.post("/extract-memory")
def extract_memory(request: Request):
    return Response(memories=[MemoryItem(
        type="preference",
        content="User prefers direct, structured explanations with minimal fluff.",
        importance=8
    )])
    
@memory_router.post("/summarize")
def summarize(request: SummarizeRequest ):
    return SummarizeResponse(summary="User worked on FastAPI service for Diana")