function posting(){
    let newPost = {
        storeName: "새로운 가게",
        author: "새로운 작성자",
        star: "별점",
        content: "내용",
        date: new Date().toJSON().slice(0, 10),
        rate: 5.0,
        content: "새로운 게시글 내용입니다.",
        imageList:["https://mblogthumb-phinf.pstatic.net/MjAxOTA3MTBfMTgz/MDAxNTYyNzU0MDU0OTky.T1dRAwsb0c8Ysj9T-lYbPGnv65UXkiSFBsikpS_x-GIg.e147DzeIngeoOuTpsAZaLOuyzkmREUSDmwNrfDdTsUUg.JPEG.newtherock/6.jpg?type=w800",
                    "https://t1.daumcdn.net/cfile/tistory/99E39F4D5BE841E216",
                "https://t1.daumcdn.net/cfile/tistory/185CDD584D93EED220"],
        likeCount:0,
        replyCount:0
    }
    if(localStorage.getItem('postList') == null){
        if(localStorage.getItem('postList') == null){
            localStorage.setItem('postList', JSON.stringify([newPost]));
        }
    }
    else{
        let postList = JSON.parse(localStorage.getItem('postList'));
        postList.push(newPost);
        localStorage.setItem('postList', JSON.stringify(postList));
    }
    window.location.reload();
}