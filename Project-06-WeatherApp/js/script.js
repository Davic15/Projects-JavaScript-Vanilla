/**
 *  Algorithm
 *  1) Declare a class to GET weather data, GET the id, latitude, longitude to display data.
 *  2) Register and event listener attached it to the GET request and adjust the UI loding state.
 *  3) Prepare data for the UI.
 *  4) Divide clases per function to have a clean and readable code.
 *  5) Add error/loading handlers.
 */ 

class fetchForecastApi {
    constructor() {
        this.baseApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.baseApiUrlForecast = 'https://api.openweathermap.org/data/2.5/onecall'
        this.weatherAPI = '0a56dc1de13ff9072d70706723096a71';
    }
    getLocation(query, callback) {
        $.getJSON(this.baseApiUrl, { q: query, appid: this.weatherAPI, units: 'metric' }).done(data => callback(data)).fail(() => { callback(null) });
    }

    getWeatherData(location, callback) {
        $.getJSON(this.baseApiUrl, { id: location, appid: this.weatherAPI, units: 'metric' }).done(data => callback(data)).fail(() => { callback(null) });
    }

    getWeatherDataForecast(location, callback) {
        $.getJSON(this.baseApiUrlForecast, { lon: location.coord.lon, lat: location.coord.lat, units: 'metric', appid: this.weatherAPI }).done(data => callback(data)).fail(() => { callback(null) });
    }
}

class coreDomElements {
    constructor() {
        this.searchForm = $('#search-form');
        this.errorBox = $('#error-box');
        this.searchBox = $('#search-box');
        this.loaderBox = $('#loader-box');
        this.forecastBox = $('#forecast-box');
    }

    showForecast() {
        this.hideError();
        this.forecastBox.removeClass('d-none');
        this.forecastBox.addClass('d-flex');
    }

    showLoader() {
        this.loaderBox.removeClass('d-none');
    }

    hideLoader() {
        this.loaderBox.addClass('d-none');
    }

    showSearch() {
        this.searchBox.removeClass('d-none');
        this.searchBox.addClass('d-flex');
    }

    hideSearchBox() {
        this.searchBox.removeClass('d-flex');
        this.searchBox.addClass('d-none');
    }

    showError(message) {
        this.hideLoader();
        this.showSearch();
        this.errorBox.removeClass('d-none');
        this.errorBox.addClass('d-block');
        this.errorBox.html(`<p class="mb-0">${message}</p>`);
    }

    hideError() {
        this.errorBox.addClass('d-none');
    }
}

class displayForecast {
    constructor() {
        this.imageUrl = 'http://openweathermap.org/img/wn/'
    }
    showTodaysForecastDetails({name, value, unit}) {
        $(`#forecast-details`).append(`
            <div class="d-flex justify-content-between">
                <span class="font-weight-bolder">${name}</span>
                <span>${value} ${unit}</span>
            </div>
        `)
    }
    showUpcomingDaysForecast({ dayImgUrl, weekDay, maxTemp }) {
        $('#forecast-details-week').append(`
            <li class="forecastBox__week-day d-flex flex-column justify-content-center align-items-center p-2 weather-day">
                <img class="mb-2" width="30" src="${this.imageUrl}/${dayImgUrl}@2x.png" />
                <span class="mb-2">${weekDay}</span>
                <span class="font-weight-bold">${maxTemp}&deg</span>
            </li>
        `);
    }
    showTodaysForecast(forecast) {
        $('#forecast-card-weekday').html(forecast.currentWeekday);
        $('#forecast-card-date').html(forecast.todaysFullDate);
        $('#forecast-card-location').html(forecast.locationName);
        $('#forecast-card-img').attr('src', `${this.imageUrl}/${forecast.todaysImgUrl}@2x.png`);
        $('#forecast-card-temp').html(forecast.todaysTemp);
        $('#forecast-card-description').html(forecast.weatherState);
    }
}

