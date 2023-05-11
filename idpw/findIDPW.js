const userList = JSON.parse(localStorage.getItem('userList'));
let phoneNumOption = document.getElementById("byPhoneNum");

function changeOption(){
    if(phoneNumOption.checked){
        document.getElementById("changeable").innerHTML = "휴대폰: ";
    }
    else{
        document.getElementById("changeable").innerHTML = "이메일: ";
    }
}

function findId(){
    const searchName = document.getElementById("searchName").value;
    const findOption = document.getElementById("findOption").value;
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
};

function findPW(){
    const searchName = document.getElementById("searchName2").value;
    const searchID = document.getElementById("searchID").value;
    const searchEmail = document.getElementById("searchEmail").value;

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
};



// function isExist(info){
//     for(let data in userList){
//         data = JSON.parse(data);
//         let sw = 0;
//         for(let each in info){
//             if(data[each] == info[each]){
//                 sw += 1;
//             }
//         }
//         if(sw == info.keys.length){
//             return true;
//         }
//     }
//     return false;
// }
