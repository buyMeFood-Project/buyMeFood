/*
이모지 관련 코드 (가져온거)
<script src="https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@3.0.3/dist/index.min.js"></script>
<button id="emoji_btn">button</button>
<input type="text" id="message">
*/

let currUser = localStorage.getItem('currUser');
let userList = JSON.parse(localStorage.getItem('userList'));
let postList = JSON.parse(localStorage.getItem('postList'));
let storeList = JSON.parse(localStorage.getItem('storeData'));
let currUserInfo = null;
let postListContent = '';
let likeListContent = '';

for(let each of userList){
    if(each.userid === currUser){
        currUserInfo = each;
        break;
    }
}
$(function() {
    $('#GNB').load('../gnb/gnb.html');
    $('#footer').load('../footer/footer.html');
});


/* 이모지 버튼 */
const btn = document.getElementById("emoji_btn");
const picker = new EmojiButton({
    position: 'bottom-top'
});

/*
$("#emoji_btn").click(function() {
    picker.togglePicker(btn);
});
*/
$(document).on("click", "#emoji_btn", function(){
    picker.togglePicker(btn);
});

picker.on('emoji', emoji => {
    const text_box = document.querySelector('#message');

    text_box.value += emoji;
    user_emoji:document.getElementById("user_emoji").innerHTML = emoji;
});

/* username 수정하는 부분 */
let infoArea = document.getElementById("myinfo");

// 현재 로그인한 유저 정보 (수정 필요!⭐⭐⭐)

let user_emojiInfo = {
    user_emoji:document.getElementById("user_emoji").textContent,
    userId:document.getElementById("userId").textContent = currUser
}
/* 1. user정보와 해당 이모지를 가지는 로컬스토리지 가져오기
2. 이모지의 정보가 최초면 (null이면) 기본값 부여 후 저장
*/
if (localStorage.getItem('user_emojiInfo'.user_emoji) == null) {
    /* 최초의 data를 foodList에 넣는 작업 */
    user_emojiInfo.user_emoji = '🍕'

    localStorage.setItem('user_emojiInfo', JSON.stringify([user_emojiInfo]));
}
const userEmoji = localStorage.getItem('user_emojiInfo'.user_emoji);
const username = currUser;

$("#editbtn").click(function() {
    infoArea.innerHTML = '\
        <div id="user_emoji">\
            <input type="text" id="message" value="'+userEmoji+'">\
        </div>\
        <dl>\
        <dt><h2>마이 페이지</h2></dt>\
        <dd>\
            <input type="text" value="'+ username + '">\
            <button type="button" id="emoji_btn">button</button>\
            <button id="donebtn">확인</button>\
        </dd>\
        </dl>\
    ';
});

function changeDone() {
    infoArea.innerHTML = '\
        <div id="user_emoji">😀</div>\
        <h2 id="top">마이페이지</h2>\
        <span id="userId" value="' + loginUser + '"></span>\
        <button id="editbtn" onclick="changeInfo()">✏️</button>\
    ';    
}

/*
if (localStorage.getItem('userList') == null) {
        localStorage.setItem('userList', JSON.stringify([data]));   
    }
    else {
        userList = JSON.parse(localStorage.getItem('userList'));
        userList.push(data);
        localStorage.setItem('userList', JSON.stringify(userList));
    }
*/

/* localStorage에 저장된 찜 목록을 불러와서 띄워주기 
1. likeList 리스트 찾기
2. 불러와서 html로 보내주기
*/

$('#myPost').click(function(){
    $('#myPostForm').css("display", "");
    $('#myStoreForm').hide();
    
    // for(let myPost of currUserInfo.mypost){
    //     let currPost = null;
    //     for(let post of postList){
    //         if(postList.postToken === myPost){
    //             currPost = post;
    //             break;
    //         }
    //     }
    //     $('#like_list')
    // }
});

{/* <div class="mypost">
    <div class="mypost_title" id="post_name"></div>
    <span class="start">⭐</span>
    <span class="mypost_rate" id="post_rate"></span>
    <div class="mypost_content" id="post_content3"></div>
</div> */}
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




for(let myPost of currUserInfo.mypost){
    let currPost = null;
    for(let post of postList){
        if(post.postToken === myPost){
            currPost = post;
            break;
        }
    }
    postListContent += '<div class="mypost">\
    <div class="mypost_title" id="post_name">'+ currPost.storeName +'</div>\
    <span class="start">⭐</span>\
    <span class="mypost_rate" id="post_rate">'+currPost.rate +'</span>\
    <div class="mypost_content" id="post_content3">'+currPost.content+'</div>\
    </div>';
}
$('#mypost_list').html(postListContent);


$('a').click(function(){
    let nameAttr = $(this).find('img').attr('name');
    for(let each of storeList){
        if(each.storeName === nameAttr){
            localStorage.setItem('selectedStoreInfo', JSON.stringify(each));
            break;
        }
    }
});