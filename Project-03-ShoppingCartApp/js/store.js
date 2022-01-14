const userData = JSON.parse(localStorage.getItem("fake"));
const userSpanEl = document.getElementById("user");
const divEl = document.getElementById("main")
let arrayProducts = [];

userSpanEl.textContent = userData.name.firstname.toUpperCase() + " " + userData.name.lastname.toUpperCase()

async function getProducts()  {
    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json();
    arrayProducts = data;
    return arrayProducts
}

function loadData() {
    getProducts();
    setTimeout(loadProducts, 1000)
}

function loadProducts() {
    console.log(arrayProducts)
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
        console.log(element.description)
    }
}

loadData();