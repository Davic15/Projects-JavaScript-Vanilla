const btnAddEl = document.getElementById("add-item");
const txtAddEl = document.getElementById("todo-item");
const ulElements = document.getElementById("list-elements");
const btnCompleteEl = document.getElementsByClassName("btn-complete");
const btnCancelEl = document.getElementsByClassName("btn-cancel");
const liElement = document.getElementsByClassName("list-item");
const loadFromLocalStorage = JSON.parse(localStorage.getItem("todo"));

let doneCounter = 0;
let cancelCounter = 0;
let valuesToSave = {}
let array = [];
let token = 0;

btnAddEl.addEventListener("click", addElementList);
//localStorage.clear()

function createToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function addElementList() {
    if (txtAddEl.value) {
        token = createToken();
        ulElements.innerHTML += `
            <li class="list-item" data-token="${token}">
                <button id="btn-complete" class="btn btn-complete"><i class="fas fa-check"></i></button>
                <button id="btn-cancel" class="btn btn-cancel"><i class="fas fa-times"></i></button>
                ${txtAddEl.value}
            </li>
        `;
        console.log(ulElements)
        valuesToSave = {
            id_entry: token,
            value: txtAddEl.value
        }
        array.push(valuesToSave)
        localStorage.setItem("todo", JSON.stringify(array));
        valuesToSave = {}
    }
    eventDisplayedButtons();
}

function eventDisplayedButtons() {
    for (let element of btnCompleteEl) {
        element.addEventListener("click", function (e) {
            this.parentNode.remove();
            doneCounter++;
            document.getElementById("task-done-span").innerHTML += ` ${doneCounter}: <i class="fas fa-check fa-check-custom"></i>`
        })
    }
    for (let element of btnCancelEl) {
        element.addEventListener("click", function (e) {
            this.parentNode.remove();
            cancelCounter++;
            document.getElementById("task-cancel-span").innerHTML += ` ${cancelCounter}: <i class="fas fa-times fa-times-custom"></i>`;
            //console.log(this.parentNode.dataset.token)
            //console.log(array)
            console.log(array.splice(array.indexOf(this.parentNode.dataset.token), 1))
        })
    }
}

function checkLocalStorage() {
    if(loadFromLocalStorage) {
        array = loadFromLocalStorage;
        for(let i = 0; i < array.length; i++){
            ulElements.innerHTML += `
            <li class="list-item" data-token="${array[i].id_entry}">
                <button id="btn-complete" class="btn btn-complete"><i class="fas fa-check"></i></button>
                <button id="btn-cancel" class="btn btn-cancel"><i class="fas fa-times"></i></button>
                ${array[i].value}
            </li>
        `;
        eventDisplayedButtons();
        }
    }
}

checkLocalStorage();