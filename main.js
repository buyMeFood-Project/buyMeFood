document.querySelector('#search_btn').addEventListener("click", function(){
    var search_keyword = document.getElementById("search_input").value;
    localStorage.setItem('keyword', search_keyword);
});