listAccount = [];
function Account(user, pass) {
    this.username = user;
    this.password = pass;
}
if (getUserAccount() != null) {
    initUserAccount()
    document.getElementById('buttonRegister').remove()

}
else {
    document.getElementById('buttonSave').remove()
}
function initUserAccount() {
    dataAccountEdit = getUserAccount();
    listAccount = getListAccount();
    document.getElementById('username').value = dataAccountEdit.username;
    document.getElementById('username').disabled = true;
    document.getElementById('password').value = dataAccountEdit.password;
    document.getElementById('confirmPassword').value = dataAccountEdit.password;
}
function saveButton() {
    userAccount = getUserAccount();
    listAccount = getListAccount();
    const password = document.getElementById('password').value;
    listAccount.map((elementValue) => {
        if (elementValue.username == userAccount.username) {
            elementValue.password = password;
            localStorage.removeItem("accountEdit")
            localStorage.setItem("accounts", JSON.stringify(listAccount))
            windowAlert("Edit Successed")
        }
    })

}

function registerAccount() {
    listAccount = getListAccount();
    if (listAccount == null) {
        listAccount = []
    }
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const account = new Account(username, password);
    if (!isUsernameOrPasswordEmpty(username, password)) {
        windowAlert("Username Or Password is Empty")
    }
    else if (isPassowrdAndConfirmPasswordTheSame(password, confirmPassword)) {
        windowAlert("Password and confirm password must the same ")
    }
    else if (checkExistAccount(username, password)) {
        windowAlert("this account is exsited")
    }
    else {
        listAccount.push(account);
        localStorage.setItem("accounts", JSON.stringify(listAccount))
        windowAlert("Account Created Successfully")
        window.location = "../loginWebsite/login.html"
    }
}

function isPassowrdAndConfirmPasswordTheSame(pass, confirm) {
    return (pass !== confirm)
}
function isUsernameOrPasswordEmpty(user, pass) {
    return (user !== '' || pass !== '')
}
function windowAlert(string) {
    window.alert(string);
}
function goLogin() {
    localStorage.removeItem('accountEdit')
    window.location = "../loginWebsite/login.html";
}
function getListAccount() {
    return JSON.parse(localStorage.getItem('accounts'));
}
function getUserAccount() {
    return JSON.parse(localStorage.getItem('accountEdit'));
}
function checkExistAccount(username) {
    return listAccount.some((account) => account.username == username)
}