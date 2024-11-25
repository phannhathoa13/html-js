let totalPrice = 0;
const voucherList = [
    { code: "hoadeptrai", discount: 50 },
    { code: "tandeptrai", discount: 90 },
    { code: "datdeptrai", discount: 30 },
]
let remainingTime = 0;
showCartList()
function showCartList() {
    let cartInAccountByCookie = getAccountCookie()
    cartInAccountByCookie.cart.forEach((products) => {
        updateAmountProductInCart();
        const productNameDOM = document.createElement("div");
        const productAmountDOM = document.createElement("div");
        const productPriceDOM = document.createElement("div");
        const productTotalPriceDOM = document.createElement("div");
        productNameDOM.textContent = products.name;
        productAmountDOM.textContent = products.amount;
        productPriceDOM.textContent = products.price;
        productTotalPriceDOM.textContent = products.amount * products.price;
        totalPrice += products.amount * products.price;
        document.getElementById('nameProduct').appendChild(productNameDOM);
        document.getElementById('amountProduct').appendChild(productAmountDOM);
        document.getElementById('priceProduct').appendChild(productPriceDOM);
        document.getElementById('totalPrice').appendChild(productTotalPriceDOM);
        document.getElementById('totalPriceAllProduct').innerHTML = totalPrice;
    });
}
function onPayment() {
    let listProduct = getListProduct();
    let listAccount = getListAccount();
    let cartInAccountByCookie = getAccountCookie()
    listProduct.map((products) => {
        let productInAccountCookie = productInAccountByCookie(products.name)
        if (productInAccountCookie) {
            products.amount = products.amount - productInAccountCookie.amount;
            cartInAccountByCookie.history.push(productInAccountCookie)
        }
        return products;
    })
    localStorage.setItem("listProduct", JSON.stringify(listProduct))
    listAccount = listAccount.map((account) => {
        if (account.username == cartInAccountByCookie.username) {
            cartInAccountByCookie.cart = [];
            return cartInAccountByCookie;
        }
        else {
            return account;
        }
    })
    setAccountsToLocalStorage(listAccount);
    window.alert("Paymnet successed")
}
function updateAmountProductInCart() {
    let accountCookie = getAccountCookie()
    let listAccount = getListAccount();
    let listProduct = getListProduct();
    listProduct.forEach((products) => {
        accountCookie.cart.map((_products) => {
            if (products.name == _products.name) {
                if (products.amount == 0) {
                    _products.amount = 0;
                    window.alert("Your cart has changed")
                }
            }
            return _products;
        })
    });
    listAccount = updatedListAccount(listAccount, accountCookie)
    setAccountsToLocalStorage(listAccount);
}

function searchVoucher() {
    const inputValue = document.getElementById('discount').value
    let accountByCookie = getAccountCookie();
    let listAccount = getListAccount();
    let listVoucher = voucherList.find((voucher) => voucher.code == inputValue)
    if (accountByCookie.error >= 5) {
        window.alert("you tried over 5 times, please trya agian after 5minutes")
        document.getElementById('discount').disabled = true;
        settimeInterval(30);
        return;
    }
    if (!listVoucher) {
        accountByCookie.error += 1;
        window.alert("Wrong voucher, try agian");
    }
    else {
        let discountedPrice = (totalPrice * listVoucher.discount) / 100;
        document.getElementById('totalPriceAllProduct').innerHTML = discountedPrice;
        window.alert("discounted Price");
    }
    listAccount = updatedListAccount(listAccount, accountByCookie);
    setAccountsToLocalStorage(listAccount)
}
function updateTimer(remainingTime) {
    let timer = document.getElementById('timer')
    let minutes = Math.floor(remainingTime / 60);
    let second = remainingTime % 60;
    timer.textContent = `Thời gian còn lại: ${minutes} phút ${second} giây`;
}
function settimeInterval(remainingTime) {
    const timeInterval = setInterval(() => {
        updateTimer(remainingTime)
        remainingTime--;
        if (remainingTime < 0) {
            clearInterval(timeInterval);
            document.getElementById('discount').disabled = false;
            timer.textContent = "Please try again"
        }
    }, 1000)
}
function setAccountsToLocalStorage(listAccount) {
    localStorage.setItem("accounts", JSON.stringify(listAccount));
}
function updatedListAccount(listAccount, accountByCookie) {
    return listAccount.map((accounts) =>
        accounts.username == accountByCookie.username ? accountByCookie : accounts
    );
}
function goToHistoryPayment() {
    window.location = "../historyPayment/historyPayment.html"
}
function backToShopProduct() {
    window.location = "../shopProduct/shopProduct.html"
}
function productInAccountByCookie(name) {
    let cartInAccountByCookie = getAccountCookie();
    return cartInAccountByCookie.cart.find((products) => products.name == name)
}
function getAccountCookie() {
    let accountByCookie = getAccountByCookie();
    let listAccount = getListAccount();
    return listAccount.find((account) => account.username == accountByCookie)
}
function getAccountByCookie() {
    return JSON.parse(localStorage.getItem('userCookie'));
}
function getListAccount() {
    return JSON.parse(localStorage.getItem('accounts'));
}
function getListProduct() {
    return JSON.parse(localStorage.getItem('listProduct'));
}
