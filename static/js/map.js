import { get_yesterdays_data, spGetHistoricalTrafficData,get_incidents_by_issue } from '../js/api_calls.js';
import { trafficIncidentColor } from '../js/colors.js';
let crashes = [];
let markers = [];
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
	zoom: 10,
	layers: [streets]
});

function clearMarkers() {

}

export async function loadMap(startDate, endDate) {

	// Create a base layer that holds all three maps.
	let baseMaps = {
		"Streets": streets,
		"Satellite": satelliteStreets
	};

	// // 1. Add a 3rd layer group for the crash data.
	// let allIncidents = new L.LayerGroup();

	// // 2. Add a reference to the crash group to the overlays object.
	// let overlays = {
	// 	"Traffic Incidents": allIncidents
	// };

	// Then we add a control to the map that will allow the user to change which
	// layers are visible.
	L.control.layers(baseMaps).addTo(map);

	var today = new Date(endDate).toISOString();
	var yesterday = new Date(startDate).toISOString();

	crashes = await get_yesterdays_data(`${yesterday}`, `${today}`);

	sessionStorage.setItem("crashes", JSON.stringify(crashes));
	var storedCrashes = JSON.parse(sessionStorage.getItem("crashes"));
	function getColor(crashType) {
		return trafficIncidentColor(crashType);
	}

	for (var i in storedCrashes) {
		markers = L.circleMarker([storedCrashes[i].latitude, storedCrashes[i].longitude], {
			opacity: 1,
			fillOpacity: 1,
			draggable: false,
			title: storedCrashes[i].issue_reported,
			fillColor: getColor(storedCrashes[i].issue_reported),
			color: "#000000",
			stroke: true,
			weight: 0.5,
			radius: 6
		}).addTo(map);
	};

}
export async function updateMap(startDate, endDate) {

	// Create a base layer that holds all three maps.
	// let baseMaps = {
	// 	"Streets": streets,
	// 	"Satellite": satelliteStreets
	// };

	// // 1. Add a 3rd layer group for the crash data.
	// let allIncidents = new L.LayerGroup();

	// // 2. Add a reference to the crash group to the overlays object.
	// let overlays = {
	// 	"Traffic Incidents": allIncidents
	// };

	// Then we add a control to the map that will allow the user to change which
	// layers are visible.
	// L.control.layers(baseMaps).addTo(map);

	var today = new Date(endDate).toISOString();
	var yesterday = new Date(startDate).toISOString();
	var storedCrashes = JSON.parse(sessionStorage.getItem("crashes"));


	function getColor(crashType) {
		return trafficIncidentColor(crashType);
	}

	map.remove();

	map = L.map('map', {
		center: [30.2672, -97.7431],
		zoom: 10,
		layers: [streets]
	});

	// Create a base layer that holds all three maps.
	let baseMaps = {
		"Streets": streets,
		"Satellite": satelliteStreets
	};

	L.control.layers(baseMaps).addTo(map);

	var today = new Date(endDate).toISOString();
	var yesterday = new Date(startDate).toISOString();

	crashes = await get_yesterdays_data(`${yesterday}`, `${today}`);

	sessionStorage.setItem("crashes", JSON.stringify(crashes));
	var storedCrashes = JSON.parse(sessionStorage.getItem("crashes"));
	function getColor(crashType) {
		return trafficIncidentColor(crashType);
	}

	for (var i in storedCrashes) {
		markers = L.circleMarker([storedCrashes[i].latitude, storedCrashes[i].longitude], {
			opacity: 1,
			fillOpacity: 1,
			draggable: false,
			title: storedCrashes[i].issue_reported,
			fillColor: getColor(storedCrashes[i].issue_reported),
			color: "#000000",
			stroke: true,
			weight: 0.5,
			radius: 6
		}).addTo(map);
	};

}

export async function updateMapByIssue(startDate, endDate,selectedIssue) {

	// Create a base layer that holds all three maps.
	// let baseMaps = {
	// 	"Streets": streets,
	// 	"Satellite": satelliteStreets
	// };

	// // 1. Add a 3rd layer group for the crash data.
	// let allIncidents = new L.LayerGroup();

	// // 2. Add a reference to the crash group to the overlays object.
	// let overlays = {
	// 	"Traffic Incidents": allIncidents
	// };

	// Then we add a control to the map that will allow the user to change which
	// layers are visible.
	// L.control.layers(baseMaps).addTo(map);

	var today = new Date(endDate).toISOString();
	var yesterday = new Date(startDate).toISOString();


	function getColor(crashType) {
		return trafficIncidentColor(crashType);
	}

	map.remove();

	map = L.map('map', {
		center: [30.2672, -97.7431],
		zoom: 10,
		layers: [streets]
	});

	// Create a base layer that holds all three maps.
	let baseMaps = {
		"Streets": streets,
		"Satellite": satelliteStreets
	};

	L.control.layers(baseMaps).addTo(map);

	var today = new Date(endDate).toISOString();
	var yesterday = new Date(startDate).toISOString();

	crashes = await get_incidents_by_issue(`${yesterday}`, `${today}`,selectedIssue);

	sessionStorage.setItem("crashes", JSON.stringify(crashes));
	var storedCrashes = JSON.parse(sessionStorage.getItem("crashes"));
	function getColor(crashType) {
		return trafficIncidentColor(crashType);
	}

	for (var i in storedCrashes) {
		markers = L.circleMarker([storedCrashes[i].latitude, storedCrashes[i].longitude], {
			opacity: 1,
			fillOpacity: 1,
			draggable: false,
			title: storedCrashes[i].issue_reported,
			fillColor: getColor(storedCrashes[i].issue_reported),
			color: "#000000",
			stroke: true,
			weight: 0.5,
			radius: 6
		}).addTo(map);
	};

}
