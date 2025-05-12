from fastapi import FastAPI, BackgroundTasks
import database, models, crud, runner
from schemas import TestRequest
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/run-test/")
def run_test(request: TestRequest, background_tasks: BackgroundTasks):
    test = crud.create_test(request.url, request.scenario)
    background_tasks.add_task(runner.run_test, test.id)
    return {"test_id": str(test.id)}

@app.get("/tests/")
def get_tests():
    return crud.get_all_tests()
