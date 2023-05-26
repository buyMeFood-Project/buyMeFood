from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

global driver

options = Options()
driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
driver.maximize_window()
# driver.set_window_size(1280, 1024)
# driver.set_window_size(1024, 768)


def getChromeDriver():
    return driver
