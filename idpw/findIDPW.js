let infoArea = document.getElementById("findInfo");
const userList = JSON.parse(localStorage.getItem('userList'));

function idInfo(){
    infoArea.innerHTML = '\
    <form>\
        <div>\
            <input type="radio" id="byPhoneNum" name="searchIDBy" checked="checked" onclick="changeOption()">\
            <label for="phone"> 휴대폰</label>\
            <input type="radio" id="byEmail" name="searchIDBy" onclick="changeOption()">\
            <label for="email"> 이메일</label>\
        </div>\
        <div>\
            <label for="searchName">이름:</label>\
            <input type="text" id="searchName" name="searchName" required>\
        </div>\
        <div>\
            <label for="findOption" id="changeable">휴대폰: </label>\
            <input type="text" id="findOption" name="searchPhoneNum" required>\
        </div>\
        <div>\
            <button type="submit" onclick="findId()">아이디찾기</button>\
            <button type="button">로그인</button>\
        </div>\
    </form>';
}
function pwInfo(){
    infoArea.innerHTML='\
    <form>\
        <label for="searchName2">이름:</label>\
        <input type="text" id="searchName2" name="searchName2" required>\
        <br>\
        <label for="searchID">아이디:</label>\
        <input type="text" id="searchID" name="searchID" required>\
        <br>\
        <label for="searchEmail">이메일:</label>\
        <input type="email" id="searchEmail" name="searchEmail" required>\
        <div>\
            <button type="submit" onclick="findPW()">비밀번호찾기</button>\
            <button type="button">로그인</button>\
        </div>\
    </form>\
    ';
}

function changeOption(){
    if(document.getElementById("byPhoneNum").checked){
        document.getElementById("changeable").innerHTML = "휴대폰: ";
    }
    else{
        document.getElementById("changeable").innerHTML = "이메일: ";
    }
}

function findId(){
    const searchName = document.getElementById("searchName").value;
    const findOption = document.getElementById("findOption").value;
    let phoneNumOption = document.getElementById("byPhoneNum");
    if(searchName == '' || findOption == ''){
        alert("공란이 존재합니다. 확인 후 다시 입력해주세요.");
    }
    else{
        if(userList == null){
            alert("존재하지 않는 정보입니다.");
        }
        else{
            let isExist = false;
            let retId = "";
            for(let i = 0; i < userList.length; i++){
                if(userList[i].username == searchName){
                    if(phoneNumOption.checked){
                        if(userList[i].phoneNum == findOption){
                            isExist = true;
                            retId = userList[i].userId;
                            break;
                        }
                    }
                    else{
                        if(userList[i].email == findOption){
                            isExist = true;
                            retId = userList[i].userId;
                            break;
                        }
                    }
                }
            }
            isExist ? alert("아이디는 " + retId + " 입니다.") : alert("존재하지 않는 정보입니다.");
        }
    }
}

function findPW(){
    const searchName = document.getElementById("searchName2").value;
    const searchID = document.getElementById("searchID").value;
    const searchEmail = document.getElementById("searchEmail").value;

    if(searchName == '' || searchID == '' || searchEmail == ''){
        alert("공란이 존재합니다. 확인 후 다시 입력해주세요.");
    }
    else{
        if(userList == null){
            alert("존재하지 않는 정보입니다.");
        }
        else{
            let sw = 0;
            for(let i = 0; i < userList.length; i++){
                if(userList[i].username == searchName 
                    && userList[i].userId == searchID
                    && userList[i].email == searchEmail){
                    alert("임시 비밀번호를 " + searchEmail + "로 발송하였습니다.")
                    sw = 1;
                    break;
                }
            }
            if(sw == 0){
                alert("존재하지 않는 정보입니다");
            }
        }
    }
}