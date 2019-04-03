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
  return mag * 25000;
}

// Define the API link
var APILink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// console.log(APILink)

d3.json(APILink, function(response) {
// set a variable to get the length of the features in the response
  var featureLength = response.features.length
    // console.log(response);
  
  for (var i = 0; i < featureLength; i++) {
   
    var location = response.features[i].geometry;
    
     if (location) {
         L.circle(([location.coordinates[1], location.coordinates[0]]), {
        radius: markerSize(response.features[i].properties.mag),
        color: "white",
        fillColor: "purple",
        weight: .5}).addTo(myMap);
    }
  }
});

// // Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cities.length; i++) {
//   L.circle(cities[i].location, {
//     fillOpacity: 0.75,
//     color: "white",
//     fillColor: "purple",
//     // Setting our circle's radius equal to the output of our markerSize function
//     // This will make our marker's size proportionate to its population
//     radius: markerSize(cities[i].population)
//   }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);

