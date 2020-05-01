const req = new XMLHttpRequest();

req.open('GET', 'https://restcountries.eu/rest/v2/all');
req.send();

document.addEventListener("DOMContentLoaded", () => {
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

    let coords = [];

    req.onload = function () {
        const info = JSON.parse(req.responseText);
        let countries = document.getElementById('country');
        let names = countries.childNodes.forEach(el => {
            return el.text
        });

        console.log(countries);

        info.forEach((el, idx) => {
            
        });
    }
    
    // var coords = [
    //     { long: 9.083, lat: 42.149 }, // corsica
    //     { long: 7.26, lat: 43.71 }, // nice
    //     { long: 2.349, lat: 48.864 }, // Paris
    //     { long: -1.397, lat: 43.664 }, // Hossegor
    //     { long: 3.075, lat: 50.640 }, // Lille
    //     { long: -3.83, lat: 48 }, // Morlaix
    // ];

    // Select the svg area and add circles:
    d3.select("#map")
        .select("svg")
        .selectAll("myCircles")
        .data(coords)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
        .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
        .attr("r", 14)
        .style("fill", "purple")
        .attr("stroke", "red")
        .attr("stroke-width", 1)
        .attr("fill-opacity", .3)

    // Function that update circle position if something change
    function update() {
        d3.selectAll("circle")
            .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
    }

    // If the user change the map (zoom or drag), I update circle position:
    map.on("moveend", update)

});