/**
 *  Algorithm
 *  1) Initialice an XMLHttpRequest constructor.
 *  2) Open a GET request, set headers and response types.
 *  3) Output successful response.
 *  4) Output error state.
 *  5) Attach an event listener to the button.
 *  6) Adjust UI states.
 */

// Selectors
const buttonSelector = document.getElementById('button');
const buttonCtaSelector = document.getElementById('cta');
const loaderSelector = document.getElementById('loader');
const jokeSelector = document.getElementById('joke');
const errorContainerSelector = document.getElementById('error-container');
const errorSelector = document.getElementById('error-message');

const API_ENDPOINT = 'https://icanhazdadjoke.com/';
const XHR = new XMLHttpRequest();

function setDisabledUiState(isDisabled) {
    setLoaderState(isDisabled);
    setButtonState(isDisabled);
}

function showJoke(joke) {
    setDisabledUiState(false);
    jokeSelector.innerHTML = joke;
}

function showError(error) {
    setDisabledUiState(false);
    errorSelector.innerHTML = error;
    errorContainerSelector.style.display = 'block';
}

function setLoaderState(isVisible) {
    const displayState = isVisible ? 'block' : 'none';
    loaderSelector.style.display = displayState;
}

function setButtonState(isDisabled) {
    if(isDisabled) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }
    
    const buttonCtaState = isDisabled ? 'none' : 'block';
    buttonCtaSelector.style.display = buttonCtaState;
}

function setButtonCta(isError) {
    const buttonCta = isError ? 'Try again' : 'Get another one';
    buttonSelector.innerHTML = buttonCta;
}

function getJoke() {
    XHR.open('GET', API_ENDPOINT);

    XHR.setRequestHeader('Accept', 'application/json');
    XHR.responseType = 'json';

    XHR.onload = function() {
        showJoke(XHR.response.joke);
        setButtonCta(false);
    }

    XHR.onerror = function() {
        showError('An error occurred, please try again.');
        setButtonCta(true);
    }

    XHR.send();
}

buttonSelector.addEventListener('click', function() {
    setDisabledUiState(true);
    getJoke();
});