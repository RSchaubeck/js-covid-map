// const corner1 = L.latLng(-60, -180);
// const corner2 = L.latLng(70, 180);
// const boundary = L.latLngBounds(corner1, corner2);

// const map = L.map('map')
//     .setView([0, 0], 2)
//     .setMaxBounds(boundary);

// const map = document.getElementById('map');

async function getCountryinfo() {
    let countries = document.getElementById('country');
    let covidStats = document.getElementById('covid-stats');
    const xhr = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        xhr.onload = function () {
            if (xhr.status >= 300) {
                reject(xhr.status)
            } else {
                let stat = covidStats.options[covidStats.selectedIndex].text;
                let divisor;
                switch (stat) {
                    case "Confirmed Cases":
                        stat = "cases";
                        divisor = 10000;
                        break;
                    case "Deaths":
                        stat = "deaths";
                        divisor = 1000;
                        break;
                    case "Recovered":
                        stat = "recovered";
                        divisor = 2000;
                        break;
                    case "Cases Per Million":
                        stat = "casesPerOneMillion";
                        divisor = 200;
                        break;
                    case "Deaths Per Million":
                        stat = "deathsPerOneMillion";
                        divisor = 30;
                        break;
                    default:
                        break;
                }
                const data = JSON.parse(xhr.responseText);
                let country;
                let coords = [];
                for (let i = 0; i < data.length; i++) {
                    country = document.createElement('option');
                    country.text = data[i].country;
                    country.value = data[i].countryInfo.iso3;
                    countries.appendChild(country);
                    let coord = { long: data[i].countryInfo.long, lat: data[i].countryInfo.lat, radius: (data[i][stat] / divisor) };
                    coords.push(coord);
                }
                resolve(coords);
            }
        }
        xhr.open('GET', 'https://corona.lmao.ninja/v2/countries?yesterday&sort');
        xhr.send();
    });
}

document.addEventListener("DOMContentLoaded", () => {

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxBoundsViscosity: 1.0,
        minZoom: 2,
        maxZoom: 8
    }).addTo(map);


    L.svg().addTo(map);

    async function drawCircles() {
        try {
            let coords = await getCountryinfo();
            d3.select("#map")
                .select("svg")
                .selectAll("myCircles")
                .data(coords)
                .enter()
                .append("circle")
                .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
                .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
                .attr("r", function (d) { return d.radius })
                .style("fill", "red")
                .attr("stroke", "red")
                .attr("stroke-width", 1)
                .attr("fill-opacity", .1)
        } catch (err) {
            console.log(err);
        }
    }

    drawCircles();

    function update() {
        d3.selectAll("circle")
            .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
    }

    map.on("moveend", update);
    
});

function changeCountry() {
    let countries = document.getElementById('country');
    let iso = countries.options[countries.selectedIndex].value;
    const req = new XMLHttpRequest();
    req.open('GET', `https://corona.lmao.ninja/v2/countries/${iso}`);
    req.send();
    if (iso === "all countries") { 
        map.setView([0, 0], 2)
    } else {
        req.onload = function () {
            let data = JSON.parse(req.responseText);
            // debugger
            let coord = [data.countryInfo.lat, data.countryInfo.long];
            map.setView(coord, 5);
        }
    }
}

async function drawCircles() {
    d3.selectAll("svg > *").remove();
    try {
        let coords = await getCountryinfo();
        d3.select("#map")
            .select("svg")
            .selectAll("myCircles")
            .data(coords)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
            .attr("r", function (d) { return d.radius })
            .style("fill", "red")
            .attr("stroke", "red")
            .attr("stroke-width", 1)
            .attr("fill-opacity", .1)
    } catch (err) {
        console.log(err);
    }
}