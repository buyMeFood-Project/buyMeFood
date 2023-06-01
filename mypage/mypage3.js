// $(document).ready(function(){ 
let currUser = sessionStorage.getItem('currUser');
let userList = JSON.parse(localStorage.getItem('userList'));
let postList = JSON.parse(localStorage.getItem('postList'));
let storeList = JSON.parse(localStorage.getItem('storeData'));
let currUserInfo = null;
let postListContent = '';
let likeListContent = '';

for(let each of userList){
    if(each.username === currUser){
        currUserInfo = each;
        break;
    }
}
$(function() {
    $('#GNB').load('../gnb/gnb.html');
    $('#footer').load('../footer/footer.html');
});
const picker = new EmojiButton({
    position: 'top',
    rootElement: document.getElementById("emoji_btn_area") // user_emoji 요소를 picker의 위치로 지정
});

$(document).on("click", "#emoji_btn", function(){
    picker.togglePicker("#emoji_btn");
});

picker.on('emoji', emoji => {
    $('#user_emoji').text(emoji);
});

$("#userId").text(currUserInfo.username);
$("#user_emoji").text(currUserInfo.useremoji);

$('#editbtn').click(function() {
    $('#edit_inform').css('display', "");
    $('#default').hide();
    $("#user_emoji").text(currUserInfo.useremoji);
    $('#edit_inform').find("#userId").val(currUserInfo.username);
});

$('#donebtn').click(function(event) {
    event.preventDefault();
    let editedName = $('#edit_inform').find('#userId').val();
    let editedEmoji = $('#user_emoji').text();
    if(editedName !== currUserInfo.username ||
        editedEmoji !== currUserInfo.useremoji) {       
            for(let each of userList){
                if(each.username === currUser){
                    each.username = editedName;
                    each.useremoji = editedEmoji;
                    break;
                }
            }
            sessionStorage.setItem('currUser', editedName);
            localStorage.setItem('userList', JSON.stringify(userList));
    }
    localStorage.removeItem('emojiPicker.recent');
    window.location.reload();
});

$('#myPost').click(function(){
    $('#myPostForm').css("display", "");
    $('#myStoreForm').hide();
});
$('#likeList').click(function(){
    $('#myStoreForm').css("display", "");
    $('#myPostForm').hide();
});

$('#postList').click(function(){
    $('#myPostForm').css("display", "");
    $('#myStoreForm').hide();
});


for(let myStore of currUserInfo.mystore){
    let currStore = null;
    for(let store of storeList){
        if(store.storeName === myStore){
            currStore = store;
            break;
        }
    }
    let tmpRate = currStore.rate;
    if(tmpRate !== "평가중"){
        tmpRate = tmpRate.substring(0, tmpRate.length - 2);
    }
    likeListContent += '<div class="like_shop">\
                            <div class="like_title" id="rest_name">'+currStore.storeName+'</div>\
                            <span class="start">⭐</span>\
                            <span class="like_rate" id="rest_rate">'+tmpRate+'</span>\
                            <div class="like_img" id="rest_img"><a href=../ResDetail/ResDetail.html><img class="like_img" name="' + currStore.storeName + '"src="'+currStore.images[0]+'"></a></div>\
                        </div>';
}
$('#like_list').html(likeListContent);



const imgUrl = '../img/ready_img.jpg';

for(let myPost of currUserInfo.mypost){
    let currPost = null;
    for(let post of postList){
        if(post.postToken === myPost){
            currPost = post;
            break;
        }
    }
    postListContent += '<div class="mypost">\
    <img class="mypost_image" id="post_image" src="'+ (currPost.imageList[0] || imgUrl) +'"></img>\
    <div class="mypost_title" id="post_name">'+ currPost.storeName +'</div>\
    <span class="start">⭐</span>\
    <span class="mypost_rate" id="post_rate">'+currPost.rate +'</span>\
    <div class="mypost_content" id="post_content3">'+currPost.content+'</div>\
    </div>';
}

$('#mypost_list').html(postListContent);
$('a').attr('target', '_blank');
$('a').click(function(){
    let nameAttr = $(this).find('img').attr('name');
    for(let each of storeList){
        if(each.storeName === nameAttr){
            localStorage.setItem('selectedStoreInfo', JSON.stringify(each));
            break;
        }
    }
});