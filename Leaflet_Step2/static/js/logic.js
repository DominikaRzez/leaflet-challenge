// Defininh getColor function to later create legend and markers
function getColor(d){
    return d > 90 ? "#db514f":
          d > 70 ? "#db854f":
          d > 50 ? "#dbac4f":
          d > 30 ? "#dbd24f":
          d > 10 ? "#b6db4f":
                  "#4fdb58";
  }
  
  // Creating the createMap function.
  function createMap(earthquakes) {
  
    // Creating the tile layer that will be the background of the map.
  var lightmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  
    // Creating a baseMaps object to hold the lightmap layer.
  var baseMaps = {
    "Street": lightmap
  };
    // Creating an overlayMaps object to hold the eartquakes layer.
  var overlayMaps = {
    "Earthquakes": earthquakes
  };
  
    // Create the map object with options.
  var myMap = L.map("map", {
    center: [34.11, -107.299],
    zoom: 6,
    layers: [lightmap, earthquakes]
  });
  
    // Creating a layer control, and passing it baseMaps and overlayMaps. 
    //Adding the layer control to the map.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
  
    //Creating legend
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    depths = [0, 10, 30, 50, 70, 90],
    labels = [];
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depths.length; i++) {
      div.innerHTML +=
      '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
      depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }
    return div;
  };
  legend.addTo(myMap);
  };
  
  // Creating the createMarkers function.
  function createMarkers(response) {
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data){
      console.log(data)
    });
  
    // Pulling all of the records for eartquakes from response.
    var incidents = response.features;
  
    // Initialising an array to hold the eartquake markers.
    var earthquakeMarkers = [];
  
    // Looping through the incidents array.
    for (var i = 0; i < incidents.length; i++) {
      // Pulling magnitude and depth details
      var magnitude = incidents[i].properties.mag;
      var depth = incidents[i].geometry.coordinates[2];
      var location = incidents[i].properties.place;
        
        // Creating marker for each eartquake and binding a popup with the earthquake's details
        var EarthquakeMarker = L.circle([incidents[i].geometry.coordinates[1], incidents[i].geometry.coordinates[0]], {
        color: 'black',
        fillColor: getColor(depth),
        fillOpacity: 0.75,
        radius: magnitude * 10000 
      }).bindPopup("<h1> Location: </h1> <h2>" + location + "</h2> <hr> <h2> Magnitude: </h2> <h3>" +
      magnitude + "</h3> <br> <h2> Depth: </h2> <h3>" + depth + "</h3>")
      // Adding the marker to the earthquakeMarkers array.
      earthquakeMarkers.push(EarthquakeMarker)
  }
    // Creating a layer group that's made from the earthquake markers array, 
    //and passing it to the createMap function.
    createMap(L.layerGroup(earthquakeMarkers));
  };
  
  // Performing an API call to the USGS feed to get the earthquake information. 
  //Calling createMarkers when it completes.
  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  d3.json(url).then(createMarkers)
  var platesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
  d3.json(platesURL).then(function (data){
    console.log(data)
  })