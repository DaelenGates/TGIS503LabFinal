// JS for map1
var map = L.map('map').setView([47.2452,-122.4582],12);
  // Basemap initiation
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoiZGFlbGVuZyIsImEiOiJjbGE4MnNpbjQwMHgxM29vMG1xNXA0YjR3In0.1m-yZapuOVRg2zWL8fimbw',
}).addTo(map);

// add custom parks logo
var leaf = L.icon({
      iconUrl: 'garden.png',

      iconSize:     [100, 95] // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
      // shadowAnchor: [4, 62],  // the same for the shadow
      // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


    // this adds arsenic projections onto map1 changing color depending on the predicted arsenic ppms
    var nam = 1; // this was a tester to see if the nam variable was changed by the end
var arse = L.geoJson(ars,{
      interactive: false,
      PointToLayer: function(feature, latlng){
        // This was a failed attempt to create a variable out of the Name feild of the arse layer
        // var nam = (feature.properties.NAME);
        // nam.bindPopup("hi");
        // console.log('hihi');
        // return nam;
      },
      // marker.bindPopup('hi');
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

// adding garden maps as a variable so they can be split up by the clustering plugin
var gardens = L.geoJson(gar, {
    //   // primary way of showing pop up on garden
      pointToLayer: function(feature, latlng){
      var marker = L.marker(latlng, {icon: leaf});
      // add if statments for arsenic levels
      if (feature.properties.NAME == "Under 20 ppm"){
        marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Asenic Levels: " + feature.properties.NAME + '<br>' + '<br>' + "Recomondations: It is likely safe to garden here based on predicted Arsenic Levels.");
      }
      if (feature.properties.NAME == "20 ppm to 40 ppm"){
        marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Asenic Levels: " + feature.properties.NAME + '<br>' + '<br>' + "Recomondations: Do not garden directly in soil, Use raised beds with lining under the bed. Wet ground soil if you plan on digging anywhere to prevent dust inhalation." + '<br>' + '<a href="https://ecology.wa.gov/Spills-Cleanup/Contamination-cleanup/Dirt-Alert-program/Gardening-tips" target="_blank">additional information</a>');
      }
      if (feature.properties.NAME == "40.1 ppm to 100 ppm"){
        marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Asenic Levels: " + feature.properties.NAME + '<br>' + '<br>' + "Recomondations: Do not garden directly in soil, use raised beds with lining under the bed. Wet ground soil if you plan on digging anywhere to prevent dust inhalation." + '<br>' + '<a href="https://ecology.wa.gov/Spills-Cleanup/Contamination-cleanup/Dirt-Alert-program/Gardening-tips" target="_blank">additional information</a>');
      }
      if (feature.properties.NAME == "Over 100 ppm"){
        marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Asenic Levels: " + feature.properties.NAME + '<br>' + '<br>' + "Recomondations: Do not garden directly in soil, use raised beds with lining under the bed. Wet ground soil if you plan on digging anywhere to prevent dust inhalation. USE EXTREME CAUTION, VERY HIGH LEVELS OF ARSENIC" + '<br>' + '<a href="https://ecology.wa.gov/Spills-Cleanup/Contamination-cleanup/Dirt-Alert-program/Gardening-tips" target="_blank">additional information</a>');
      }
      // else{
      //   marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Asenic Levels: " + feature.properties.NAME + '<br>' + "N/A");
      // }
      console.log(nam);
      return marker;
      }
    // second way of adding popup
    // onEachFeature: function(f, l){
    //   l.bindPopup(gar.f.properties.Garden_Nam);
    // }

});


// this adds the clustering version of gardens to map1
var clusters = L.markerClusterGroup({showCoverageOnHover: false});
clusters.addLayer(gardens);
// clusters.addLayer(arse);
map.addLayer(clusters);

// trying to get popup to show informatino from two layers using featureGroup !!! FAILD
// var group = L.featureGroup([clusters, arse], {
//   intaractive: true,
//   onEachFeature: function(f, l){
//     l.bindPopup(f.properties.Garden_Nam);
//     console.log('hi');
//
//   }
// })

  // .bindPopup('clusters.feature.properties.Garden_Nam')
  // .on('click', function(feature) { alert('Clicked on a group!'); })
  // .addTo(map);

// attempt to display feature data using .on('click') method !!! FAILD
// arse.on('click', function(e, feature, arse) {
//   L.geoJson(ars,{
//        pointToLayer: function (feature, latlong){
//          var sam = ('feature.properties.NAME');
//          return sam;
//        }
//
//      })
//      var ptcoords = e.latlng;
//      // var sam = e.arse.features.properties.NAME;
//      L.popup()
//         // .setContent(container)
//         .setLatLng(e.latlng)
//         .openOn(map);
//     console.log(e.latlng),
//     console.log(ptcoords);
//
//   })


    // console.log(feature.properties.Garden_Nam),
    // console.log(gar.properties.Garden_Nam);

    // map.eachLayer(function(ars){
    //     // console.log(arse.properties.NAME);
    // })
  // });

// This adds the legends to map1
var Legend = L.control.legend({
  title: " ",
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

// Legend for the Asenic part of the map
var Legend2 = L.control.legend({
  title: "Levels of Arsenic (PPM)",
  position:"bottomleft",
  opacity: 0.6,
  legends:[
    {
      label:"Under 20 PPM",
      type: "rectangle",
      color: '#74a9cf',
      fillOpacity: "0.8",
      weight: 4
    },
    {
      label:"20 to 40 PPM",
      type: "rectangle",
      color: '#fecc5c',
      fillOpacity: "0.8",
      weight: 4
    },
    {
      label:"40.1 to 100 PPm",
      type: "rectangle",
      color: '#fd8d3c',
      fillOpacity: "0.8",
      weight: 4
    },
    {
      label:"Over 100 PPM",
      type: "rectangle",
      color: '#bd0026',
      fillOpacity: "0.8",
      weight: 4
    },
    {
      label:"Unknown or undefined PPM",
      type: "rectangle",
      color: 'grey',
      fillOpacity: "0.8",
      weight: 4
    },
  ]
}).addTo(map);


// JS for map2

var map2 = L.map('map2').setView([47.2452,-122.4582],12);
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
      var LdRsk = feature.properties.LdRsk;
      var LdRskR = Math.round(LdRsk);
      // Add if statements here on LdRsk (lead risk)
      if(feature.properties.LdRsk <= 100){
        marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Percent chance of heavy lead risk: " + LdRskR + "%" + '<br>' + '<br>' + "Recomondations: Do not garden directly in soil, use raised beds with lining under the bed. Wet ground soil if you plan on digging anywhere to prevent dust inhalation. USE EXTREME CAUTION, NEAR GARENTEED CHANCE OF LEAD." + '<br>' + '<a href="https://ecology.wa.gov/Spills-Cleanup/Contamination-cleanup/Dirt-Alert-program/Gardening-tips" target="_blank">additional information</a>'
        );
      }
      if(feature.properties.LdRsk <= 90){
        marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Percent chance of heavy lead risk: " + LdRskR + "%" + '<br>' + '<br>'  + "Recomondations: Do not garden directly in soil, use raised beds with lining under the bed. Wet ground soil if you plan on digging anywhere to prevent dust inhalation. USE EXTREME CAUTION, NEAR GARENTEED CHANCE OF LEAD." + '<br>' + '<a href="https://ecology.wa.gov/Spills-Cleanup/Contamination-cleanup/Dirt-Alert-program/Gardening-tips" target="_blank">additional information</a>');
      }
      if(feature.properties.LdRsk <= 77){
        marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Percent chance of heavy lead risk: " + LdRskR + "%" + '<br>' + '<br>'  + "Recomondations: Do not garden directly in soil, use raised beds with lining under the bed. Wet ground soil if you plan on digging anywhere to prevent dust inhalation. USE EXTREME CAUTION, VERY HIGH CHANCE OF LEAD." + '<br>' + '<a href="https://ecology.wa.gov/Spills-Cleanup/Contamination-cleanup/Dirt-Alert-program/Gardening-tips" target="_blank">additional information</a>');
      }
      if(feature.properties.LdRsk <= 57){
        marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Percent chance of heavy lead risk: " + LdRskR + "%" + '<br>' + '<br>'  + "Recomondations: Do not garden directly in soil, use raised beds with lining under the bed. Wet ground soil if you plan on digging anywhere to prevent dust inhalation. USE EXTREME CAUTION, HIGH CHANCE OF LEAD." + '<br>' + '<a href="https://ecology.wa.gov/Spills-Cleanup/Contamination-cleanup/Dirt-Alert-program/Gardening-tips" target="_blank">additional information</a>');
      }
      if(feature.properties.LdRsk <= 31){
        marker.bindPopup("Garden name: " + feature.properties.Garden_Nam + '<br>' + "Percent chance of heavy lead risk: " + LdRskR + "%" + '<br>' + '<br>'  + "Recomondations: Probably do not garden directly in soil, use raised beds with lining under the bed. Wet ground soil if you plan on digging anywhere to prevent dust inhalation. Exersice caution." + '<br>' + '<a href="https://ecology.wa.gov/Spills-Cleanup/Contamination-cleanup/Dirt-Alert-program/Gardening-tips" target="_blank">additional information</a>');
      }
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

var Legend2 = L.control.legend({
  title: "Percent chance of significant lead levels",
  position:"bottomleft",
  opacity: 0.6,
  legends:[
    {
      label:"Under 31%",
      type: "rectangle",
      color: '#ffffb2',
      fillOpacity: "0.8",
      weight: 4
    },
    {
      label:"31% <= 57%",
      type: "rectangle",
      color: '#fecc5c',
      fillOpacity: "0.8",
      weight: 4
    },
    {
      label:"57% <= 77%",
      type: "rectangle",
      color: '#fd8d3c',
      fillOpacity: "0.8",
      weight: 4
    },
    {
      label:"77% <= 90%",
      type: "rectangle",
      color: '#f03b20',
      fillOpacity: "0.8",
      weight: 4
    },
    {
      label:"90% <= 100%",
      type: "rectangle",
      color: '#bd0026',
      fillOpacity: "0.8",
      weight: 4
    },
  ]
}).addTo(map2);
