from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone
from database import Base


class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    message = Column(String, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
