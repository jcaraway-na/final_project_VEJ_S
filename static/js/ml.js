const Control_for_Pop = './ml_csv/Control_for_Pop.csv'
const Crash_by_Hour = './ml_csv/Crash_by_Hour.csv'
const Crash_by_Month = './ml_csv/Crash_by_Month.csv'
const Crash_Day_of_Week = './ml_csv/Crash_Day_of_Week.csv'
const Pedestrians_2020 = './ml_csv/Pedestrians_2020.csv'
const Pedestrians_2021 = './ml_csv/Pedestrians_2021.csv'
const Serious_2020 = './ml_csv/Serious_2020.csv'
const Serious_2021 = './ml_csv/Serious_2021.csv'


export async function makePlotly(data, xlabel, ylabel, divlabel, type,orientation) {
    var x = [], y = [];
    var row;

    //pushes values to empty arrays
    for (var i = 0; i < data.length; i++) {

            row = data[i];
            x.push(row[xlabel]);
            y.push(row[ylabel]);

    }


    let trace = [];

    trace = [{
        x: x,
        y: y,
        type: type,
        name: ylabel,
        orientation: `${orientation}`,
        marker: {
            color: 'rgba(135, 61, 255, .8',
            size: 8
        }
    }];

    if (divlabel === 'serious2020') {
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
            height: 600,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 10,
                pad: 4
    
            },
    
        }
    }
    else if (divlabel === 'pdata') {
        var layout = {
            xaxis: {
                title: 'Incident Count',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
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


    var config = { responsive: true };
    Plotly.newPlot(divlabel, trace, layout, config);
}

export async function addToPlotly(data, xlabel, ylabel, divlabel, type,orientation,color){
    var x = [], y = [];
    var row;

    for (var i = 0; i < data.length; i++) {
        row = data[i];
        x.push(row[xlabel]);
        y.push(row[ylabel]);
    }

    let trace = [];

    trace = [{
        x: x,
        y: y,
        name: ylabel,
        type: type,
        orientation: `${orientation}`,
        marker: {
            color: color,
            size: 8
        }
    }];

    Plotly.addTraces(divlabel, trace);
}

// Serius 2020
d3.csv(Serious_2020, function(data){ 
    makePlotly(data,'Month','Prediction','serious2020','line','h'),
    addToPlotly(data,'Month','Actual','serious2020','bar','v','rgba(13, 18, 27, 0.5)') 
});

// Serious 2021
d3.csv(Serious_2021, function(data){ 
    makePlotly(data,'Month','Prediction','serious2021','line','h'),
    addToPlotly(data,'Month','Actual','serious2021','bar','v','rgba(13, 18, 27, 0.5)') 
});

// Ped 2020
d3.csv(Pedestrians_2020, function(data){ 
    makePlotly(data,'Month','Prediction','ped2020','line','h'),
    addToPlotly(data,'Month','Actual','ped2020','bar','v','rgba(13, 18, 27, 0.5)') 
});

// Ped 2021
d3.csv(Pedestrians_2021, function(data){ 
    makePlotly(data,'Month','Prediction','ped2021','line','v'),
    addToPlotly(data,'Month','Actual','ped2021','bar','v','rgba(13, 18, 27, 0.5)') 
});

// Crash Day of Week
d3.csv(Crash_Day_of_Week, function(data){ 
    makePlotly(data,'dayofweek','precovid_average_crashes','crashdayofweek','line','v'),
    addToPlotly(data,'dayofweek','covid_average_crashes','crashdayofweek','bar','v','rgba(13, 18, 27, 0.5)') 
});

// Crash by Hour
d3.csv(Crash_by_Hour, function(data){ 
    makePlotly(data,'Hour','PreCovid_Crashes','crashbyhour','line','v'),
    addToPlotly(data,'Hour','Covid_Crashes','crashbyhour','bar','v','rgba(13, 18, 27, 0.5)') 
});

// Crash by Month
d3.csv(Crash_by_Month, function(data){ 
    makePlotly(data,'Month','PreCovid_Crashes_Per_Month','crashbymonth','line','v'),
    addToPlotly(data,'Month','Crashes_2020','crashbymonth','line','v','rgba(13, 18, 27, 0.5)'),
    addToPlotly(data,'Month','Crashes_2021','crashbymonth','line','v','rgba(0, 0, 255, 0.5)') 
});

// Control for Pop
d3.csv(Control_for_Pop, function(data){ 
    makePlotly(data,'year_month','total_crashes','controlforpop','line','v'),
    addToPlotly(data,'year_month','growth_rate','controlforpop','line','v','rgba(13, 18, 27, 0.5)'),
    addToPlotly(data,'year_month','crashes_per_capita','controlforpop','line','v','rgba(0, 0, 255, 0.5)')
});
