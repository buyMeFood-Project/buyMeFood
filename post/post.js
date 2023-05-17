let tokenList = JSON.parse(localStorage.getItem('tokenList'));
let postList = JSON.parse(localStorage.getItem('postList'));
let postCurrPage = localStorage.getItem('postCurrPage');

if(postCurrPage === null){
    localStorage.setItem('postCurrPage', "1");
}
if(tokenList === null){
    tokenList = [];
    localStorage.setItem('tokenList', JSON.stringify(tokenList));
}

// load posts from postList
if(postList != null){
    let postArea = "";
    let pagingArea = "";
    let currPage = parseInt(localStorage.getItem('postCurrPage'));
    
    let limit = postList.length < currPage * 3 ? postList.length : currPage * 3;
    for(let k = 1; k <= Math.ceil(postList.length/3); k++){
        pagingArea += '<button type="button" class="pages" value="' + String(k) + '">' + String(k) + '</button>';
    }
    $('#pagination').html(pagingArea);

    for(let i = (currPage-1) * 3; i < limit; i++){
        let postToken = postList[i].postToken;
        let storeName = postList[i].storeName;
        let author = postList[i].author;
        let date = postList[i].date;
        let rate = String(postList[i].rate);
        let content = postList[i].content;
        let imgList = postList[i].imageList;
        let likeCount = String(postList[i].likeCount);
        let commentList = postList[i].comments;

        let imgSrc = ""
        let comment = "";
        for(let j = 0; j < imgList.length; j++){
            imgSrc += "<img style=\"width:60px;height:60px;\"src=" + imgList[j] + " alt=이미지"+String(j+1)+"> "
        }
        for(let k = 0; k < commentList.length; k++){
            let each = commentList[k];
            comment += "<li>" + each.writer + ": " + each.comment + "</li>"
        }
        
        postArea += `
            <div class="post">    
                <form>
                    <p>${storeName}${i + 1}</p>
                    <p>${author}${i + 1} ${date} ★${rate}</p>
                    <p>${content}${i + 1}</p>
                    <span>${imgSrc}</span>
                    <br>
                    <span>
                        <button class="likeBtn" name="${postToken}">
                        <span>♡</span>
                        </button>
                        <h10 id="likeCounts">(${likeCount})</h10>
                        <button type="button" class="replyBtn" name="${postToken}">댓글</button>
                        <h10 id="replyCounts">(${commentList.length})</h10>
                    </span>
                    <div id="${postToken}" class="content">
                        <label for="newReply">댓글:</label>
                        <input type="text" id="newReply_${postToken}">
                        <button class="newComment" name="${postToken}" required>등록</button>
                        <ul>${comment}</ul>
                    </div>
                </form>
            </div>`;
    }
    $('#postArea').html(postArea);
}
else{
    $('#postArea').html("<div><p> 등록된 게시글이 없습니다.</p></div>");
}

// Like Button
$(".likeBtn").click(function() {
    let token = $(this).attr('name');
    let postList = JSON.parse(localStorage.getItem('postList'));
    
    for(let i = 0; i < postList.length; i++){
        if(postList[i].postToken === token){
            postList[i].likeCount += 1;
            localStorage.setItem('postList', JSON.stringify(postList));
            break;
        }
    }
});

// Show & Hide Comment Area Button
$(".replyBtn").click(function() {
    let token = $(this).attr('name');
    let content = $("#" + token);
    content.toggle();
});

// Add New Comment Button
$(".newComment").click(function() {
    let token = $(this).attr('name');
    let userName = "tmp";
    let comment = $('#newReply_' + token).val();
    let postList = JSON.parse(localStorage.getItem('postList'));
    
    if(comment === ''){
        event.preventDefault();
        document.querySelector('#alertContent').innerHTML = "댓글을 작성한 후 등록해주세요.";
        document.querySelector('#myModal').style.display = 'block';
    }
    else{
        for(let i = 0; i < postList.length; i++){
            if(postList[i].postToken === token){
                postList[i].comments.push({
                    writer: userName,
                    comment: comment});
                localStorage.setItem('postList', JSON.stringify(postList));
                break;
            }
        }
    }
});

// Confirm btn function to close alert modal
document.querySelector('#confirm').addEventListener('click', function(){
    document.querySelector('#myModal').style.display = 'none';
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

// Post Button
function posting(){
    let randomToken = makeToken(10);
    while(1){
        if(tokenList.includes(randomToken)){
            randomToken = makeToken(10);
        }
        else{
            tokenList.push(randomToken); 
            break;    
        }
    }
    let newPost = {
        postToken: randomToken, 
        storeName: "새로운 가게",
        author: "새로운 작성자",
        date: new Date().toJSON().slice(0, 10),
        rate: 5.0,
        content: "새로운 게시글 내용입니다.",
        imageList:["https://t1.daumcdn.net/cfile/tistory/99E39F4D5BE841E216",
                    "https://t1.daumcdn.net/cfile/tistory/99E39F4D5BE841E216",
                "https://t1.daumcdn.net/cfile/tistory/185CDD584D93EED220"],
        likeCount: 0,
        comments: []
    }
    localStorage.setItem('tokenList', JSON.stringify(tokenList));

    if(postList === null){
        localStorage.setItem('postList', JSON.stringify([newPost]));
    }
    else{
        postList = JSON.parse(localStorage.getItem('postList'));
        postList.push(newPost);
        localStorage.setItem('postList', JSON.stringify(postList));
    }
    window.location.reload();
}

// Generate an unique token for post identification
function makeToken(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}