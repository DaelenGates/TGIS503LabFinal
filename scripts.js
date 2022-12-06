// JS for map1
var map = L.map('map').setView([47.2562,-122.4582],12);
  // Basemap initiation
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZGFlbGVuZyIsImEiOiJjbGE4MnNpbjQwMHgxM29vMG1xNXA0YjR3In0.1m-yZapuOVRg2zWL8fimbw',
}).addTo(map);

// attempting to add custom parks logo
var leaf = L.icon({
      iconUrl: 'garden.png',

      iconSize:     [100, 95] // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
// Adding geoJson file?

// adding garden maps as a variable so they can be split up by the clustering plugin
var gardens = L.geoJson(gar, {
      pointToLayer: function(feature, latlng){
      var marker = L.marker(latlng, {icon: leaf});
      // marker.bindPopup("Status: " + feature.properties.Status + "<br>Capacity:" + feature.properties.Capacity);
      return marker;
    }
});

// this adds the clustering version of gardens to map1
var clusters = L.markerClusterGroup({showCoverageOnHover: false});
clusters.addLayer(gardens);
map.addLayer(clusters);

// this adds arsenic projections onto map1 changing color depending on the predicted arsenic ppms
L.geoJson(ars,{
  interactive: false,
  style: function(feature){
    if(feature.properties.NAME == "20 ppm to 40 ppm"){
      return{"color": '#fecc5c'};
    }
    if(feature.properties.NAME == "40.1 ppm to 100 ppm"){
      return{"color": '#fd8d3c'};
    }
    if(feature.properties.NAME == "Over 100 ppm"){
      return{"color": '#bd0026'};
    }
    if(feature.properties.NAME == "Under 20 ppm"){
      return{"color": '#74a9cf'}
    }
    else{
      return{"color": "grey"};
    }
  }
}).addTo(map);

// This adds the legend to map1
var Legend = L.control.legend({
  position:"bottomright",
  opacity: 0.6,
  legends:[
    {
      label:"Community Garden",
      type: "image",
      url: "garden.png",
      fillOpacity: "0.8"
    }
  ]
}).addTo(map);

// JS for map2

var map2 = L.map('map2').setView([47.2562,-122.4582],12);
  // Basemap initiation
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZGFlbGVuZyIsImEiOiJjbGE4MnNpbjQwMHgxM29vMG1xNXA0YjR3In0.1m-yZapuOVRg2zWL8fimbw',
}).addTo(map2);
// adding garden maps as a variable so they can be split up by the clustering plugin to map 2
var gardens = L.geoJson(gar, {
      pointToLayer: function(feature, latlng){
      var marker = L.marker(latlng, {icon: leaf});
      // marker.bindPopup("Status: " + feature.properties.Status + "<br>Capacity:" + feature.properties.Capacity);
      return marker;
    }
});

// this adds the clustering version of gardens to map2
var clusters = L.markerClusterGroup({showCoverageOnHover: false});
clusters.addLayer(gardens);
map2.addLayer(clusters);

// adds possibility of lead geojson to map2 (lead risk by percent)
L.geoJson(lead,{
  interactive: false,
  style: function(feature){
    if(feature.properties.LdRsk <= 31){
      return{"color": '#ffffb2'};
    }
    if(feature.properties.LdRsk <= 57){
      return{"color": '#fecc5c'};
    }
    if(feature.properties.LdRsk <= 77){
      return{"color": '#fd8d3c'};
    }
    if(feature.properties.LdRsk <= 90){
      return{"color": '#f03b20'};
    }
    if(feature.properties.LdRsk <= 100){
      return{"color": '#bd0026'};
    }
    else{
      return{"color": "grey"};
    }
  }
}).addTo(map2);

// This adds the legend to map2
var Legend = L.control.legend({
  position:"bottomright",
  opacity: 0.6,
  legends:[
    {
      label:"Community Garden",
      type: "image",
      url: "garden.png",
      fillOpacity: "0.8"
    }
  ]
}).addTo(map2);
