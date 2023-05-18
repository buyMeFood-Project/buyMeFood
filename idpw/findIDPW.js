const userList = JSON.parse(localStorage.getItem('userList'));

// Display input form for find id info
$("#idInfo").click(function(){
    $('#forID').css('display', '');
    $('#forPW').css('display', 'none');
});

// Display input form for find pwd info
$('#pwInfo').click(function(){
    $('#forID').css('display', 'none');
    $('#forPW').css('display', '');
});

// Change option between phoneNum and email for find id
$('#byPhoneNum').click(function(){
    $('#changeable').html("휴대폰: ");
});

$('#byEmail').click(function(){
    $('#changeable').html("이메일: ");
});

// function to set alert message inside alert modal
function modalControl(message){
    event.preventDefault();
    $('#alertContent').html(message);
    $('#myModal').css('display', 'block');
};

// Confirm btn function to close alert modal
$('#confirm').click(function(){
    $('#myModal').css('display', 'none');
});

// Find Id Function
$('#findId').click(function(){
    const searchName = $('#searchName').val();
    const findOption = $('#findOption').val();
    let phoneNumOption = $('#byPhoneNum');
    if(searchName === '' || findOption === ''){
        modalControl('공란이 존재합니다. <br> 확인 후 다시 입력해주세요.');
    }
    else{
        if(userList === null){
            modalControl('일치하는 정보가 없습니다. <br> 확인 후 다시 입력해주세요.');
        }
        else{
            let isExist = false;
            let retId = "";
            for(let user of userList){
                if(phoneNumOption.prop('checked')){
                    if(user.phoneNum === findOption){
                        isExist = true;
                        retId = user.userId;
                        break;
                    }
                }
                else{
                    if(user.email === findOption){
                        isExist = true;
                        retId = user.userId;
                        break;
                    }
                }
            }
            if(isExist){
                $('#forID').html('\
                <p>아이디 찾기 성공! <br>\
                입력하신 정보에 해당하는 아이디는 ' + retId + '입니다.\
                </p>\
                <div>\
                    <button type="submit">메인페이지</button>\
                    <button type="button">로그인</button>\
                </div>');
            }
            else{
                modalControl('일치하는 정보가 없습니다. <br> 확인 후 다시 입력해주세요.');
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
        modalControl('공란이 존재합니다. <br> 확인 후 다시 입력해주세요.');
    }
    else{
        if(userList === null){
            modalControl('일치하는 정보가 없습니다. <br> 확인 후 다시 입력해주세요.');
        }
        else{
            let isExist = false;
            for(let user of userList){
                if(user.username === searchName
                    && user.userId === searchID
                    && user.email === searchEmail){
                        isExist = true;
                        $('#forPW').html('\
                        <p>비밀번호 찾기 성공! <br>\
                        임시 비밀번호를 입력하신 이메일로 발송하였습니다.\
                        </p>\
                        <div>\
                            <button type="submit">메인페이지</button>\
                            <button type="button">로그인</button>\
                        </div>');
                        break;
                }
            }
            if(!isExist){
                modalControl('일치하는 정보가 없습니다. <br> 확인 후 다시 입력해주세요.');
            }
        }
    }
});