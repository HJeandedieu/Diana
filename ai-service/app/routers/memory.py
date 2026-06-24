import json
from groq import Groq
from fastapi import APIRouter
from app.core.config import settings
from app.system_prompt import memory_extraction
from app.models.memory import Request, Response, MemoryItem
from app.models.chat import SummarizeRequest, SummarizeResponse


client = Groq(api_key=settings.GROQ_API_KEY)

memory_router = APIRouter()

@memory_router.post("/extract-memory")
def extract_memory(request: Request):
    
    conversation_text = "\n".join([f"{m.role}: {m.content}" for m in request.conversation])
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role":"system", "content": memory_extraction.MEMORY_EXTRACTION_PROMPT},
            {"role": "user", "content": f"Extract memories from this conversation:\n\n{conversation_text}"}
        ]
    )
    
    text = response.choices[0].message.content
    print("GROQ RAW RESPONSE:", repr(text))
    text = text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()

    if not text:
        return []

    try:
        parsed = json.loads(text)
        memories = parsed.get("memories", [])
        return memories
    except json.JSONDecodeError:
        print("Invalid JSON:", repr(text))
    return []
    
    
@memory_router.post("/summarize")
def summarize(request: SummarizeRequest ):
    return SummarizeResponse(summary="User worked on FastAPI service for Diana")