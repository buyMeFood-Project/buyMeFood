$(document).ready(function(){
    $('#GNB').load('gnb/gnb.html');
    $('#footer').load('footer/footer.html');
    const data = JSON.parse(localStorage.getItem('storeData'));
    localStorage.setItem('selectedStoreInfo', '');
    localStorage.setItem('postCurrPage', "1");
    localStorage.setItem('searchKeyword', '');
    let displayed = [];
    for(let i = 1; i <= 12; i++){
        var index = String(i);
        var tmpData = data[Math.floor(Math.random()*data.length)];
        while(displayed.includes(tmpData.storeName)){
            tmpData = data[Math.floor(Math.random()*data.length)];
        }
        displayed.push(tmpData.storeName);
        $('#src'+index).attr('src', tmpData.images[0]);
        
        let storeName = tmpData.storeName;
        if(storeName.length > 8){
            storeName = storeName.substring(0, 8) + "...";
        }
        $('#src'+index).attr('name', tmpData.storeName);
        $('#food_rate'+index).html(tmpData.rate.substr(0, 3));
        
        let menu = tmpData.menu.split(",");
        let tmpMenuName = menu[0]+","+menu[1];

        if(tmpMenuName.length > 8){
            tmpMenuName = tmpMenuName.substring(0,8) + "...";
        }
        $('#food'+index).html(tmpMenuName);
        $('#food_name'+index).html(storeName);
    }

    $('a').click(function(){
        var nameAttr = $(this).find('img').attr('name');
        for(let each of data){
            if(each.storeName === nameAttr){
                localStorage.setItem('selectedStoreInfo', JSON.stringify(each));
                break;
            }
        }
    });
});
