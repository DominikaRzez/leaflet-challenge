// Storing API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  function createMap (earthquakes) {
      //Creating the tile layer that will be the background of the map
      var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  
  });

  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap
  };

  // Create an overlayMaps object to hold the erthquake layer.
  var overlayMaps = {
    "Eartquakes": earthquakes
  };

  // Create the map object with options.
  var map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetmap, earthquakes]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

function createMarkers(response) {
    console.log(response)

    //Pulling the features property from response
    var incidents = response.features

     // Initialize an array to hold bike markers.
     var earthquakeMarkers = []

    // Pulling the magnitude, depth and coordinates from response
    for (var i = 0; i < incidents.length; i++) {
        var incident = incidents[i];
        var magnitude = incident.properties.mag;
        var depth = incident.geometry.coordinates[2];
        var coordinates = [incident.geometry.coordinates[0],incident.geometry.coordinates[1]];
        var earthquakeMarker = L.marker(coordinates)
        earthquakeMarkers.push(earthquakeMarker)
    }
    createMap(L.layerGroup(earthquakeMarkers));
   
  }
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json(queryUrl).then(createMarkers);
