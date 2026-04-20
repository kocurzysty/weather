import { fetchCity } from "../services/api.js";

export function SearchComponent() {
  return `
    <label>Wyszukaj miasto: <input id="search" /></label>
    <button id="btn">Szukaj</button>
    <div id="cities"></div>
    <div id="table"></div>
  `;
};

export function Search(){
  const input = document.getElementById("search").value;
  fetchCity(input);
}