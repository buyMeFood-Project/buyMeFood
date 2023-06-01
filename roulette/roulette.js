const menu = ["족발", "한식", "중식", "일식", "양식", "분식", "베트남 음식", "태국 음식", "돈까스", "햄버거", "우동", "칼국수", "국밥", "백반", "피자", "파스타", "마라탕", "쌀국수", "떡볶이", "덮밥", "샌드위치", "카페"];
const total = menu.length;
const storeList = JSON.parse(localStorage.getItem('storeData'));
let slotAnimation;
let counter = 0;

$(document).ready(function(){
    $(function(){
        $('#GNB').load('../gnb/gnb.html');
        $('#footer').load('../footer/footer.html');
    });
    
    document.querySelector('#menu_btn').addEventListener("click", function(){
        // Clear any ongoing slot animation
        clearInterval(slotAnimation);
        let addedStore = [];
        let displayList = [];
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
    
            let start = 0, end = storeList.length - 1;
            while(start <= end){
                let lStore = storeList[start];
                let rStore = storeList[end];
    
                if(!addedStore.includes(lStore.storeName)){
                    if(lStore.menu.includes(selected_menu) || lStore.storeName.includes(selected_menu)){
                        displayList.push(lStore);
                        addedStore.push(lStore.storeName);
                    }
                }
                if(!addedStore.includes(rStore.storeName)){
                    if(rStore.menu.includes(selected_menu) || rStore.storeName.includes(selected_menu)){
                        displayList.push(rStore);
                        addedStore.push(rStore.storeName);
                    }
                }
                start++;
                end--;
            }
            let displayedStore = [];
            for (var i = 0; i < 4; i++) {
                let randStore = displayList[Math.floor(Math.random() * displayList.length)];
                while(displayedStore.includes(randStore.storeName)){
                    randStore = displayList[Math.floor(Math.random() * displayList.length)];
                }
                displayedStore.push(randStore.storeName);
    
                let new_place = document.createElement('div');
                new_place.setAttribute('class', 'place');
                
                let aTag = document.createElement('a');
                aTag.setAttribute('href', '../ResDetail/ResDetail.html');
                aTag.setAttribute('target', '_blank');
                new_place.append(aTag);
                
                const place_image = new Image();
                place_image.setAttribute('name', randStore.storeName);
                place_image.src = randStore.images[0];
                place_image.width = 250;
                place_image.height = 250;
                aTag.appendChild(place_image);

                var place_label = document.createElement('span');
                var rating = document.createElement('span');
                rating.innerHTML = ' ★' + randStore.rate;
                rating.className = 'rating';
                place_label.innerHTML = randStore.storeName;
                place_label.className = 'place_label';
                new_place.appendChild(place_label);
                place_label.append(rating);
    
                placeArea.appendChild(new_place);
            }
        }, duration);
    });
    
    $('#place_list').on('click', 'a', function(){
        let nameAttr = $(this).find('img').attr('name');
        for(let each of storeList){
            if(each.storeName === nameAttr){
                localStorage.setItem('selectedStoreInfo', JSON.stringify(each));
                break;
            }
        }
    });
});
