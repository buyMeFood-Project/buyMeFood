const menu = ["떡볶이", "김밥", "제육볶음", "쌀국수", "김치찌개", "칼국수", "우육면", "냉면", "연어덮밥", "스테이크덮밥", "피자", "짜장면", "짬뽕", "햄버거", "파스타", "돈까스", "초밥", "부대찌개", "샌드위치", "포케", "부대찌개", "순두부찌개", "김치볶음밥", "갈비탕", "육회덮밥", "닭볶음탕", "뚝배기불고기", "라멘", "우동", "만두"];
const total = menu.length;
let slotAnimation;
let counter = 0;

$(function(){
    $('#GNB').load('../gnb/gnb.html');
    $('#footer').load('../footer/footer.html');
});

document.querySelector('#menu_btn').addEventListener("click", function(){
    // Clear any ongoing slot animation
    clearInterval(slotAnimation);
    var placeList = JSON.parse(localStorage.getItem('placeList'));
    let placeArea = document.getElementById('place_list');
    placeArea.innerHTML = '';
    
    // Start slot animation
    slotAnimation = setInterval(function() {
        counter++;
        if (counter >= total) {
            counter = 0;
        }
        document.getElementById('menu_btn').innerHTML = menu[counter];
    }, 100);

    // Stop slot animation after a random duration
    var duration = 1000;
    setTimeout(function() {
        clearInterval(slotAnimation);
        
        var rand_num = Math.floor(Math.random() * total);
        var selected_menu = menu[rand_num];
        document.getElementById('menu_btn').innerHTML = selected_menu;


        for (var i = 0; i < placeList.length; i++) {
            if (placeList[i].keyword === selected_menu) {
                let new_place = document.createElement('div');
                new_place.setAttribute('class', 'place');

                const place_image = new Image();
                place_image.src = placeList[i].image;
                place_image.width = 250;
                place_image.height = 250;
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
    }, duration);
});