window.onload = function(){
    document.querySelector('#search_btn').addEventListener("click", function(){
        var search_keyword = document.getElementById("search_input").value;
        localStorage.setItem('search_keyword', search_keyword);
    });
}
var currUser = localStorage.getItem('currUser') ? localStorage.getItem('currUser') : sessionStorage.getItem('currUser');
let currUserInfo = null;
for(let user of JSON.parse(localStorage.getItem('userList'))){
    if(user.username === currUser){
        currUserInfo = user;
        break;
    }
}
if(currUser){
    $('#util').hide();
    $('#util_afterLogin').css('display', 'flex');
    $('#gnbIcon').text(currUserInfo.useremoji);
    $('#nickname').text(" " + currUser);
}
else{
    $('#util').css('display', 'flex');
    $('#util_afterLogin').hide();
}

$(".menu").click(function(){
    localStorage.setItem("selectedMenu", $(this).attr('id'));
})
$("#toMain").click(function(){
    $("li").removeClass("on");
    $('#nav1').closest("li").addClass("on");
    localStorage.setItem("selectedMenu", "nav1");
})
var selectedMenuItem = localStorage.getItem('selectedMenu');
if (selectedMenuItem) {
    $("li").removeClass("on");
    $("#" + selectedMenuItem).closest("li").addClass("on");
}

$('#logout').click(function(){
    sessionStorage.removeItem('currUser');
});


$('#search_input').keypress(function(event){
    if(event.keyCode === 13){
        var search_keyword = $(this).val();
        localStorage.setItem('searchKeyword', search_keyword);
        localStorage.setItem('searchCurrPage', '1');
        window.location.href = "../serchFood/serchFood.html";
        
    }
});
$('#search_btn').click(function(){
    let keyword = $(this).parent().find('#search_input').val();
    localStorage.setItem('searchKeyword', keyword);
    localStorage.setItem('searchCurrPage', '1');
    window.location.href = "../serchFood/serchFood.html";
})

$('#nav2').click(function(){
    localStorage.setItem('postCurrPage', 1);
})
