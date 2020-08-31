// Add console.log to check to see if our code is working.
console.log("working");


// Create tile layer for the streets map background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	// id: 'mapbox.streets',
	accessToken: API_KEY
});

// Create tile layer for the dark view background of the map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


// Creating base layer that holds both maps
let baseMaps = {
	Street: streets,
	Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [30, 30],
	zoom: 2,
	layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


// Adding streets tile layer to the map
// streets.addTo(map);


// Add GeoJSON data.  Airport GeoJSON URL.
let airportData = "https://raw.githubusercontent.com/GR8505/Mapping_Earthquakes/master/majorAirports.json";



// Grabbing GeoJSON data
d3.json(airportData).then(function(data) {
	console.log(data);
	
	// Creating a GeoJSON layer with the retrieved data
	L.geoJson(data,{
		onEachFeature: function(feature, layer) {
			console.log(layer);
			layer.bindPopup("<h2> <hr>Airport code; " + feature.properties.faa + 
			"</h2> <hr> <h3>Airport name: " + feature.properties.name);
		}
	}).addTo(map);
});

