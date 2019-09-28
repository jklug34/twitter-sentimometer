// set width and heigh for svg
var margin = {top: 10, right: 30, bottom: 30, left: 40};
var width = 800 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;
var new_score

// read iphone data
d3.json("data/iphone_tweets_score.json", function(error, data){
    // console.log(data);
    var iphoneGroup = []

    data.forEach(function(d){
        // console.log(d.score)
        if (d.score >= 0.5){
            iphoneGroup.push("positive")
        }
        else {
            iphoneGroup.push("negative")
        }
    });
     
    d3.json("data/galaxy_tweets_score.json", function(error, data){
        var galaxyGroup = []
        
        data.forEach(function(d){
            // console.log(d.score)
            if (d.score >= 0.5){
                galaxyGroup.push("positive")
            }
            else {
                galaxyGroup.push("negative")
            }
        });   
        console.log(galaxyGroup)

    });
    
    
})