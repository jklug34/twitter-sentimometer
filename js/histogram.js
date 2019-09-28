// set width and heigh for svg
var margin = {top: 10, right: 30, bottom: 30, left: 40};
var width = 800 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
var new_score

// read iphone data
d3.json("data/iphone_tweets_score.json", function(error, data){
    // console.log(data);
    var iphoneScores = []
    var new_score

    data.forEach(function(d){
        // console.log(d.score)
        new_score = 2*(+d.score-0.5)
        iphoneScores.push(new_score)
    });
     console.log(iphoneScores)
    // read galaxy data
    d3.json("data/galaxy_tweets_score.json", function(error, data){
        var galaxyScores = []
        
        data.forEach(function(d){
            // console.log(d.score)
            new_score = 2*(+d.score-0.5)
            galaxyScores.push(new_score)
        });   
    
        // console.log(galaxyScores)

        var margin = {top: 10, right: 30, bottom: 30, left: 40};
        var width = 800 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;

        var svg = d3.select("#histogram")
             .append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
        

        var x = d3.scaleLinear()
              .domain([-1,1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
              .range([0, width]);
        svg.append("g")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));

        var histogram = d3.histogram()
              .value(function(d) { return +d.value; })   // I need to give the vector of value
              .domain(x.domain())  // then the domain of the graphic
              .thresholds(x.ticks(40)); // then the numbers of bins

    })  
})