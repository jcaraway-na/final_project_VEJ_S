
var myMap = L.map("map", {
    center: [31.671093, -104.094146],
    zoom: 8.3
  });

  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: "pk.eyJ1IjoiY2FyYXdheWptIiwiYSI6ImNsN2d1dmZjcTA4YmMzcHA4enVxbGtrODgifQ._IVUqHpEGZIQuoDLQEzohg"
  }).addTo(myMap);

//   for(var i in wells){
//     marker = L.marker([wells[i].lat, wells[i].long], {
//         draggable: true,
//         title: wells[i].wellname
//       }).addTo(myMap);
//   }

  