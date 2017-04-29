export default class Movie extends HTMLElement {
    connectedCallback() {
        this.innerText = "Movie";
    }
}