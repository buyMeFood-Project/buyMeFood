import * as modalControl from "../alertModal/modal.js";
$(document).ready(function(){
    $(function() {
        $("#modalContainer").load("../alertModal/modal.html");
    });
    // 로그인 버튼 기능
    $('#login').click(function(){
        const userid = $('#userId').val();
        const userpw = $('#userPw').val();
        if(userid === ''){
            modalControl.alertModalControl("아이디를 입력해주세요.");
        }
        else if(userpw === ''){
            modalControl.alertModalControl("비밀번호를 입력해주세요");
        }
        else{
            if(userList === null){
                modalControl.alertModalControl("존재하지 않는 정보입니다.<br>회원가입을 먼저 진행해주세요.");
            }
            else{
                var isOkay = loginFunc(userid, userpw);
                if(isOkay !== null){
                    localStorage.setItem('currUser', isOkay);
                    window.location.href = "../main.html";
                }
                else{
                    modalControl.alertModalControl("일치하는 정보가 없습니다.<br>아이디 혹은 비밀번호를<br>확인 후 다시 로그인해주세요.");
                }
            }
        }
    })

    //입력된 ID/PW와 일치하는 계정 탐색
    function loginFunc(userId, userPw){
        var start = 0, end = userList.length-1;    
        while(start <= end){
            var lUser = userList[start];
            var rUser = userList[end];
            if(lUser.userid === userId && lUser.password === userPw){
                return lUser.username;
            }
            if(rUser.userid === userId && rUser.password === userPw){
                return rUser.username;
            }
            start++;
            end--;
        }
        return null;
    }
});