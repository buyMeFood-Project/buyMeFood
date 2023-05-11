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
};
