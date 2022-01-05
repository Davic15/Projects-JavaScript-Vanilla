// variable definition
const textEl = document.getElementById("search-text");
const btnEl = document.getElementById("btn");
const checkEl = document.getElementById("automatic-check");
const divCard = document.getElementById("cards");
const weatherAPI = "0a56dc1de13ff9072d70706723096a71";
let lat = "";
let lon = "";
let url = "";

btnEl.addEventListener("click", findWeather);
textEl.addEventListener("keyup", clickSearch);
checkEl.addEventListener("click", getLocation);

function findWeather(e) {
    if (textEl.value && (e.type == "keyup" || e.type == "click")){
        url = `https://api.openweathermap.org/data/2.5/weather?q=${textEl.value}&units=metric&appid=${weatherAPI}`
    } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPI}`;
    }
    fetchCurrentWeather(url);
}

function fetchCurrentWeather(url) {
    fetch (url)
    .then(res => {
        if(!res.ok) {
            throw Error ("Error in the server side");
        } else {
            return res.json();
        }
    })
    .then (data => {
        displayDataCurrentWeather(data);
        fetchDailyWeather(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=current,minutely,hourly&appid=${weatherAPI}`);
    })
    .catch (err => {
        console.log(err)
    })
}

function fetchDailyWeather(url) {
    fetch (url)
    .then(res => {
        if(!res.ok) {
            throw Error ("Error in the server side");
        } else {
            return res.json();
        }
    })
    .then (data => {
        displayDataDailyWeather(data);
    })
    .catch(err => {
        console.log(err);
    })
}

function displayDataDailyWeather (data) {
    for (const element of data.daily) {
        let date = new Date(element.dt * 1000);
        let url = `http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`
        divCard.innerHTML += `
            <div class="card">
                <div class="header">
                    <p class="day">${date.toLocaleString('en-GB', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</p>
                </div>
                <div class="body">
                    <p class="temp-day">${Math.floor(element.feels_like.day)}°C</p>
                    <img src="${url}">
                    <p class="temp-day-description">${element.weather[0].description}</p>
                </div>
            </div>
        `;
    }

}

function displayDataCurrentWeather(data) {
    lon = data.coord.lon;
    lat = data.coord.lat;
    document.getElementById("place").textContent = data.name + ", " + data.sys.country;
    document.getElementById("current-temp").textContent = Math.floor(data.main.temp) + "°C";
    document.getElementById("min-temp").textContent = "Min temperature: " + Math.floor(data.main.temp_min) + "°C";
    document.getElementById("max-temp").textContent = "Max temperature: " + Math.floor(data.main.temp_max) + "°C";
    document.getElementById("current-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("current-icon").alt = data.weather[0].description;
    document.getElementById("current-temp-description").textContent = data.weather[0].description;
}

function clickSearch(e) {
    if(e.key == "Enter") {
        findWeather(e)
        divCard.innerHTML = ""
        checkEl.checked = false;
        textEl.value = ""
    }
}

function getLocation() {
    textEl.value = "";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        console.log("Geolocation is not supported by your browser");
    }
}

function success(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    findWeather();
}