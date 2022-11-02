import {spGetHistoricalTrafficData,spRollingSumByIssue,spGetTrafficIssues,spGetDayOfWeek,spIncidentSeverity} from '../js/api_calls.js';
import { makePlotly,addToPlotly} from '../js/global-charts.js';

async function init(startDate,endDate){

    await makePlotly(await spRollingSumByIssue(startDate,endDate),'published_date','auto_ped','rollingsumissues','line','h')
    await spGetHistoricalTrafficData(startDate,endDate);
    await spGetTrafficIssues(startDate,endDate);
    await spGetDayOfWeek(-6);
    var data = await spIncidentSeverity(startDate,endDate);
    await yesterdayIncidentsPlot(data,'severity','crash_date','avg_crash_sev','bar','v')
}

function getPreviousDay(date = new Date()) {
	const previous = new Date(date.getTime());
	previous.setDate(date.getDate() - 1);
  
	return previous;
  }

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
var endDate = formatDate(new Date());
var startDate = formatDate(getPreviousDay());

await init(startDate,endDate);

// Severity Chart
async function yesterdayIncidentsPlot(data,div,xlabel,ylabel,type,orientation){
	var x=[], y=[];
	var row

	for(var i = 0; i<data.length;i++){
		row=data[i];
		x.push(row['crash_date']);
		y.push(row['avg_crash_sev']);
	}

	let trace = [];

	trace = [{
        x: x,
        y: y,
        type: type,
		orientation: `${orientation}`,
        marker: {
            color: 'rgba(135, 61, 255, .8',
            size: 8
        }
    }];

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
			t: 10,
			pad: 4

		},

	}
	var config = { responsive: true };
    Plotly.newPlot(div, trace, layout, config);
}

async function filterDateData(){
    if(document.getElementById("startdate").value !== ""){
        if(document.getElementById("enddate").value !== ""){
            startDate = document.getElementById("startdate").value;
            endDate = document.getElementById("enddate").value;
            await spGetHistoricalTrafficData(startDate,endDate);
            await spGetTrafficIssues(startDate,endDate);
            await spGetDayOfWeek(-6);
            var data = await spIncidentSeverity(startDate,endDate);
            await yesterdayIncidentsPlot(data,'severity','crash_date','avg_crash_sev','bar','v')

            alert('done!')
        }
        else{
            alert('shits blank!')
        }
    }
    else{
        alert('shits blank!')
    }

}

document.getElementById('filter-btn').addEventListener('click',
filterDateData);