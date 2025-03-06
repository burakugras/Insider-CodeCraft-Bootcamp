$(document).ready(function () {
    $('#load').click(loadProducts);
})

function getProducts() {
    return $.ajax({
        url: 'products.json',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log("Ürünler getirildi", response);
        },
        error: function (xhr, status, error) {
            console.log(error);
        },
        complete: function (xhr, status) {
            console.log("İşlem tamamlandı", status);
        },
        timeout: 6000,
        contentType: 'application/json',
    });
}

function loadProducts() {
    getProducts().then(products => {
        products.forEach(product => {
            $('#products').append(`
                <div class="product">
                    <img src="${product.image}"
                    alt="Ürün">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p>${product.price}</p>
                    <button class="buy">Satın al</button>
                    <button class="fav">Favorilere Ekle</button>
                </div>`)
        });
    }).catch(error => {
        console.log(error);
    })
}