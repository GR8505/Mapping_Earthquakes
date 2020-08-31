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
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


// Creating base layer that holds both maps
let baseMaps = {
	"Streets": streets,
	"Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [43.7, -79.3],
	zoom: 11,
	layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


// Add GeoJSON data.  Airport GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/GR8505/Mapping_Earthquakes/Earthquakes_past7days/torontoNeighborhoods.json";


// Creating a style for the lines
let myStyle = {
	color: "blue",
	fillColor: "yellow",
	weight: 1
}


d3.json(torontoHoods).then(function(data) {
	console.log(data);
	L.geoJSON(data, {
		style: myStyle,
		onEachFeature: function(feature, layer) {
			console.log(layer);
			layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
		}
	}).addTo(map);
});

