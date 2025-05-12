from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import crud
import importlib

def run_test(test_id):
    test = crud.get_test(test_id)
    crud.update_status(test.id, "running")

    try:
        options = Options()
        options.add_argument("--headless")
        driver = webdriver.Chrome(options=options)
        driver.get(test.url)

        scenario_module = importlib.import_module(f"backend.scenarios.{test.scenario}")
        result, success = scenario_module.run(driver)

        crud.complete_test(test.id, "success" if success else "failed", result)
        driver.quit()
    except Exception as e:
        crud.complete_test(test.id, "failed", str(e))
