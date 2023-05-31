/* js 남은거 
1. 마이 정보 수정
2. 메뉴탭별로 다른 화면 띄우기
3. 유저별 정보 가져오기

4. 창호님꺼 참고해서 개수별로 for문? 돌려서 게시글 추가하는거 보기
*/



/*
이모지 관련 코드 (가져온거)
<script src="https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@3.0.3/dist/index.min.js"></script>
<button id="emoji_btn">button</button>
<input type="text" id="message">
*/

/* 외부 html 파일 가져오기 */

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
$(function() {
    $('#GNB').load('../gnb/gnb.html');
    $('#footer').load('../footer/footer.html');
});

/* 이모지 버튼 */
const btn = document.getElementById("emoji_btn");
const picker = new EmojiButton({
    position: 'bottom-start'
});

picker.on('emoji', emoji => {
    const text_box = document.querySelector('#message');
    text_box.value += emoji;
});

function emoji_picker() {
    picker.togglePicker(btn);
}

/* username 수정하는 부분 */
let infoArea = document.getElementById("myinfo");

// 현재 로그인한 유저 정보 (수정 필요!⭐⭐⭐)
const loginUser = (JSON.parse(localStorage.getItem('userList')))[0].username;

userId:document.getElementById("userId").textContent = loginUser;
const username = loginUser;

function changeInfo() {
    infoArea.innerHTML = '\
        <div id="user_emoji">\
            <input type="text" id="message">\
        </div>\
        <h2 id="top">마이페이지</h2>\
        <form id="userForm">\
            <input type="text" value="'+ username + '">\
            <button type="button" id="emoji_btn" onclick="emoji_picker()">button</button>\
            <button id="donebtn" onclick="changeDone()">확인</button>\
        </form>\
    ';
}

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