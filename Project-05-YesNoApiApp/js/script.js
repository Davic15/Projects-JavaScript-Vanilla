// SELECTORS
const ballSelector = document.querySelector('#ball');
const buttonSelector = document.querySelector('#button');
const inputSelector = document.querySelector('#input');
const answerSelector = document.querySelector('#answer');
const errorSelector = document.querySelector('#error');
// API
const API_ENDPOINT = 'https://yesno.wtf/api';
// FLAGS
let isRequestInProgress = false;

/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */

const setIsRequestInProgress = (value) => {
    isRequestInProgress = value;
}

const setDisableButtonState = isDisabled => {
    if(isDisabled) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }
}

const cleanupResponse = () => {
    setTimeout(() => {
        answerSelector.innerHTML = '';
        inputSelector.value = '';
        setIsRequestInProgress(false);
        setDisableButtonState(false);
    }, 3000);
}

const showAnswer = (answer) => {
    setTimeout(() => {
        answerSelector.innerHTML = `<p>${answer}</p>`;
        ballSelector.classList.remove('shake__ball');
        cleanupResponse();
    }, 1000);
}

const fetchAnswer = () => {
    setIsRequestInProgress(true);
    setDisableButtonState(true);
    ballSelector.classList.add('shake__ball');
    fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => showAnswer(data.answer))
}

const showError = () => {
    errorSelector.innerHTML = 'You need to type your question.';
    setTimeout(() => {
        errorSelector.innerHTML = '';
    }, 3000);
}

const getAnswer = () => {
    if(isRequestInProgress) return;
    if(!inputSelector.value) return showError();
    fetchAnswer();
}

const handleKeyEnter = (e) => {
    if(e.keyCode === 13 ) {
        getAnswer();
    }
}

buttonSelector.addEventListener('click', getAnswer)