const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://covid-api.com/api/regions');
xhr.send();

document.addEventListener("DOMContentLoaded", () => {
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        let countries = document.getElementById('country');
        let country;
        for (let i = 0; i < data["data"].length; i++) {
            country = document.createElement('option');
            country.text = data["data"][i].name;
            country.value = data.data[i].iso;
            countries.appendChild(country);
        }
    }
});