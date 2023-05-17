const userList = JSON.parse(localStorage.getItem('userList'));

// Display input form for find id info
$("#idInfo").click(function(){
    document.querySelector('#forID').style.display = "block";
    document.querySelector('#forPW').style.display = "none";
});

// Display input form for find pwd info
$('#pwInfo').click(function(){
    document.querySelector('#forID').style.display = "none";
    document.querySelector('#forPW').style.display = "block";
});

// Change option between phone num and email for find id
$('#byPhoneNum').click(function(){
    $('#changeable').html("휴대폰: ");
});

$('#byEmail').click(function(){
    $('#changeable').html("이메일: ");
});


// Find Id Function
$('#findId').click(function(){
    const searchName = document.querySelector("#searchName").value;
    const findOption = document.querySelector("#findOption").value;
    let phoneNumOption = document.querySelector("#byPhoneNum");
    if(searchName === '' || findOption === ''){
        alert("공란이 존재합니다. 확인 후 다시 입력해주세요.");
    }
    else{
        if(userList === null){
            alert("존재하지 않는 정보입니다.");
        }
        else{
            let isExist = false;
            let retId = "";
            for(let i = 0; i < userList.length; i++){
                if(userList[i].username === searchName){
                    if(phoneNumOption.checked){
                        if(userList[i].phoneNum === findOption){
                            isExist = true;
                            retId = userList[i].userId;
                            break;
                        }
                    }
                    else{
                        if(userList[i].email === findOption){
                            isExist = true;
                            retId = userList[i].userId;
                            break;
                        }
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
                alert("존재하지 않는 정보입니다.");
            }
        }
    }
});

// Find Password Function
$('#findPW').click(function() {
    const searchName = document.querySelector("#searchName2").value;
    const searchID = document.querySelector("#searchID").value;
    const searchEmail = document.querySelector("#searchEmail").value;

    if(searchName === '' || searchID === '' || searchEmail === ''){
        alert("공란이 존재합니다. 확인 후 다시 입력해주세요.");
    }
    else{
        if(userList === null){
            alert("존재하지 않는 정보입니다.");
        }
        else{
            let sw = 0;
            for(let i = 0; i < userList.length; i++){
                if(userList[i].username === searchName 
                    && userList[i].userId === searchID
                    && userList[i].email === searchEmail){
                    $('#forPW').html('\
                    <p>비밀번호 찾기 성공! <br>\
                    임시 비밀번호를 입력하신 이메일로 발송하였습니다.\
                    </p>\
                    <div>\
                        <button type="submit">메인페이지</button>\
                        <button type="button">로그인</button>\
                    </div>');
                    sw = 1;
                    break;
                }
            }
            if(sw == 0){
                alert("존재하지 않는 정보입니다");
            }
        }
    }
});