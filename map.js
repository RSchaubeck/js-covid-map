document.addEventListener("DOMContentLoaded", () => {
    const corner1 = L.latLng(-70, -180);
    const corner2 = L.latLng(75, 180);
    const boundary = L.latLngBounds(corner1, corner2);
    
    const map = L.map('map')
        .setView([15, 10], 2)
        .setMaxBounds(boundary);

    

    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxBoundsViscosity: 1.0,
        minZoom: 2,
        maxZoom: 5
    }).addTo(map);
});