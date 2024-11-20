ouputListCart();
cartlist = []
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
function addToCart(product) {
    cartlist = getCart()
    if (cartlist == null || cartlist == undefined) {
        cartlist = []
    }
    if (!isProductExistOnCart(product.name)) {
        const newProductInCart = {
            name: product.name,
            price: product.price,
            amount: 1,
        }
        cartlist.push(newProductInCart)
    }
    else {
        cartlist.map((_product) => {
            if (_product.name == product.name) {
                _product.amount += 1;
                if (_product.amount == product.amount) {
                    _product.amount = product.amount;
                    window.alert("amount Product Is reached to limited")
                }
            }
        })
    }
    localStorage.setItem("cart", JSON.stringify(cartlist))
}

function gotoCart() {
    window.location = "../cartList/cartList.html"
}
function getCart() {
    return JSON.parse(localStorage.getItem('cart'))
}
function isProductExistOnCart(name) {
    return cartlist.some((product) => product.name == name)
}
function getListProduct() {
    return JSON.parse(localStorage.getItem('listProduct'))
}
function backToCreateProduct() {
    window.location = "../createCart/createProductForm.html"
}
