/**
 *  STEPS:
 *
 *  1. Declare a class to GET weather data, and GET the woeid, output received data
 *  2. Register an event listener and attach it to the GET requests chain from above, adjust UI loading state
 *  3. Prepare data for the UI in advance and try to use unified structure before outputting to the template
 *  4. Divide classes per function to have a more clean code approach and separation on concerns
 *  5. Add error/loading states and cover edge use cases
 *
 */

class fetchForecastApi {
    constructor() {
        this.baseApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.weatherAPI = '0a56dc1de13ff9072d70706723096a71';
    }
    getLocation(query, callback) {
        $.getJSON(this.baseApiUrl, {q: query, appid: this.weatherAPI, units: 'metric'}).done(data => callback(data)).fail(() => { callback(null) });
        //$.getJSON(this.baseApiUrl, {q: query, appid: this.weatherAPI, units: 'metric'}).done(data => this.getWeatherData(data.id));
    }

    getWeatherData(location, callback) {
        $.getJSON(this.baseApiUrl, {id: location, appid: this.weatherAPI, units: 'metric'}).done(data => callback(data)).fail(() => { callback(null) });
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
    showTodaysForecastDetails({name, value, unit}) {
        $(`#forecast-details`).append(`
            <div class="d-flex justify-content-between">
                <span class="font-weight-bolder">${name}</span>
                <span>${value} ${unit}</span>
            </div>
        `)
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
                value: data.feels_like,
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
    prepareDataForDom(data) {
        const { feels_like, humidity, pressure, temp, temp_max, temp_min } = data.main
        const { speed } = data.wind
        const todaysForecastDetails = this.gatherTodaysForecastDetails({
            feels_like, humidity, pressure, temp, temp_max, temp_min, speed
        });
        this.prepareTodaysForecastDetails(todaysForecastDetails);
        this.coreDomElements.hideLoader();
        this.coreDomElements.showForecast();
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