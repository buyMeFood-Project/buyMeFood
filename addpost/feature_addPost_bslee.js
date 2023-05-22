import { alertModalControl, confirmModalControl } from "../alertModal/modal.js";
let imgList = [];

$(function() {
  $("#modalContainer").load("../alertModal/modal.html");
});

// Image upload 및 preview 표시
$("input[type=file]").on("change", function(event) {
  var containerId = $(this).parent().attr("id");
  var imageContainer = $("#" + containerId + " > div[id^=image_container]");
  var file = event.target.files[0];
  var fileSizeInBytes = file.size;
  var maxSizeInBytes = 500 * 1024; // 500KB

  if (fileSizeInBytes > maxSizeInBytes) {
    alertModalControl("이미지 용량은 최대 500KB를 초과할 수 없습니다.");
    $(this).val("");
    return;
  }
  else{
    var reader = new FileReader();

    reader.onload = function(event) {
      var uploadedImg = event.target.result;
      var img = $("<img>").attr("src", uploadedImg);
      var img_style = 'width:70%;height:70%;z-index:none';
      img.attr("style", img_style);
      imageContainer.empty().append(img);
      imgList.push(uploadedImg);
    };

    reader.readAsDataURL(file);
  }
});

// Generate an unique token for post identification
function generateToken(length) {
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


// 게시글 등록
$('#submit1').click(function(event){
  event.preventDefault();
  if(validationCheck()){
    confirmModalControl("게시글을 등록하시겠습니까?", '../post/post.html', function(result){
      if(result){
        let newPost = {
          author: "임시",
          storeName: $("#storeName").val(),
          rate: $('input[name="stars"]:checked').val(),
          content: $("#content").val(),
          imageList: imgList,
          likes:[],
          comments:[],
          date:new Date().toJSON().slice(0, 10),
          postToken: generateToken(10)
        };
        let postList = localStorage.getItem("postList") ? JSON.parse(localStorage.getItem("postList")) : [];
        postList.push(newPost);
        localStorage.setItem("postList", JSON.stringify(postList));
      }
    });
  }
});

function validationCheck(){
  var isAnyChecked = $(".star-rating input[type='radio']:checked").length > 0;
  let isOkay = true;
  if($('#storeName').val() === ''){
    isOkay = false;
    alertModalControl("가게명을 입력해주세요.");
  }
  else if(!isAnyChecked){
    isOkay = false;
    alertModalControl("별점을 선택해주세요.");
  }
  else if($('#content').val() === ''){
    isOkay = false;
    alertModalControl("게시글 내용을 입력해주세요.");
  }

return isOkay;
}

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