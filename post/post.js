import { alertModalControl, confirmModalControl} from "../alertModal/modal.js";

$(function() {
    $("#modalContainer").load("../alertModal/modal.html");
    $('#GNB').load('../gnb/gnb.html');
    $('#footer').load('../footer/footer.html');
});

let tokenList = JSON.parse(localStorage.getItem('tokenList'));
let postList = JSON.parse(localStorage.getItem('postList'));
let postCurrPage = localStorage.getItem('postCurrPage');
localStorage.setItem('currUser', 'tmpUser');

if(postCurrPage === null){
    localStorage.setItem('postCurrPage', "1");
}
if(tokenList === null){
    tokenList = [];
    localStorage.setItem('tokenList', JSON.stringify(tokenList));
}

// load posts from postList
if(postList != null){
    let pagingArea = "";
    let currPage = parseInt(localStorage.getItem('postCurrPage'));
    let limit = postList.length < currPage * 3 ? postList.length : currPage * 3;

    for(let k = 1; k <= Math.ceil(postList.length/3); k++){
        pagingArea += '<button type="button" class="pages" value="' + String(k) + '">' + String(k) + '</button>';
    }
    $('#pagination').html(pagingArea);
    
    for(let i = (currPage-1) * 3; i < limit; i++){
        let postToken = postList[i].postToken;
        let imgList = postList[i].imageList;
        let imgSrc = generateImages(imgList);
        
        let targetPost = $('#post'+String(i%3 + 1));
        targetPost.css('display', '');
        targetPost.find('#storeName').html(postList[i].storeName);
        targetPost.find('#info').html(postList[i].author + " " 
                                    + postList[i].date + " ⭐" 
                                    + postList[i].rate);
        targetPost.find('#content').html(postList[i].content);
        targetPost.find('#images').html(imgSrc);
        targetPost.find('.replyBtn').attr('name', postToken);
        targetPost.find('#likeCounts').html(postList[i].likes.length);
        targetPost.find('#replyCounts').html(postList[i].comments.length);
        targetPost.find('.likeBtn, .replyBtn, .newComment').each(function(){
            $(this).attr('name', postToken);
        })
        targetPost.find('.commentArea').attr('id', postToken);
    }
}
else{
    $('#postArea').html("<div><p> 등록된 게시글이 없습니다.</p></div>");
}

// Like Button
$(".likeBtn").click(function() {
    let token = $(this).attr('name');
    let postList = JSON.parse(localStorage.getItem('postList'));
    let currUser = localStorage.getItem('currUser');
    
    for(let post of postList){
        if(post.postToken === token && !post.likes.includes(currUser)){
            post.likes.push(currUser);
            $(this).parent().find('#likeCounts').html(post.likes.length);
            localStorage.setItem('postList', JSON.stringify(postList));
        }
    }
});

// Show & Hide Comment Area Button
$(".replyBtn").click(function() {
    let token = $(this).attr('name');
    let content = $("#" + token);
    $(this).parent().parent().find('#comment').html(displayComments(token));
    content.toggle();
});

// Add New Comment Button
$(".newComment").click(function() {
    let token = $(this).attr('name');
    let userName = localStorage.getItem('currUser');
    let comment = $(this).parent().find('#newReply').val();
    let postList = JSON.parse(localStorage.getItem('postList'));
    
    if(comment === ''){
        alertModalControl("댓글을 작성한 후 등록해주세요.");
    }
    else{
        for(let post of postList){
            if(post.postToken === token){
                post.comments.push({
                    writer: userName,
                    comment: comment
                });
                $(this).parent().parent().find('#replyCounts').html(post.comments.length);
                localStorage.setItem('postList', JSON.stringify(postList));
                break;
            }
        }
        $(this).parent().find('#comment').html(displayComments(token));
        $(this).parent().find('#newReply').val('');
    }
});

// Pagination
$(".pages").click(function(){
    let currPage = parseInt(localStorage.getItem('postCurrPage'));
    let clickedPage = $(this).attr('value');
    if(clickedPage === "prePage"){
        if(currPage !== 1){
            localStorage.setItem('postCurrPage', String(currPage - 1));
        }
    }
    else if(clickedPage === "nextPage"){
        if(currPage !== Math.ceil(postList.length/3)){
            localStorage.setItem('postCurrPage', String(currPage + 1));
        }
    }
    else{
        localStorage.setItem('postCurrPage', clickedPage);
    }
    window.location.reload();
});

function generateImages(imgList){
    let retVal = "";
    for(let img of imgList){
        retVal += "<img src=" + img + " alt=이미지>";
    }
    return retVal;
}

function displayComments(token){
    let retVal  = "";
    let postList = JSON.parse(localStorage.getItem('postList'));
    
    for(let post of postList){
        if(post.postToken === token){
            for(let comment of post.comments){
                retVal += "<li>" + comment.writer + ": " + comment.comment + "</li>";
            }
            break;
        }
    }
    return retVal;
}

$('#addPost').click(function (){
    window.location.href = "../addpost/feature_addPost_bslee.html";
});