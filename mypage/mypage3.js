// $(document).ready(function(){ 

let currUser = sessionStorage.getItem('currUser');
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
let currUsername = currUserInfo.username; //바꿔줄 닉네임 username
let currUserEmoji = currUserInfo.useremoji; //바꿔줄 이모지 useremoji

$(function() {
    $('#GNB').load('../gnb/gnb.html');
    $('#footer').load('../footer/footer.html');
});

/* 이모지 버튼 */
const btn = document.getElementById("emoji_btn");
const picker = new EmojiButton({
    position: 'top'
});

$(document).on("click", "#emoji_btn", function(){
    picker.togglePicker(btn);
});

picker.on('emoji', emoji => {
    const text_box = document.querySelector('#user_emoji');

    text_box.innerHTML = emoji;
});

$(document).on('click', '#emoji_btn', function() {
    picker.togglePicker('#emoji_btn');
});

/* username 수정하는 부분 */
let infoArea = document.getElementById("myinfo");

// 현재 로그인한 유저 정보
userId:document.getElementById("userId").innerHTML = currUsername;

//현재 이모지 정보를 html에
user_emoji:document.getElementById("user_emoji").innerHTML = currUserEmoji;

//수정 버튼 누르기
$(document).on('click', '#editbtn', function() {
    currUsername = currUserInfo.username; //바꿔줄 닉네임 username
    currUserEmoji = currUserInfo.useremoji;

    // value="' + currUsername + '">
    infoArea.innerHTML = '\
        <form>\
        <div id="user_emoji"></div>\
        <dl>\
            <dt><h2>마이 페이지</h2></dt>\
            <dd>\
                <input id="userId" type="text">\
                <button id="emoji_btn" type="button">이모지 수정</button>\
                <button id="donebtn" type="submit">확인</button>\
            </dd>\
        </dl>\
        </form>\
    ';

    user_emoji:document.getElementById("user_emoji").innerHTML = currUserEmoji;
    userId:document.getElementById("userId").value = currUsername;

});

$(document).on('submit', 'form', function(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지

    const userEmojiValue = $('#user_emoji').html();
    const usernameValue = $(this).find('input[type="text"]').val();
    //$('#userId').text(usernameValue);

    //user_emoji:document.getElementById("user_emoji").innerHTML = 

    // 기존 폼 요소 및 버튼 등을 변경하기 위해 infoArea.innerHTML 대신 다음과 같이 코드를 작성합니다:
    if(userEmojiValue != currUserEmoji ||
        usernameValue != currUsername) {
            currUserEmoji = userEmojiValue;
            currUsername = usernameValue;

            for (let each of userList) {
                if (each.userid === currUser) {
                    each.username = currUsername;
                    each.useremoji = currUserEmoji;
                    break;
                }
            }
            //const userId = (JSON.parse(localStorage.getItem('userList'))[idx].userid);
            

            // userList[i].username = currUsername;
            // userList[i].useremoji = currUserEmoji;

            localStorage.setItem('userList', JSON.stringify(userList));

        //currUser, userList
    }
    

    infoArea.innerHTML = '\
        <div id="user_emoji"></div>\
        <dl>\
            <dt><h2>마이 페이지</h2></dt>\
            <dd>\
            <span id="userId"></span>\
            <button id="editbtn">✏️</button>\
            </dd>\
        </dl>\
    ';

    user_emoji:document.getElementById("user_emoji").innerHTML = currUserEmoji;
    userId:document.getElementById("userId").innerHTML = currUsername;
    localStorage.setItem('currUser',  currUsername);
    //localStorage.getItem()

    
    window.location.reload;
});
/*
$(document).on('click', '#donebtn', function() {
    const usernameValue = $(this).find('input[type="text"]').val();
    // 가져온 값(usernameValue)을 이용하여 원하는 동작 수행

    $('#userId').text(usernameValue);

    alert(usernameValue);

    infoArea.innerHTML = '\
        <div id="user_emoji"></div>\
        <dl>\
            <dt><h2>마이 페이지</h2></dt>\
            <dd>\
            <span id="userId">' + usernameValue + '</span>\
            <button id="editbtn">✏️</button>\
            </dd>\
        </dl>\
    ';
    /*
    if(username != usernameValue) {
        localStorage.setItem('user_emojiInfo'.userId, JSON.stringify(usernameValue));
        username = usernameValue;
    }
    //userId:document.getElementById("userId").innerHTML = username;

    let new_emoji = document.getElementById("user_emoji").innerHTML;
    localStorage.setItem('user_emojiInfo'.userEmoji, JSON.stringify(new_emoji));
    
});
*/

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