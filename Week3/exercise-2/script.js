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
                        <a href="${product.images[0]}" target="_blank">
                            <img src="${product.thumbnail}" alt="Ürün">
                        </a>
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p>${product.price}</p>
                        <button class="buy">Satın al</button>
                        <button class="fav">Favorilere Ekle</button>
                    </div>
                    `);
            });
        } else {
            console.error("Beklenen formatta veri alınamadı.");
        }
    }).catch(error => {
        console.error("Ürünleri yüklerken hata oluştu:", error);
    });
}
