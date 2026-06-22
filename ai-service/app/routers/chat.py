from fastapi import APIRouter
from app.models.chat import Response, Request

chat_router = APIRouter()

@chat_router.post("/generate-response")
def generate_response(request: Request):
    return Response(response="Diana Response comming soon")