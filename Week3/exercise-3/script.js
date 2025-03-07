$(document).ready(function () {
  $("#open-form").on("click", function () {
    $("#application-form").fadeIn();
    $("#open-form").hide();
  });

  $("#close-form").on("click", function () {
    $("#application-form").fadeOut();
    $("#open-form").show();
  });

  $("#job-form").validate({
    rules: {
      name: "required",
      "last-name": "required",
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        minlength: 10,
      },
      position: "required",
    },
    messages: {
      name: "İsminizi girin",
      "last-name": "Soyadınızı girin",
      email: {
        required: "Mail adresinizi girin",
        email: "Lütfen geçerli bir e-posta adresi girin",
      },
      phone: {
        required: "Telefon numaranızı girin",
        minlength: "Telefon numaranız en az 10 karakter olmalı",
      },
      position: "Başvuracağınız pozisyonu girin",
    },
    submitHandler: function (form) {
      $("<div id='success-message'>Başvurunuz başarıyla gönderildi</div>")
        .hide()
        .appendTo("body")
        .fadeIn()
        .delay(3000)
        .fadeOut(function () {
          $(this).remove();
        });

      // form.reset();

      $("#application-form").fadeOut();
      $("#open-form").show();
    },
  });

  $("#birthdate").datepicker({
    dateFormat: "dd-mm-yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "1950:2025",
  });

  $("#phone").mask("(999) 999-9999");
});
