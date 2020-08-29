// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);

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


// Adding streets tile layer to the map
// streets.addTo(map);


// Add GeoJSON data.  Airport GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/GR8505/Mapping_Earthquakes/master/torontoRoutes.json";


// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

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

// d3.json(torontotData).then(function(data) {
// 	console.log(data);
	
// 	// Creating a GeoJSON layer with the retrieved data
// 	L.geoJson(data,{
// 		color: "#ffffa1",
// 		weight: 2,
// 		onEachFeature: function(feature, layer) {
// 			console.log(layer);
// 			layer.bindPopup("<h2> Airline: " + feature.properties.airline + 
// 			"</h2> <hr> <h3>Destination: " + feature.properties.dst);
// 		}
// 	}).addTo(map);
// });


// L.geoJSON(sanFranAirport).addTo(map);


// pointToLayer callback function()
// L.geoJSON(sanFranAirport, {
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country);
//     }
// }).addTo(map);

// onEachFeature callback function()
// L.geoJson(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h2> <hr> Airport code: " + feature.properties.faa + "</h2> <hr> <h3>Airport name: " + feature.properties.name);
//     }
// }).addTo(map);

// Coordinates for each point to be used in the line.

// let line = [
// 	[37.6213, -122.3790],
// 	[30.1975, -97.6664],
// 	[43.6777, -79.6248],
// 	[40.6413, -73.7781]
//   ];

// Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
// 	color: "blue",
// 	lineweight: 4,
// 	fillOpacity: 0.5,
// 	dashArray: '20, 20'
//   }).addTo(map);


// Get data from cities.js file
// let cityData = cities;


// Loop through the cities array and create one marker for each city
// cityData.forEach(function(city) {
// 	console.log(city)
// 	L.circleMarker(city.location, {
// 		radius: city.population/200000,
// 		color: 'orange',
// 		lineweight: 4
// 	})
// 	.bindPopup("<h2>" + city.city + "," + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//    .addTo(map);
// });

// Adding a marker for Los Angeles, California
// let marker = L.circle([33.9416, -118.4085]).addTo(map);

// Adding a circle as a marker for LA, California
// let marker = L.circleMarker([34.0522, -118.2437], {
// 	color: 'black',
//     fillColor: '#ffffa1',
//     fillOpacity: 0.5,
// 	radius: 100
// }).addTo(map);



// // Create the map object with a center and zoom level.
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });



// Adding tile layer for the map
// let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
// 	maxZoom: 18,
// 	// id: 'mapbox.streets',
// 	accessToken: API_KEY
// });

// Adding 'graymap' tile layer to the map
// streets.addTo(map);
