import { Weather } from "./weather.js";

function CityCard(city, admin, country, index) {
    return `
    <li tabindex="0" data-index="${index}">
    <p class="city"><strong>${city}</strong>
    <span class="admin">${admin}, <strong class="country">${country}</strong></span></p>
    </li>
    `
}

export function Cities(results) {
    let cards = "";
    results.forEach((location, index) => {
        cards += CityCard(location.name, location.admin1, location.country, index)
    });
    return `<ul>
    ${cards}
    </ul>`
}

export function ChooseCity(results) {
    const items = document.querySelectorAll('#cities [data-index]');

    function handleClick(e) {
        const index = e.currentTarget.dataset.index;
        const city = results[index];

        Weather(city.name, city.latitude, city.longitude)
        cleanup();
    }

    function cleanup() {
        items.forEach(item => {
            item.removeEventListener('click', handleClick);
        });

        document.getElementById("cities").innerHTML = ""
    }

    items.forEach(item => {
        item.addEventListener('click', handleClick);
    });

    return cleanup;
}