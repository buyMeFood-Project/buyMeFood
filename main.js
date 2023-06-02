import * as commonFunc from "./commonFunc.js";

$(document).ready(function(){
    $('#GNB').load('gnb/gnb.html');
    $('#footer').load('footer/footer.html');
    let displayed = [];
    
    for(let i = 1; i <= 12; i++){
        var index = String(i);
        var tmpData = storeList[Math.floor(Math.random()*storeList.length)];
        while(displayed.includes(tmpData.storeName)){
            tmpData = storeList[Math.floor(Math.random()*storeList.length)];
        }
        displayed.push(tmpData.storeName);
        let storeName = tmpData.storeName.length > 8 ? tmpData.storeName.substring(0, 8) : tmpData.storeName;
        let menu = tmpData.menu.split(",");
        let menuName = (menu[0]+","+menu[1]).length > 8 ? (menu[0]+","+menu[1]).substring(0, 8) : (menu[0]+","+menu[1]);
        $('#src'+index).attr('src', tmpData.images[0]);
        $('#src'+index).attr('name', tmpData.storeName);
        $('#food_rate'+index).html(tmpData.rate.substr(0, 3));
        $('#food'+index).html(menuName);
        $('#food_name'+index).html(storeName);
    }
    
    $('a').click(function(){
        let nameAttr = $(this).find('img').attr('name');
        let selectedStore = commonFunc.getStoreInfo(nameAttr, storeList);
        localStorage.setItem('selectedStoreInfo', JSON.stringify(selectedStore));   
        if(currUser){ 
            localStorage.setItem('currUser', currUser);
        }
    });
});
