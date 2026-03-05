import os
from pathlib import Path
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, field_validator
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import Message

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Women's Day Messages API")

allowed_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://localhost:3000"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MessageCreate(BaseModel):
    name: str
    message: str

    @field_validator("name")
    @classmethod
    def name_required(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Name is required")
        return v.strip()


class MessageUpdate(BaseModel):
    name: str | None = None
    message: str | None = None


@app.post("/api/messages")
def create_message(data: MessageCreate, db: Session = Depends(get_db)):
    msg = Message(name=data.name, message=data.message)
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return {"id": msg.id, "name": msg.name, "message": msg.message, "created_at": msg.created_at.isoformat()}


@app.get("/api/messages")
def get_messages(db: Session = Depends(get_db)):
    messages = db.query(Message).order_by(Message.created_at.desc()).all()
    return [
        {"id": m.id, "name": m.name, "message": m.message, "created_at": m.created_at.isoformat()}
        for m in messages
    ]


@app.put("/api/messages/{message_id}")
def update_message(message_id: int, data: MessageUpdate, db: Session = Depends(get_db)):
    msg = db.query(Message).filter(Message.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    if data.name is not None:
        msg.name = data.name
    if data.message is not None:
        msg.message = data.message
    db.commit()
    db.refresh(msg)
    return {"id": msg.id, "name": msg.name, "message": msg.message, "created_at": msg.created_at.isoformat()}


@app.delete("/api/messages/{message_id}")
def delete_message(message_id: int, db: Session = Depends(get_db)):
    msg = db.query(Message).filter(Message.id == message_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return {"ok": True}


# --- Serve the built React frontend ---
STATIC_DIR = Path(__file__).resolve().parent / "static"

if STATIC_DIR.is_dir():
    app.mount("/assets", StaticFiles(directory=STATIC_DIR / "assets"), name="assets")
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static-root")

    @app.get("/{full_path:path}")
    def serve_spa(full_path: str):
        file = STATIC_DIR / full_path
        if file.is_file():
            return FileResponse(file)
        return FileResponse(STATIC_DIR / "index.html")
