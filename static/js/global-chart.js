
let svys = [];

async function getSurveys(){
    return d3.csv("https://raw.githubusercontent.com/jcaraway-na/Dual_Drilling_Consultants/main/static/data/surveys.csv");
}

async function makePlotlySurvey(data){
    var i, r;
    var x = [];
    var y = [];
    var z = [];
    var c = [];

    for(i = 0; i < data.length; i++){
        // r = 10 * Math.cos(i/10);
        x.push(data[i].localEastWest);
        y.push(data[i].localNorthSouth);
        z.push(-1*data[i].tvd);
        c.push(data[i].doglegSeverity);
    }

    let trace = [{
        type: 'scatter3d',
        mode: 'lines',
        x: x,
        y: y,
        z: z,
        line: {
          width: 10,
          color: c,
          colorscale: "Portland"},
        marker: {
          size: 3.5,
          color: c,
          colorscale: "Greens",
          cmin: -20,
          cmax: 50
        }
    }];
    
    var layout = {
        scene:{

          xaxis: {
           nticks: 9,
           range: [-1500, 1500],
         },
          yaxis: {
           nticks: 7,
           range: [0, 15000],
         }},
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        autosize: true,
        margin: {
            l: 55,
            r: 20,
            b: 50,
            t: 0,

        },
    };
    
    var config = { responsive: true }
    Plotly.newPlot('planvactual', trace, layout, config);
}

svys = getSurveys();
console.log(svys);
await makePlotlySurvey(svys);