
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: "pk.eyJ1IjoiY2FyYXdheWptIiwiYSI6ImNsN2d1dmZjcTA4YmMzcHA4enVxbGtrODgifQ._IVUqHpEGZIQuoDLQEzohg"
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: "pk.eyJ1IjoiY2FyYXdheWptIiwiYSI6ImNsN2d1dmZjcTA4YmMzcHA4enVxbGtrODgifQ._IVUqHpEGZIQuoDLQEzohg"
});

// Create the map object with center, zoom level and default layer.
let map = L.map('map', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
  };


  L.control.layers(baseMaps, overlays).addTo(map);



//   for(var i in wells){
//     marker = L.marker([wells[i].lat, wells[i].long], {
//         draggable: true,
//         title: wells[i].wellname
//       }).addTo(myMap);
//   }

  