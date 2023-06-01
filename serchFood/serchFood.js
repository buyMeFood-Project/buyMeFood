import { searchFunction } from "../searchFunc.js";
let displayList = [];
let pagingArea = "";

$(document).ready(function(){
    $(function () {
        $("#GNB").load("../gnb/gnb.html");
        $("#footer").load("../footer/footer.html");
    });
    
    const keyword = localStorage.getItem('searchKeyword');
    
    if(keyword.length < 1){
        $('#container').css('height', '500px');
        $('#container').html("\"" + keyword + "\" 관련 맛집이 없습니다.");
    }
    else{
        displayList = searchFunction(keyword);
        if(displayList.length == 0){
            $('#container').css('height', '500px');
            $('#container').html("\"" + keyword + "\" 관련 맛집이 없습니다.");
        }
        else{
            for(let k = 1; k <= Math.ceil(displayList.length/12); k++){
                pagingArea += '<button type="button" class="pages" value="' + String(k) + '">' + String(k) + '</button>';
            }
            $('#pagination').html(pagingArea);
            $('#menuTitle').text(keyword + "의 검색결과")
            let page = parseInt(localStorage.getItem('searchCurrPage'));
            
            for(let i = (page-1) * 12; i < page*12; i++){
                if(i > displayList.length -1){
                    break;
                }
                let tmp = displayList[i];
                let menu = tmp.menu.split(",");
                let storeName = tmp.storeName;
                if(storeName.length > 8){
                    storeName = storeName.substring(0, 8) + "...";
                }
                $('#food_list'+String((i%12)+1)).css("display", "");
                $('#food_Image'+String((i%12)+1)).attr('name', tmp.storeName);
                $('#food_Image'+String((i%12)+1)).attr('src', tmp.images[0]);
                $('#food'+String((i%12)+1)).text(menu[0]+","+menu[1]);
                $('#food_name'+String((i%12)+1)).text(storeName);
                if(tmp.rate !== "평가중"){
                    $('#food_rate'+String((i%12)+1)).text(tmp.rate.substring(0, tmp.rate.length-2));
                }
                else{
                    $('#food_rate'+String((i%12)+1)).text(tmp.rate);
                }
            }
        }
    }
    
    $('a').attr('target', '_blank');
    $('a').click(function () {
        let nameAttr = $(this).find('img').attr('name');
        for (let each of displayList) {
            if (each.storeName == nameAttr) {
                localStorage.setItem('selectedStoreInfo', JSON.stringify(each));
                break;
            }
        }
    });

    $('.pages').click(function(){
        let targetPage = $(this).attr('value');
        let searchCurrPage = parseInt(localStorage.getItem('searchCurrPage'));
        if(targetPage === 'prePage'){
            if(searchCurrPage !== 1){
                localStorage.setItem('searchCurrPage', searchCurrPage-1);
                window.location.reload();
            }
        }
        else if(targetPage === 'nextPage'){
            if(searchCurrPage !== Math.ceil(displayList.length/12)){
                localStorage.setItem('searchCurrPage', searchCurrPage+1);
                window.location.reload();
            }
        }
        else{
            localStorage.setItem('searchCurrPage', targetPage);
            window.location.reload();
        }
    });
});

