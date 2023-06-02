import * as commonFunc from "../commonFunc.js";
$(document).ready(function(){  
    $('#GNB').load('../gnb/gnb.html');
    $('#footer').load('../footer/footer.html');

    let currUserInfo = commonFunc.getCurrUserInfo(currUser, userList);
    let postListContent = '';
    let likeListContent = '';

    const picker = new EmojiButton({
        position: 'top',
        rootElement: document.getElementById("emoji_btn_area") // user_emoji 요소를 picker의 위치로 지정
    });
    $("#emoji_btn").click(function(){
        picker.togglePicker("#emoji_btn");
    });
    picker.on('emoji', emoji => {
        $('#user_emoji').text(emoji);
    });

    $("#userId").text(currUserInfo.username);
    $("#user_emoji").text(currUserInfo.useremoji);

    $('#editbtn').click(function() {
        $('#edit_inform').css('display', "");
        $('#default').hide();
        $("#user_emoji").text(currUserInfo.useremoji);
        $('#edit_inform').find("#userId").val(currUserInfo.username);
    });

    $('#donebtn').click(function(event) {
        event.preventDefault();
        let editedName = $('#edit_inform').find('#userId').val();
        let editedEmoji = $('#user_emoji').text();
        if(editedName !== currUserInfo.username ||
            editedEmoji !== currUserInfo.useremoji) {       
                for(let each of userList){
                    if(each.username === currUser){
                        each.username = editedName;
                        each.useremoji = editedEmoji;
                        break;
                    }
                }
                sessionStorage.setItem('currUser', editedName);
                localStorage.setItem('userList', JSON.stringify(userList));
        }
        localStorage.removeItem('emojiPicker.recent');
        window.location.reload();
    });

    $('#myPost').click(function(){
        $('#myPostForm').css("display", "");
        $('#myStoreForm').hide();
    });
    $('#likeList').click(function(){
        $('#myStoreForm').css("display", "");
        $('#myPostForm').hide();
    });

    $('#postList').click(function(){
        $('#myPostForm').css("display", "");
        $('#myStoreForm').hide();
    });


    for(let myStore of currUserInfo.mystore){
        let currStore = null;
        for(let store of storeList){
            if(store.storeName === myStore){
                currStore = store;
                break;
            }
        }
        let tmpRate = currStore.rate;
        if(tmpRate !== "평가중"){
            tmpRate = tmpRate.substring(0, tmpRate.length - 2);
        }
        likeListContent += '<div class="like_shop">\
                                <div class="like_title" id="rest_name">'+currStore.storeName+'</div>\
                                <span class="start">⭐</span>\
                                <span class="like_rate" id="rest_rate">'+tmpRate+'</span>\
                                <div class="like_img" id="rest_img"><a href="../ResDetail/ResDetail.html" target="_blank"><img class="like_img" name="' + currStore.storeName + '"src="'+currStore.images[0]+'"></a></div>\
                            </div>';
    }
    $('#like_list').html(likeListContent);

    const imgUrl = '../img/ready_img.jpg';

    for(let myPost of currUserInfo.mypost){
        let currPost = null;
        for(let post of postList){
            if(post.postToken === myPost){
                currPost = post;
                break;
            }
        }
        postListContent += '<div class="mypost">\
        <img class="mypost_image" id="post_image" src="'+ (currPost.imageList[0] || imgUrl) +'"></img>\
        <div class="mypost_title" id="post_name">'+ currPost.storeName +'</div>\
        <span class="start">⭐</span>\
        <span class="mypost_rate" id="post_rate">'+currPost.rate +'</span>\
        <div class="mypost_content" id="post_content3">'+currPost.content+'</div>\
        </div>';
    }
    $('#mypost_list').html(postListContent);

    $('a').click(function(){
        let nameAttr = $(this).find('img').attr('name');
        let selectedStore = commonFunc.getStoreInfo(nameAttr, storeList);
        localStorage.setItem('selectedStoreInfo', JSON.stringify(selectedStore));
        localStorage.setItem('currUser', sessionStorage.getItem('currUser'));
    });
});