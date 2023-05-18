//const menu = ["떡볶이", "김밥", "제육볶음", "쌀국수", "김치찌개", "칼국수", "우육면", "냉면", "연어덮밥", "스테이크덮밥", "피자", "짜장면", "짬뽕", "햄버거", "파스타", "돈까스", "초밥", "부대찌개", "샌드위치", "포케", "부대찌개", "순두부찌개", "김치볶음밥", "갈비탕", "육회덮밥", "닭볶음탕", "뚝배기불고기", "라멘", "우동", "만두"];
const menu = ["칼국수"];
const total = menu.length;
document.querySelector('#menu_btn').addEventListener("click", function(){
    var rand_num = Math.floor(Math.random() * total);
    var selected_menu = menu[rand_num];
    document.getElementById('menu_btn').innerHTML = selected_menu;

    var placeList = JSON.parse(localStorage.getItem('placeList'));
    let placeArea = document.getElementById('place_list');
    placeArea.innerHTML = '';
    for (var i=0; i < placeList.length; i++) {
        if (placeList[i].keyword === selected_menu) {
            let new_place = document.createElement('div');
            new_place.setAttribute('class', 'recommend_place');
            var place_image = document.createElement('img');
            place_image.src = "/" + placeList[i].image;
            console.log(placeList[i].image);
            new_place.appendChild(place_image);
            new_place.innerHTML = placeList[i].restaurant_name + ' ★' + placeList[i].rating;
            placeArea.appendChild(new_place);
        }
    }

});


// 임시데이터 세팅
/*
let data1={
    keyword:"칼국수",
    restaurant_name:"칼",
    rating:"4.8",
    image: "placeImg/kal.jpeg"
}
let data2={
    keyword:"칼국수",
    restaurant_name:"조조칼국수",
    rating:"4.7",
    image: "placeImg/jojo.jpeg"
}
let data3={
    keyword:"칼국수",
    restaurant_name:"란칼국수",
    rating:"4.6",
    image: "placeImg/ran.jpeg"
}
let data4={
    keyword:"칼국수",
    restaurant_name:"밀본",
    rating:"4.5",
    image: "placeImg/mealbon.jpeg"
}
let data = [data1, data2, data3, data4]
for (var i=0; i<4; i++) {
    if(localStorage.getItem('placeList') == null){
        localStorage.setItem('placeList', JSON.stringify([data[i]]));   
    }
    else{
        placeList = JSON.parse(localStorage.getItem('placeList'));
        placeList.push(data[i]);
        localStorage.setItem('placeList', JSON.stringify(placeList));
    }
}
*/
