function buildMetadata(id) {

  // Use `d3.json` to fetch the metadata for a sample
  var metUrl = `/tweet_metadata/${id}`;
  d3.json(metUrl).then(function (id) {
    console.log("url");
    console.log(metUrl);
    console.log("first sample");
    console.log(id);


    // Use d3 to select the panel with id of `#sample-metadata`
    var meta_sample = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    meta_sample.html("");
    console.log("meta sample");
    console.log(meta_sample);

    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(id).forEach(function ([key, value]) {
      // loop and use d3 to append new tags for each key-value in the metadata.
      var row = meta_sample.append("p");
      row.text(`${key}: ${value}`);
      console.log("row");
      console.log(row);
      console.log("key, value");
      console.log(key, value);
    })
  });
};


// Bubble Chart
function buildCharts(id) {
  var tweetUrl = `/tweet_model_score`;
  d3.json(tweetUrl).then(function (data) {
    console.log(data)

    var xValues = data.id;
    //console.log(XValues)
    var yValues = data.model_score;
    var markerSize = data.model_score;
    var markerColors = data.model_score;
    var textValues = data.tweet;

    var trace = {
      x: xValues,
      y: yValues,
      //mode: "markers",
      type: "scatter",
      marker: {
        color: markerColors,   //markerColors,
        size: markerSize,
        colorscale: "Viridis"
        //sizemode: "area",
        //showscale: true
      },
      text: textValues
      //text: `(${markerColors[0]}, ${markerSize[0]}) <br> ${textValues[0]}`
    };

    var data = [trace];

    var layout = {
      xaxis: {
        title: "<b>Tweets With Keyword Impeachment</b>"
      },
      yaxis: {
        title: "<b>Tweet Sentiment Score</b>",
        autorange: true
      },
      title: "Impeachment Sentiment"
    };

    Plotly.newPlot("scatter", data, layout)
  });



  // GAUGE PLOT
  // Adapted Gauge Chart from <https://plot.ly/javascript/gauge-charts/>
  // Weekly Washing Frequency 0-9 increment by 1
  // `/metadata/<sample>`route
  // buildGauge(data.WFREQ);

  var metUrl = `/tweet_metadata/${id}`;
  d3.json(metUrl).then(function (data) {
    console.log("data");
    console.log(data)
    var score = data.model_score;
    console.log("score");
    console.log(score)
    // Enter a washing freq between 0 and 180  (180/9= 20; "20" is the scaling factor that must me multipied to wash freq to make it work)
    var level = parseFloat(score) * 180;

    // Trig to calc meter point
    var degrees = 180 - level,
      radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [{
      type: 'scatter',
      x: [0], y: [0],
      marker: { size: 28, color: '850000' },
      showlegend: false,
      name: 'Tweet Model Score',
      // need to divide by 20 to get the correct model_score value on hover
      text: level / 180,
      hoverinfo: 'text+name'
    },
    {
      values: [50 / 2, 50 / 2, 50],
      rotation: 90,
      text: ['Positive', 'Negative', ''],
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ['rgba(14, 70, 0, .5)', 'rgba(248, 226, 202, .5)',
          'rgba(255, 255, 255, 0)']
      },
      labels: ['0.5-1', '0-0.5', ''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];

    var layout = {
      shapes: [{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
      title: '<b>Tweet Sentiment Score</b> <br> 0 - 0.5 = Negative Sentiment <br> 0.5 - 1.0 = Positive Sentiment',
      height: 500,    // resize to fit
      width: 500,     // resize to fit
      xaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      },
      yaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      }
    };

    // DIV id="gauge"  #gauge to insert into HTML in the correct DIV
    Plotly.newPlot("gauge", data, layout);
  })

};


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/id").then((idNames) => {
    idNames.forEach((id) => {
      selector
        .append("option")
        .text(id)
        .property("value", id);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = idNames[893];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
