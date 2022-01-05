// variable definition
const textEl = document.getElementById("search-text");
const btnEl = document.getElementById("btn");
const checkEl = document.getElementById("automatic-check");
const weatherAPI = "0a56dc1de13ff9072d70706723096a71";
let lat = "";
let lon = "";
let url = "";

btnEl.addEventListener("click", findWeather);
textEl.addEventListener("keyup", clickSearch);
checkEl.addEventListener("click", getLocation);

function findWeather(e) {
    console.log(e)
    if (textEl.value && (e.type == "keyup" || e.type == "click")){
        url = `https://api.openweathermap.org/data/2.5/weather?q=${textEl.value}&units=metric&appid=${weatherAPI}`
        console.log("entre")
    } else if (lat && lon) {
        console.log("entre aca")
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherAPI}`;
    }
    fetch (url)
        .then(res => {
            if(!res.ok) {
                throw Error ("Error in the server side");
            } else {
                return res.json();
            }
        })
        .then (data => {
            console.log(data);
            document.getElementById("place").textContent = data.name + ", " + data.sys.country;
            document.getElementById("current-temp").textContent = Math.floor(data.main.temp) + "°";
            document.getElementById("min-temp").textContent = "Min temperature: " + Math.floor(data.main.temp_min) + "°";
            document.getElementById("max-temp").textContent = "Max temperature: " + Math.floor(data.main.temp_max) + "°";
            document.getElementById("current-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            document.getElementById("current-icon").alt = data.weather[0].description;
            document.getElementById("current-temp-description").textContent = data.weather[0].description;
        })
        .catch (err => {
            console.log(err)
        })
}

function clickSearch(e) {
    if(e.key == "Enter") {
        findWeather(e)
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