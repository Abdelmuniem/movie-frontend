export default class Client {

    constructor() {
    }

    loadEnvironment() {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', 'environment/environment.json');
            request.onreadystatechange = () => {
                let raw = request.responseText;
                let json = JSON.parse(raw);
                resolve(json);
            };
            request.send();
        });

        return result;
    }

    getMovies(uri) {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('GET', uri);
            request.onreadystatechange = () => {
                let raw = request.responseText;
                let json = JSON.parse(raw);
                resolve(json);
            };
            request.send();
        });

        return result;
    }

    updateMovieDownloaded(uri, id, downloaded) {
        let result = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open('PUT', uri + `/${id}/downloaded`);
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