// Create a map object
var myMap = L.map("map", {
  center: [48.3544, -99.9981],
  zoom: 3
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// Define a markerSize function that will give a different radius 
// based on the magnitude of the earthquake
function markerSize(mag) {
  return mag * 4;
}

// Function that will determine the color of a circle based on the magnitidue
function getColor(mag) {
  switch (true) {
  case mag > 5:
    return "#BD0026";
  case mag > 4:
    return "#E31A1C";
  case mag >3:
    return "#FC4E2A";
  case mag > 2:
    return "#FD8D3C";
  case mag > 1:
    return "#FEB24C";
  default:
    return "#FED976";
  }
}

// Define the API link
var APILink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
console.log(APILink)

d3.json(APILink, function(response) {
// set a variable to get the length of the features in the response
  var featureLength = response.features.length
    // console.log(response);
  
  for (var i = 0; i < featureLength; i++) {
   
    var location = response.features[i].geometry;
    
     if (location) {
         L.circleMarker(([location.coordinates[1], location.coordinates[0]]), {
        radius: markerSize(response.features[i].properties.mag),
        color: "black",
        fillColor: getColor(response.features[i].properties.mag),
        weight: .1
      }).bindPopup(`<b> Magnitude:  ${response.features[i].properties.mag}</b>
        <br> Place: ${response.features[i].properties.place}`)
        .addTo(myMap);
    }
  }
});

 // Set up the legend
 var legend = L.control({position: 'bottomright'});
 legend.onAdd = function (map) {

 var div = L.DomUtil.create('div', 'info legend');
 var labels = ['<strong>Earthquake<br>Magnitude</strong>'];

 var grades = [0, 1, 2, 3, 4, 5];
 
 // loop through magnitude grades and generate a label with a colored square for each interval
 for (var i = 0; i < grades.length; i++) {
         div.innerHTML += 
         labels.push(
             '<i class="circle" style="background:' + getColor(grades[i]+ 1) + '"></i> ' +
             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] : '+'))
     }
     div.innerHTML = labels.join('<br>');
 return div;
 };

  // Adding legend to the map
 legend.addTo(myMap);