function login() { // void
    listAccount = getAccountList();
    banlist = getBanList();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (!isUsernameOrPasswordEmpty(username, password)) {
        windowAlert("Username or Passowrd is empty!")
    }
    else if (adminAccount(username, password)) {
        window.location = "../adminWebsite/listMember.html";
    }
    else if (adminAccountShoppeCart(username, password)) {
        window.location = "../shoppeCarta/adminCart.html"
    }
    else if (!checkUsernameAndPassword(username, password, listAccount)) {
        windowAlert("The username or password is wrong, try again !")
    }
    else if (isAccountExistInBanList(username)) {
        windowAlert("Your account is banned")
    }
    else {
        windowAlert("Login Successed ")
    }
}
function getAccountList() { // return gia tri
    return JSON.parse(localStorage.getItem('accounts'));
}
function getBanList() {
    return JSON.parse(localStorage.getItem('ban'));
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
function isUsernameOrPasswordEmpty(user, pass) {
    return (user != '' && pass != '');
}
function windowAlert(string) {
    window.alert(string);
}
function backToRegister() {
    window.location = "../registerWebsite/register.html";
}
function adminAccount(user, pass) {
    const adminAccount = {
        username: "ADMIN",
        password: "ADMIN",
    }
    return (user == adminAccount.username && pass == adminAccount.password);
}
function adminAccountShoppeCart(user, pass) {
    const adminAccountCart = {
        username: "STAFF",
        password: "STAFF",
    }
    return (user == adminAccountCart.username && pass == adminAccountCart.password)
}
function isAccountExistInBanList(username) {
    return banlist.some((element) => element.username == username);
}


const number2 = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 11, 13, 41];


// Hàm kiểm tra số nguyên tố
function isPrime(num) {
    return (num % 2 == 1)
}
const primeNumbers = number2.filter(isPrime)
console.log(primeNumbers); // Kết quả mong muốn: [2, 3, 5, 7, 11, 13]




