const btnLoginEl = document.getElementById("btn-login");
const txtUsernameEl = document.getElementById("username");
const txtPasswordEl = document.getElementById("password");
const txtStatusEl = document.getElementById("message");
const API_URL = "https://fakestoreapi.com"
let userData = {};
let userToken = 0;
let myRequest = "store.html";
let postData = {};

btnLoginEl.addEventListener("click", loginSite);
//txtUsernameEl.addEventListener("keydown", focusPassword);
//txtPasswordEl.addEventListener("keydown", focusButton);

function loginSite() {
    if (checkCredentials() && checkValues()) {
        let data = fetchLogin();
        if (data) {
            window.location.href = myRequest;
        }
    } else {
        clearValues()
    }
}

function checkCredentials() {
    let flag = false;
    if(!txtUsernameEl.value || !txtPasswordEl.value) {
        txtStatusEl.textContent = "Type your credentials"
        flag = false;
    } else {
        txtStatusEl.textContent = "Loading..."
        flag = true;
    }
    return flag;
}

function checkValues() {
    let flag = false;
    if(txtUsernameEl.value != "mor_2314" && txtPasswordEl.value != "83r5^_") {
        txtStatusEl.textContent = "Username and/or Password are not correct";
        flag = false;
    } else {
        txtStatusEl.textContent = "Loading..."
        flag = true;
    }
    return flag;
}

function clearValues() {
    txtUsernameEl.value = "";
    txtPasswordEl.value = "";
}

async function fetchLogin() {
    postData = {
        method:'POST',
        mode: 'cors', 
        'content-type': 'application/json', 
        accept: 'application/json',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            username: 'mor_2314',
            password: '83r5^_'
        })
    }
    let res = await fetch(`${API_URL}/auth/login`, postData)
    if (!res.ok) {
        throw Error(`HTTP error! status: ${res.status}`);
    }
    let data = await res.json();
    return data;
}

async function getUser()  {
    const res = await fetch("https://fakestoreapi.com/users/2")
    const data = await res.json();
    localStorage.setItem("fake", JSON.stringify(data))
}

getUser()
