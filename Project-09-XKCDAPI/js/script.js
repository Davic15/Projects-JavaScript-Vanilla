/**
 * Algorithm:
 *  1) Create a requestController class and define the needed variables.
 *  2) Create a method that will get the current (last added), and set variables with max and min comics.
 *  3) Register an event for the random comic and display it.
 *  4) Add Previous/Next, First/Last and get Comic by ID functionality to the app.
 *  5) Adjust UI states accordingly.
 */

 class RequestController {
    constructor() {
        this.DomInterface = new DomInterface();
        this.corsHeader = 'https://the-ultimate-api-challenge.herokuapp.com';
        this.apiUrl = 'https://xkcd.com';
        this.apiUrlFormat = 'info.0.json';
        this.superAgent = superagent;
        this.currentComicsNumber = 0;
        this.maxComicsNumber = 0;
        this.getCurrentComics();
        this.registerEvents();
    }

    setMaxComicsNumber(number) {
        this.maxComicsNumber = number;
    }

    setCurrentComicsNumber(number) {
        this.currentComicsNumber = number;
    }

    getRandomComicsNumber() {
        const min = 1;
        const max = this.maxComicsNumber;
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }

    getCurrentComics() {
        const requestUrl = `${this.corsHeader}/${this.apiUrl}/${this.apiUrlFormat}`;

        this.superAgent.get(requestUrl).end((error, response) => {
            if (error) {
                this.DomInterface.showError();
            }
            const data = response.body;

            this.DomInterface.showComics(data);
            this.setCurrentComicsNumber(data.num);
            this.setMaxComicsNumber(data.num);
        });
    }

    getComicsByNumber(number) {
        this.DomInterface.hideErrors();
        this.DomInterface.showLoader();
        this.DomInterface.clearResults();
        const requestUrl = `${this.corsHeader}/${this.apiUrl}/${number}/${this.apiUrlFormat}`;
        this.superAgent.get(requestUrl).end((error, response) => {
            if (error) {
                this.DomInterface.showError();
            }
            const data = response.body;
            this.setCurrentComicsNumber(data.num);
            this.DomInterface.showComics(data);
        });
    }

    requestPreviousComics() {
        const requestedComicsNumber = this.currentComicsNumber - 1;
        if (requestedComicsNumber < 1) return;
        this.getComicsByNumber(requestedComicsNumber);
    }

    requestNextComics() {
        const requestedComicsNumber = this.currentComicsNumber + 1;
        if (requestedComicsNumber > this.maxComicsNumber) return;
        this.getComicsByNumber(requestedComicsNumber);
    }

    requestComicsById(e) {
        e.preventDefault();
        const query = this.DomInterface.searchField.value;
        if (!query || query === '') return;
        if (query < 1 || query > this.maxComicsNumber) {
            return this.DomInterface.showFormError(`Try a number between 1 and ${this.maxComicsNumber}`);
        }
        this.getComicsByNumber(query);
    }

    registerEvents() {
        this.DomInterface.controls.random.addEventListener('click', () =>
            this.getComicsByNumber(this.getRandomComicsNumber())
        );
        this.DomInterface.controls.first.addEventListener('click', () => this.getComicsByNumber(1));
        this.DomInterface.controls.last.addEventListener('click', () => this.getComicsByNumber(this.maxComicsNumber));
        this.DomInterface.controls.previous.addEventListener('click', () => this.requestPreviousComics());
        this.DomInterface.controls.next.addEventListener('click', () => this.requestNextComics());
        this.DomInterface.form.addEventListener('submit', e => this.requestComicsById(e));
    }
}

const comics = new RequestController();