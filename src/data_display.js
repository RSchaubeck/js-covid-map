document.addEventListener("DOMContentLoaded", () => {

    const map = document.getElementById('map')

    // L.svg().addTo(map);

    // Create data for circles:
    var markers = [
        { long: 9.083, lat: 42.149 }, // corsica
        { long: 7.26, lat: 43.71 }, // nice
        { long: 2.349, lat: 48.864 }, // Paris
        { long: -1.397, lat: 43.664 }, // Hossegor
        { long: 3.075, lat: 50.640 }, // Lille
        { long: -3.83, lat: 48 }, // Morlaix
    ];

    // Select the svg area and add circles:
    d3.select("#mapid")
        .select("svg")
        .selectAll("myCircles")
        .data(markers)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
        .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
        .attr("r", 14)
        .style("fill", "red")
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("fill-opacity", .4)

    // Function that update circle position if something change
    function update() {
        d3.selectAll("circle")
            .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
    }

    // If the user change the map (zoom or drag), I update circle position:
    map.on("moveend", update)
});