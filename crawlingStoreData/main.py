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
addedStore = []
# Find an element by its CSS selector
# "족발", "한식", "중식", "일식", "양식", "분식"
for target in ["족발", "한식", "중식", "일식", "양식", "분식", "베트남 음식", "태국 음식", "인도 음식", "돈까스", "햄버거", "우동", "칼국수", "국밥", "백반", "피자", "파스타", "마라탕", "쌀국수", "떡볶이", "덮밥", "샌드위치", "카페"]:
    time.sleep(2)
    driver.find_element(By.ID, "query").send_keys("성수역 {} 맛집".format(target))
    driver.find_element(By.ID, "search-btn").click()
    try:
        pagination = func.returnAttr(None, "XPATH", "/html/body/div[3]/div[2]/div/div[1]/div[2]/div[3]/section/div/div[5]/a[2]", "class")
        if pagination is None:
            time.sleep(2)
            ActionChains(driver).move_to_element(driver.find_element(By.CLASS_NAME, "api_title")).perform()
            ActionChains(driver).move_to_element(driver.find_element(By.CLASS_NAME, "Q8MZt.aFCZr")).perform()
            time.sleep(2)
            tmpList = driver.find_element(By.CLASS_NAME, "Q8MZt.aFCZr").find_elements(By.TAG_NAME, "li")
            for a in tmpList:
                ActionChains(driver).move_to_element(a).perform()
                storeName = func.returnText(a, "CLASS_NAME", "place_bluelink.TYaxT")
                if storeName not in addedStore:
                    addedStore.append(storeName)
                    tmpStoreName = storeName.split(" ")
                    insertStoreName = storeName
                    if len(tmpStoreName) != 1 and "성수" in tmpStoreName[len(tmpStoreName) - 1] or "건대" in tmpStoreName[len(tmpStoreName) - 1]:
                        del tmpStoreName[len(tmpStoreName) - 1]
                        insertStoreName = ''.join(tmpStoreName)

                    menu = func.returnText(a, "CLASS_NAME", "KCMnt")
                    if target not in menu:
                        menu = target + "," + menu
                    images = []
                    openTime = ""
                    parking = ""
                    rate = ""
                    mapLink = ""
                    for img in a.find_elements(By.CLASS_NAME, "place_thumb"):
                        images.append(
                            img.find_element(By.CLASS_NAME, "K0PDV").get_attribute("style").split(" ")[5].split("\"")[
                                1])

                    func.clickElem(a, "CLASS_NAME", "tzwk0")
                    driver.switch_to.window(driver.window_handles[1])
                    time.sleep(3)
                    driver.switch_to.frame(driver.find_element(By.ID, "entryIframe"))
                    time.sleep(3)
                    rate = func.returnText(None, "CLASS_NAME", "PXMot.LXIwF")
                    if rate == "":
                        rate = "평가중"

                    else:
                        if "별점" in rate:
                            rate = rate[3:]

                    address = func.returnText(None, "CLASS_NAME", "LDgIH")
                    contact = func.returnText(None, "CLASS_NAME", "xlx7Q")
                    link = driver.current_url
                    if "주차" in func.returnText(None, "CLASS_NAME", "vV_z_"):
                        parking = "가능"
                    else:
                        parking = "불가능"

                    for className in ["jnwQZ", "mpoxR"]:
                        if func.returnElem(None, "CLASS_NAME", className) is not None:
                            commonMenu = func.returnMultipleElem(func.returnElem(None, "CLASS_NAME", className),
                                                                 "TAG_NAME", "li")
                            for cm in commonMenu:
                                menu += "," + cm.text.split("\n")[0]
                            break

                    # 지도 퍼오기
                    driver.get("https://www.google.com/maps")
                    time.sleep(3)
                    driver.find_element(By.ID, "searchboxinput").send_keys(storeName + " " + address)
                    driver.find_element(By.ID, "searchbox-searchbutton").click()
                    time.sleep(3)

                    if func.returnElem(None, "XPATH",
                                       "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button") is None:
                        if "부분 일치" in driver.page_source:
                            func.clickElem(None, "XPATH",
                                           "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[2]/div[2]/div")
                            time.sleep(3)
                            func.clickElem(None, "XPATH",
                                           "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button")
                        else:
                            func.clickElem(None, "XPATH",
                                           "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[1]/div[3]/div")
                            time.sleep(3)
                            func.clickElem(None, "XPATH",
                                           "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[3]/div/div[1]/div/div/div[2]/div[4]/div[5]/button")
                    else:
                        func.clickElem(None, "XPATH",
                                       "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button")
                    time.sleep(3)
                    func.clickElem(None, "XPATH",
                                   "/html/body/div[3]/div[1]/div/div[2]/div/div[3]/div/div/div[1]/div[2]/button[2]")

                    time.sleep(3)
                    mapLink = func.returnAttr(None, "XPATH",
                                              "/html/body/div[3]/div[1]/div/div[2]/div/div[3]/div/div/div/div[3]/div[1]/input",
                                              "value")

                    if mapLink != "":
                        mapLink = mapLink.split(" ")[1].replace("src=", "").replace("\"", "")
                    else:
                        mapLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.454081908621!2d127.05480307635466!3d37.54436422539846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4943515bb63%3A0xd9dade4d4d8effb2!2z7ISx7IiY7JetMuuyiOy2nOq1rA!5e0!3m2!1sko!2skr!4v1685270098731!5m2!1sko!2skr"

                    driver.close()
                    driver.switch_to.window(driver.window_handles[0])
                    if not images:
                        images.append(
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ucNsZ93x9P2LqNjids-pUzHKqtpyX7nG-KBgtnpWjwrePEOvri6Np-pxd8pElvIVDPY&usqp=CAU")

                    if contact == "":
                        contact = "-"
                    data.append({
                        "storeName": insertStoreName,
                        "menu": menu,
                        "rate": rate,
                        "images": images,
                        "address": address,
                        "contact": contact,
                        "parking": parking,
                        "storeLink": link,
                        "mapLink": mapLink
                    })
        else:
            while func.returnAttr(None, "XPATH", "/html/body/div[3]/div[2]/div/div[1]/div[2]/div[3]/section/div/div[5]/a[2]", "class") == "spnew_bf cmm_pg_next on":
                time.sleep(2)
                ActionChains(driver).move_to_element(driver.find_element(By.CLASS_NAME, "api_title")).perform()
                ActionChains(driver).move_to_element(driver.find_element(By.CLASS_NAME, "Q8MZt.aFCZr")).perform()
                time.sleep(2)
                tmpList = driver.find_element(By.CLASS_NAME, "Q8MZt.aFCZr").find_elements(By.TAG_NAME, "li")
                for a in tmpList:
                    ActionChains(driver).move_to_element(a).perform()
                    storeName = func.returnText(a, "CLASS_NAME", "place_bluelink.TYaxT")
                    if storeName not in addedStore:
                        addedStore.append(storeName)
                        tmpStoreName = storeName.split(" ")
                        insertStoreName = storeName
                        if len(tmpStoreName) != 1 and "성수" in tmpStoreName[len(tmpStoreName)-1] or "건대" in tmpStoreName[len(tmpStoreName)-1]:
                            del tmpStoreName[len(tmpStoreName) - 1]
                            insertStoreName = ''.join(tmpStoreName)

                        menu = func.returnText(a, "CLASS_NAME", "KCMnt")
                        if target not in menu:
                            menu = target + "," + menu
                        images = []
                        openTime = ""
                        parking = ""
                        rate = ""
                        mapLink = ""
                        for img in a.find_elements(By.CLASS_NAME, "place_thumb"):
                            images.append(
                                img.find_element(By.CLASS_NAME, "K0PDV").get_attribute("style").split(" ")[5].split("\"")[
                                    1])

                        func.clickElem(a, "CLASS_NAME", "tzwk0")
                        driver.switch_to.window(driver.window_handles[1])
                        time.sleep(3)
                        driver.switch_to.frame(driver.find_element(By.ID, "entryIframe"))
                        time.sleep(3)
                        rate = func.returnText(None, "CLASS_NAME", "PXMot.LXIwF")
                        if rate == "":
                            rate = "평가중"

                        else:
                            if "별점" in rate:
                                rate = rate[3:]

                        address = func.returnText(None, "CLASS_NAME", "LDgIH")
                        contact = func.returnText(None, "CLASS_NAME", "xlx7Q")
                        link = driver.current_url
                        if "주차" in func.returnText(None, "CLASS_NAME", "vV_z_"):
                            parking = "가능"
                        else:
                            parking = "불가능"

                        for className in ["jnwQZ", "mpoxR"]:
                            if func.returnElem(None, "CLASS_NAME", className) is not None:
                                commonMenu = func.returnMultipleElem(func.returnElem(None, "CLASS_NAME", className), "TAG_NAME", "li")
                                for cm in commonMenu:
                                    menu += "," + cm.text.split("\n")[0]
                                break

                        # 지도 퍼오기
                        driver.get("https://www.google.com/maps")
                        time.sleep(3)
                        driver.find_element(By.ID, "searchboxinput").send_keys(storeName + " " + address)
                        driver.find_element(By.ID, "searchbox-searchbutton").click()
                        time.sleep(3)


                        if func.returnElem(None, "XPATH", "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button") is None:
                            if "부분 일치" in driver.page_source:
                                func.clickElem(None, "XPATH",
                                               "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[2]/div[2]/div")
                                time.sleep(3)
                                func.clickElem(None, "XPATH",
                                               "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button")
                            else:
                                func.clickElem(None, "XPATH", "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div[1]/div[3]/div")
                                time.sleep(3)
                                func.clickElem(None, "XPATH", "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[3]/div/div[1]/div/div/div[2]/div[4]/div[5]/button")
                        else:
                            func.clickElem(None, "XPATH",
                                           "/html/body/div[3]/div[9]/div[9]/div/div/div[1]/div[2]/div/div[1]/div/div/div[4]/div[5]/button")
                        time.sleep(3)
                        func.clickElem(None, "XPATH",
                                       "/html/body/div[3]/div[1]/div/div[2]/div/div[3]/div/div/div[1]/div[2]/button[2]")

                        time.sleep(3)
                        mapLink = func.returnAttr(None, "XPATH", "/html/body/div[3]/div[1]/div/div[2]/div/div[3]/div/div/div/div[3]/div[1]/input", "value")

                        if mapLink != "":
                            mapLink = mapLink.split(" ")[1].replace("src=", "").replace("\"", "")
                        else:
                            mapLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.454081908621!2d127.05480307635466!3d37.54436422539846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4943515bb63%3A0xd9dade4d4d8effb2!2z7ISx7IiY7JetMuuyiOy2nOq1rA!5e0!3m2!1sko!2skr!4v1685270098731!5m2!1sko!2skr"

                        driver.close()
                        driver.switch_to.window(driver.window_handles[0])
                        if not images:
                            images.append("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ucNsZ93x9P2LqNjids-pUzHKqtpyX7nG-KBgtnpWjwrePEOvri6Np-pxd8pElvIVDPY&usqp=CAU")

                        if contact == "":
                            contact = "-"
                        data.append({
                            "storeName": insertStoreName,
                            "menu": menu,
                            "rate": rate,
                            "images": images,
                            "address": address,
                            "contact": contact,
                            "parking": parking,
                            "storeLink": link,
                            "mapLink": mapLink
                        })

                ActionChains(driver).move_to_element(driver.find_element(By.XPATH, "/html/body/div[3]/div[2]/div/div[1]/div[2]/div[3]/section/div/div[5]/a[2]")).perform()
                driver.find_element(By.XPATH, "/html/body/div[3]/div[2]/div/div[1]/div[2]/div[3]/section/div/div[5]/a[2]").click()

    except Exception as e:
        print(target, e)
        break

    driver.get('https://www.naver.com/')

# Close the browser
for each in data:
    print(each)
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
