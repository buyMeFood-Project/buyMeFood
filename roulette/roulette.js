//const menu = ["떡볶이", "김밥", "제육볶음", "쌀국수", "김치찌개", "칼국수", "우육면", "냉면", "연어덮밥", "스테이크덮밥", "피자", "짜장면", "짬뽕", "햄버거", "파스타", "돈까스", "초밥", "부대찌개", "샌드위치", "포케", "부대찌개", "순두부찌개", "김치볶음밥", "갈비탕", "육회덮밥", "닭볶음탕", "뚝배기불고기", "라멘", "우동", "만두"];
$(function(){
    $('#GNB').load('../gnb/gnb.html');
    $('#footer').load('../footer/footer.html');
});

const storeList = JSON.parse(localStorage.getItem('storeData'));
const menu = ["족발", "한식", "중식", "일식", "양식", "분식", "베트남 음식", "태국 음식", "돈까스", "햄버거", "우동", "칼국수", "국밥", "백반", "피자", "파스타", "마라탕", "쌀국수", "떡볶이", "덮밥", "샌드위치", "카페"];
const total = menu.length;

$('#menu_btn').click(function(){
    var rand_num = Math.floor(Math.random() * total);
    var selected_menu = menu[rand_num];
    $(this).text(selected_menu)
    $('#place_list').html('');
    let rcmdStore = [];
    let addedStore = [];
    let start = 0, end = storeList.length - 1;

    while(start <= end){
        let lStore = storeList[start];
        let rStore = storeList[end];

        if(!addedStore.includes(lStore.storeName)){
            if(lStore.menu.includes(selected_menu) || lStore.storeName.includes(selected_menu)){
                rcmdStore.push(lStore);
                addedStore.push(lStore.storeName);
            }
        }
        if(!addedStore.includes(rStore.storeName)){
            if(rStore.menu.includes(selected_menu) || rStore.storeName.includes(selected_menu)){
                rcmdStore.push(rStore);
                addedStore.push(rStore.storeName);
            }
        }
        start += 1;
        end -= 1;
    }

    let idx = 0;
    while(idx < 4){
        var randDisplay = rcmdStore[Math.floor(Math.random() * rcmdStore.length)];
        let new_place = document.createElement('div');
        new_place.setAttribute('class', 'place');

        const place_image = new Image();
        place_image.src = randDisplay.images[0];
        place_image.width = 250;
        place_image.height = 250;
        new_place.appendChild(place_image);

        var place_label = document.createElement('span');
        var rating = document.createElement('span');
        rating.innerHTML = ' ★' + randDisplay.rate;
        rating.className = 'rating';
        place_label.innerHTML = randDisplay.storeName;
        place_label.className = 'place_label';
        new_place.appendChild(place_label);
        place_label.append(rating);

        $('#place_list').append(new_place);
        idx += 1;
    }
});