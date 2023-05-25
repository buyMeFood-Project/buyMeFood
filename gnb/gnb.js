window.onload = function(){
    document.querySelector('#search_btn').addEventListener("click", function(){
        var search_keyword = document.getElementById("search_input").value;
        localStorage.setItem('search_keyword', search_keyword);
    });
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


var currUser = localStorage.getItem('currUser');

if(currUser !== ''){
    $('#util').hide();
    $('#util_afterLogin').css('display', 'inline-block');
    $('#nickName').text(" " + currUser);
}