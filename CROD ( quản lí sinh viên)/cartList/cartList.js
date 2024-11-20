let totalPrice = 0;
let count = 0;
let priceHistory = 0;
banlist = []
showCartList();
const voucherList = [
    { code: 'hoadeptrai', discount: 20 },
    { code: 'tandeptrai', discount: 90 },
    { code: 'datdeptrai', discount: 50 },
]
function showCartList() {
    let accountList = getAccount();
    cartList = getCart();
    if (cartList == null || cartList == undefined) {
        cartList = []
    }
    else {
        for (let index = 0; index < cartList.length; index++) {
            const element = cartList[index];
            const idDOM = document.createElement("div");
            const nameProductDOM = document.createElement("div");
            const amountProductDOM = document.createElement("div");
            const priceProductDOM = document.createElement("div");
            const totalPriceDOM = document.createElement("div");
            const removeItemDom = document.createElement("button");
            idDOM.id = `id${index}`;
            removeItemDom.style = "display:block";
            nameProductDOM.id = `name${index}`;
            amountProductDOM.id = `amount${index}`;
            priceProductDOM.id = `price${index}`;
            totalPriceDOM.id = `totalPrice${index}`;
            removeItemDom.id = `removeItem${index}`;
            idDOM.textContent = index;
            nameProductDOM.textContent = element.name;
            amountProductDOM.textContent = element.amount;
            priceProductDOM.textContent = element.price;
            totalPriceDOM.textContent = element.amount * element.price;
            removeItemDom.textContent = 'remove';
            removeItemDom.onclick = () => { removeItem(index) }
            totalPrice += element.amount * element.price;
            document.getElementById('id').appendChild(idDOM);
            document.getElementById('nameProduct').appendChild(nameProductDOM);
            document.getElementById('amountProduct').appendChild(amountProductDOM);
            document.getElementById('priceProduct').appendChild(priceProductDOM);
            document.getElementById('totalPrice').appendChild(totalPriceDOM)
            document.getElementById('totalPriceAllProduct').innerHTML = totalPrice;
            document.getElementById('removeItem').appendChild(removeItemDom);
        }
        for (let index = 0; index < accountList.length; index++) {
            const element = accountList[index];

        }
    }
}
function onPayment() {
    const listProduct = getListProduct();
    listProduct.map((product) => {
        const productInCart = getProductInCart(product.name)
        if (productInCart) {
            product.amount -= productInCart.amount;
        }
        else {
            return product
        }
    })
    localStorage.removeItem("cart")
    localStorage.setItem("listProduct", JSON.stringify(listProduct))
}
function searchVoucher(event) {
    let inputValue = event.target.value;
    let voucherName = voucherList.find((voucher) => voucher.code == inputValue);
    if (voucherName) {
        let priceReduced = (totalPrice * voucherName.discount) / 100;
        let updatedPrice = totalPrice - priceReduced;
        document.getElementById('totalPriceAllProduct').innerHTML = updatedPrice;
        document.getElementById('discount').disabled = true;
        window.alert("You added voucher successfully");
    }
    if (inputValue != '' && !isVoucherExistOnVoucherList(inputValue)) {
        count++;
        window.alert("Voucher Didn't exist")
    }
    if (count == 5) {
        document.getElementById('discount').disabled = true;
        window.alert("You tried too much")
    }
}
function removeItem(index) {
    cartList = getCart();
    document.getElementById(`id${index}`).remove()
    document.getElementById(`name${index}`).remove()
    document.getElementById(`amount${index}`).remove()
    document.getElementById(`price${index}`).remove()
    document.getElementById(`totalPrice${index}`).remove()
    document.getElementById(`removeItem${index}`).remove()
    cartList.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(cartList))
    // chua xong
    // cartList.forEach((product) => {
    //     priceHistory += product.amount * product.price;
    // });
    // console.log(priceHistory);

}
function isVoucherExistOnVoucherList(name) {
    return voucherList.some((voucher) => voucher.code == name);
}
function getProductInCart(name) {
    return cartList.find((cart) => cart.name == name);
}
function getListProduct() {
    return JSON.parse(localStorage.getItem('listProduct'))
}
function getCart() {
    return JSON.parse(localStorage.getItem('cart'))
}
function getAccount() {
    return JSON.parse(localStorage.getItem('accounts'));
}
function isAccountExistInBanList(username) {
    return banlist.some((accounts) => accounts.username == username)
}