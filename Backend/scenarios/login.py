def run(driver):
    try:
        driver.get(driver.current_url + "/login")
        driver.find_element("id", "email").send_keys("admin@example.com")
        driver.find_element("id", "password").send_keys("123456")
        driver.find_element("id", "submit").click()
        return "Login executed", True
    except Exception as e:
        return str(e), False
