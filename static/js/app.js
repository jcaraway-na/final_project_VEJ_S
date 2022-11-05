import { get_yesterdays_data, spGetHistoricalTrafficData, spRollingSumByIssue, spGetTrafficIssues, spGetDayOfWeek, spIncidentSeverity } from '../js/api_calls.js';
import { trafficIncidentColor } from '../js/colors.js';

var endDate = formatDate(new Date());
var startDate = formatDate(getPreviousDay());
var colNames = ['auto_ped', 'blocked_driv_hwy', 'collision', 'collision_private_property', 'collision_with_injury', 'collisn_lvng_scn',
'crash_service', 'crash_urgent', 'loose_livestock', 'stalled_vehicle', 'traffic_hazard', 'trfc_hazd_debris', 'vehicle_fire'];

//#region page loader spinner
let loader = document.querySelector(".loader-big");
loader.style.display = "flex";
loader.style.height = '100vh'
loader.style.width = '100vw'
//#endregion

async function init(startDate, endDate) {

    // Historical issue count chart to right of the map
    var data = await spGetHistoricalTrafficData(formatDate(getPreviousDay()), formatDate(new Date()));
    await yesterdayIncidentsPlot(data, 'pdata', 'historical_issue_count', 'issue_reported', 'bar', 'h');

    // Day of Week chart
    var data = await spGetDayOfWeek(formatDate(getPreviousDay()), formatDate(new Date()));
    await yesterdayIncidentsPlot(data, 'dayofweek', 'day_of_week', 'issue_count', 'bar', 'v');

    // Rolling Sum by Issue
    var data = await spRollingSumByIssue(formatDate(getPreviousDay()), formatDate(new Date()));
    await yesterdayIncidentsPlot(data, 'rollingsumissues', 'published_date', 'crash_service', 'line', 'v');
    for (var i = 0; i < colNames.length; i++){
        await addIncidentsToPlot(data, 'rollingsumissues','published_date',colNames[i], 'line', 'v');
    }

    // Incident Severity
    // var data = await spIncidentSeverity(formatDate(getPreviousDay()),formatDate(new Date()));
    // await yesterdayIncidentsPlot(data, 'incidentseverity', 'crash_date', 'avg_crash_sev', 'line', 'v');

    await loadIncidentTable(formatDate(getPreviousDay()), formatDate(new Date()));
}

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 6);

    return previous;
}

function formatDate(date) {
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

async function yesterdayIncidentsPlot(data, div, xlabel, ylabel, type, orientation) {
    var x = [], y = [], c = [];
    var row;
    let trace = [];

    if (div === 'rollingsumissues') {
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            x.push(row[xlabel]);
            y.push(row[ylabel]);
        }

        trace = [{
            x: x,
            y: y,
            type: type,
            name: ylabel,
            orientation: `${orientation}`,
            marker: {
                color: trafficIncidentColor(ylabel),
                size: 8
            }
        }];
    }
    else {
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            x.push(row[xlabel]);
            y.push(row[ylabel]);
            c.push(trafficIncidentColor(row[ylabel]));
        }

        trace = [{
            x: x,
            y: y,
            type: type,
            orientation: `${orientation}`,
            marker: {
                color: c,
                size: 8
            }
        }];
    }






    if (div === 'pdata') {
        var layout = {
            xaxis: {
                title: xlabel,
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: ylabel,
                gridcolor: 'rgba(0,0,0,.2)',
            },

            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 600,
            margin: {
                l: 200,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
            },
        }
    }
    else if (div === 'dayofweek') {
        var layout = {
            xaxis: {
                title: xlabel,
                gridcolor: 'rgba(0,0,0,.2)',
                autorange: 'reversed'
            },
            yaxis: {
                title: ylabel,
                gridcolor: 'rgba(0,0,0,.2)',
            },

            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 300,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
            },
        }
    }
    else if (div === 'rollingsumissues') {
        var layout = {
            xaxis: {
                title: xlabel,
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: ylabel,
                gridcolor: 'rgba(0,0,0,.2)',
            },

            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'bottom',
                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 450,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
            },
        }
    }
    else if (div === 'incidentseverity') {
        var layout = {
            xaxis: {
                title: xlabel,
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: ylabel,
                gridcolor: 'rgba(0,0,0,.2)',
            },

            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 300,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
            },
        }
    }
    var config = { responsive: true };
    Plotly.newPlot(div, trace, layout, config);
}

