def run(driver):
    try:
        links = driver.find_elements("tag name", "a")
        visited = 0
        for link in links:
            href = link.get_attribute("href")
            if href and "http" in href:
                driver.get(href)
                visited += 1
        return f"Visited {visited} links", True
    except Exception as e:
        return str(e), False
