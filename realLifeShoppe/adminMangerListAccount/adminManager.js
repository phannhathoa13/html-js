function Voucher(code, discount) {
    this.code = code;
    this.discount = discount;
}
let listAccount = getListAccount();
let listChecked = [];
createDOM(listAccount);

function searchUsername(event) {
    const inputUserNameValue = event.target.value;
    let searchUsername = listAccount.filter((accounts) => accounts.username.includes(inputUserNameValue));

    removeCheckBoxAndUsernameDom(listAccount);

    createDOM(searchUsername);

    savedCheckBox();
}

function statusVoucherInListAccount(event) {
    const inputVoucher = event.target.value;
    const isVoucherExistOnListAccount = listAccount.filter((account) => {
        return account.voucher.some((_voucher) => _voucher.code == inputVoucher)
    })
    removeCheckBoxAndUsernameDom(listAccount);

    const userNameContainer = document.getElementById('username');
    const checkBoxContainer = document.getElementById('checkBox');

    listAccount.forEach((account) => {
        const usernameDOM = document.createElement("div");
        const checkBoxDOM = document.createElement("input");
        checkBoxDOM.type = "checkbox";
        checkBoxDOM.style = "display: block"
        usernameDOM.textContent = account.username;
        const voucherInAccount = isVoucherExistOnListAccount
            .some((accountWithVoucher) => accountWithVoucher.username == account.username);
        if (voucherInAccount) {
            usernameDOM.style.backgroundColor = "red";
            usernameDOM.style.color = "white";
        }
        else {
            usernameDOM.style.backgroundColor = "green";
            usernameDOM.style.color = "white";
        }

        userNameContainer.appendChild(usernameDOM);
        checkBoxContainer.appendChild(checkBoxDOM);
    })

    savedCheckBox();
}

function isCheckBoxMarked(index) {
    isIndexExsitInCheckedList = listChecked.some((_index) => index === _index);
    if (!isIndexExsitInCheckedList) {
        listChecked.push(index);
    }
    else {
        listChecked = listChecked.filter((_index) => _index != index);
    }
}

function addVoucherToAccount() {
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
            let account = getAccountByUsername(username);
            if (account) {
                account.voucher.push(voucherList);
                listAccount = updatedListAccount(listAccount, account);
            }
        }
    }
    saveAccountToLocalStorage(listAccount);
}

function removeVoucher() {
    let checkBoxContainer = document.getElementById('checkBox')
    let usernameContainer = document.getElementById('username');
    let checkBoxChild = checkBoxContainer.children;
    let usernameChild = usernameContainer.children;

    const voucher = document.getElementById('voucher').value;

    for (let index = 0; index < checkBoxChild.length; index++) {
        if (checkBoxChild[index].checked) {
            let username = usernameChild[index].textContent;
            let account = getAccountByUsername(username);
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

function detailVoucherInAccount(username) {
    const voucherDetailDOM = document.getElementById('voucher-detail');
    voucherDetailDOM.textContent = "";
    const account = getAccountByUsername(username);
    const vouchersDetail = account.voucher
    if (vouchersDetail && vouchersDetail.length != 0) {
        vouchersDetail.forEach((_voucher) => {
            voucherString = `${_voucher.code} - ${_voucher.discount}`
            const voucherDetailTextDOM = document.createElement("p");
            voucherDetailTextDOM.textContent = voucherString;
            voucherDetailDOM.appendChild(voucherDetailTextDOM);
        })
    } else {
        console.log("test");
        const emptyVoucherDOM = document.createElement("p");
        emptyVoucherDOM.textContent = "deo co voucher";
        voucherDetailDOM.appendChild(emptyVoucherDOM)
    }

}
function createDOM(listAccount) {
    listAccount.forEach((account) => {
        const usernameDOM = document.createElement("div");
        const checkBoxDOM = document.createElement("input");
        checkBoxDOM.type = "checkbox";
        checkBoxDOM.style = "display: block"
        usernameDOM.id = `username${account.username}`;
        checkBoxDOM.id = `checkBox${account.username}`;
        usernameDOM.textContent = account.username;
        document.getElementById('username').appendChild(usernameDOM);
        document.getElementById('checkBox').appendChild(checkBoxDOM);
        checkBoxDOM.onclick = () => { isCheckBoxMarked(account.username) };
        usernameDOM.onclick = () => { detailVoucherInAccount(account.username) };
    });
}

function removeCheckBoxAndUsernameDom(listAccount) {
    listAccount.forEach((accounts) => {
        let usernameElement = document.getElementById(`username${accounts.username}`);
        let checkBoxElement = document.getElementById(`checkBox${accounts.username}`);
        if (usernameElement) {
            usernameElement.remove();
        }
        if (checkBoxElement) {
            checkBoxElement.remove();
        }
    })
}
function savedCheckBox() {
    let checkBoxChild = Array.from(document.getElementById('checkBox').children);
    let usernameChild = document.getElementById('username').children;
    checkBoxChild.forEach((checkBox, index) => {
        let username = usernameChild[index].textContent;
        if (listChecked.includes(username)) {
            checkBox.checked = true;
        }
        else {
            checkBox.checked = false;
        }
    })
}
function isVoucherExistOnListAccount(account, inputVoucher) {
    account.filter((_account) => {
        return _account.voucher.some((_voucher) => _voucher.code == inputVoucher)
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

function isVoucherExistedOnAccount(account, inputVoucher) {
    return account.voucher.some((_voucher) => _voucher.code == inputVoucher)
}
function getCodeVoucherFromAccount(account, inputVoucher) {
    return account.voucher.find((voucher) => voucher.code == inputVoucher);
}

function getAccountByUsername(usernames) {
    return listAccount.find((user) => user.username == usernames);
}

function getListAccount() {
    return JSON.parse(localStorage.getItem('accounts'));
}

function windowAlert(string) {
    window.alert(string);
}