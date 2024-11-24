let totalPrice = 0;
showListHistoryCart()
function showListHistoryCart() {
    let historyCart = getHistoryInAccountCookie();
    historyCart.history.forEach((products) => {
        const nameProductDOM = document.createElement("div");
        const amountProductDOM = document.createElement('div');
        const priceProductDOM = document.createElement("div");
        nameProductDOM.textContent = products.name;
        amountProductDOM.textContent = products.amount;
        priceProductDOM.textContent = products.price;
        totalPrice += products.amount * products.price;
        document.getElementById('nameProduct').appendChild(nameProductDOM);
        document.getElementById('amountProduct').appendChild(amountProductDOM);
        document.getElementById('priceProduct').appendChild(priceProductDOM);
        document.getElementById('totalPrice').innerHTML = totalPrice;
    });
}
function getAccountByCookie() {
    return JSON.parse(localStorage.getItem('userCookie'))
}
function getListAccount() {
    return JSON.parse(localStorage.getItem('accounts'))
}
function getHistoryInAccountCookie() {
    let listAccount = getListAccount();
    let accountCookie = getAccountByCookie();
    return listAccount.find((accounts) => accounts.username == accountCookie);
}
function backToCart() {
    window.location = "../cartListWebsite/cartListWebsite.html"
}