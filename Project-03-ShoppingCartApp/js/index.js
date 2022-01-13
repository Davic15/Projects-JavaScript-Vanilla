const btnLoginEl = document.getElementById("btn-login");
const txtUsernameEl = document.getElementById("username");
const txtPasswordEl = document.getElementById("password");
const txtStatusEl = document.getElementById("message");
let userData = {};
let userToken = 0;
let myRequest = "store.html";
let postData = {};


btnLoginEl.addEventListener("click", loginSite);
txtUsernameEl.addEventListener("keydown", focusPassword);
txtPasswordEl.addEventListener("keydown", focusButton);

/*
    
*/

function loginSite() {
    if (checkInput()) {
        sendRequest();
        userData = JSON.parse(localStorage.getItem("fake-store"));
        fetchLogin();
    }
}

function checkInput() {
    let flag = false;
    if (!txtUsernameEl.value || !txtPasswordEl.value){
        clearFields();
        flag = false;
    } else {
        txtStatusEl.textContent = "";
        flag = true;
    }
    return flag;
}

function clearFields() {
    txtStatusEl.textContent = "Type your Credentials before click login";
    txtUsernameEl.value = "";
    txtPasswordEl.value = "";
}

function checkCredentials() {
    let flag = false;
    if ((userData.username === txtUsernameEl.value) && (userData.password === txtPasswordEl.value)) {
        flag = true;
    } else {
        clearFields();
        flag = false;
    }
    return flag;
}

const fetchLogin = async () => {
    /*if (checkCredentials()) {
        postData = {
            method:'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: "johnd",
                password: "m38rmF$"
                })
            }
        

        
    }*/
    postData = {
        method:'POST',
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: {
            username: "johnd",
            password: "m38rmF$"
            }
        }
    try {
        console.log("aa")
        const res = await axios.post(`https://fakestoreapi.com/auth/login`, {postData});
        console.log(res);
            /*userToken = data.token;
            console.log(userToken)*/
            //window.location.href = myRequest;
    }
    catch (err) {
        console.error(err)
    }

}

//function fetchLogin() {
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
    
//}


const sendRequest = async () => {
    try {
        const res = await axios.get(`https://fakestoreapi.com/users/1`, {
            onDownloadProgress: function (progressEvent) {
                progressEvent.loaded ? txtStatusEl.textContent = "Done, redirecting" : txtStatusEl.textContent = "Trying to log in";
            }
        })
        localStorage.setItem("fake-store", JSON.stringify(res.data)); 
    } 
    catch (err) {
        console.error(err);
    }
}

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