import Client from "./Client";

// customElements.define("rob-movie", Movie);

class List {

    constructor() {
        this.client = new Client();
        this.root = document.getElementById('app');
        this.client
            .loadEnvironment()
            .then((environment) => {
                let uri = `http://${environment.host}:${environment.movie_releases_port}/releases/resources/releases`;
                this.client.getMovies(uri)
                    .then(movies => this.render(movies));
            });

    }

    render(movies) {
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

                this.root.appendChild(movieElement);
            });
    }

}

new

List();