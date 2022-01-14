const userData = JSON.parse(localStorage.getItem("fake"));
const productsData = JSON.parse(localStorage.getItem("fake-products"));
const cartData = JSON.parse(localStorage.getItem("fake-cart"));
const userSpanEl = document.getElementById("user");
const btnEl = document.getElementById("btn")
const mainEl = document.getElementById("main");
const total = document.getElementById("total");
let totalCart = 0;

btnEl.addEventListener("click", payCart);
userSpanEl.textContent = userData.name.firstname.toUpperCase() + " " + userData.name.lastname.toUpperCase();

function payCart() {
    if (totalCart > 0) {
        mainEl.innerHTML = ""
        totalCart = 0;
        total.textContent = "Total = 0"
    } else {
        total.textContent = "Nothing to pay"
        window.location.href = "index.html";
        localStorage.clear();
    }

}

function displayCart() {
    for (let element of productsData) {
        for (let cart of cartData[0].products) {
            if(element.id == cart.productId) {
                fillDiv(cart.quantity, element.title, element.price, element.image);
                totalCart += element.price * cart.quantity;
            }

        }
    }
    total.textContent = `Total = ${totalCart}`;
}

displayCart();

function fillDiv(quantity, title, price, image) {
    mainEl.innerHTML += `
        <div class="container">
            <div class="image">
                <img src="${image}">
            </div>
            <div class="data">
                <p>${title}</p>
                <p>Price: $${price}</p>
                <p>Quantity: ${quantity}</p>
                <p>Total: ${price * quantity}</p>
            </div>
        </div>
        <hr>
    `;
}