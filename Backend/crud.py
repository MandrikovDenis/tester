from database import SessionLocal
from models import Test, Status

db = SessionLocal()

def create_test(url, scenario):
    test = Test(url=url, scenario=scenario)
    db.add(test)
    db.commit()
    db.refresh(test)
    return test

def get_all_tests():
    return db.query(Test).order_by(Test.created_at.desc()).all()

def get_test(test_id):
    return db.query(Test).get(test_id)

def update_status(test_id, status):
    test = get_test(test_id)
    test.status = status
    db.commit()

def complete_test(test_id, status, result):
    test = get_test(test_id)
    test.status = status
    test.result = result
    db.commit()
