const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://corona.lmao.ninja/v2/countries?yesterday&sort');
xhr.send();

// const req = new XMLHttpRequest();
// req.open('GET', 'https://restcountries.eu/rest/v2/all');
// req.send();

document.addEventListener("DOMContentLoaded", () => {
    let countries = document.getElementById('country');
    // let coords = [];
    
    xhr.onload = function () {
        const data = JSON.parse(xhr.responseText);
        let country;
        for (let i = 0; i < data.length; i++) {
            country = document.createElement('option');
            country.text = data[i].country;
            country.value = data[i].countryInfo.iso3;
            countries.appendChild(country);
            // let coord = { long: data[i].countryInfo.long, lat: data[i].countryInfo.lat};
            // coords.push(coord);
        }
    }


    const corner1 = L.latLng(-60, -180);
    const corner2 = L.latLng(70, 180);
    const boundary = L.latLngBounds(corner1, corner2);

    const map = L.map('map')
        .setView([0, 0], 2)
        .setMaxBounds(boundary);

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxBoundsViscosity: 1.0,
        minZoom: 2,
        maxZoom: 5
    }).addTo(map);

    L.svg().addTo(map);
    

    let coords = [
        { long: 65, lat: 33 },
        { long: 20, lat: 41 },
        { long: 3, lat: 28 },
        { long: 1.5, lat: 42.5 },
        { long: 18.5, lat: -12.5 },
        { long: -61.8, lat: 17.05 },
        { long: -64, lat: -34 },
        { long: 45, lat: 40 },
        { long: -69.96666666, lat: 12.5 },
        { long: 133, lat: -27 },
        { long: 13.33333333, lat: 47.33333333 },
        { long: 47.5, lat: 40.5 },
        { long: -76, lat: 24.25 },
        { long: 50.55, lat: 26 },
        { long: 90, lat: 24 },
        { long: -59.53333333, lat: 13.16666666 },
        { long: 28, lat: 53 },
        { long: 4, lat: 50.83333333 },
        { long: -88.75, lat: 17.25 },
        { long: 2.25, lat: 9.5 },
        { long: 90.5, lat: 27.5 },
        { long: 18, lat: 44 },
        { long: 24, lat: -22 },
        { long: -55, lat: -10 },
        { long: 25, lat: 43 },
        { long: -2, lat: 13 },
        { long: 30, lat: -3.5 },
        { long: 105, lat: 13 },
        { long: 12, lat: 6 },
        { long: -95, lat: 60 },
        { long: -24, lat: 16 },
        { long: -80.5, lat: 19.5 },
        { long: 21, lat: 7 },
        { long: 19, lat: 15 },
        { long: -71, lat: -30 },
        { long: 105, lat: 35 },
        { long: -72, lat: 4 },
        { long: -84, lat: 10 },
        { long: 15.5, lat: 45.16666666 },
        { long: -80, lat: 21.5 },
        { long: 33, lat: 35 },
        { long: 10, lat: 56 },
        { long: 43, lat: 11.5 },
        { long: -61.33333333, lat: 15.41666666 },
        { long: -70.66666666, lat: 19 },
        { long: -77.5, lat: -2 },
        { long: 30, lat: 27 },
        { long: -88.91666666, lat: 13.83333333 },
        { long: 10, lat: 2 },
        { long: 39, lat: 15 },
        { long: 26, lat: 59 },
        { long: 38, lat: 8 },
        { long: -7, lat: 62 },
        { long: 175, lat: -18 },
        { long: 26, lat: 64 },
        { long: 2, lat: 46 },
        { long: -53, lat: 4 },
        { long: 11.75, lat: -1 },
        { long: -16.56666666, lat: 13.46666666 },
        { long: 43.5, lat: 42 },
        { long: 9, lat: 51 },
        { long: -2, lat: 8 },
        { long: -5.35, lat: 36.13333333 },
        { long: 22, lat: 39 },
        { long: -40, lat: 72 },
        { long: -61.66666666, lat: 12.11666666 },
        { long: -61.583333, lat: 16.25 },
        { long: 144.78333333, lat: 13.46666666 },
        { long: -90.25, lat: 15.5 },
        { long: -2.58333333, lat: 49.46666666 },
        { long: -10, lat: 11 },
        { long: -15, lat: 12 },
        { long: -59, lat: 5 },
        { long: -72.41666666, lat: 19 },
        { long: 12.45, lat: 41.9 },
        { long: -86.5, lat: 15 },
        { long: 20, lat: 47 },
        { long: -18, lat: 65 },
        { long: 77, lat: 20 },
        { long: 120, lat: -5 },
        { long: 44, lat: 33 },
        { long: -8, lat: 53 },
        { long: 34.75, lat: 31.5 },
        { long: 12.83333333, lat: 42.83333333 },
        { long: -77.5, lat: 18.25 },
        { long: 138, lat: 36 },
        { long: -2.16666666, lat: 49.25 },
        { long: 36, lat: 31 },
        { long: 68, lat: 48 },
        { long: 38, lat: 1 },
        { long: 45.75, lat: 29.5 },
        { long: 75, lat: 41 },
        { long: 25, lat: 57 },
        { long: 35.83333333, lat: 33.83333333 },
        { long: -9.5, lat: 6.5 },
        { long: 17, lat: 25 },
        { long: 9.53333333, lat: 47.26666666 },
        { long: 24, lat: 56 },
        { long: 6.16666666, lat: 49.75 },
        { long: 47, lat: -20 },
        { long: 34, lat: -13.5 },
        { long: 112.5, lat: 2.5 },
        { long: 73, lat: 3.25 },
        { long: -4, lat: 17 },
        { long: 14.58333333, lat: 35.83333333 },
        { long: -61, lat: 14.666667 },
        { long: -12, lat: 20 },
        { long: 57.55, lat: -20.28333333 },
        { long: 45.16666666, lat: -12.83333333 },
        { long: -102, lat: 23 },
        { long: 7.4, lat: 43.73333333 },
        { long: 105, lat: 46 },
        { long: 19.3, lat: 42.5 },
        { long: -5, lat: 32 },
        { long: 35, lat: -18.25 },
        { long: 17, lat: -22 },
        { long: 84, lat: 28 },
        { long: 5.75, lat: 52.5 },
        { long: 174, lat: -41 },
        { long: -85, lat: 13 },
        { long: 8, lat: 16 },
        { long: 8, lat: 10 },
        { long: 10, lat: 62 },
        { long: 57, lat: 21 },
        { long: 70, lat: 30 },
        { long: -80, lat: 9 },
        { long: 147, lat: -6 },
        { long: -58, lat: -23 },
        { long: -76, lat: -10 },
        { long: 122, lat: 13 },
        { long: 20, lat: 52 },
        { long: -8, lat: 39.5 },
        { long: -66.5, lat: 18.25 },
        { long: 51.25, lat: 25.5 },
        { long: 25, lat: 46 },
        { long: 30, lat: -2 },
        { long: -62.75, lat: 17.33333333 },
        { long: -60.96666666, lat: 13.88333333 },
        { long: -61.2, lat: 13.25 },
        { long: 12.41666666, lat: 43.76666666 },
        { long: 7, lat: 1 },
        { long: 45, lat: 25 },
        { long: -14, lat: 14 },
        { long: 21, lat: 44 },
        { long: 55.66666666, lat: -4.58333333 },
        { long: -11.5, lat: 8.5 },
        { long: 103.8, lat: 1.36666666 },
        { long: 19.5, lat: 48.66666666 },
        { long: 14.81666666, lat: 46.11666666 },
        { long: 49, lat: 10 },
        { long: 24, lat: -29 },
        { long: 30, lat: 7 },
        { long: -4, lat: 40 },
        { long: 81, lat: 7 },
        { long: 30, lat: 15 },
        { long: -56, lat: 4 },
        { long: 15, lat: 62 },
        { long: 8, lat: 47 },
        { long: 100, lat: 15 },
        { long: 125.91666666, lat: -8.83333333 },
        { long: 1.16666666, lat: 8 },
        { long: -61, lat: 11 },
        { long: 9, lat: 34 },
        { long: 35, lat: 39 },
        { long: 32, lat: 1 },
        { long: 32, lat: 49 },
        { long: 54, lat: 24 },
        { long: -56, lat: -33 },
        { long: 64, lat: 41 },
        { long: -13, lat: 24.5 },
        { long: 48, lat: 15 },
        { long: 30, lat: -15 },
        { long: 30, lat: -20 },
        { long: -97, lat: 38},
        { long: 100, lat: 60}
    ];

    d3.json("https://corona.lmao.ninja/v2/countries?yesterday&sort", function (data) {
        
    });

        // d3.select("#map")
        //     .select("svg")
        //     .selectAll("myCircles")
        //     .data(coords)
        //     .enter()
        //     .append("g")
        //     .selectAll("circle")
        //     .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
        //     .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
        //     .attr("r", 15)
        //     .style("fill", "purple")
        //     .attr("stroke", "red")
        //     .attr("stroke-width", 1)
        //     .attr("fill-opacity", .3)


    function update() {
        d3.selectAll("circle")
            .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
    }

    map.on("moveend", update)
    
});