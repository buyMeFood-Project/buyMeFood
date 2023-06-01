import { alertModalControl } from "../alertModal/modal.js";
$(function() {
    $("#modalContainer").load("../alertModal/modal.html");
});

$('#login').click(function(){
    const userList = JSON.parse(localStorage.getItem('userList'));
    const userid = $('#userId').val();
    const userPw = $('#userPw').val();
    let isOkay = false;
    if(userid === ''){
        alertModalControl("아이디를 입력해주세요.");
    }
    else if(userPw === ''){
        alertModalControl("비밀번호를 입력해주세요");
    }
    else{
        if(userList === null){
            alertModalControl("존재하지 않는 정보입니다.<br>회원가입을 먼저 진행해주세요.");
        }
        else{
            for(let user of userList){
                if(user.userid === userid && user.password === userPw){
                    isOkay = true;
                    sessionStorage.setItem('currUser', user.username);
                    break;
                }
            }
            if(isOkay){
                window.location.href = "../main.html";
            }
            else{
                alertModalControl("일치하는 정보가 없습니다.<br>아이디 혹은 비밀번호를<br>확인 후 다시 로그인해주세요.");
            }
        }
    }
})
