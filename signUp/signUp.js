import { alertModalControl, confirmModalControl } from "../alertModal/modal.js";
var usernameDup = false, idDup = false;

$(function() {
    $("#modalContainer").load("../alertModal/modal.html");
});

let userList = JSON.parse(localStorage.getItem('userList'));
if(userList === null){
    userList = [];
    localStorage.setItem('userList', JSON.stringify(userList));
}

$('#username_dup').click(function(){
    let username = $('#username').val();
    let nicknamePattern = /^[a-zA-Z0-9]{2,10}$/;
    if(username === ''){
        alertModalControl("닉네임을 입력해주세요.");
        $('#username').focus();
    }
    else if(!nicknamePattern.test(username)){
        alertModalControl("닉네임 규칙을 확인해주세요");
    }
    else{
        let isOkay = true;
        for(let user of userList){
            if(user.username === username){
                isOkay = false;
                alertModalControl('중복되는 닉네임입니다.');
                $('#username').focus();
                break;
            }
        }
        if(isOkay){
            usernameDup = true;
            alertModalControl("사용가능한 닉네임입니다.");
        }
    }
});

$('#userid_dup').click(function(){
    let userid = $('#userid').val();
    let useridpattern = /^[a-zA-Z0-9]{4,10}$/;
    if(userid === ''){
        alertModalControl("아이디를 입력해주세요.");
        $('#userid').focus();
    }
    else if(!useridpattern.test(userid)){
        alertModalControl('아이디 규칙을 확인해주세요.');
    }
    else{
        let isOkay = true;
        for(let user of userList){
            if(user.userid === userid){
                isOkay = false;
                alertModalControl('중복되는 아이디입니다.');
                $('#userid').focus();
                break;
            }
        }
        if(isOkay){
            idDup = true;
            alertModalControl("사용가능한 아이디입니다.");
        }
    }
});

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

$('#signUp').click(function(){
    let username = $('#username').val();
    let userid = $('#userid').val();
    let password = $('#password').val();
    let phonenum = $('#phonenum').val();
    let emailid = $('#useremail').val() 
    let emaildomin = $('#emaildomain').val();
    if(username === '' || userid === '' || password === '' ||
        phonenum === '' || emailid === '' || emaildomin === ''){
            alertModalControl("공란이 존재합니다.<br>확인 후 입력해주세요.");
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
            confirmModalControl("회원가입을 진행하시겠습니까?", '../login/login.html', function(result){
                if(result){
                    userList.push(newUser);
                    localStorage.setItem('userList', JSON.stringify(userList));
                }
            });
        }
    }
});

$('#back').click(function(){
    confirmModalControl("회원가입을 취소하고<br>로그인 페이지로 이동하시겠습니까?", '../login/login.html', function(result){
        
    });
})

function validationCheck(password){
    let passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,20}$/;
    let retVal = true;
    if(!usernameDup){
        retVal = false;
        alertModalControl("닉네임 중복확인을 해주세요");
    }
    else if(!idDup){
        retVal = false;
        alertModalControl("아이디 중복확인을 해주세요");
    }
    else if(!passwordPattern.test(password)){
        retVal = false;
        alertModalControl("비밀번호를 확인해주세요");
    }
    return retVal;
}

$('input').on('input', function() {
    var noBlankSpace = $(this).val().replace(' ', '');
    $(this).val(noBlankSpace);
});

$('#phonenum').on('input', function() {
    var sanitizedValue = $(this).val().replace(/[^0-9]/g, '');
    $(this).val(sanitizedValue);
});