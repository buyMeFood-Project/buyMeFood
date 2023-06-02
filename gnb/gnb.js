$(document).ready(function(){
    let currUserInfo = null;
    var selectedMenuItem = localStorage.getItem('selectedMenu');
    
    for(let user of userList){
        if(user.username === currUser){
            currUserInfo = user;
            break;
        }
    }
    // 현재 유저의 이모지 및 닉네임 GNB에 표시
    if(currUser && currUser !== "null"){
        $('#util').hide();
        $('#util_afterLogin').css('display', 'flex');
        $('#gnbIcon').text(currUserInfo.useremoji);
        $('#nickname').text(" " + currUser);
    }
    else{
        $('#util').css('display', 'flex');
        $('#util_afterLogin').hide();
    }
    
    //검색 버튼 기능
    $('#search_btn').click(function() {
        var searchKeyword = $('#search_input').val();
        localStorage.setItem('searchKeyword', searchKeyword);
        localStorage.setItem('searchCurrPage', 1);
        window.location.href = "../searchFood/searchFood.html";
    });
    // 검색어 Enter버튼으로 검색
    $('#search_input').keypress(function(event){
        if(event.keyCode === 13){
            var searchKeyword = $(this).val();
            localStorage.setItem('searchKeyword', searchKeyword);
            localStorage.setItem('searchCurrPage', 1);
            window.location.href = "../searchFood/searchFood.html";
        }
    });

    $(".menu").click(function(){
        localStorage.setItem("selectedMenu", $(this).attr('id'));
    });
    $("#toMain").click(function(){
        $("li").removeClass("on");
        $('#nav1').closest("li").addClass("on");
        localStorage.setItem("selectedMenu", "nav1");
    });
    if (selectedMenuItem) {
        $("li").removeClass("on");
        $("#" + selectedMenuItem).closest("li").addClass("on");
    }
    $('#logout').click(function(){
        localStorage.removeItem('currUser');
        window.location.href("../main.html");
    });
    $('#nav2').click(function(){
        localStorage.setItem('postCurrPage', 1);
    })
})