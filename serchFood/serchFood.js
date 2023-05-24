localStorage.setItem("keyword","족발");
if(localStorage.getItem("keyword")=='족발'){

    let foodData1= {
        food_Image1:document.getElementById("food_Image1").src = "/img/1.jpg",
        food1:document.getElementById("food1").innerHTML = "한식",
        food_name1:document.getElementById("food_name1").innerHTML = "성수족발",
        food_rate1:document.getElementById("food_rate1").innerHTML = "4.0",
    }
    let foodData2= {
        food_Image2:document.getElementById("food_Image2").src = "../img/마왕족발.jpg",
        food2:document.getElementById("food2").innerHTML = "한식",
        food_name2:document.getElementById("food_name2").innerHTML = "마왕족발",
        food_rate2:document.getElementById("food_rate2").innerHTML = "3.0",
    }
    let foodData3= {
        food_Image3:document.getElementById("food_Image3").src = "../img/그믐족발.jpg",
        food3:document.getElementById("food3").innerHTML = "한식",
        food_name3:document.getElementById("food_name3").innerHTML = "그믐족발",
        food_rate3:document.getElementById("food_rate3").innerHTML = "4.0",
    }
    let foodData4= {
        food_Image4:document.getElementById("food_Image4").src = "../img/위풍당당족발.jpg",
        food4:document.getElementById("food4").innerHTML = "한식",
        food_name4:document.getElementById("food_name4").innerHTML = "위풍당당족발",
        food_rate4:document.getElementById("food_rate4").innerHTML = "4.0",
    }
    let foodData5= {
        food_Image5:document.getElementById("food_Image5").src = "../img/착한족발.jpg",
        food5:document.getElementById("food5").innerHTML = "한식",
        food_name5:document.getElementById("food_name5").innerHTML = "착한족발",
        food_rate5:document.getElementById("food_rate5").innerHTML = "4.0",
    }
    let foodData6= {
        food_Image6:document.getElementById("food_Image6").src = "../img/광장족발.jpg",
        food6:document.getElementById("food6").innerHTML = "한식",
        food_name6:document.getElementById("food_name6").innerHTML = "광장족발",
        food_rate6:document.getElementById("food_rate6").innerHTML = "4.0",
    }
    let foodData7= {
        food_Image7:document.getElementById("food_Image7").src = "../img/그믐족발.jpg",
        food7:document.getElementById("food7").innerHTML = "한식",
        food_name7:document.getElementById("food_name7").innerHTML = "그믐족발",
        food_rate7:document.getElementById("food_rate7").innerHTML = "4.0",
    }
    let foodData8= {
        food_Image8:document.getElementById("food_Image8").src = "../img/위풍당당족발.jpg",
        food4:document.getElementById("food8").innerHTML = "한식",
        food_name8:document.getElementById("food_name8").innerHTML = "위풍당당족발",
        food_rate8:document.getElementById("food_rate8").innerHTML = "4.0",
    }
    let foodData9= {
        food_Image9:document.getElementById("food_Image9").src = "../img/착한족발.jpg",
        food5:document.getElementById("food9").innerHTML = "한식",
        food_name9:document.getElementById("food_name9").innerHTML = "착한족발",
        food_rate9:document.getElementById("food_rate9").innerHTML = "4.0",
    }

}else{

}
let serchData = {
    serchData1:document.getElementById("comment1").innerHTML = localStorage.getItem("keyword")+'맛집 추천',
}


if (localStorage.getItem('foodList') == null) {
    /* 최초의 data를 foodList에 넣는 작업 */
    localStorage.setItem('foodList', JSON.stringify([foodData1]));

    /* 이후의 데이터  */
    foodList = JSON.parse(localStorage.getItem('foodList'))
    foodList.push(foodData2);
    foodList.push(foodData3);
    foodList.push(foodData4);
    foodList.push(foodData5);
    foodList.push(foodData6);
    localStorage.setItem('foodList', JSON.stringify([foodList]));
}