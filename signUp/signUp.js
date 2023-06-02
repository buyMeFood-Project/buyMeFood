import * as modalControl from "../alertModal/modal.js";
import * as commonFunc from "../commonFunc.js";
var usernameDup = false, idDup = false;

$(document).ready(function(){
    $(function() {
        $("#modalContainer").load("../alertModal/modal.html");
    });
    
    if(userList === null){
        userList = [];
        localStorage.setItem('userList', JSON.stringify(userList));
    }
    
    // username 중복체크
    $('#username_dup').click(function(){
        let username = $('#username').val();
        if(username === ''){
            modalControl.alertModalControl("닉네임을 입력해주세요.");
            $('#username').focus();
        }
        else if(!nicknamePattern.test(username)){
            modalControl.alertModalControl("닉네임 규칙을 확인해주세요");
        }
        else{
            let isOkay = commonFunc.isUserInfoExist("userName", username, userList);
            if(isOkay){
                usernameDup = true;
                modalControl.alertModalControl("사용가능한 닉네임입니다.");
            }
            else{
                modalControl.alertModalControl('중복되는 닉네임입니다.');
                $('#username').focus();
            }
        }
    });
    
    // userid 중복체크
    $('#userid_dup').click(function(){
        let userid = $('#userid').val();
        if(userid === ''){
            modalControl.alertModalControl("아이디를 입력해주세요.");
            $('#userid').focus();
        }
        else if(!useridpattern.test(userid)){
            modalControl.alertModalControl('아이디 규칙을 확인해주세요.');
        }
        else{
            let isOkay = commonFunc.isUserInfoExist("userId", userid, userList);
            if(isOkay){
                idDup = true;
                modalControl.alertModalControl("사용가능한 아이디입니다.");
            }
            else{
                modalControl.alertModalControl('중복되는 아이디입니다.');
                    $('#userid').focus();
            }
        }
    });
    
    // 이메일 도메인 옵션에 따른 inputbox 기능 처리
    $('#domainOption').change(function(){
        if($('#domainOption').val() !== "직접입력"){
            $('#emaildomain').val($(this).val());
            $('#emaildomain').css('background-color', '#D8D2D2');
            $('#emaildomain').prop('readonly', true);
        }
        else{
            $('#emaildomain').val('');
            $('#emaildomain').css('background-color', 'white');
            $('#emaildomain').prop('readonly', false);
        }
    });
    
    // 회원가입 버튼 기능
    $('#signUp').click(function(){
        let username = $('#username').val();
        let userid = $('#userid').val();
        let password = $('#password').val();
        let phonenum = $('#phonenum').val();
        let emailid = $('#useremail').val() 
        let emaildomin = $('#emaildomain').val();
        if(username === '' || userid === '' || password === '' ||
            phonenum === '' || emailid === '' || emaildomin === ''){
            modalControl.alertModalControl("공란이 존재합니다.<br>확인 후 입력해주세요.");
        }
        else if(!usernameDup){
            modalControl.alertModalControl("닉네임 중복체크를 해주세요.");
        }
        else if(!idDup){
            modalControl.alertModalControl("아이디 중복체크를 해주세요.");
        }
        else{
            if(validationCheck(password)){
                let newUser = {
                    username: username,
                    userid: userid,
                    password: password,
                    phonenum: phonenum,
                    email: emailid + "@" + emaildomin,
                    mystore: [],
                    mypost: [],
                    useremoji: '🍔'
                }
                modalControl.confirmModalControl("회원가입을 진행하시겠습니까?", '../login/login.html', function(result){
                    if(result){
                        userList.push(newUser);
                        localStorage.setItem('userList', JSON.stringify(userList));
                    }
                });
            }
        }
    });
    
    // 돌아가기 버튼 기능
    $('#back').click(function(){
        modalControl.confirmModalControl("회원가입을 취소하고<br>로그인 페이지로 이동하시겠습니까?", '../login/login.html', function(result){
        });
    })
    
    // 비밀번호 유효성 검증
    function validationCheck(password){
        let retVal = true;
        if(!usernameDup){
            retVal = false;
            modalControl.alertModalControl("닉네임 중복확인을 해주세요");
        }
        else if(!idDup){
            retVal = false;
            modalControl.alertModalControl("아이디 중복확인을 해주세요");
        }
        else if(!passwordPattern.test(password)){
            retVal = false;
            modalControl.alertModalControl("비밀번호를 확인해주세요");
        }
        return retVal;
    }
    
    // inputbox 내 공백 자동 삭제
    $('input').on('input', function() {
        var noBlankSpace = $(this).val().replace(' ', '');
        $(this).val(noBlankSpace);
    });
    
    // 핸드폰 inputbox 내 숫자 외의 값 자동 삭제
    $('#phonenum').on('input', function() {
        var sanitizedValue = $(this).val().replace(/[^0-9]/g, '');
        $(this).val(sanitizedValue);
    });
});