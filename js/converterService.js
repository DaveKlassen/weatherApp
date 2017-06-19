weatherApp.factory("weatherService", function () {
    /* This data cannot be changed */
    var weather = [{"high":"53","low":"45","text":"Showers","cityName":"Vancouver"},
                   {"high":"76","low":"61","text":"Partly Cloudy", "cityName":"Havana Cuba"},
                   {"high":"77","low":"56","text":"Clear","cityName":"San Diego"}, 
                   {"high":"82","low":"70","text":"Partly Cloudy","cityName":"Honolulu"}];

    return {
        getCelsius: function (f) {
            if ( (f === 32) || (f === "32") ) {
                return("0");
            } else {
                return Math.round( (f - 32) * 5 / 9 );
            }
        },
        getWeatherGraphic: function(textName) {
            console.log("I am here");
            let graphicName = "";

            switch(textName) {
                case "Clear":
                    graphicName = "no-repeat top 10px left 10px url(images/clear.png)";
                    break;
                case "Partly Cloudy":
                    graphicName = "no-repeat top 10px left 10px url(images/partlyCloudy.png)";
                    break;                    
                case "Showers":
                    graphicName = "no-repeat top 10px left 10px url(images/showers.png)";
                    break;
                default:
                    break;
            };
            return  graphicName;
        },        
        getAllWeather: function() {
            console.log("I am here");
            return  weather;
        }
    }
});
