const btnAddEl = document.getElementById("add-item");
const txtAddEl = document.getElementById("todo-item");
const ulElements = document.getElementById("list-elements");
const btnCompleteEl = document.getElementsByClassName("btn-complete");
const btnCancelEl = document.getElementsByClassName("btn-cancel");
const liElement = document.getElementsByClassName("list-item");
const btnDeleteEl = document.getElementById("delete-all-items");
const loadFromLocalStorage = JSON.parse(localStorage.getItem("todo"));
const loadFromLocalStoragePreviousIcons = JSON.parse(localStorage.getItem("todo-icon"));


let valuesToSave = {};
let valuesToSaveIcons = {};
let array = [];
let arrayIcons = [];
let token = 0;
let counterDone = 0;
let counterCancel = 0;

btnAddEl.addEventListener("click", addElementList);
txtAddEl.addEventListener("keyup", detectEnter);
btnDeleteEl.addEventListener("click", deleteAllLocalStorage);

// Reset to default when the button is clicked
function deleteAllLocalStorage() {
    localStorage.clear();
    txtAddEl.value = "";
    ulElements.innerHTML = "";
    document.getElementById("task-done-span").textContent += "";
    document.getElementById("task-cancel-span").textContent += "";
    counterCancel = 0;
    counterDone = 0;
    refreshGraph();

}

// Detect if the user presses enter to call the function addElementList
function detectEnter(e) {
    if (e.key == "Enter") {
        addElementList();
        txtAddEl.value = "";
    }
}

// For each element (li) a token is generated and saved in the attribute data-token
function createToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/* 
    Check if the input is empty or no, if no i create a new element (li) and displayed in the page.
    The values generated I save them in an array and later save them in the LocalStorage
*/
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
        valuesToSave = {
            id_entry: token,
            value: txtAddEl.value
        }
        array.push(valuesToSave)
        localStorage.setItem("todo", JSON.stringify(array));
    }
    eventDisplayedButtons();
    txtAddEl.value = "";
}

/*
    When a new element (li) is displayed, two buttons are generated too, here an event listener for each button is created.
    When a button is clicked (to cancel or done the task) the localStorage is updated.
*/
function eventDisplayedButtons() {
    for (let element of btnCompleteEl) {
        element.addEventListener("click", function (e) {
            this.parentNode.remove();
            document.getElementById("task-done-span").innerHTML += `<i class="fas fa-check fa-check-custom"></i>`
            array = array.filter(id => id.id_entry != this.parentNode.dataset.token)
            localStorage.setItem("todo", JSON.stringify(array));

            valuesToSaveIcons = {
                status: true
            }
            arrayIcons.push(valuesToSaveIcons)
            console.log(arrayIcons)
            localStorage.setItem("todo-icon", JSON.stringify(arrayIcons));
            counterDone++;
            graphHabits();
        })
    }
    for (let element of btnCancelEl) {
        element.addEventListener("click", function (e) {
            this.parentNode.remove();
            document.getElementById("task-cancel-span").innerHTML += `<i class="fas fa-times fa-times-custom"></i>`;
            array = array.filter(id => id.id_entry != this.parentNode.dataset.token)
            localStorage.setItem("todo", JSON.stringify(array));

            valuesToSaveIcons = {
                status: false
            }
            arrayIcons.push(valuesToSaveIcons)
            localStorage.setItem("todo-icon", JSON.stringify(arrayIcons));
            counterCancel++;
            graphHabits();
        })
    }
}

/*
    When the page is loaded after close or refresh. This function check if there is any data, if so, the data is displayed.
*/
function checkLocalStorage() {
    if(loadFromLocalStorage) {
        array = loadFromLocalStorage;
        for(let i = 0; i < array.length; i++){
            ulElements.innerHTML += `
            <li class="list-item" data-token="${array[i].id_entry}">
                <button id="btn-complete" class="btn btn-complete"><i class="fas fa-check"></i></button>
                <button id="btn-cancel" class="btn btn-cancel"><i class="fas fa-times"></i></button>
                ${array[i].value}
            </li>`;
            eventDisplayedButtons();
        }
    }
    if(loadFromLocalStoragePreviousIcons) {
        arrayIcons = loadFromLocalStoragePreviousIcons;
        for(let i = 0; i < arrayIcons.length; i++) {
            if (arrayIcons[i].status ){
                document.getElementById("task-done-span").innerHTML += `<i class="fas fa-check fa-check-custom"></i>`
                counterDone++;
            } else {
                document.getElementById("task-cancel-span").innerHTML += `<i class="fas fa-times fa-times-custom"></i>`;
                counterCancel++;
            }
        }
    }
    graphHabits();
}


function graphHabits() {
    refreshGraph();
    let ctx = document.getElementById('my-chart').getContext("2d");
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tasks Done', 'Tasks Cancel'],
            datasets: [{
                label: '# of tasks',
                data: [counterDone, counterCancel],
                backgroundColor: [
                    'rgb(220, 249, 244)',
                    'rgba(255, 99, 71, 0.2)'
                ],
                borderColor: [
                    'rgb(50, 205, 50)',
                    'rgba(255, 99, 71, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function refreshGraph() {
    let chartStatus = Chart.getChart("my-chart");
    if (chartStatus != undefined) {
        chartStatus.destroy();
    }
}

checkLocalStorage();
