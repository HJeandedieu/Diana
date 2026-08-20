from groq import Groq
from fastapi import APIRouter
from app.core.config import settings
from app.models.chat import Response, Request
from app.system_prompt.system_prompt import DIANA_SYSTEM_PROMPT


client = Groq(api_key=settings.GROQ_API_KEY)

chat_router = APIRouter()

@chat_router.post("/generate-response")
def generate_response(request: Request):
    
    if request.memories:
        memories_text = "\n".join([
            f"- [{m.type}] {m.content} (importance: {m.importance})"
            for m in request.memories
        ])
    else:
        memories_text = "No memories yet."
    
    system_prompt = DIANA_SYSTEM_PROMPT.replace("{memories}", memories_text)
    
    response = client.chat.completions.create(
        model=settings.GROQ_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            *[{"role": m.role, "content": m.content} for m in request.history],
            {"role": "user", "content": request.message}
        ]   
    )
    text = response.choices[0].message.content
    return Response(response=text)

@chat_router.post("/generate-title")
def generate_title(request: Request):
    try:
        response = client.chat.completions.create(
            model=settings.GROQ_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "Generate a short, concise title (max 5 words) for a conversation that starts with this message. Return only the title, nothing else. No quotes, no punctuation at the end."
                },
                {
                    "role": "user",
                    "content": request.message
                }
            ],
            max_tokens=20
        )
        title = response.choices[0].message.content
        if title:
            title = title.strip().strip('"').strip("'").strip(".")
        return Response(response=title or request.message[:40])
    except Exception as e:
        print(f"[Title] Error generating title: {e}")
        return Response(response=request.message[:40])
