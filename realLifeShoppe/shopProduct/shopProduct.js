ouputListCart();
let listAcocunt = getListAccount();
function ouputListCart() {
    listProduct = getListProduct()
    if (listProduct == null || listProduct == undefined) {
        listProduct = []
    }
    else {
        for (let index = 0; index < listProduct.length; index++) {
            const product = listProduct[index];
            const idDOM = document.createElement("div")
            const nameProductDOM = document.createElement("div")
            const amountProductDOM = document.createElement("div")
            const priceProductDOM = document.createElement("div")
            const addProduct = document.createElement("button");
            addProduct.textContent = 'addToCart'
            addProduct.style = "display:block";
            idDOM.textContent = index;
            nameProductDOM.textContent = product.name;
            amountProductDOM.textContent = product.amount;
            priceProductDOM.textContent = "$" + product.price;
            addProduct.onclick = () => { addToCart(product) }
            document.getElementById('addProduct').appendChild(addProduct)
            document.getElementById('id').appendChild(idDOM)
            document.getElementById('nameProduct').appendChild(nameProductDOM)
            document.getElementById('amountProduct').appendChild(amountProductDOM)
            document.getElementById('priceProduct').appendChild(priceProductDOM)
        }
    }
}
function Product(name, price, amount) {
    this.name = name;
    this.price = price;
    this.amount = amount;
}
function addToCart(product) {
    let listAcocunt = getListAccount();
    let accountByCookie = getAccountInformationByCookie();
    if (!isProductExistOnCartAccount(product.name)) {
        let productInCartAccount = new Product(product.name, product.price, 1);
        accountByCookie.cart.push(productInCartAccount)
    }
    else {
        accountByCookie.cart.map((_product) => {
            if (_product.name == product.name) {
                _product.amount += 1;
                if (_product.amount > product.amount) {
                    _product.amount = product.amount
                    window.alert("You reached to limited amount of product")
                }
            }
        });
    }
    listAcocunt = listAcocunt.map((account) => {
        if (account.username == accountByCookie.username) {
            return accountByCookie;
        }
        return account;
    })
    localStorage.setItem("accounts", JSON.stringify(listAcocunt));
}
function getAccountInformationByCookie() {
    let usernameCookie = getUsernameCookies();
    return listAcocunt.find((account) => account.username == usernameCookie);
}
function getUsernameCookies() {
    return JSON.parse(localStorage.getItem('userCookie'));
}
function getListAccount() {
    return JSON.parse(localStorage.getItem('accounts'));
}
function isProductExistOnCartAccount(name) {
    let accountInformationByCookie = getAccountInformationByCookie();
    return accountInformationByCookie.cart.some((product) => product.name == name)
}
function gotoCart() {
    window.location = "../cartListWebsite/cartListWebsite.html"
}
function logOut() {
    localStorage.removeItem('userCookie');

    window.location = "../userLoginAccount/userLoginAccount.html"
}
function getCart() {
    return JSON.parse(localStorage.getItem('cart'))
}
function getListProduct() {
    return JSON.parse(localStorage.getItem('listProduct'))
}
function backToCreateProduct() {
    window.location = "../adminCreateProduct/adminCreateProduct.html"
}
