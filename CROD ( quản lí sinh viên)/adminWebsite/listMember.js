listAccount = getAccountList();
banList = [];

createListAccountDom(listAccount)
function onInput(event) {
    const inputValue = event.target.value;
    const nameValue = listAccount.filter((user) => user.username.includes(inputValue))
    for (let index = 0; index < listAccount.length; index++) {
        const element = listAccount[index];
        document.getElementById(`username${index}`).remove()
        document.getElementById(`password${index}`).remove()
        document.getElementById(`user${index}`).remove()
        document.getElementById(`editButton${index}`).remove()
        document.getElementById(`toggleButton${index}`).remove()
        document.getElementById(`removeButton${index}`).remove()
    }
    if (inputValue) {
        createListAccountDom(nameValue);
    }
}
function createListAccountDom(accounts) {
    for (let index = 0; index < accounts.length; index++) {
        const element = accounts[index];
        const usernameDOM = document.createElement("div");
        const passwordDOM = document.createElement("div");
        const userDOM = document.createElement("div");
        usernameDOM.id = `username${index}`
        passwordDOM.id = `password${index}`
        userDOM.id = `user${index}`
        usernameDOM.textContent = element.username;
        passwordDOM.textContent = element.password;
        userDOM.textContent = index;
        const editButtonDOM = document.createElement("button");
        const toggleButtonDOM = document.createElement("button");
        const removeButtonDOM = document.createElement("button");
        editButtonDOM.id = `editButton${index}`
        toggleButtonDOM.id = `toggleButton${index}`
        removeButtonDOM.id = `removeButton${index}`
        editButtonDOM.textContent = 'edit';
        toggleButtonDOM.textContent = 'Ban';
        removeButtonDOM.textContent = 'remove';
        editButtonDOM.style = "display:block"
        toggleButtonDOM.style = "display:block"
        removeButtonDOM.style = "display:block";
        removeButtonDOM.onclick = () => { removeButton(index) }
        editButtonDOM.onclick = () => { editButton(accounts[index]) };
        toggleButtonDOM.onclick = () => { buttonChange(accounts[index], toggleButtonDOM, element.username) }
        document.getElementById('edit').appendChild(editButtonDOM);
        document.getElementById('delete').appendChild(removeButtonDOM);
        document.getElementById('changebutton').appendChild(toggleButtonDOM)
        document.getElementById('username').appendChild(usernameDOM)
        document.getElementById('password').appendChild(passwordDOM)
        document.getElementById('user').appendChild(userDOM);
        if (isAccountExistInBanList(element.username)) {
            toggleButtonDOM.textContent = "Unban"
        }
        else {
            toggleButtonDOM.textContent = "Ban"
        }
        document.getElementById('changebutton').appendChild(toggleButtonDOM);
    }
}
function buttonChange(account, buttonBanChange, username) {
    if (buttonBanChange.innerText === "Ban") {
        if (!isAccountExistInBanList(username)) {
            banList.push(account)
            localStorage.setItem("ban", JSON.stringify(banList));
            buttonBanChange.innerText = "Unban"
        }
    }
    else {
        if (isAccountExistInBanList(username)) {
            let banlist = getBanList();
            for (let index = 0; index < banlist.length; index++) {
                const element = banlist[index];
                if (element.username == username) {
                    banlist.splice(index, 1)
                }
            }
            localStorage.setItem("ban", JSON.stringify(banlist))
            buttonBanChange.innerText = "Ban"
        }
    }
}
function getAccountList() { // return value in localStorage
    return JSON.parse(localStorage.getItem('accounts'));
}
function getBanList() {
    if (JSON.parse(localStorage.getItem('ban')) != null) {
        return JSON.parse(localStorage.getItem('ban'))
    }
    else {
        return []
    }

}

function backToLogin() {
    window.location = "../loginWebsite/login.html";
}
function editButton(account) {
    localStorage.setItem("accountEdit", JSON.stringify(account))
    window.location = "../registerWebsite/register.html";
}
function removeButton(index) {
    document.getElementById(`username${index}`).remove()
    document.getElementById(`password${index}`).remove()
    document.getElementById(`user${index}`).remove()
    document.getElementById(`editButton${index}`).remove()
    document.getElementById(`toggleButton${index}`).remove()
    document.getElementById(`removeButton${index}`).remove()
    listAccount.splice(index, 1);
    localStorage.setItem("accounts", JSON.stringify(listAccount));
}
// function banButton(account) {
//     banList.push(account)
//     localStorage.setItem("ban", JSON.stringify(banList));
// }
// function unbanButton(username) {
//     if (isAccountExistInBanList(username)) {
//         let banlist = getBanList();
//         for (let index = 0; index < banlist.length; index++) {
//             const element = banlist[index];
//             if (element.username == username) {
//                 banlist.splice(index, 1)
//             }
//         }
//         localStorage.setItem("ban", JSON.stringify(banlist))
//         console.log("Exist");
//     }
//     else {
//         console.log("NOT in ban list");
//     }
// }
function isAccountExistInBanList(username) {
    let banList = getBanList();
    if (banList.length != 0) {
        return banList.some((element => element.username == username))
    }
    else {
        return false
    }

}

