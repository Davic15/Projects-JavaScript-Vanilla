const btnLoginEl = document.getElementById("btn-login");
const txtUsernameEl = document.getElementById("username");
const txtPasswordEl = document.getElementById("password");
const txtStatusEl = document.getElementById("message");
let userData = {};
let userToken = 0;
var myRequest = "store.html";

btnLoginEl.addEventListener("click", loginSite);
txtUsernameEl.addEventListener("keydown", focusPassword);
txtPasswordEl.addEventListener("keydown", focusButton);

/*
    
*/

function focusButton(e) {
    if (e.key == "Enter") {
        btnLoginEl.focus();
    }
}

function focusPassword(e) {
    if (e.key == "Enter") {
        txtPasswordEl.focus();
    }
}

function loginSite() {
    if (checkInput()) {
        sendRequest();
        fetchLogin();
    }
}

function checkInput() {
    let flag = false;
    if (!txtUsernameEl.value || !txtPasswordEl.value){
        txtStatusEl.textContent = "Type your Credentials before click login";
        txtUsernameEl.value = "";
        txtPasswordEl.value = "";
        flag = false;
    } else {
        txtStatusEl.textContent = "";
        flag = true;
    }
    return flag;
}

function checkCredentials() {
    let flag = false;
    console.log("hi")
    if ((userData.username === txtUsernameEl.value) && (userData.password === txtPasswordEl.value)) {
        flag = true;
    } else {
        flag = false;
        txtStatusEl.textContent = "The credentials are not correct."
        txtUsernameEl.value = "";
        txtPasswordEl.value = "";
    }
    return flag;
}

function fetchLogin() {
   /* if (checkCredentials()) {
        console.log("entre")
        const response = await fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: "johnd",
                password: "m38rmF$"
                })
            })
            
        const data = await response.json();
        console.log(data)*/
/*
        .then(res => {
            if(!res.ok) {
                throw Error ("Error in the server");
            } else {
                return res.json();
            }
        })
        .then(data => {
            if (data) {
                userToken = data.token;
                console.log(userToken)
                //window.location.href = myRequest;
            } else {
                console.log("error");
            }
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }*/
    
}
/*
function fetchGetUser() {
    fetch(`https://fakestoreapi.com/users/1`)
        .then(res => {
            if(!res.ok) {
                throw Error("Error in the server");
            } else {
                return res.json();
            }
        })
        .then(data => {
            userData = data;
            localStorage.setItem("fake-store", JSON.stringify(data))
        })
        .catch(err => {
            console.log(err);
        })
    
}*/

const sendRequest = async () => {
    try {
        const res = await axios.get(`https://fakestoreapi.com/users/1`, {onDownloadProgress: function (e) {
            txtStatusEl.textContent = "Loading.."
            // Do whatever you want with the native progress event
        }})
        
        console.log(res.data)
        userData = res.data;
        localStorage.setItem("fake-store", JSON.stringify(res.data))
        
    } catch (err) {
        console.error(err);
    }
};
