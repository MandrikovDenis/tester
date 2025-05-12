from pydantic import BaseModel

class TestRequest(BaseModel):
    url: str
    scenario: str
