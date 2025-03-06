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
    getProducts().then(response => {
        const products = response.products;

        if (Array.isArray(products)) {
            products.forEach(product => {
                $('#products').append(`
                    <div class="product">
                        <img class="clickable-image" src="${product.thumbnail}" data-url="${product.images[0]}" alt="Ürün">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="product-description">${product.description}</p>
                        <span class="product-price">${product.price}</span>
                        <div class="buttons">
                            <button class="buy">Satın al</button>
                            <button class="fav">Favorilere Ekle</button>
                        </div>
                    </div>`);
            });
        } else {
            console.error("Beklenen formatta veri alınamadı.");
        }
    }).catch(error => {
        console.error("Ürünleri yüklerken hata oluştu:", error);
    });
}

$(document).on('click', '.clickable-image', function (event) {
    let url = $(event.target).data('url');
    if (url) {
        window.open(url, '_blank');
    }
})