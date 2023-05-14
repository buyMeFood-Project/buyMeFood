function feature_addPost_bslee(){
    let newPost = {
        storeName:document.getElementById("storeName").value,
        stars:document.getElementById("stars").value,
        content:document.getElementById("content").value,
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