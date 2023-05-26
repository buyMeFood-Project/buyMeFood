from chromeDriver import getChromeDriver
from selenium.webdriver.common.by import By

driver = getChromeDriver()


def returnText(fromTarget, elemType, elemDetail):
    retVal = ""
    try:
        if fromTarget is not None:
            match elemType:
                case "ID":
                    retVal = fromTarget.find_element(By.ID, elemDetail).text
                case "CLASS_NAME":
                    retVal = fromTarget.find_element(By.CLASS_NAME, elemDetail).text
        else:
            match elemType:
                case "ID":
                    retVal = driver.find_element(By.ID, elemDetail).text
                case "CLASS_NAME":
                    retVal = driver.find_element(By.CLASS_NAME, elemDetail).text
    except Exception as e:
        print(e)

    return retVal

def findMultiple(elemType, elemDetail):
    try:
        match elemType:
            case "ID":
                return driver.find_elements(By.ID, elemDetail)

            case "CLASS_NAME":
                return driver.find_elements(By.CLASS_NAME, elemDetail)

    except Exception as e:
        return None