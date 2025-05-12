def run(driver):
    try:
        driver.get(driver.current_url + "/form")
        inputs = driver.find_elements("tag name", "input")
        for i in inputs:
            i.send_keys("test")
        buttons = driver.find_elements("tag name", "button")
        for b in buttons:
            if "submit" in b.get_attribute("type"):
                b.click()
                break
        return "Form filled and submitted", True
    except Exception as e:
        return str(e), False
