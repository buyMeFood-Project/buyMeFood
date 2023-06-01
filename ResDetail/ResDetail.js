import { alertModalControl } from "../alertModal/modal.js";
const selectedStore = JSON.parse(localStorage.getItem('selectedStoreInfo'));
let currUserInfo = null;
let currUser = localStorage.getItem('currUser');
let userList = JSON.parse(localStorage.getItem('userList'));
let isAdded = false;

$(document).ready(function () {
  $(function () {
    $("#GNB").load("../gnb/gnb.html");
    $("#footer").load("../footer/footer.html");  
    $('#modalContainer').load("../alertModal/modal.html");
  });
  $(".heart_icon").click(function () {
    if(!currUser){
      alertModalControl("로그인 후 이용해주세요.");
    }
  });
  
  if(userList){
    for(let each of userList){
      if(each.userid === currUser){
        currUserInfo = each;
        if(currUserInfo.mystore.includes(selectedStore.storeName)){
          $(".heart_icon").text("♥");
          isAdded = true;
          break;
        }
      }
    }


    $(".heart_icon").click(function () {
      if(isAdded){
        $(".heart_icon").text("♡");
        $("#Like").css("color","black");
        let storeIdx = currUserInfo.mystore.indexOf(selectedStore.storeName);
        currUserInfo.mystore.splice(storeIdx, 1);
        isAdded = false;
      }
      else{
        $(".heart_icon").text("♥");
        $("#Like").css("color","#FA914B");
        currUserInfo.mystore.push(selectedStore.storeName);
        isAdded = true;
      }
      localStorage.setItem('userList', JSON.stringify(userList));
    });
  }

  let resImages = "";
  if(selectedStore.images.length < 5){  
    for(let img of selectedStore.images){
      resImages += "<img id='ex' src='" + img +"'/>\n";
    }
  }
  else{
    for(let idx = 0; idx < 5; idx++){
      resImages += "<img id='ex' src='" + selectedStore.images[idx] +"'/>\n";
    }
  }
  $('#map').attr("src", selectedStore.mapLink);
  $('#resImage').html(resImages);
  $('.restaurant_name').text(selectedStore.storeName);
  if(selectedStore.rate !== "평가중"){
    $('.Score').text('⭐' + selectedStore.rate.substring(0, selectedStore.rate.length-2));
  }
  else{
    $('.Score').text('⭐' + selectedStore.rate);
  }
  $('#address').text(selectedStore.address);
  $('#contact').text(selectedStore.contact);
  $('#menu').text(selectedStore.menu);
  $('#parking').text(selectedStore.parking);
$('#moreInfo').html('<a href="'+ selectedStore.storeLink + '" target="blank" style="color:#FA914B">자세히 보기</a>');
});

$(window).on('unload', function() {
      localStorage.removeItem('currUser');
});