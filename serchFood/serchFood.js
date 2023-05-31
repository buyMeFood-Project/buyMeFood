$(function () {
    $("#GNB").load("../gnb/gnb.html");
    $("#footer").load("../footer/footer.html");
});

const keyword = localStorage.getItem('searchKeyword');
const storeList = JSON.parse(localStorage.getItem('storeData'));
const displayList = [];
const addedStore = [];
let start = 0, end = storeList.length-1;

$('#comment1').text(keyword + " 맛집추천")

while(start <= end){
    let lStore = storeList[start];
    let rStore = storeList[end];
    if(!addedStore.includes(lStore.storeName)){
        if(lStore.storeName.includes(keyword) || lStore.menu.includes(keyword)){
            displayList.push(lStore);
            addedStore.push(lStore.storeName);
        }
    }
    if(!addedStore.includes(rStore.storeName)){
        if(rStore.storeName.includes(keyword) || rStore.menu.includes(keyword)){
            displayList.push(rStore);
            addedStore.push(rStore.storeName);
        }
    }
    start += 1;
    end -= 1;
}
if(displayList.length === 0){
    $('#field').html("\"" + keyword + "\" 관련 맛집이 없습니다.");
}
if(displayList.length != 0){
    let idx = 0;
    while(idx <= 8 || idx < displayList.length){
        let tmp = displayList[idx];
        let menu = tmp.menu.split(",");
        let storeName = tmp.storeName;
        if(storeName.length > 8){
            storeName = storeName.substring(0, 8) + "...";
        }
        $('#food_li'+String(idx+1)).css("display", "");
        $('#food_Image'+String(idx+1)).attr('name', tmp.storeName);
        $('#food_Image'+String(idx+1)).attr('src', tmp.images[0]);
        $('#food'+String(idx+1)).text(menu[0]+","+menu[1]);
        $('#food_name'+String(idx+1)).text(storeName);
        if(tmp.rate !== "평가중"){
            $('#food_rate'+String(idx+1)).text(tmp.rate.substring(0, tmp.rate.length-2));
        }
        else{
            $('#food_rate'+String(idx+1)).text(tmp.rate);
        }
        idx += 1;
    }
}

$('a').click(function () {
    let nameAttr = $(this).find('img').attr('name');
    for (let each of displayList) {
        if (each.storeName == nameAttr) {
            localStorage.setItem('selectedStoreInfo', JSON.stringify(each));
            break;
        }
    }
});

