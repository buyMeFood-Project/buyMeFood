function signUp() {
    

    let data={
        username:document.getElementById("username").value,
        userId:document.getElementById("userid").value,
        password:document.getElementById("password").value,
        phoneNum:String(document.getElementById("phonenum").value),
        email:document.getElementById("useremail").value + "@" + document.getElementById("emaildomain").value
    }
    if(localStorage.getItem('userList') == null){
        localStorage.setItem('userList', JSON.stringify([data]));   
    }
    else{
        userList = JSON.parse(localStorage.getItem('userList'));
        userList.push(data);
        localStorage.setItem('userList', JSON.stringify(userList));
    }
    if(localStorage.getItem('userList').)
};

function checkIDDuplicate() {

    let userList = JSON.parse(localStorage.getItem('userList'));

    for (let i = 0; i < userList.length; i++) {
        uid = userList[i].userId;

        var userId = document.getElementById('userid').value;
        if (userId === uid) {
            $('#id_duplication').html('<a style="color:red;">중복된 ID 입니다.</a>');
            break;
        }
        else {
            $('#id_duplication').html('<a style="color:blue;">사용가능한 ID 입니다.</a>');
        }
    }
    

    
};

function checkNameDuplicate() {

    let userList = JSON.parse(localStorage.getItem('userList'));

    for (let i = 0; i < userList.length; i++) {
        uname = userList[i].username;

        var username = document.getElementById('username').value;
        if (username === uname) {
            $('#name_duplication').html('<a style="color:red;">중복된 닉네임 입니다.</a>');
        }
        else {
            $('#name_duplication').html('<a style="color:orange;">&#10004;</a>');
        }
    }
    

    
};