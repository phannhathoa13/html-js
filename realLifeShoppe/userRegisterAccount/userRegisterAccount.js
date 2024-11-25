let listAccount = [];
function Account(username, password) {
    this.username = username;
    this.password = password;
    this.cart = [];
    this.voucher = [];
    this.error = 0;
    this.history = [];
}
function registerAccount() {
    listAccount = getAccountList();
    if (listAccount == null || listAccount == undefined) {
        listAccount = []
    }
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const account = new Account(username, password);
    listAccount.push(account);
    localStorage.setItem("accounts", JSON.stringify(listAccount));
    window.alert("created account successfully");
    window.location = "../userLoginAccount/userLoginAccount.html";


}
function getAccountList() {
    return JSON.parse(localStorage.getItem('accounts'));

}

