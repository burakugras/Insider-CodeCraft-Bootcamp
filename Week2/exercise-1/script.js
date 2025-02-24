const userInfo = {};

userInfo.name = prompt('Adınız nedir?');
console.log("Adınız : " + userInfo.name);
userInfo.age = prompt('Yaşınız nedir?');
console.log("Yaşınız : " + userInfo.age);
userInfo.profession = prompt('Mesleğiniz nedir?');
console.log("Mesleğiniz : " + userInfo.profession);

console.log("Kullanıcı Bilgileri : ", userInfo);

const cart = [];

const productCount = Number(prompt('Kaç adet ürün eklemek istersiniz?'));

for (let i = 0; i < productCount; i++) {
    let product = {};
    product.name = prompt('Sepete eklemek istediğiniz ürünün adı nedir?');
    console.log("Ürün adı : " + product.name);
    product.price = Number(prompt('Ürün fiyatı nedir?'));
    console.log("Ürün fiyatı : " + product.price);

    cart.push(product);

    console.log(`${product.name} ürünü sepete eklendi. Fiyat ${product.price} TL.`);
}

const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

console.log(`Sepetiniz : `, cart);
console.log(`Toplam Fiyat: ${totalPrice} TL`);

const removeProduct = () => {
    const productName = prompt('Silmek istediğiniz ürün hangisi?');

    const product = cart.find(product => product.name === productName);
    const productIndex = cart.indexOf(product);

    cart.splice(productIndex, 1);

    console.log(`Güncel sepetiniz : `, cart);

}

removeProduct();

