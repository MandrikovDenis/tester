from sqlalchemy import Column, String, DateTime, Enum, Text
import enum, uuid, datetime
from database import Base

class Status(str, enum.Enum):
    pending = "pending"
    running = "running"
    success = "success"
    failed = "failed"

class Test(Base):
    __tablename__ = "tests"
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    url = Column(String)
    scenario = Column(String)
    status = Column(Enum(Status), default=Status.pending)
    result = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
