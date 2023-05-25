window.onload = function(){
    document.querySelector('#search_btn').addEventListener("click", function(){
        var search_keyword = document.getElementById("search_input").value;
        localStorage.setItem('search_keyword', search_keyword);
    });
}