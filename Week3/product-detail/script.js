if (typeof jQuery == "undefined") {
  var script = document.createElement("script");
  script.src =
    "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
  document.head.appendChild(script);
  script.onload = runCode;
} else {
  runCode();
}

function runCode() {
  $("body").empty();
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .product-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
        }
        .product {
            background: #fff;
            border: 1px solid #ddd;
            padding: 15px;
            width: 200px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .product:hover {
            transform: scale(1.05);
            background: #e9e9e9;
        }
        .product h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
        }
        .product p {
            margin: 5px 0;
        }
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
        }
        .popup {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            max-width: 400px;
            width: 90%;
            position: relative;
        }
        .popup h3 {
            margin-top: 0;
        }
        .popup .close-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            font-size: 20px;
        }
    `
    )
    .appendTo("head");

  var container = $('<div class="product-container"></div>').appendTo("body");
  var popupOverlay = $('<div class="popup-overlay"></div>').appendTo("body");
  var popup = $('<div class="popup"></div>').appendTo(popupOverlay);
  var closeBtn = $('<div class="close-btn">X</div>').appendTo(popup);
  var popupContent = $('<div class="popup-content"></div>').appendTo(popup);

  $.getJSON("products.json", function (data) {
    $.each(data.products, function (index, product) {
      var prod = $('<div class="product"></div>');
      $("<h3>").text(product.title).appendTo(prod);
      $("<p>")
        .text("Fiyat: $" + product.price)
        .appendTo(prod);
      $("<img>")
        .attr("src", product.thumbnail)
        .css({ width: "100%", marginTop: "10px" })
        .appendTo(prod);

      prod.on("click", function () {
        let brandText = product.brand ? product.brand : "-";
        popupContent.html(
          "<h3>" +
          product.title +
          "</h3>" +
          "<p>" +
          product.description +
          "</p>" +
          "<p><strong>Fiyat:</strong> $" +
          product.price +
          "</p>" +
          "<p><strong>Marka:</strong> " +
          brandText +
          "</p>" +
          "<img src='" +
          product.thumbnail +
          "' style='width:100%; margin-top:10px;'>"
        );
        popupOverlay.fadeIn(300);
      });

      container.append(prod);
    });
  });

  closeBtn.on("click", function () {
    popupOverlay.fadeOut(300);
  });
  popupOverlay.on("click", function (e) {
    if (e.target === this) {
      popupOverlay.fadeOut(300);
    }
  });
}
