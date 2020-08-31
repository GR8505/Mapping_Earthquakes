// Add console.log to check to see if our code is working.
console.log("working");

// Create tile layer for the streets map background of the map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create tile layer for the satellite streets view background of the map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
});

// Creating base layer that holds both maps
let baseMaps = {
	"Streets": streets,
	"Satellite": satelliteStreets
};

// Creating earthquake layer for the map
let earthquakes = new L.layerGroup();

// Defining object that contains the overlays
let overlays = {
	Earthquakes: earthquakes
};


// Pass our map layers into our layers control and add the layers control to the map
L.control.layers(baseMaps, overlays).addTo(map);


// Grabbing GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
	console.log(data);
	// Style data
	function styleInfo(feature) {
		return {
		  opacity: 1,
		  fillOpacity: 1,
		  fillColor: getColor(feature.properties.mag),
		  color: "#000000",
		  radius: getRadius(feature.properties.mag),
		  stroke: true,
		  weight: 0.5
		};
	}

	// This getColor() function determines the color of the circle based on magnitude
	function getColor(magnitude) {
		if (magnitude > 5) {
		  return "#ea2c2c";
		}
		if (magnitude > 4) {
		  return "#ea822c";
		}
		if (magnitude > 3) {
		  return "#ee9c00";
		}
		if (magnitude > 2) {
		  return "#eecc00";
		}
		if (magnitude > 1) {
		  return "#d4ee00";
		}
		return "#98ee00";
	}


	function getRadius(magnitude) {
		if (magnitude === 0) {
			return 1;
		}
		return magnitude * 4;
	}

	L.geoJson(data, {
		pointToLayer: function(feature, latlng) {
			console.log(data);
			return L.circleMarker(latlng);
		},
	// Setting the style for each circleMarker with styleInfo function
	style: styleInfo,
	// Creating popup for each circleMarker to display the magnitude and location of the earthquake
		onEachFeature: function(feature, layer) {
			layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
		}
	}).addTo(earthquakes);

	// Adding earthquake layer to map
	earthquakes.addTo(map);


	// Create a legend control object
	let legend = L.control({
		position: "bottomright"
	});
	  
	//Adding the details for the legend
	legend.onAdd = function() {
		let div = L.DomUtil.create("div", "info legend");
	// };

	// Creating earthquake magnitudes array
	const magnitudes = [0, 1, 2, 3, 4, 5];
	const colors = [
		"#98ee00",
		"#d4ee00",
		"#eecc00",
		"#ee9c00",
		"#ea2c2c"
	];

	// Looping through intervals to generate a label with a colored square for each interval
	for (var i = 0; i < magnitudes.length; i++) {
		console.log(colors[i]);
		div.innerHTML +=
		"<i style= 'background: " + colors[i] + " '></i> " +
		magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i +1] + "<br>" : "+" );
	}
	return div;
};

legend.addTo(map);

});

