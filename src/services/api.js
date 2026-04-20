import { Cities, ChooseCity } from "../components/cities.js";

export async function fetchCity(name) {
    const URL = "https://geocoding-api.open-meteo.com/v1/search?"
    const res = await fetch(`${URL}name=${name}`);
    const data = await res.json();

    document.getElementById("cities").innerHTML = Cities(data.results);
    ChooseCity(data.results);
}

export async function fetchWeather(latitude, longitude) {
    const URL = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=2006-01-01&end_date=2026-04-16&daily=temperature_2m_max,
precipitation_sum`
    const res = await fetch(URL);
    const data = await res.json();
    return data;
}