document.querySelector('#login_btn').addEventListener("click", function(){
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
        if (userList[i].userId === userId) {
            if (userList[i].password === userPassword) {  // 로그인 성공
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