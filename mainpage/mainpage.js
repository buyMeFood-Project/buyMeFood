let mainData1= {
    src1:document.getElementById("src1").src = "../img/1.jpg",
    food1:document.getElementById("food1").innerHTML = "한식",
    food_name1:document.getElementById("food_name1").innerHTML = "성수족발",
    food_rate1:document.getElementById("food_rate1").innerHTML = "4.0",
}

let mainData2= {
    src2:document.getElementById("src2").src = "../img/2.jpg",
    food2:document.getElementById("food2").innerHTML = "양식",
    food_name2:document.getElementById("food_name2").innerHTML = "보이어",
    food_rate2:document.getElementById("food_rate2").innerHTML = "4.2",
}

let mainData3 = {
    src3:document.getElementById("src3").src = "../img/3.jpg",
    food3:document.getElementById("food3").innerHTML = "한식",
    food_name3:document.getElementById("food_name3").innerHTML = "밀본",
    food_rate3:document.getElementById("food_rate3").innerHTML = "4.2",
}

let mainData4 = {
    src4:document.getElementById("src4").src = "../img/4.jpg",
    food4:document.getElementById("food4").innerHTML = "한식",
    food_name4:document.getElementById("food_name4").innerHTML = "훼미리 손칼국수",
    food_rate4:document.getElementById("food_rate4").innerHTML = "3.9",
}

let mainData5 = {
    src5:document.getElementById("src5").src = "../img/5.jpg",
    food5:document.getElementById("food5").innerHTML = "양식",
    food_name5:document.getElementById("food_name5").innerHTML = "누메로도스",
    food_rate5:document.getElementById("food_rate5").innerHTML = "4.4",
}

let mainData6 = {
    src6:document.getElementById("src6").src = "../img/6.jpg",
    food6:document.getElementById("food6").innerHTML = "양식",
    food_name6:document.getElementById("food_name6").innerHTML = "쿠나",
    food_rate6:document.getElementById("food_rate6").innerHTML = "4.6",
}

if (localStorage.getItem('foodList') == null) {
    /* 최초의 data를 foodList에 넣는 작업 */
    localStorage.setItem('foodList', JSON.stringify([mainData1]));

    /* 이후의 데이터  */
    foodList = JSON.parse(localStorage.getItem('foodList'))
    foodList.push(mainData2);
    foodList.push(mainData3);
    foodList.push(mainData4);
    foodList.push(mainData5);
    foodList.push(mainData6);
    localStorage.setItem('foodList', JSON.stringify([foodList]));
}