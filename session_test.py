from fastapi import FastAPI
import uuid

app = FastAPI()

sessions = {}

@app.get("/session")
def create_session():
    session_id = str(uuid.uuid4())
    sessions[session_id] = []
    return {"session_id": session_id}
