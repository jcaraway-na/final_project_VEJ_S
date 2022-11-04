import { get_yesterdays_data,spGetHistoricalTrafficData} from '../js/api_calls.js';
import { makePlotly,addToPlotly} from '../js/global-charts.js';
import { trafficIncidentColor} from '../js/colors.js';
let crashes = [];
var marker;

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
	center: [30.2672, -97.7431],
	zoom: 12,
	layers: [streets]
});

// Create a base layer that holds all three maps.
let baseMaps = {
	"Streets": streets,
	"Satellite": satelliteStreets
  };

// 1. Add a 3rd layer group for the crash data.
let allIncidents = new L.LayerGroup();

// 2. Add a reference to the crash group to the overlays object.
let overlays = {
	"Traffic Incidents": allIncidents
  };

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

function getPreviousDay(date = new Date()) {
	const previous = new Date(date.getTime());
	previous.setDate(date.getDate() - 1);
  
	return previous;
  }

var today = new Date().toISOString();
var yesterday = getPreviousDay().toISOString();

crashes = await get_yesterdays_data(`${yesterday}`,`${today}`);
console.log(crashes);

function getColor(crashType) {
	return trafficIncidentColor(crashType);
}

let legend = L.control({
	position: "bottomright"

});

// legend.addTo(map);

for (var i in crashes) {
	marker = L.circleMarker([crashes[i].latitude, crashes[i].longitude], {
		opacity: 1,
		fillOpacity: 1,
		draggable: false,
		title: crashes[i].issue_reported,
		fillColor: getColor(crashes[i].issue_reported),
		color: "#000000",
		stroke: true,
		weight: 0.5,
		radius: 6
	}).addTo(map);
};

var data;
// async function yesterdayIncidentsPlot(data){
// 	var x=[], y=[];
// 	var row

// 	for(var i = 0; i<data.length;i++){
// 		row=data[i];
// 		x.push(row['historical_issue_count']);
// 		y.push(row['issue_reported']);
// 	}

// 	let trace = [];

// 	trace = [{
//         x: x,
//         y: y,
//         type: 'bar',
// 		orientation: 'h',
//         marker: {
//             color: 'rgba(135, 61, 255, .8',
//             size: 8
//         }
//     }];

// 	var layout = {
// 		xaxis: {
// 			title: 'Incident Count',
// 			gridcolor: 'rgba(0,0,0,.2)'
// 		},
// 		yaxis: {
// 			gridcolor: 'rgba(0,0,0,.2)',
// 		},

// 		showlegend: true,
// 		legend: {
// 			x: 1,
// 			xanchor: 'right',
// 			y: 1
// 		},
// 		paper_bgcolor: 'rgba(0,0,0,0)',
// 		plot_bgcolor: 'rgba(0,0,0,0)',
// 		height: 600,
// 		margin: {
// 			l: 200,
// 			r: 55,
// 			b: 100,
// 			t: 50,
// 			pad: 4

// 		},

// 	}
// 	var config = { responsive: true };
//     Plotly.newPlot('pdata', trace, layout, config);
// }

function formatDate(date){
    // Create a date object from a date string
    var i = new Date(`"${date}"`);

    // Get year, month, and day part from the date
    var year = i.toLocaleString("default", { year: "numeric" });
    var month = i.toLocaleString("default", { month: "2-digit" });
    var day = i.toLocaleString("default", { day: "2-digit" });

    // Generate yyyy-mm-dd date string
    var formattedDate = month + "-" + day + "-" + year;
    return formattedDate;
}

// var data = await spGetHistoricalTrafficData(formatDate(getPreviousDay()),formatDate(new Date()));
// await yesterdayIncidentsPlot(data)
