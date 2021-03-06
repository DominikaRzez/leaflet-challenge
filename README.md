<h1>Visualizing Data with Leaflet</h1>
<p> The repository contains the visualisation of the earthquake dataset. The informations about all of the eartquakes from the past 7 days have been pulled from <a href = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php">the USGS GeoJSON Feed</a> page. The relevant URL has been used to pull the JSON representation of the data for the visualisation.</p>

<p>The first folder includes JavaScript code that allows to create a map using Leaflet and plot all of the earthquakes from the data set based on their longitude and latitude. Data markers reflect the magnitude of the earthquake by their size and depth of the earthquake by color. Earthquakes with higher magnitudes appear larger and earthquakes with greater depth appear darker in color. When a marker is clicked, the popup with additional information about the earthquake appears. The legend in the bottom right corner provide context for the map data.</p>
<img src="images/basic version.png">

<p>The second JavaScript code adds a number of base maps to choose from as well as separate out two different data sets into overlays that can be turned on and off independently. The second data set illustrates the relationship between tectonic plates and seismic activity. Data on tectonic plates has been pulled from <a href="https://github.com/fraxen/tectonicplates">https://github.com/fraxen/tectonicplates</a>.</p>
<img src="images/optional.png">
