const btnAddEl = document.getElementById("add-item");
const txtAddEl = document.getElementById("todo-item");
const ulElements = document.getElementById("list-elements");
const btnCompleteEl = document.getElementsByClassName("btn-complete");
const btnCancelEl = document.getElementsByClassName("btn-cancel");
const liElement = document.getElementsByClassName("list-item");

let c = 0;

btnAddEl.addEventListener("click", addElementList);



function addElementList() {
    if (txtAddEl.value) {
        ulElements.innerHTML += `
            <li class="list-item">
                <button id="btn-complete" class="btn btn-complete"><i class="fas fa-check"></i></button>
                <button id="btn-cancel" class="btn btn-cancel"><i class="fas fa-times"></i></button>
                ${txtAddEl.value}
            </li>
        `;
        c++;
    }
    console.log(btnCompleteEl)
    for (let element of btnCompleteEl) {
        element.addEventListener("click", function (e) {
            console.log(e.target)
            
        })
    }
    for (let element of btnCancelEl) {
        element.addEventListener("click", function (e) {
            console.log(this.parentNode.remove())
        })
    }
    
}