async function addIncidentsToPlot(data, div, xlabel, ylabel, type, orientation) {

    var x = [], y = [], c = [];
    var row;
    let trace = [];

    if (div === 'rollingsumissues') {
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            x.push(row[xlabel]);
            y.push(row[ylabel]);
        }

        trace = [{
            x: x,
            y: y,
            type: type,
            name: ylabel,
            orientation: 'v',
            marker: {
                color: trafficIncidentColor(ylabel),
                size: 8
            }
        }];
        
    }
    else {
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            x.push(row[xlabel]);
            y.push(row[ylabel]);
            c.push(trafficIncidentColor(row[ylabel]));
        }

        trace = [{
            x: x,
            y: y,
            type: type,
            orientation: `${orientation}`,
            marker: {
                color: c,
                size: 8
            }
        }];
    }

    Plotly.addTraces(div, trace);
}
async function filterDateData() {
    if (document.getElementById("startdate").value !== "") {
        if (document.getElementById("enddate").value !== "") {
            startDate = document.getElementById("startdate").value;
            endDate = document.getElementById("enddate").value;

            // Historical issue count chart to right of the map
            var data = await spGetHistoricalTrafficData(startDate, endDate);
            await yesterdayIncidentsPlot(data, 'pdata', 'historical_issue_count', 'issue_reported', 'bar', 'h')

            // Day of Week chart
            var data = await spGetDayOfWeek(startDate, endDate);
            await yesterdayIncidentsPlot(data, 'dayofweek', 'day_of_week', 'issue_count', 'bar', 'v')

            // Rolling Sum by Issue
            var data = await spRollingSumByIssue(startDate, endDate);
            await yesterdayIncidentsPlot(data, 'rollingsumissues', 'published_date', 'crash_service', 'line', 'v');
            for (var i = 0; i < colNames.length; i++){
                await addIncidentsToPlot(data, 'rollingsumissues','published_date',colNames[i], 'line', 'v');
            }

            // Incident Severity
            // var data = await spIncidentSeverity(formatDate(getPreviousDay()), formatDate(new Date()));
            // await yesterdayIncidentsPlot(data, 'incidentseverity', 'crash_date', 'avg_crash_sev', 'line', 'v')
            


            await loadIncidentTable(formatDate(getPreviousDay()), formatDate(new Date()));
        }
        else {
            alert('shits blank!')
        }
    }
    else {
        alert('shits blank!')
    }

}

async function loadIncidentTable(startDate, endDate) {
    var today = new Date(endDate).toISOString();
    var yesterday = new Date(startDate).toISOString();
    let issue;
    let crashes = await get_yesterdays_data(`${yesterday}`, `${today}`);
    var Table = document.getElementById("mytablebody");
    Table.innerHTML = "";
    for (var i in crashes) {
        issue = trafficIncidentColor(crashes[i].issue_reported);
        var row = `<tr style="background-color:${issue};">
                        <td>${crashes[i].issue_reported}</td>
                        <td>${crashes[i].published_date}</td>
                        <td>${crashes[i].traffic_report_status}</td>
                        <td>${crashes[i].latitude}</td>
                        <td>${crashes[i].longitude}</td>
                        <td>${crashes[i].address}</td>
                    </tr>`;
        var table = $(`#incidenttable`);

        table.append(row);

    }
}

document.getElementById('filter-btn').addEventListener('click',
    filterDateData);

await init(startDate, endDate);

//#region close page loader spinner
loader.style.display = "none";
loader.style.height = '0vh'
loader.style.width = '0vw'
//#endregion