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
    // console.log(iphoneScores)
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
              .domain(x.domain())  // then the domain of the graphic
              .thresholds(x.ticks(40)); // then the numbers of bins

        var bins1 = histogram(iphoneScores);
        var bins2 = histogram(galaxyScores);

        var y = d3.scaleLinear()
          .range([height, 0]);
          y.domain([0, d3.max(bins1, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
       
        svg.append("g")
          .call(d3.axisLeft(y));

        svg.selectAll("rect")
          .data(bins1)
          .enter()
          .append("rect")
            .attr("x", 1)
            .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
            .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
            .attr("height", function(d) { return height - y(d.length); })
            .style("fill", "#69b3a2")
            .style("opacity", 0.4)
        
        svg.selectAll("rect2")
            .data(bins2)
            .enter()
            .append("rect")
              .attr("x", 1)
              .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
              .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
              .attr("height", function(d) { return height - y(d.length); })
              .style("fill", "#F2DA57")
              .style("opacity", 0.4)


        svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 6).style("fill", "#69b3a2")
        svg.append("circle").attr("cx",300).attr("cy",60).attr("r", 6).style("fill", "#F2DA57")
        svg.append("text").attr("x", 320).attr("y", 30).text("Apple iphone").style("font-size", "15px").attr("alignment-baseline","middle")
        svg.append("text").attr("x", 320).attr("y", 60).text("Samsung Galaxy").style("font-size", "15px").attr("alignment-baseline","middle")

        

            

    })  
})