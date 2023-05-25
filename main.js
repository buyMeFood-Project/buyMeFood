const data = JSON.parse(localStorage.getItem('storeData'));
localStorage.setItem('selectedStoreInfo', '');
$(function(){
    $('#GNB').load('gnb/gnb.html');
    $('#footer').load('footer/footer.html');
});

for(let i = 1; i <= 6; i++){
    var index = String(i);
    var tmpData = data[Math.floor(Math.random()*data.length)];
    if(tmpData.images.length < 2){
        $('#src'+index).attr('src', "imgUnav.jpg");
    }
    else{
        $('#src'+index).attr('src', tmpData.images[1]);
    }
    $('#src'+index).attr('name', tmpData.storeName);
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