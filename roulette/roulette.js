//const menu = ["떡볶이", "김밥", "제육볶음", "쌀국수", "김치찌개", "칼국수", "우육면", "냉면", "연어덮밥", "스테이크덮밥", "피자", "짜장면", "짬뽕", "햄버거", "파스타", "돈까스", "초밥", "부대찌개", "샌드위치", "포케", "부대찌개", "순두부찌개", "김치볶음밥", "갈비탕", "육회덮밥", "닭볶음탕", "뚝배기불고기", "라멘", "우동", "만두"];
$(function(){
    $('#GNB').load('../gnb/gnb.html');
    $('#footer').load('../footer/footer.html');
});

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

            const place_image = new Image();
            place_image.src = placeList[i].image;
            place_image.width = 300;
            place_image.height = 350;
            new_place.appendChild(place_image);

            var place_label = document.createElement('span');
            var rating = document.createElement('span');
            rating.innerHTML = ' ★' + placeList[i].rating;
            rating.className = 'rating';
            place_label.innerHTML = placeList[i].restaurant_name;
            place_label.className = 'place_label';
            new_place.appendChild(place_label);
            place_label.append(rating);

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
    image: "../img/placeImg/kal.jpeg"
}
let data2={
    keyword:"칼국수",
    restaurant_name:"조조칼국수",
    rating:"4.7",
    image: "../img/placeImg/jojo.jpeg"
}
let data3={
    keyword:"칼국수",
    restaurant_name:"란칼국수",
    rating:"4.6",
    image: "../img/placeImg/ran.jpeg"
}
let data4={
    keyword:"칼국수",
    restaurant_name:"밀본",
    rating:"4.5",
    image: "../img/placeImg/mealbon.jpeg"
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

// 로컬스토리지 데이터 삭제
//localStorage.removeItem('placeList');
