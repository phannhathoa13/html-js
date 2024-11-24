function login() {
    listAccount = getAccountList();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (checkUsernameAndPassword(username, password, listAccount)) {
        let usernameList = []
        usernameList.push(username);
        localStorage.setItem("userCookie", JSON.stringify(usernameList));
        window.alert("Login Successed ");
        window.location = "../shopProduct/shopProduct.html";
    }
    else if (adminAccountShoppeCart(username, password)) {
        window.location = "../adminCreateProduct/adminCreateProduct.html"
    }
}
function checkUsernameAndPassword(user, pass, list) { // return boolean
    var flag = false;
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        if (user == element.username && pass == element.password) {
            flag = true;
        }
    }
    return flag;
}
// function adminAccount(user, pass) {
//     const adminAccount = {
//         username: "ADMIN",
//         password: "ADMIN",
//     }
//     return (user == adminAccount.username && pass == adminAccount.password);
// }
function adminAccountShoppeCart(user, pass) {
    const adminAccountCart = {
        username: "STAFF",
        password: "STAFF",
    }
    return (user == adminAccountCart.username && pass == adminAccountCart.password)
}
function getAccountList() { // return gia tri
    return JSON.parse(localStorage.getItem('accounts'));
}
function backToRegister() {
    window.location = "../userRegisterAccount/userRegisterAccount.html";
}