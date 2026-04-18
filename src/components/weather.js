import { fetchWeather } from "../services/api.js";

const display = DisplayData();

export async function Weather(city, latitude, longitude) {
    const data = await fetchWeather(latitude, longitude);
    const result = data.daily.time.map((_, index) => ({
        date: data.daily.time[index],
        temperature_2m_max: data.daily.temperature_2m_max[index],
        precipitation_sum: data.daily.precipitation_sum[index]
    }));
    console.log(result);
    display(result);
}

function DisplayData(data) {
    let table = null;
    return function (data) {
        const container = document.querySelector('#table');

        if (!table) {
            table = new Handsontable(container, {
                data,
                colHeaders: ["Data", "Maksymalna Temperatura", "Opady"],
                rowHeaders: true,
                height: 600,
                autoWrapRow: true,
                autoWrapCol: true,
                licenseKey: 'non-commercial-and-evaluation',
            });
        } else {
            table.loadData(data)
        }
    }
}