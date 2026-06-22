from pydantic import BaseModel

class HistoryMessage(BaseModel):
    role: str
    content: str

class MemoryItem(BaseModel):
    type:str
    content: str
    importance: int

class Request(BaseModel):
    conversation: list[HistoryMessage]

class Response(BaseModel):
    memories: list[MemoryItem]