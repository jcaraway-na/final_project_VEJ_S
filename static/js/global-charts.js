
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
        orientation: `${orientation}`,
        marker: {
            color: 'rgba(135, 61, 255, .8',
            size: 8
        }
    }];

    if (divlabel === 'incidentcounts') {
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
        type: type,
        orientation: `${orientation}`,
        marker: {
            color: color,
            size: 8
        }
    }];

    Plotly.addTraces(divlabel, trace);
}

