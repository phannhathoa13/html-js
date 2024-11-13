
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
    if (!listAccount) {
        listAccount = []
    }
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const account = new Account(username, password);
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (!isUsernameOrPasswordEmpty(username, password)) {
        windowAlert("The username or password is empty")
    }
    else if (isPassowrdAndConfirmPasswordTheSame(password, confirmPassword)) {
        windowAlert("The password must the same confirmpassword");
    }
    else if (checkExistAccount(username)) {
        windowAlert("The username is exsited, try agian")
    }
    else {
        listAccount.push(account)
        localStorage.setItem("accounts", JSON.stringify(listAccount));
        window.alert("register Successed");
    }
}
function onclickSubmit() {
    const button = document.getElementById('buttonChange')
    if (button.innerHTML == "Register") {
        button.innerHTML = "Save"
    }
    else {
        button.innerHTML = "Register";
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