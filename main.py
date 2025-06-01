from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uuid
from ai_model import AI_MODEL

# app = FastAPI()
# sessions = {}
#
# class ChatRequest(BaseModel):
#     session_id: str
#     query: str
#
# class ChatResponse(BaseModel):
#     session_id: str
#     response: str
#
# @app.get("/session")
# def create_session():
#     session_id = str(uuid.uuid4())
#     sessions[session_id] = []
#     return {"session_id": session_id}

# @app.post("/chat", response_model=ChatResponse)
# def chat(request: ChatRequest):
#     if request.session_id not in sessions:
#         raise HTTPException(status_code=404, detail="Session not found")
#
#     sessions[request.session_id].append({"user": request.query})
#     try:
#         response = AI_MODEL(request.query)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
#
#     sessions[request.session_id].append({"bot": response})
#     return ChatResponse(session_id=request.session_id, response=response)
# Filename: main.py

from fastapi import FastAPI
import uuid

app = FastAPI()
sessions = {}

@app.get("/session")
def create_session():
    session_id = str(uuid.uuid4())
    sessions[session_id] = []
    return {"session_id": session_id}

