// Add console.log to check to see if our code is working.
console.log("working");

// Create tile layer for the streets map background of the map
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	// id: 'mapbox.streets',
	accessToken: API_KEY
});

// Create tile layer for the dark view background of the map
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


// Creating base layer that holds both maps
let baseMaps = {
	Day: day,
	Night: night
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [44.0, -80.0],
	zoom: 2,
	layers: [day]
})

// Pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps).addTo(map);


// Add GeoJSON data.  Airport GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/GR8505/Mapping_Earthquakes/master/torontoRoutes.json";


// Creating a style for the lines
let myStyle = {
	color: "#ffffa1",
	weight: 2
}

// Grabbing GeoJSON data
d3.json(torontoData).then(function(data) {
	console.log(data);
	
	// Creating a GeoJSON layer with the retrieved data
	L.geoJson(data, {
		style: myStyle,
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: "
			+ feature.properties.dst + "</h3>");
		}
	}).addTo(map);
});

