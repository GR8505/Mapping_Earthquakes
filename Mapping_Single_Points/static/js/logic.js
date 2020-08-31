// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 14);


// Adding a circle as a marker for LA, California
let marker = L.circleMarker([34.0522, -118.2437], {
	color: 'black',
    fillColor: '#ffffa1',
    fillOpacity: 0.5,
	radius: 100
}).addTo(map);


// Adding tile layer for the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	// id: 'mapbox.streets',
	accessToken: API_KEY
});

// Adding 'graymap' tile layer to the map
streets.addTo(map);
