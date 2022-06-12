// Selectors
const searchResultsContainer = $('#search-results-container');
const searchResultsList = $('#search-results-list');

const lyricsContainer = $('#lyrics-container');
const lyricsResultsContainer = $('#lyrics-results');

const searchLoader = $('#search-results-loader');
const lyricsLoader = $('#lyrics-loader');

// Helpers
function showSearchLoader() {
    searchLoader.show();
    searchResultsList.hide();
}

function hideSearchLoader() {
    searchLoader.hide();
    searchResultsList.show();
}

function showLyricsLoader() {
    lyricsContainer.removeClass('d-none');
    lyricsLoader.show();
    lyricsResultsContainer.hide();
}

function hideLyricsLoader() {
    lyricsLoader.hide();
    lyricsResultsContainer.show();
}

function showResultsContainer() {
    searchResultsContainer.removeClass('d-none');
    searchResultsContainer.addClass('d-flex');
}

function cleanupExistingResults() {
    searchResultsList.html('');
    lyricsContainer.addClass('d-none');
    lyricsResultsContainer.html('');
}

function isInputEmpty(query) {
    if (!query || query === '') {
        return true;
    }
    return false;
}

function showSearchError() {
    searchResultsContainer.html('Sorry, there was an error with your request, please try again');
}

function showLyricsError() {
    lyricsResultsContainer.html('Sorry, but no lyrics were found');
}

function scrollToSearchResults() {
    $('html, body').animate(
        {
            scrollTop: searchResultsContainer.offset().top - 60,
        },
        1500
    );
    hideSearchLoader();
}

function scrollToLyricsResult() {
    $('html, body').animate(
        {
            scrollTop: lyricsContainer.offset().top - 60,
        },
        1500
    );
    hideLyricsLoader();
}

function registerGetLyricsEvent(index) {
    $(`#get-lyrics-${index}`).click(function (e) {
        getLyrics(e);
    });
}

function showResultsList({ artistName, title, index }) {
    searchResultsList.append(`
        <div class="result__item row d-flex justify-content-center align-items-center text-center text-sm-left">
            <p class="col-10 col-sm-9 mb-0 result__item__title"><strong>${artistName}</strong> - ${title}</p>
            <button id="get-lyrics-${index}" class="col-8 col-sm-3 btn button" data-artist="${artistName}" data-title="${title}">Get Lyrics</button>
        </div>
    `);
    registerGetLyricsEvent(index);
}

function showLyricsResult(artistName, title, lyrics) {
    lyricsResultsContainer.html(`
        <h2><strong>${artistName}</strong> - ${title}</h2>
        <div class="lyrics">${lyrics}</div>
    `);
}