/*
<script src="https://cdn.jsdelivr.net/npm/@joeattardi/emoji-button@3.0.3/dist/index.min.js"></script>
<button id="emoji_btn">button</button>
<input type="text" id="message">
*/

let infoArea = document.getElementById("myinfo");

const btn = document.getElementById("emoji_btn");
const picker = new EmojiButton({
    position: 'bottom-start'
});

// btn.addEventListener('click', () => {
//     picker.togglePicker(btn);
// });

picker.on('emoji', emoji => {
    const text_box = document.querySelector('#message');
    text_box.value += emoji;
});

function emoji_picker() {
    picker.togglePicker(btn);
}


// userId:document.getElementById("userId").textContent = "백연정";
const loginUser = (JSON.parse(localStorage.getItem('userList')))[0].username;
function test(){
    alert(loginUser);
}
userId:document.getElementById("userId").textContent = loginUser;
const username = document.getElementById("userId").textContent;


function changeInfo() {
    infoArea.innerHTML = '\
        <div id="user_emoji">😀</div>\
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
function likeList() {
//    localStorage.getItem('likeList')

}

/* likeList와 동일 */
function myPost() {
//  localStorage.getItem('myPost')
}