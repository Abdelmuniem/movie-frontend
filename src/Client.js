export default class Client {

    constructor() {
        this.uri = "http://localhost:8080/releases/resources/releases";
    }

    getMovies() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', this.uri);
            request.onreadystatechange = () => {
                let raw = request.responseText;
                let json = JSON.parse(raw);
                resolve(json);
            };
            request.send();
        });

        return result;
    }

    updateMovieDownloaded(id, downloaded) {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('PUT', this.uri + `/${id}/downloaded`);
            request.onreadystatechange = () => {
                let raw = request.responseText;
                let json = JSON.parse(raw);
                resolve(json);
            };
            request.send(downloaded);
        });

        return result;
    }
}