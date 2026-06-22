from pydantic import BaseModel

class MemoryItem(BaseModel):
    type: str
    content: str
    importance: int
    
class HistoryMessage(BaseModel):
    role: str
    content: str
    
class Request(BaseModel):
    message: str
    memories: list[MemoryItem]
    history: list[HistoryMessage]
    
    
class Response(BaseModel):
    response: str
    
class SummarizeRequest(BaseModel):
    messages: list[HistoryMessage]

class SummarizeResponse(BaseModel):
    summary: str