import { alertModalControl } from "../alertModal/modal.js";
const userList = JSON.parse(localStorage.getItem('userList'));

$(function() {
    $("#modalContainer").load("../alertModal/modal.html");
});

// Display input form for find id info
$("#idInfo").click(function(){
    $('#forID').css('display', '');
    $('#forPW').css('display', 'none');
    $('input').val('');
});

// Display input form for find pwd info
$('#pwInfo').click(function(){
    $('#forID').css('display', 'none');
    $('#forPW').css('display', '');
    $('input').val('');
});

// Change option between phoneNum and email for find id
$('#byPhoneNum').click(function(){
    $('#changeable').html("휴대폰: ");
    $('#findOption').attr('type', 'number');
    $('input').val('');
    
});

$('#byEmail').click(function(){
    $('#changeable').html("이메일: ");
    $('#findOption').attr('type', 'text');
    $('input').val('');
});

// Find Id Function
$('#findId').click(function(){
    const searchName = $('#searchName').val();
    const findOption = $('#findOption').val();
    let phoneNumOption = $('#byPhoneNum');
    if(searchName === '' || findOption === ''){
        alertModalControl('공란이 존재합니다. <br> 확인 후 다시 입력해주세요.');
    }
    else{
        if(userList === null){
            alertModalControl('일치하는 정보가 없습니다. <br> 확인 후 다시 입력해주세요.');
        }
        else{
            let isExist = false;
            let retId = "";
            for(let user of userList){
                if(phoneNumOption.prop('checked')){
                    if(user.phonenum === findOption){
                        isExist = true;
                        retId = user.userid;
                        break;
                    }
                }
                else{
                    if(user.email === findOption){
                        isExist = true;
                        retId = user.userid;
                        break;
                    }
                }
            }
            if(isExist){
                $('#beforeID').css('display', 'none');
                $('#afterID').css('display', 'block');
                $('#afterID').find('#getID').html('\
                <p>아이디 찾기 성공! <br>\
                입력하신 정보에 해당하는 아이디는 ' + retId + '입니다.\
                </p>\
                ');
            }
            else{
                alertModalControl('일치하는 정보가 없습니다. <br> 확인 후 다시 입력해주세요.');
            }
        }
    }
});

// Find Password Function
$('#findPW').click(function() {
    const searchName = $('#searchName2').val();
    const searchID = $('#searchID').val();
    const searchEmail = $('#searchEmail').val();

    if(searchName === '' || searchID === '' || searchEmail === ''){
        alertModalControl('공란이 존재합니다. <br> 확인 후 다시 입력해주세요.');
    }
    else{
        if(userList === null){
            alertModalControl('일치하는 정보가 없습니다. <br> 확인 후 다시 입력해주세요.');
        }
        else{
            let isExist = false;
            for(let user of userList){
                if(user.username === searchName
                    && user.userid === searchID
                    && user.email === searchEmail){
                        isExist = true;
                        $('#beforePW').css('display', 'none');
                        $('#afterPW').css('display', 'block');
                        break;
                }
            }
            if(!isExist){
                alertModalControl('일치하는 정보가 없습니다. <br> 확인 후 다시 입력해주세요.');
            }
        }
    }
});

$('#forID').find('#loginPage').click(function(){
    window.location.href = "../login/login.html";
});
$('#afterID').find('#loginPage').click(function(){
    window.location.href = "../login/login.html";
});

$('#forID').find('#mainPage').click(function(){
    window.location.href = "../main.html";
});

$('#forPW').find('#loginPage').click(function(){
    window.location.href = "../login/login.html";
});

$('#forPW').find('#mainPage').click(function(){
    window.location.href = "../main.html";
});