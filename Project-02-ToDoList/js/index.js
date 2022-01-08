const btnAddEl = document.getElementById("add-item");
const txtAddEl = document.getElementById("todo-item");
const ulElements = document.getElementById("list-elements");
const btnCompleteEl = document.getElementsByClassName("btn-complete");
const liElement = document.getElementsByClassName("list-item");

btnAddEl.addEventListener("click", addElementList);

function deleteElementList() {
    for (let element of liElement) {
        element.addEventListener("click", function() {
            element.parentNode.removeChild(element)
        })
    }
}

function addElementList() {
    if (txtAddEl.value) {
        ulElements.innerHTML += `
            <li class="list-item">
                <button id="btn-complete" class="btn btn-complete"><i class="fas fa-check"></i></button>
                <button id="btn-cancel" class="btn btn-cancel"><i class="fas fa-times"></i></button>
                ${txtAddEl.value}
            </li>
        `;
    }
    deleteElementList();
}
