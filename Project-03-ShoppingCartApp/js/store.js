const userData = JSON.parse(localStorage.getItem("fake"));
const userSpanEl = document.getElementById("user");
const divEl = document.getElementById("main");
const spanEl = document.getElementById("cart-element")
let arrayProducts = [];

userSpanEl.textContent = userData.name.firstname.toUpperCase() + " " + userData.name.lastname.toUpperCase()

async function getProducts()  {
    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json();
    arrayProducts = data;
    localStorage.setItem("fake-products", JSON.stringify(data))
}

async function getCart() {
    const res = await fetch("https://fakestoreapi.com/carts/user/1");
    const data = await res.json();
    spanEl.textContent = data[0].products.length;
    localStorage.setItem("fake-cart", JSON.stringify(data))
}

function loadData() {
    setTimeout(getProducts(), 100);
    setTimeout(loadProducts, 1000)
    setTimeout(getCart, 1000)
}

function loadProducts() {
    for (let element of arrayProducts) {
        divEl.innerHTML += `
        <div class="card">
            <div class="card-header">
                <img class="card-img" src="${element.image}" alt="${element.title}">
            </div>
            <div class="container">
                <h4><b>${element.title}</b></h4> 
                <p>Price: $${element.price}</p> 
                <p>Rate: ${element.rating.rate}</p>
            </div>
        </div>
        `;
    }
}

loadData();