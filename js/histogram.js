// set width and heigh for svg
var width = 1000;
var height = 600;
var svg = null;

d3.json("data/iphone_tweets_score.json", function(error, data){
    console.log(data);
})