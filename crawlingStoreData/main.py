from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains
import time

import func

driver = func.getChromeDriver()


# Navigate to a web page
driver.get('https://www.naver.com/')
driver.maximize_window()

# Create an empty list to store the data
data = []

# Find an element by its CSS selector
# , "한식", "중식", "일식", "양식", "분식"
for target in ["족발", "한식", "중식", "일식", "양식", "분식"]:
    driver.find_element(By.ID, "query").send_keys("성수역 {}".format(target))
    driver.find_element(By.ID, "search-btn").click()
    addedStore = []
    for i in range(1):
        try:
            time.sleep(2)
            ActionChains(driver).move_to_element(driver.find_element(By.CLASS_NAME, "api_title")).perform()
            ActionChains(driver).move_to_element(driver.find_element(By.CLASS_NAME, "Q8MZt.aFCZr")).perform()
            time.sleep(2)
            tmpList = driver.find_element(By.CLASS_NAME, "Q8MZt.aFCZr").find_elements(By.TAG_NAME, "li")
            for a in tmpList:
                storeName = func.returnText(a, "CLASS_NAME", "place_bluelink.TYaxT")
                menu = func.returnText(a, "CLASS_NAME", "KCMnt")
                if target not in menu:
                    menu = target + "," + menu
                images = []
                openTime = ""
                parking = ""
                rate = ""
                for img in a.find_elements(By.CLASS_NAME, "place_thumb"):
                    images.append(
                        img.find_element(By.CLASS_NAME, "K0PDV").get_attribute("style").split(" ")[5].split("\"")[
                            1])

                a.find_element(By.CLASS_NAME, "place_bluelink.TYaxT").click()
                driver.switch_to.window(driver.window_handles[1])
                time.sleep(3)
                driver.switch_to.frame(driver.find_element(By.ID, "entryIframe"))
                rate = func.returnText(None, "CLASS_NAME", "PXMot.LXIwF")
                if rate is "":
                    rate = "평가중"

                elif "별점" in rate:
                    rate = rate[3:]

                address = func.returnText(None, "CLASS_NAME", "LDgIH")
                contact = func.returnText(None, "CLASS_NAME", "xlx7Q")
                link = driver.current_url
                if "주차" in func.returnText(None, "CLASS_NAME", "vV_z_"):
                    parking = "가능"
                else:
                    parking = "불가능"

                driver.close()
                driver.switch_to.window(driver.window_handles[0])
                if storeName not in addedStore:
                    data.append({
                        "storeName": storeName,
                        "menu": menu,
                        "rate": rate,
                        "images": images,
                        "address": address,
                        "contact": contact,
                        "parking": parking,
                        "link": link
                    })
                    addedStore.append(storeName)

            if driver.find_element(By.CLASS_NAME, "spnew_bf.cmm_pg_next.on") is not None:
                driver.find_element(By.CLASS_NAME, "spnew_bf.cmm_pg_next.on").click()
            else:
                break
        except Exception as e:
            print(e)
            break

    driver.get('https://www.naver.com/')

# Close the browser
for i in data:
    print(i)
driver.quit()



# Generate the HTML file
js_content = """
    // Store data in localStorage
    var storeData = {};
    localStorage.setItem('storeData', JSON.stringify(storeData));
""".format(data)

filePath = "C:/Users/하나로H018/buyMeFood/storeData.js"
# Save the HTML content to a file
with open(filePath, 'w', encoding='utf-8') as f:
    f.write(js_content)
