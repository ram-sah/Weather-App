$(window).on('load', function () {
    currentLocation();
    checkLocalStorage();
});

var APIKey = "09e0d7e534e41ce68ba5f2577fa5f760";
var q = "";
var now = moment();
var currentDate = now.format('MMMM Do YYYY || h:mm a');
//var currentDay = now.format("DD");

$("#currentDay").text(currentDate);

$("#search-button").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    
    q = $("#city-input").val();
    getWeather(q);
    createRecentSearchBtn(q);
    saveToLocalStorage(q);

});

function createRecentSearchBtn(q) {
    var newBtn = $('<button>');
    newBtn.addClass("button is-small recentSearch");
    newBtn.text(q);
    $("#historyList").prepend(newBtn);
    $(".recentSearch").on("click", function () {
        var newQ = $(this).text();
        getWeather(newQ);
    });
};

function getWeather(q) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
    $.ajax({ // gets the current weather info
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        var cityMain = $("<div col-12>").append($("<h1>" + response.name + "</h1>"));
        var image = $("img").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
        var degreeMain = $("<p>").text("Temperature : " + response.main.temp + " °F ");
        var humidityMain = $("<p>").text("Humidity : " + response.main.humidity + "%");
        var windMain = $("<p>").text("Wind Speed : " + response.wind.speed + "MPH");
        var iconMain = $("<p>").attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");
        var uvIndexcoord = ("&lat=" + response.coord.lat + "&lon=" + response.coord.lon);
        var cityId = response.id;
        displayUVindex(uvIndexcoord);
        displayForecast(cityId);
        cityMain.append(image).append(degreeMain).append(humidityMain).append(windMain).append(iconMain);
        $("#cityList").empty();
        $("#cityList").append(cityMain);
    });
};

function displayUVindex(uv) {
    $.ajax({ // gets the UV index info
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + uv,
        method: "GET"
    })
        .then(function (response) {
            var uvIndexMain = $("<p>").text(response.value);
            $("#cityList").append(uvIndexMain);
        });
};

function displayForecast(c) {
    $.ajax({ // gets the 5 day forecast API
        url: "https://api.openweathermap.org/data/2.5/forecast?id=" + c + "&units=imperial&APPID=" + APIKey,
        method: "GET"
    }).then(function (response) {
        //  Parse response to display forecast for next 5 days underneath current conditions
        var forecastEls = $(".forecast");
        //var counter = 0;
        for (var i = 0; i < forecastEls.length; i++) {
            console.log(response);




        }
    });
};

function currentLocation() {
    $.ajax({
        url: "https://freegeoip.app/json/",
        method: "GET"
    })
        .then(function (response) {
            q = response.city || 'exton';
            console.log(q);
            getWeather(q);
        });
};

function checkLocalStorage() {
    var storedData = localStorage.getItem('queries');
    var dataArray = [];
    if (!storedData) {
        console.log("no data stored")
    } else {
        storedData.trim();
        dataArray = storedData.split(",");
        for (var i = 0; i < dataArray.length; i++) {
            createRecentSearchBtn(dataArray[i]);
        }
    };
};

function saveToLocalStorage(q) {
    var data = localStorage.getItem('queries');
    if (data) {
        data = data + "," + q;
        localStorage.setItem('queries', data);
    } else {
        data = q;
        localStorage.setItem('queries', data);
    };
};

$("#clear-history").on("click", function (event) {
    $("#historyList").empty();
});

