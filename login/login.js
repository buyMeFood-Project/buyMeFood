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
        for(let user of userList){
            if(user.userid === userid && user.password === userPw){
                isOkay = true;
                break;
            }
        }
    
        if(isOkay){
            localStorage.setItem('currUser', userid);
            window.location.href = "../main.html";
        }
        else{
            alertModalControl("일치하는 정보가 없습니다. 아이디 혹은 비밀번호를 확인 후 다시 로그인해주세요.")
        }
    }
})