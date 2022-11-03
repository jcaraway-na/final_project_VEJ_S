import { get_yesterdays_data,spGetHistoricalTrafficData, spRollingSumByIssue, spGetTrafficIssues, spGetDayOfWeek, spIncidentSeverity } from '../js/api_calls.js';
import { trafficIncidentColor } from '../js/colors.js';

var endDate = formatDate(new Date());
var startDate = formatDate(getPreviousDay());

async function init(startDate, endDate) {

    // Historical issue count chart to right of the map
    var data = await spGetHistoricalTrafficData(formatDate(getPreviousDay()),formatDate(new Date()));
    await yesterdayIncidentsPlot(data, 'pdata', 'historical_issue_count', 'issue_reported', 'bar', 'h');

    // Day of Week chart
    var data = await spGetDayOfWeek();
    await yesterdayIncidentsPlot(data, 'dayofweek', 'day_of_week', 'issue_count', 'bar', 'v');

    // Rolling Sum by Issue
    var data = await spRollingSumByIssue(formatDate(getPreviousDay()),formatDate(new Date()));
    await yesterdayIncidentsPlot(data, 'rollingsumissues', 'published_date', 'crash_service', 'line', 'v');

    // Incident Severity
    var data = await spIncidentSeverity(formatDate(getPreviousDay()),formatDate(new Date()));
    await yesterdayIncidentsPlot(data, 'incidentseverity', 'crash_date', 'avg_crash_sev', 'line', 'v');

    await loadIncidentTable(formatDate(getPreviousDay()),formatDate(new Date()));
}

function getPreviousDay(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 1);

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
    var x = [], y = [], c=[];
    var row

    for (var i = 0; i < data.length; i++) {
        row = data[i];
        x.push(row[xlabel]);
        y.push(row[ylabel]);
        c.push(trafficIncidentColor(row[ylabel]));
    }

    let trace = [];

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
    else if(div === 'dayofweek'){
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
    else if(div === 'rollingsumissues'){
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
    else if(div === 'incidentseverity'){
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
    Plotly.newPlot(div,trace, layout, config);
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
            var data = await spGetDayOfWeek();
            await yesterdayIncidentsPlot(data, 'dayofweek', 'day_of_week', 'issue_count', 'bar', 'v')

            // Rolling Sum by Issue
            var data = await spRollingSumByIssue(startDate, endDate);
            await yesterdayIncidentsPlot(data, 'rollingsumissues', 'published_date', 'crash_service', 'line', 'v')

            // Incident Severity
            var data = await spIncidentSeverity(formatDate(getPreviousDay()),formatDate(new Date()));
            await yesterdayIncidentsPlot(data, 'incidentseverity', 'crash_date', 'avg_crash_sev', 'line', 'v')

            await loadIncidentTable(formatDate(getPreviousDay()),formatDate(new Date()));
        }
        else {
            alert('shits blank!')
        }
    }
    else {
        alert('shits blank!')
    }

}

async function loadIncidentTable(startDate,endDate){
    var today = new Date(endDate).toISOString();
    var yesterday = new Date(startDate).toISOString();
    let issue;
    let crashes = await get_yesterdays_data(`${yesterday}`,`${today}`);
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

