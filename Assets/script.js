
$(document).ready(function () {
    //get times moment     
    const momentTime = moment().format('MMMM Do YYYY || h:mm a');
    $('#currentDay').text(momentTime);
    

    // let showValuesOnPage = (() => {
    //     let searchString = cityName + ', ' + countryCode;
    //     $('#city-name').text(searchString + ' (' + momentTime(Date.now()) + ')');
    //     addToSearchHistory(searchString, Date.now());
    //     renderSearchHistory();
    //     $('#weather-icon').attr('src', iconURL + iconName + '.png')
    //     $('#temp-data').text('Temperature: ' +
    //         (tempInK - 273.15).toFixed(2) + ' ' + String.fromCharCode(176) + 'C (' +
    //         ((tempInK - 273.15) * 9 / 5 + 32).toFixed(2) + ' ' + String.fromCharCode(176) + 'F)');
    //     $('#hum-data').text('Humidity: ' + humidity + '%');
    //     $('#wind-data').text('Wind Speed: ' + windSpeed + ' MPH');
    //     $('#uvi-data').text('UV Index: ' + uvIndex);
    // });

    $('#search-button').on("click", function (event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        var city = $("#city-input").val();

        // API key for weather database"
        var APIkey = '0ec949b8b13f2ad5d8653cd84a541bde';
        // Here we are building the URL we need to query the database
        var query = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
        var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;

        // We then created an AJAX call
        $.ajax({
            url: query,
            method: "GET"
        }).then(function (response) {
            // console.log(response);
            // console.log("City Name:", response.name);
            // console.log("temperature :", response.main.temp, "F");
            // console.log("Humidity :", response.main.humidity, "%");
            // console.log("Wind Speed:", response.wind.speed, "MPH");
            var cityDiv = $("<div>").append($("<h4>" + response.name + "</h4>"));           
            var p1 = $("<p>").text("Temperature : " + response.main.temp + " `F");
            var p2 = $("<p>").text("Humidity : " + response.main.humidity + " %");
            var p3 = $("<p>").text("Wind Speed : " + response.wind.speed + " MPH");
            cityDiv.append(p1).append(p2).append(p3);
            $("#temperature").append(cityDiv);
            // $("#history").prepend(div);
        });

    })
})


$("#clear-history").on("click", function (event) {
    $("#temperature").empty();
});

