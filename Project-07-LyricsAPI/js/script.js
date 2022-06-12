// !!! NOTE: By the time of releasing, the API and its documentation has changed a bit.
// For the first step of the challenge you'll need a URL which isn't mentioned in their docs anymore.
// Check the HINTS section on the challenge's page for instruction or the YouTube video.

/**
 * STEPS
 * 1. Add an event listener to the form and the button
 * 2. Tie the event listener a function that GETs suggestions for the searched words and outputs it
 * 3. Build a list with the results where each item has a button "Get Lyrics" of that entry and read out the artist and song name of the list item that was clicked
 * 4. Create a function that GETs the requested song lyric and output the result
 * 5. Extend the app with disabled/loading/error states and adjust the UI accordingly
 */

// API
const endPoint = 'https://api.lyrics.ovh';//https://api.lyrics.ovh/suggest/:query

const searchForm = $('#search-form');
const searchButton = $('#search-button');
const searchInput = $('#search-input');

function setData(data) {
    $.each(data, function(index, entry) {
        const artistName = entry.artist.name;
        const title = entry.title;
        showResultsList({ artistName, title, index })
    })
}

function showError() {
    showLyricsError();
    scrollToLyricsResult();
}

function getLyrics(e) {
    const artist =  e.target.dataset.artist;
    const title = e.target.dataset.title;
    const url = `${endPoint}/v1/${artist}/${title}`;

    showLyricsLoader();

    $.ajax({
        url: url,
        success: function(response) {
            if(response.lyrics === '') {
                showError();
                return;
            }
            showLyricsResult(artist, title, response.lyrics);
            scrollToLyricsResult();
        },
        error: function() {
            showError();
        }
    })
}

function searchQuery() {
    const query = searchInput.val();
    if(isInputEmpty(query)) return;
    const url = `${endPoint}/suggest/${query}`;

    cleanupExistingResults();
    showResultsContainer();
    showSearchLoader();

    $.ajax({
        url: url,
        success: function(response) {
            setData(response.data);
            scrollToSearchResults();
        },
        error: function() {
            showSearchError();
            scrollToSearchResults();
        }
    })
}

function registerSearchFormEvents() {
    searchForm.submit(function (e) {
        e.preventDefault();
        searchQuery();
    });

    searchButton.click(function() {
        searchQuery();
    })
}



registerSearchFormEvents()