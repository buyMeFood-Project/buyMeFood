$(document).ready(function(){
    $('#GNB').load('gnb/gnb.html');
    $('#footer').load('footer/footer.html');
    const data = JSON.parse(localStorage.getItem('storeData'));
    localStorage.setItem('selectedStoreInfo', '');
    localStorage.setItem('postCurrPage', "1");
    let displayed = [];
    for(let i = 1; i <= 12; i++){
        var index = String(i);
        var tmpData = data[Math.floor(Math.random()*data.length)];
        while(displayed.includes(tmpData.storeName)){
            tmpData = data[Math.floor(Math.random()*data.length)];
        }
        displayed.push(tmpData.storeName);
        if(tmpData.images.length < 2){
            $('#src'+index).attr('src', "imgUnav.jpg");
        }
        else{
            $('#src'+index).attr('src', tmpData.images[1]);
        }
        $('#src'+index).attr('name', tmpData.storeName);
        $('#food_rate'+index).html(tmpData.rate);
        $('#food'+index).html(tmpData.menu);
        $('#food_name'+index).html(tmpData.storeName);
    }

    $('a').click(function(){
        var nameAttr = $(this).find('img').attr('name');
        for(let each of data){
            if(each.storeName === nameAttr){
                localStorage.setItem('selectedStoreInfo', JSON.stringify(each));
                break;
            }
        }
    })
});
