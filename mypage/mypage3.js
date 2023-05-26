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

let currUser = localStorage.getItem('currUser');
let userList = JSON.parse(localStorage.getItem('userList'));
let postList = JSON.parse(localStorage.getItem('postList'));
let currUserInfo = null;
for(let each of userList){
    if(each.userid === currUser){
        currUserInfo = each;
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

$('#myPostList').click(function(){
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