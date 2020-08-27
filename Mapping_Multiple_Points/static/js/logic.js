// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 14);


// Get data from cities.js file
let cityData = cities;


// Loop through the cities array and create one marker for each city
cityData.forEach(function(city) {
	console.log(city)
	L.circleMarker(city.location, {
		radius: city.population/200000,
		color: 'orange',
		lineweight: 4
	})
	.bindPopup("<h2>" + city.city + "," + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
   .addTo(map);
});

// Adding a marker for Los Angeles, California
// let marker = L.circle([34.0522, -118.2437]).addTo(map);

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
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	// id: 'mapbox.streets',
	accessToken: API_KEY
});

// Adding 'graymap' tile layer to the map
streets.addTo(map);
