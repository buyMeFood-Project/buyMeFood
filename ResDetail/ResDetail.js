$(function () {
  $("#GNB").load("../gnb/gnb.html");
  $("#footer").load("../footer/footer.html");
});

$(document).ready(function () {
  $(".heart_icon").click(function () {
    if ($(".heart_icon").text === "♥") {
      $(".heart_icon").text("♡");
    } else {
      $(".heart_icon").text("♥");
    }
  });
});
