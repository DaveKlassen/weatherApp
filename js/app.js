var weatherApp = angular.module('weatherApp', ['ngSanitize']);

/*
 * Want to view a live page?
 * 
 *      https://www.multiversial.ca/angular1/
 */
weatherApp.controller('AppCtrl', ['$scope', '$sce', 'weatherService', 
                                   function ($scope, $sce, weatherService) {

    // Define title model. 
    $scope.title = "Travel Destinations";

    // Return weather to application.
    // 5. Using a service here to abstract the details.
    $scope.forecast = weatherService.getAllWeather();
    
    // 2. Show the weather by setting the current City and forcast
    $scope.currentWeather = {};
    $scope.weatherDetailStyle = weatherService.getWeatherGraphic("");
    $scope.showWeather = function(city)  {

        // 1. Initializing this after a click prevents the 
        //    whole forcast screen from displaying.
        $scope.currentCityName = city;

        // Iterate through our cities and find correct forcast values.
        for (let obj of $scope.forecast) {
            if (obj.cityName === city) {
                $scope.currentWeather = obj;
                $scope.weatherDetailStyle = weatherService.getWeatherGraphic(obj.text);
                let high = "High: " + obj.high + " &#8457;";
                let low = "Low: " + obj.low + " &#8457";

                // If we are not setup for farens convert the data.
                if (! $scope.farenheit) {
                    high = "High: " + weatherService.getCelsius(obj.high) + " &#8451;";
                    low = "Low: " + weatherService.getCelsius(obj.low) + " &#8451";
                }
                
                // Encode our special temperature entity
                $scope.currentHigh = $sce.trustAsHtml(high);
                $scope.currentLow = $sce.trustAsHtml(low);
                  
                break;
            }
        }
    }

    // 4. Add the ability to convert from farens to celcius
    // 5. At this point I preferred the service model learned in class 2.
    $scope.farenheit = true;
    $scope.clickFarens = function (farens) {
        let high = "High: " + $scope.currentWeather.high + " &#8457;";
        let low = "Low: " + $scope.currentWeather.low + " &#8457";

        if (farens) {
            $scope.farenheit = true;
        } else {
            $scope.farenheit = false;

            high = "High: " + weatherService.getCelsius($scope.currentWeather.high) + " &#8451;";
            low = "Low: " + weatherService.getCelsius($scope.currentWeather.low) + " &#8451";
        }

        // Encode our special temperature entity
        $scope.currentHigh = $sce.trustAsHtml(high);
        $scope.currentLow = $sce.trustAsHtml(low);
    }
}]);
