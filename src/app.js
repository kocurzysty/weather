import { SearchComponent, Search } from './components/main.js'
const main = document.getElementById('app');

export function startApp() {
    main.innerHTML = SearchComponent();
    const button = document.getElementById("btn");
    button.addEventListener("click", () => {
        Search();
    });
}