import * as modalControl from "../alertModal/modal.js";
import * as commonFunc from "../commonFunc.js";

$(document).ready(function(){
  $("#modalContainer").load("../alertModal/modal.html");
  $('#GNB').load("../gnb/gnb.html");
  $('#footer').load("../footer/footer.html");
  let imgList = [];

  // Image upload 및 preview 표시
  $("input[type=file]").on("change", function(event) {
    var containerId = $(this).parent().attr("id");
    var imageContainer = $("#" + containerId + " > div[id^=image_container]");
    var container = $(this).parent();
    var imageDelete = container.find("input[type=button]");
    var file = event.target.files[0];
    var fileSizeInBytes = file.size;
    var maxSizeInBytes = 500 * 1024; // 500KB
    if (fileSizeInBytes > maxSizeInBytes) {
      modalControl.alertModalControl("이미지 용량은 최대 500KB를 초과할 수 없습니다.");
      $(this).val("");
      return;
    }
    else{
      var reader = new FileReader();
      reader.onload = function(event) {
        var uploadedImg = event.target.result;
        var img = $("<img>").attr("src", uploadedImg);
        var img_style = 'width:100%;height:100%;z-index:none';
        img.attr("style", img_style);
        imageContainer.empty().append(img);
        imgList.push(uploadedImg);
      };
      reader.readAsDataURL(file);
    }
    imageDelete.show(); // Show the button
  });

  // 게시글 등록
  $('#addPost').click(function(event){
    event.preventDefault();
    if(validationCheck()){
      modalControl.confirmModalControl("게시글을 등록하시겠습니까?", '../post/post.html', function(result){
        if(result){
          let postToken = commonFunc.generateToken(10);
          let newPost = {
            author: currUser,
            storeName: $("#storeName").val(),
            rate: $('input[name="stars"]:checked').val(),
            content: $("#content").val(),
            imageList: imgList,
            likes:[],
            comments:[],
            date: new Date().toJSON().slice(0, 10),
            postToken: postToken
          };
          postList.push(newPost);
          tokenList.push(postToken);
          localStorage.setItem("postList", JSON.stringify(postList));
          localStorage.setItem("tokenList", JSON.stringify(tokenList));
        
          let currUserInfo = commonFunc.getCurrUserInfo(currUser, userList);
          currUserInfo.mypost.push(postToken);
          localStorage.setItem('userList', JSON.stringify(userList));
        }
      });
    }
  });

  // Count number of letters in content area
  $("#content").on("input", function() {
    var inputText = $(this).val();
    var letterCount = 0;
    // Remove excess letters
    if (inputText.length > 100) {
      inputText = inputText.slice(0, 100);
      $(this).val(inputText);
    }
    if (inputText.trim() !== "") {
      letterCount = inputText.length;
    }
    $("#letterCount").text("글자 수: " + letterCount + "/100");
  });
  // remove excess letters of storename
  $('#storeName').on('input', function () {
      if ($(this).val().length > 20) {
          $(this).val($(this).val().slice(0, 20));
      }
  });
  
  // 게시글 삭제
  $('input[id^=del]').click(function(event){
    event.preventDefault();
    $(this).parent().find('div[id^=image_container] > img').remove();
    $(this).hide();
    imgList.splice(0, 1);
  });
});

function validationCheck(){
  var isAnyChecked = $(".star-rating input[type='radio']:checked").length > 0;
  let isOkay = true;
  if($('#storeName').val() === ''){
    isOkay = false;
    modalControl.alertModalControl("가게명을 입력해주세요.");
  }
  else if(!isAnyChecked){
    isOkay = false;
    modalControl.alertModalControl("별점을 선택해주세요.");
  }
  else if($('#content').val() === ''){
    isOkay = false;
    modalControl.alertModalControl("게시글 내용을 입력해주세요.");
  }
  return isOkay;
}