
let listAccount = getListAccount();
showListAccount()
function Voucher(code, discount) {
    this.code = code;
    this.discount = discount;
}
function showListAccount() {
    let listAccount = getListAccount();
    createDOM(listAccount);
}
function searchUsername(event) {
    let listAccount = getListAccount();
    const inputvalue = event.target.value;
    let searchUser = listAccount.filter((user) => user.username.includes(inputvalue));
    listAccount.forEach((accounts) => {
        document.getElementById(`username${accounts.username}`).remove();
        document.getElementById(`checkBox${accounts.username}`).remove();
    })
    if (inputvalue) {
        createDOM(searchUser);
    }
}
function createDOM(listAccount) {
    listAccount.forEach((accounts) => {
        const usernameDOM = document.createElement("div");
        const checkBoxDOM = document.createElement("input");
        checkBoxDOM.type = "checkbox";
        checkBoxDOM.style = "display: block"
        usernameDOM.id = `username${accounts.username}`;
        checkBoxDOM.id = `checkBox${accounts.username}`;
        usernameDOM.textContent = accounts.username;
        document.getElementById('username').appendChild(usernameDOM);
        document.getElementById('checkBox').appendChild(checkBoxDOM);
    });
}

function addVoucherToAccount() {
    const voucherName = document.getElementById('voucher').value;
    const discount = document.getElementById('discount').value;
    const voucherList = new Voucher(voucherName, discount);
    const checkBoxContainer = document.getElementById('checkBox');
    const usernameContainer = document.getElementById('username');
    const checkBox = checkBoxContainer.children;
    const usernames = usernameContainer.children;
    for (let index = 0; index < checkBox.length; index++) {
        if (checkBox[index].checked) {
           const usernameDom = usernames[index].textContent;
           console.log(usernameDom);
           
        }
        
    }
}

function setAccountToLocalStorage(listAccount) {
    return localStorage.setItem('accounts', JSON.stringify(listAccount));
}
function isCheckBoxChecked(usernameID) {
    const username = document.getElementById(usernameID).textContent;
    return username;
}
function getVoucherFromAccount(usernameID) {
    let listAccount = getListAccount();
    return listAccount.find((user) => user.username == usernameID);
}
function isVoucherExistedOnAccount(voucherName) {
    return listAccount.some((_voucher) => _voucher.voucher == voucherName);
}
function getListAccount() {
    return JSON.parse(localStorage.getItem('accounts'));
}