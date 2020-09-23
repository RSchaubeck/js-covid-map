async function getCountryinfo() {
    let countries = document.getElementById('country');
    let covidStats = document.getElementById('covid-stats');
    const xhr = new XMLHttpRequest();
    return new Promise(function (resolve, reject) {
        xhr.onload = function () {
            if (xhr.status >= 300) {
                reject(xhr.status)
            } else {
                let stat = covidStats.options[covidStats.selectedIndex].value;
                let divisor;
                switch (stat) {
                    case "cases":
                        divisor = 30000;
                        break;
                    case "deaths":
                        divisor = 2000;
                        break;
                    case "recovered":
                        divisor = 30000;
                        break;
                    case "casesPerOneMillion":
                        divisor = 800;
                        break;
                    case "deathsPerOneMillion":
                        divisor = 20;
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
                    let r = data[i][stat] / divisor
                    r < 3 ? r = 3 : r = r;
                    let coord = { 
                        name: data[i].country,
                        long: data[i].countryInfo.long, 
                        lat: data[i].countryInfo.lat, 
                        radius: r, 
                        cases: data[i].cases, 
                        deaths: data[i].deaths,
                        recovered: data[i].recovered,
                        casesPerOneMillion: data[i].casesPerOneMillion,
                        deathsPerOneMillion: data[i].deathsPerOneMillion
                    };
                    coords.push(coord);
                }
                resolve(coords);
            }
        }
        xhr.open('GET', 'https://corona.lmao.ninja/v2/countries?yesterday&sort');
        xhr.send();
    });
}

let popup = d3.select("body").append("div")
    .attr("class", "popup")
    .style("opacity", 0);

async function drawCircles() {
    let covidStats = document.getElementById('covid-stats');
    let stat = covidStats.options[covidStats.selectedIndex].value
    d3.selectAll("svg > *").remove();
    try {
        let coords = await getCountryinfo();
        d3.select("#map")
            .select("svg")
            .selectAll("myCircles")
            .data(coords)
            .enter()
            .append("circle")
            .attr("pointer-events", "visible")
            .attr("cx", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("cy", function (d) { return map.latLngToLayerPoint([d.lat, d.long]).y })
            .attr("r", function (d) { return d.radius })
            .style("fill", "red")
            .attr("stroke", "red")
            .attr("stroke-width", 1)
            .attr("fill-opacity", .1)
            .on("mouseover", function(d) {
                d3.select(this).transition()
                    .duration('100')
                    .style("fill", "midnightblue")
                    .attr("fill-opacity", .1)
                    .attr("r", function (d) { return d.radius * 1.2 })
                popup.transition()
                    .duration(100)
                    .style("opacity", 1);
                popup.html(d.name + "<br>" + stat + ": " + d[stat])
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    
            })
            .on("mouseout", function() {
                d3.select(this)
                    .attr("r", function (d) { return d.radius })
                    .style("fill", "red")
                    .attr("stroke", "red")
                    .attr("stroke-width", 1)
                    .attr("fill-opacity", .1)
                popup.transition()
                    .duration(100)
                    .style("opacity", 0)
            })
    } catch (err) {
        console.log(err);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    L.svg().addTo(map);

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
            let coord = [data.countryInfo.lat, data.countryInfo.long];
            map.setView(coord, 5);
        }
    }
}