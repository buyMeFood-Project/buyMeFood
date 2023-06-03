var nicknamePattern = /^(?=.*[\p{Script=Hangul}a-zA-Z0-9])[a-zA-Z0-9\p{Script=Hangul}]{2,8}$/u;
var useridpattern = /^[a-zA-Z0-9]{4,10}$/;
var passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,20}$/;
var userList = localStorage.getItem('userList') ? JSON.parse(localStorage.getItem('userList')) : [];
var currUser = localStorage.getItem('currUser') ? localStorage.getItem('currUser') : null;
var postList = localStorage.getItem('postList') ? JSON.parse(localStorage.getItem('postList')) : [];
var storeList = localStorage.getItem('storeData') ? JSON.parse(localStorage.getItem('storeData')) : [];