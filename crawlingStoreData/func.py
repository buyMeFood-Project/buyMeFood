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

def clickElem(fromTarget, elemType, elemDetail):
    try:
        if fromTarget is not None:
            match elemType:
                case "ID":
                    fromTarget.find_element(By.ID, elemDetail).click()
                case "XPATH":
                    fromTarget.find_element(By.XPATH, elemDetail).click()
                case "CLASS_NAME":
                    fromTarget.find_element(By.CLASS_NAME, elemDetail).click()
        else:
            match elemType:
                case "ID":
                    driver.find_element(By.ID, elemDetail).click()
                case "XPATH":
                    driver.find_element(By.XPATH, elemDetail).click()
                case "CLASS_NAME":
                    driver.find_element(By.CLASS_NAME, elemDetail).click()
    except Exception as e:
        print(e)

def returnAttr(fromTarget, elemType, elemDetail, attrType):
    retVal = ""
    try:
        if fromTarget is not None:
            match elemType:
                case "ID":
                    retVal = fromTarget.find_element(By.ID, elemDetail).get_attribute(attrType)
                case "XPATH":
                    retVal = fromTarget.find_element(By.XPATH, elemDetail).get_attribute(attrType)
                case "CLASS_NAME":
                    retVal = fromTarget.find_element(By.CLASS_NAME, elemDetail).get_attribute(attrType)
        else:
            match elemType:
                case "ID":
                    retVal = driver.find_element(By.ID, elemDetail).get_attribute(attrType)
                case "XPATH":
                    retVal = driver.find_element(By.XPATH, elemDetail).get_attribute(attrType)
                case "CLASS_NAME":
                    retVal = driver.find_element(By.CLASS_NAME, elemDetail).get_attribute(attrType)
    except Exception as e:
        print(e)
    return retVal

def returnElem(fromTarget, elemType, elemDetail):
    retVal = None
    try:
        if fromTarget is not None:
            match elemType:
                case "ID":
                    retVal = fromTarget.find_element(By.ID, elemDetail)
                case "XPATH":
                    retVal = fromTarget.find_element(By.XPATH, elemDetail)
                case "CLASS_NAME":
                    retVal = fromTarget.find_element(By.CLASS_NAME, elemDetail)
        else:
            match elemType:
                case "ID":
                    retVal = driver.find_element(By.ID, elemDetail)
                case "XPATH":
                    retVal = driver.find_element(By.XPATH, elemDetail)
                case "CLASS_NAME":
                    retVal = driver.find_element(By.CLASS_NAME, elemDetail)
    except Exception as e:
        print(e)
    return retVal

def returnMultipleElem(fromTarget, elemType, elemDetail):
    retVal = None
    try:
        if fromTarget is not None:
            match elemType:
                case "ID":
                    retVal = fromTarget.find_elements(By.ID, elemDetail)
                case "XPATH":
                    retVal = fromTarget.find_elements(By.XPATH, elemDetail)
                case "CLASS_NAME":
                    retVal = fromTarget.find_elements(By.CLASS_NAME, elemDetail)
                case "TAG_NAME":
                    retVal = fromTarget.find_elements(By.TAG_NAME, elemDetail)
        else:
            match elemType:
                case "ID":
                    retVal = driver.find_elements(By.ID, elemDetail)
                case "XPATH":
                    retVal = driver.find_elements(By.XPATH, elemDetail)
                case "CLASS_NAME":
                    retVal = driver.find_elements(By.CLASS_NAME, elemDetail)
                case "TAG_NAME":
                    retVal = driver.find_elements(By.TAG_NAME, elemDetail)
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