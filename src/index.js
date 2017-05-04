import Client from "./Client";

// customElements.define("rob-movie", Movie);

class List {

    constructor(keycloak) {
        this.client = new Client(keycloak);
        this.root = document.getElementById('app');

        let dropdownDiv = document.createElement('div');
        dropdownDiv.setAttribute('class', 'dropdown');
        this.root.appendChild(dropdownDiv);

        let movieListe = document.createElement('div');
        movieListe.setAttribute('id', 'movieliste');
        this.root.appendChild(movieListe);

        let dropdownButton = document.createElement('button');
        dropdownButton.setAttribute('class', 'btn btn-primary dropdown-toggle');
        dropdownButton.setAttribute('type', 'button');
        dropdownButton.setAttribute('data-toggle', 'dropdown');
        dropdownButton.textContent = 'Heruntergeladen?!?';
        dropdownDiv.appendChild(dropdownButton);

        let dropdownList = document.createElement('ul');
        dropdownList.setAttribute('class', 'dropdown-menu');
        dropdownDiv.appendChild(dropdownList);

        let dropdownWithout = document.createElement('li');
        dropdownList.appendChild(dropdownWithout);

        let dropdownDownloaded = document.createElement('li');
        dropdownList.appendChild(dropdownDownloaded);

        let dropdownNotDownloaded = document.createElement('li');
        dropdownList.appendChild(dropdownNotDownloaded);

        let linkWithout = document.createElement('a');
        linkWithout.setAttribute('href', '#');
        linkWithout.textContent = 'Ohne Filter';
        linkWithout.addEventListener('click', (e) => {
            this.client
                .loadEnvironment()
                .then((environment) => {
                    let uri = `http://${environment.host}:${environment.movie_releases_port}/releases/resources/releases`;
                    this.client.getMovies(uri)
                        .then(movies => this.render(movies));
                });
        });
        dropdownWithout.appendChild(linkWithout);

        let linkDownloaded = document.createElement('a');
        linkDownloaded.setAttribute('href', '#');
        linkDownloaded.textContent = 'Nur Heruntergeladene';
        linkDownloaded.addEventListener('click', (e) => {
            this.client
                .loadEnvironment()
                .then((environment) => {
                    let uri = `http://${environment.host}:${environment.movie_releases_port}/releases/resources/releases?downloaded=true`;
                    this.client.getMovies(uri)
                        .then(movies => this.render(movies));
                });
        });
        dropdownDownloaded.appendChild(linkDownloaded);

        let linkNotDownloaded = document.createElement('a');
        linkNotDownloaded.setAttribute('href', '#');
        linkNotDownloaded.textContent = 'Nur nicht Heruntergeladene';
        linkNotDownloaded.addEventListener('click', (e) => {
            this.client
                .loadEnvironment()
                .then((environment) => {
                    let uri = `http://${environment.host}:${environment.movie_releases_port}/releases/resources/releases?downloaded=false`;
                    this.client.getMovies(uri)
                        .then(movies => this.render(movies));
                });
        });
        dropdownNotDownloaded.appendChild(linkNotDownloaded);

    }

    render(movies) {
        let movieListe = document.getElementById('movieliste');
        while (movieListe.firstChild) {
            movieListe.removeChild(movieListe.firstChild);
        }
        movies
            .forEach((movie) => {
                let title = document.createElement('a');
                title.textContent = movie.title;
                title.setAttribute('href', movie.url);

                let image = document.createElement('img');
                image.setAttribute('src', movie.cover);

                let downloaded = document.createElement('input');
                downloaded.setAttribute('type', 'checkbox');
                downloaded.setAttribute('id', movie.id);
                downloaded.checked = movie.downloaded;
                downloaded.addEventListener('change', (e) => {
                    let checkbox = e.target;
                    this.client
                        .loadEnvironment()
                        .then((environment) => {
                            let uri = `http://${environment.host}:${environment.movie_releases_port}/releases/resources/releases`;
                            this.client
                                .updateMovieDownloaded(uri, checkbox.getAttribute('id'), checkbox.checked)
                                .then(movie => console.log(movie));
                        });
                });

                let movieElement = document.createElement('div');
                movieElement.appendChild(image);
                movieElement.appendChild(downloaded);
                movieElement.appendChild(title);

                movieListe.appendChild(movieElement);
            });
    }

}

let keycloak = Keycloak('environment/keycloak.json');
keycloak.init({onLoad: 'login-required'}).success(function (authenticated) {
    // alert(authenticated ? 'authenticated' : 'not authenticated');
}).error(function () {
//            alert('failed to initialize');
});

new List(keycloak);