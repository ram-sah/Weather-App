
$(document).ready(function () {
    //get times moment     
    const momentTime = moment().format('MMMM Do YYYY || h:mm a');
    $('#currentDay').text(momentTime);
    
    // read localstorage and if existing then show the history info
    var historyArray = localStorage.getItem("weather")
    if (historyArray) {
        historyArray = JSON.parse(historyArray)
    }
    else {
        historyArray = []
    }
    showHistory() 

    //Show the History 
    function showHistory () {
        $("#clearTable").empty()
        for (var i = 0; i< historyArray.length; i++){
            console.log(historyArray[i])
            $("#clearTable").prepend("<tr><td>" + historyArray[i] + "</td></tr>")
        }
    }

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
        if (historyArray.indexOf(city) === -1){
            historyArray.push(city)
            localStorage.setItem("weather", JSON.stringify(historyArray))
            showHistory();
        }

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
            
            var cityDiv = $("<div>").append($("<h1>" + response.name + "</h1>"));           
            var image = $("img").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")


            var p1 = $("<p>").text("Temperature : " + response.main.temp + " `F");
            var p2 = $("<p>").text("Humidity : " + response.main.humidity + " %");
            var p3 = $("<p>").text("Wind Speed : " + response.wind.speed + " MPH");
            cityDiv.append(image).append(p1).append(p2).append(p3);
            $("#cityList").empty();
            $("#cityList").append(cityDiv);
            // $("#history").prepend(div);
        });

    })
})


$("#clear-history").on("click", function (event) {
    $("#temperature").empty();
});

