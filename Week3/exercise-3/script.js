$(document).ready(function () {
  $("#open-form").on("click", function () {
    $("#application-form").fadeIn();
    $("#open-form").hide();
  });

  $("#close-form").on("click", function () {
    $("#application-form").fadeOut();
    $("#open-form").show();
  });
});
