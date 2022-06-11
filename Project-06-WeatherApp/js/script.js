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
    getLocation() {
        $.getJSON(this.baseApiUrl, {q: 'Roma', appid: this.weatherAPI, units: 'metric'}).done(data => this.getWeatherData(data.id));
        //$.getJSON(baseApiUrl, {q: 'Berlin', appid: weatherAPI, units: 'metric'}).done(data => console.log(data.id));
    }

    getWeatherData(location) {
        $.getJSON(this.baseApiUrl, {id: location, appid: this.weatherAPI, units: 'metric'}).done(data => console.log('Here is your weather', data))
    }
}

class coreDomElements {
    
}

class requestController {
    constructor() {
        this.fetchForecastApi = new fetchForecastApi();
        this.init();
    }
    init() {
        this.fetchForecastApi.getLocation()
    }
}

const request = new requestController();