from groq import Groq
from fastapi import APIRouter
from app.core.config import settings
from app.models.chat import Response, Request
from app.system_prompt import system_prompt


client = Groq(api_key=settings.GROQ_API_KEY)

chat_router = APIRouter()

@chat_router.post("/generate-response")
def generate_response(request: Request):
    
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt.DIANA_SYSTEM_PROMPT},
            *[{"role": m.role, "content": m.content} for m in request.history],
            {"role": "user", "content": request.message}
        ]   
    )
    text = response.choices[0].message.content
    return Response(response=text)