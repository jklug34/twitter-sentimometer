d3.csv("output.csv", function(myData) {
    // console.log(myData)

    // function thousands_separators(num) {
    //     var num_parts = num.toString().split(".");
    //     num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //     return num_parts.join(".");
    // }

    words = []
    amount_of_words = []



    myData.forEach(function(d) {

        d.Amount_of_words = +d.Amount_of_words

        words.push(d.Words.toLocaleUpperCase())
        amount_of_words.push(d.Amount_of_words)


    })

    console.log(words)
    console.log(amount_of_words)

    const myChart = document.getElementById("barChart").getContext("2d");

        Chart.defaults.global.defaultFontFamily = "Helvetica";
        Chart.defaults.global.defaultFontSize = 12;
        Chart.defaults.global.defaultFontColor = "black";
        Chart.defaults.global.animation.duration = 3750;
        Chart.defaults.global.legend.position = "top";
        Chart.defaults.global.tooltips.mode = "index";
        Chart.defaults.global.tooltips.titleAlign = 'center';
        

    var barChart = new Chart(myChart, {
        type: "bar",
        data: {
            labels: words,//.slice(0, n),
            datasets: [{
                label: " Amount of times appeared",
                data: amount_of_words,//.slice(0, n),
                backgroundColor: "brown",
                hoverBackgroundColor: "orange",
                borderWidgth: 1,
                borderColor: "black",
                hoverBorderWidth: 4,
                hoverBorderColor: "black",
            
            }          
        ],
            
        },
        options: {

            title: {
                display: true,
                text: "Most Common Words in Tweets",
                fontSize: 50
            },
            // scales: {
            //     xAxes: [{ stacked: true }],
            //     yAxes: [{ stacked: false }]
            // },
            scales: {
                yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Number of times the word appears in Tweets'
                    }
                  }],
                xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Words from Tweets'
                }
                }]
            },
            tooltips: {
                titleFontSize: 45,
                titleMarginBottom: 25,
                titleFontFamily: "Arial",
                titleFontColor: "white",
                bodyFontSize: 35,
                // bodyFontStyle: "bold",
                bodyFontColor: "white",
                bodyFontFamily: "Arial",
                // footerFontStyle: "bold",
                // footerFontSize: 25,
                // footerFontColor: "lightgreen",
                // footerFontFamily: "Arial",
                xPadding: 20,
                yPadding: 20,
                cornerRadius: 15, 
                displayColors: false,
                callbacks: {

                    title: (item, data) => data.labels[item[0].index],
                    
                }
                
            },
            // events: ["click"]
            
        }

    })

})
