const Control_for_Pop = './ml_csv/Control_for_Pop.csv'
const Crash_by_Hour = './ml_csv/Crash_by_Hour.csv'
const Crash_by_Month = './ml_csv/Crash_by_Month.csv'
const Crash_Day_of_Week = './ml_csv/Crash_Day_of_Week.csv'
const Pedestrians_2020 = './ml_csv/Pedestrians_2020.csv'
const Pedestrians_2021 = './ml_csv/Pedestrians_2021.csv'
const Serious_2020 = './ml_csv/Serious_2020.csv'
const Serious_2021 = './ml_csv/Serious_2021.csv'

export async function makePlotly(data, xlabel, ylabel, divlabel, type,orientation,color) {
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
            color: color,
            size: 8
        }
    }];

    if (divlabel === 'serious2020') {
        var layout = {
            title:{
                text:'Serious Crashes 2020'
            },
            xaxis: {
                title: 'Year_Month',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Crashes',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,
                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 600,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
    
            },
    
        }
    }
    else if (divlabel === 'serious2021') {
        var layout = {
            title:{
                text:'Serious Crashes 2021'
            },
            xaxis: {
                title: 'Year_Month',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Crashes',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,
                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 600,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
    
            },
    
        }
    }
    else if (divlabel === 'ped2020') {
        var layout = {
            title:{
                text:'Crashes Involving Pedestrians 2020'
            },
            xaxis: {
                title: 'Year_Month',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Crashes',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,
                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 330,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
    
            },
    
        }
    }
    else if (divlabel === 'ped2021') {
        var layout = {
            title:{
                text:'Crashes Involving Pedestrians 2021'
            },
            xaxis: {
                title: 'Year_Month',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Crashes',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,

                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 330,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
    
            },
    
        }
    }
    else if (divlabel === 'crashdayofweek') {
        var layout = {
            title:{
                text:'Crash by Day of Week'
            },
            xaxis: {
                title: 'Day of Week',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Crashes',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,

                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 330,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
    
            },
    
        }
    }
    else if (divlabel === 'crashbyhour') {
        var layout = {
            title:{
                text:'Crash by Hour'
            },
            xaxis: {
                title: 'Hour of Day',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Crashes',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,

                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 330,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
    
            },
    
        }
    }
    else if (divlabel === 'crashbymonth') {
        var layout = {
            title:{
                text:'Crash by Month'
            },
            xaxis: {
                title: 'Month',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Crashes',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,

                y: 1
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            height: 455,
            margin: {
                l: 50,
                r: 55,
                b: 100,
                t: 50,
                pad: 4
    
            },
    
        }
    }
    else if (divlabel === 'controlforpoptotalcrashes') {
        var layout = {
            title:{
                text:'Control for Population'
            },
            xaxis: {
                title: 'Year_Month',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Crashes',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,

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
    else if (divlabel === 'controlforpopgrowthrate') {
        var layout = {
            title:{
                text:'Control for Population'
            },
            xaxis: {
                title: 'Year_Month',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Growth Rate',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,

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
    else if (divlabel === 'controlforpopcrashespercapita') {
        var layout = {
            title:{
                text:'Control for Population'
            },
            xaxis: {
                title: 'Year_Month',
                gridcolor: 'rgba(0,0,0,.2)'
            },
            yaxis: {
                title: 'Per Capita',
                gridcolor: 'rgba(0,0,0,.2)',
            },
    
            showlegend: true,
            legend: {
                x: 1,

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
    makePlotly(data,'Month','Prediction','serious2020','line','h','rgba(214, 100, 119,0.8)'),
    addToPlotly(data,'Month','Actual','serious2020','bar','v','rgba(31, 138, 110,0.8)') 
});

// Serious 2021
d3.csv(Serious_2021, function(data){ 
    makePlotly(data,'Month','Prediction','serious2021','line','h','rgba(214, 100, 119,0.8)'),
    addToPlotly(data,'Month','Actual','serious2021','bar','v','rgba(31, 138, 110,0.8)') 
});

// Ped 2020
d3.csv(Pedestrians_2020, function(data){ 
    makePlotly(data,'Month','Prediction','ped2020','line','h','rgba(214, 100, 119,0.8)'),
    addToPlotly(data,'Month','Actual','ped2020','bar','v','rgba(31, 138, 110,0.8)') 
});

// Ped 2021
d3.csv(Pedestrians_2021, function(data){ 
    makePlotly(data,'Month','Prediction','ped2021','line','v','rgba(214, 100, 119,0.8)'),
    addToPlotly(data,'Month','Actual','ped2021','bar','v','rgba(31, 138, 110,0.8)') 
});

// Crash Day of Week
d3.csv(Crash_Day_of_Week, function(data){ 
    makePlotly(data,'dayofweek','precovid_average_crashes','crashdayofweek','line','v','rgba(214, 100, 119,0.8)'),
    addToPlotly(data,'dayofweek','covid_average_crashes','crashdayofweek','bar','v','rgba(31, 138, 110,0.8)') 
});

// Crash by Hour
d3.csv(Crash_by_Hour, function(data){ 
    makePlotly(data,'Hour','PreCovid_Crashes','crashbyhour','line','v','rgba(214, 100, 119,0.8)'),
    addToPlotly(data,'Hour','Covid_Crashes','crashbyhour','bar','v','rgba(31, 138, 110,0.8)') 
});

// Crash by Month
d3.csv(Crash_by_Month, function(data){ 
    makePlotly(data,'Month','PreCovid_Crashes_Per_Month','crashbymonth','line','v','rgba(214, 100, 119,0.8)'),
    addToPlotly(data,'Month','Crashes_2020','crashbymonth','line','v','rgba(31, 138, 110,0.8)'),
    addToPlotly(data,'Month','Crashes_2021','crashbymonth','line','v','rgba(255, 181, 10,0.8)') 
});

// Control for Pop
d3.csv(Control_for_Pop, function(data){ 
    makePlotly(data,'year_month','total_crashes','controlforpoptotalcrashes','line','v','rgba(214, 100, 119,0.8)'),
    makePlotly(data,'year_month','growth_rate','controlforpopgrowthrate','line','v','rgba(31, 138, 110,0.8)'),
    makePlotly(data,'year_month','crashes_per_capita','controlforpopcrashespercapita','line','v','rgba(255, 181, 10,0.8)')
});
