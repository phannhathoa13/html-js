listProductCart = [];
function cart(name, amount, price) {
    this.name = name;
    this.amount = amount;
    this.price = price;
}
function createProduct() {
    listProductCart = getListProductCart();
    if (listProductCart == null || listProductCart == undefined) {
        listProductCart = []
    }
    const nameProduct = document.getElementById('productName').value;
    const amountProduct = document.getElementById('productAmount').value;
    const priceProduct = document.getElementById('productPrice').value;
    const productCart = new cart(nameProduct, amountProduct, priceProduct)
    if (isProductNameOrAmountOrPriceEmpty(nameProduct, amountProduct, priceProduct)) {
        windowAlert("The product name or amount or price is empty")
    }
    else if (!isAmountOrPriceOverZero(amountProduct, priceProduct)) {
        windowAlert("The amount or price must over 0")
    }
    else {
        listProductCart.push(productCart)
        localStorage.setItem("listProduct", JSON.stringify(listProductCart))
    }
}
function isProductNameOrAmountOrPriceEmpty(name, amount, price) { // boolean
    return (name == '' || amount == '' || price == '')
}
function isAmountOrPriceOverZero(amount, price) {
    return (amount > 0 || price > 0)
}
function windowAlert(string) {
    window.alert(string);
}
function getListProductCart() {
    return (JSON.parse(localStorage.getItem('listProduct')))
}
function backToListProduct() {
    window.location = "../showListProduct/showListProduct.html"
}
function goToShowListProducts() {
    window.location = "../showListProduct/showListProduct.html"
}