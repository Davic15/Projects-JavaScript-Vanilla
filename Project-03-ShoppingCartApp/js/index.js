const btlLoginEl = document.getElementById("btn-login");
const txtUsernameEl = document.getElementById("username");
const textPasswordEl = document.getElementById("password");

btlLoginEl.addEventListener("click", loginSite);

function loginSite() {

    fetch(`https://fakestoreapi.com/users/1`)
        .then(res => {
            if(!res.ok) {
                throw Error ("Error in the server");
            } else {
                return res.json();
            }
        })
        .then(data => {
            console.log(data)
        })
    
        fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                username: "mor_2314",
                password: "83r5^_"
            })
        })
            .then(res=>res.json())
            .then(data=>console.log(data))
}
