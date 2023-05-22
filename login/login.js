
const signup = document.getElementById("sign-up");
signin = document.getElementById("sign-in");
loginin = document.getElementById("login-in");
loginup = document.getElementById("login-up");

signup.addEventListener("click", () => {
    loginin.classList.remove("block");
    loginup.classList.remove("none");

    loginin.classList.add("none");
    loginup.classList.add("block");
})

signin.addEventListener("click", () => {
    loginin.classList.remove("none");
    loginup.classList.remove("block");

    loginin.classList.add("block");
    loginup.classList.add("none");
})

document.querySelector('.login__button').addEventListener("click", function(){
    var userId = document.getElementById("userId").value;
    var userPassword = document.getElementById("userPw").value;
    if (!userId) {  // 아이디 미입력
        alert("아이디를 입력해주세요.");
        
        }
    else if (!userPassword) {  // 비밀번호 미입력
        alert("비밀번호를 입력해주세요.");
    
    }

    var userList = JSON.parse(localStorage.getItem('userList'));
    for (var i=0; i < userList.length; i++) {
        if (userList[i].userId == userId) {
            if (userList[i].password == userPassword) {  // 로그인 성공
                alert("로그인 성공");   
                break;
            }
            else {  // 비밀번호 불일치
                if (userPassword)
                    alert('아이디, 비밀번호가 일치하지 않습니다. 다시 입력해주세요.');
            }
        }
    }
});
/*
const data = {
    userName: 'admin',
    userId: 'admin',
    password: '1234'
};

localStorage.setItem('userList', JSON.stringify([data]));
*/