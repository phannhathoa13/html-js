showCartList();
function showCartList() {
    cartList = getCart();
    for (let index = 0; index < cartList.length; index++) {
        const element = cartList[index];
        const idDOM = document.createElement("div");
        const nameProductDOM = document.createElement("div");
        const amountProductDOM = document.createElement("div");
        const priceProductDOM = document.createElement("div");
        const totalPriceDOM = document.createElement("div");
        idDOM.textContent = index;
        nameProductDOM.textContent = element.name;
        amountProductDOM.textContent = element.amount;
        priceProductDOM.textContent = element.price;
        totalPriceDOM.textContent = element.amount * element.price;
        document.getElementById('id').appendChild(idDOM);
        document.getElementById('nameProduct').appendChild(nameProductDOM);
        document.getElementById('amountProduct').appendChild(amountProductDOM);
        document.getElementById('priceProduct').appendChild(priceProductDOM);
        document.getElementById('totalPrice').appendChild(totalPriceDOM)
    }
}
function onPayment() {
    listProduct = getListProduct();
    let cartList = getCart()
    const test = listProduct.map((product) => {
        if (isProductExistOnCart(product)) {
            return {
                ...product,
                amount: product.amount - cartList.amount
            }
        }

    })
    console.log(test);
}
function isProductExistOnCart(name) {
    return cartList.find((product) => product.name == name)
}
function getListProduct() {
    return JSON.parse(localStorage.getItem('listProduct'))
}
function getCart() {
    return JSON.parse(localStorage.getItem('cart'))
}