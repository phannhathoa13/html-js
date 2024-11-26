
let listAccount = getListAccount();
let listChecked = [];
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

    let checkBoxContainer = document.getElementById('checkBox')
    let usernameContainer = document.getElementById('username');
    let checkBoxChild = checkBoxContainer.children;
    let usernameChild = usernameContainer.children;
    checkBoxChild.forEach((index) => {
        if (checkBoxChild[index].checked) {
            listChecked.push(searchUser);
        }
    })
}
// function displayVoucherStatus(event) {
//     let listAccount = getListAccount();
//     const inputVoucherValue = event.target.value;
//     let searchVoucherExist = listAccount
//         .filter((account) => account.voucher
//             .some((voucher) => voucher.code
//                 .includes(inputVoucherValue)))
//     removeCheckBoxAndUsernameDom(listAccount);
//     if (inputVoucherValue) {
//         createDOM(searchVoucherExist);
//     }
// }

function Voucher(code, discount) {
    this.code = code;
    this.discount = discount;
}
function addVoucherToAccount() {
    let listAccount = getListAccount();

    const voucher = document.getElementById('voucher').value;
    const discount = document.getElementById('discount').value;
    const voucherList = new Voucher(voucher, discount);

    let checkBoxContainer = document.getElementById('checkBox')
    let usernameContainer = document.getElementById('username');
    let checkBoxChild = checkBoxContainer.children;
    let usernameChild = usernameContainer.children;

    for (let index = 0; index < checkBoxChild.length; index++) {
        if (checkBoxChild[index].checked) {
            const username = usernameChild[index].textContent;
            let account = getVoucherFromAccount(username);
            if (account) {
                account.voucher.push(voucherList);
                listAccount = updatedListAccount(listAccount, account);
            }
        }
    }
    saveAccountToLocalStorage(listAccount);
}

function removeVoucher() {
    let listAccount = getListAccount();

    let checkBoxContainer = document.getElementById('checkBox')
    let usernameContainer = document.getElementById('username');
    let checkBoxChild = checkBoxContainer.children;
    let usernameChild = usernameContainer.children;

    const voucher = document.getElementById('voucher').value;

    for (let index = 0; index < checkBoxChild.length; index++) {
        if (checkBoxChild[index].checked) {
            let username = usernameChild[index].textContent;
            let account = getVoucherFromAccount(username);
            if (account) {
                let voucherToRemove = getCodeVoucherFromAccount(account, voucher);
                if (voucher == voucherToRemove.code) {
                    account.voucher.splice(voucherToRemove.code, 1);
                    listAccount = updatedListAccount(listAccount, account);
                }
            }
        }
    }
    saveAccountToLocalStorage(listAccount);
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

function removeCheckBoxAndUsernameDom(listAccount) {
    listAccount.forEach((accounts) => {
        document.getElementById(`username${accounts.username}`).remove();
        document.getElementById(`checkBox${accounts.username}`).remove();
    })
}
function updatedListAccount(listAccount, account) {
    return listAccount.map((_accounts) =>
        _accounts.username == account.username ? account : _accounts
    );
}

function saveAccountToLocalStorage(listAccount) {
    return localStorage.setItem("accounts", JSON.stringify(listAccount));
}

function getCodeVoucherFromAccount(account, inputVoucher) {
    return account.voucher.find((voucher) => voucher.code == inputVoucher);
}

function getVoucherFromAccount(usernames) {
    let listAccount = getListAccount();
    return listAccount.find((user) => user.username == usernames);
}

function getListAccount() {
    return JSON.parse(localStorage.getItem('accounts'));
}

function windowAlert(string) {
    window.alert(string);
}