class dataMiddleware {
    constructor() {
        this.displayForecast = new displayForecast();
        this.coreDomElements = new coreDomElements();
    }
    gatherTodaysForecastDetails(data) {
        return {
            'feels like': {
                value: Math.round(data.feels_like),
                unit: '°C'
            },
            humidity: {
                value: data.humidity,
                unit: '%'
            },
            wind: {
                value: Math.round(data.speed),
                unit: 'm/s'
            },
            'air pressure': {
                value: data.pressure,
                unit: 'mb'
            },
            'max temp': {
                value: Math.round(data.temp_max),
                unit: '°C'
            },
            'min temp': {
                value: Math.round(data.temp_min),
                unit: '°C'
            }
        }
    }

    gatherTodaysForecastGeneral(data) {
        const date = new Date(data.dt * 1000);
        return {
            currentWeekday: date.toLocaleString('en-US', { weekday: 'long' }),
            todaysFullDate: date.toLocaleString('en-US', { month: 'long', day: 'numeric' }),
            locationName: data.name,
            todaysImgUrl: data.icon,
            todaysTemp: Math.round(data.temp),
            weatherState: data.main,
        };
    }

    prepareDataForDom(data) {
        const { feels_like, humidity, pressure, temp, temp_max, temp_min } = data.main
        const { speed } = data.wind
        const { name, dt } = data
        const { main, icon } = data.weather[0]
        const todaysForecastGeneral = this.gatherTodaysForecastGeneral({
            name, dt, temp, main, icon
        });
        const todaysForecastDetails = this.gatherTodaysForecastDetails({
            feels_like, humidity, pressure, temp, temp_max, temp_min, speed
        });

        this.displayForecast.showTodaysForecast(todaysForecastGeneral)
        this.prepareTodaysForecastDetails(todaysForecastDetails);
        this.coreDomElements.hideLoader();
        this.coreDomElements.showForecast();
    }

    prepareDataForForecastDom(data) {
        this.prepareUpcomingDaysForecast(data);
    }

    prepareTodaysForecastDetails(forecast) {
        $.each(forecast, (key, value) => {
            this.displayForecast.showTodaysForecastDetails({
                name: key.toUpperCase(),
                value: value.value,
                unit: value.unit
            });
        })
    }

    prepareUpcomingDaysForecast(forecast) {
        $.each(forecast.daily, (index, value) => {
            if(index === 0 || index > 5) return
            const dayImgUrl = value.weather[0].icon;
            const maxTemp = Math.round(value.temp.max);
            const weekDay = new Date(value.dt * 1000).toLocaleString('en-GB', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}).substring(0, 3);
            this.displayForecast.showUpcomingDaysForecast({ dayImgUrl, weekDay, maxTemp });
        })
    }
}

class requestController {
    constructor() {
        this.fetchForecastApi = new fetchForecastApi();
        this.coreDomElements = new coreDomElements();
        this.dataMiddleware = new dataMiddleware();
        this.registerEventListener();
    }

    showRequestInProgress() {
        this.coreDomElements.showLoader();
        this.coreDomElements.hideSearchBox();
    }

    getQuery() {
        return $('#search-query').val().trim();
    }

    fetchWeather(query) {
        this.fetchForecastApi.getLocation(query, (location) => {
            if(!location || location.length === 0) {
                this.coreDomElements.showError('Could not find this location, please try again.');
                return;
            }
            this.fetchForecastApi.getWeatherData(location.id, (data) => {
                if(!data) {
                    this.coreDomElements.showError('Could not proceed with the request, please try again later.');
                    return;
                }
                this.dataMiddleware.prepareDataForDom(data);
            });
            this.fetchForecastApi.getWeatherDataForecast(location, (data) => {
                if(!data) {
                    this.coreDomElements.showError('Could not proceed with the request, please try again later.');
                    return;
                }
                this.dataMiddleware.prepareDataForForecastDom(data);
            })
        })
    }

    onSubmit() {
        const query = this.getQuery();
        if(!query) return;

        this.showRequestInProgress();
        this.fetchWeather(query)
    }

    registerEventListener() {
        this.coreDomElements.searchForm.on('submit', (e) => {
            e.preventDefault();
            this.onSubmit();
        });
    }
}

const request = new requestController();