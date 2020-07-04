$(window).on('load', function () {
    currentLocation();
    checkLocalStorage();
});
// API Key for all weather data 
var APIKey = "09e0d7e534e41ce68ba5f2577fa5f760";
var q = "";
var now = moment();
//Date and time formate for header
var currentDate = now.format('MMMM Do YYYY || h:mm a');
$("#currentDay").text(currentDate);

//Setting the click function at ID search button
$("#search-button").on("click", function (event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();

    q = $("#city-input").val();
    if (q === '') {
        return alert('Please Enter Valid City Name ! ');
    }
    getWeather(q);

    saveToLocalStorage(q);
});
// Function to create Button for searched city 
function createRecentSearchBtn(q) {
    var newLi = $("<li>")
    var newBtn = $('<button>');
    //Adding Extra ID for Button to stop Creating Duplicate Button on Click
    newBtn.attr('id', 'extraBtn');
    newBtn.addClass("button is-small recentSearch");
    newBtn.text(q);
    newLi.append(newBtn)
    $("#historyList").prepend(newLi);
    //setting click function to prevent duplicate button
    $("#extraBtn").on("click", function () {
        var newQ = $(this).text();
        getWeather(newQ);
    });
}
//Function to get weather details 
function getWeather(q) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
    $.ajax({
        // gets the current weather info
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        //to avoid repeating city information on button click 
        $(".cityList").empty()
        $("#days").empty()
        var cityMain = $("<div col-12>").append($("<h1>" + response.name + "</h1>"));
        var image = $('<img class="imgsize">').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');
        var degreeMain = $('<p>').text('Temperature : ' + response.main.temp + ' °F ');
        var humidityMain = $('<p>').text('Humidity : ' + response.main.humidity + '%');
        var windMain = $('<p>').text('Wind Speed : ' + response.wind.speed + 'MPH');
        var iconMain = $('<p>').attr('src', 'https://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png');
        var uvIndexcoord = '&lat=' + response.coord.lat + '&lon=' + response.coord.lon;
        var cityId = response.id;

        displayUVindex(uvIndexcoord);
        displayForecast(cityId);

        cityMain.append(image).append(degreeMain).append(humidityMain).append(windMain).append(iconMain);
        $('#cityList').empty();
        $('#cityList').append(cityMain);
    });
}
//function for UV Index
function displayUVindex(uv) {
    $.ajax({ // gets the UV index info
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + uv,
        method: "GET"
    }).then(function (response) {
        var uvIndexMain = $("<p>").text('UV-Index :' + response.value);
        $("#cityList").append(uvIndexMain);
    });
}
//function to Display 5 Day forecast
function displayForecast(c) {
    $.ajax({ // gets the 5 day forecast API
        url: "https://api.openweathermap.org/data/2.5/forecast?id=" + c + "&units=imperial&APPID=" + APIKey,
        method: "GET",
    }).then(function (response) {
        //  Parse response to display forecast for next 5 days underneath current conditions
        var arrayList = response.list;
        for (var i = 0; i < arrayList.length; i++) {
            if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {
                console.log(arrayList[i]);
                var cityMain = $('<div>');
                cityMain.addClass('col forecast bg-primary text-white ml-3 mb-3 rounded>');
                var image = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + arrayList[i].weather[0].icon + '.png');
                var degreeMain = $('<p>').text('Temperature : ' + arrayList[i].main.temp + ' °F ');
                var humidityMain = $('<p>').text('Humidity : ' + arrayList[i].main.humidity + '%');
                var windMain = $('<p>').text('Wind Speed : ' + arrayList[i].wind.speed + 'MPH');
                var iconMain = $('<p>').attr('src', 'https://openweathermap.org/img/wn/' +
                    arrayList[i].weather[0].icon + '@2x.png');
                cityMain.append(image).append(degreeMain).append(humidityMain).append(windMain).append(iconMain);
                $('#days').append(cityMain);
            }
        }
    });
};
// Display automatic Current Locaion 
function currentLocation() {
    $.ajax({
        url: "https://freegeoip.app/json/",
        method: "GET",
    }).then(function (response) {
        q = response.city || 'exton';
        console.log(q);
        getWeather(q);
    });
};

// Function to get data store in Locaal Storage 
function checkLocalStorage() {
    var storedData = localStorage.getItem('queries');
    var dataArray = [];
    if (!storedData) {
        console.log("no data stored");
    } else {
        storedData.trim();
        dataArray = storedData.split(',');
        for (var i = 0; i < dataArray.length; i++) {
            createRecentSearchBtn(dataArray[i]);
        }
    }
};
// Function to Set data in Local storage
function saveToLocalStorage(q) {
    var data = localStorage.getItem('queries');
    if (data) {
        console.log(data, q)

    } else {
        data = q;
        localStorage.setItem('queries', data);
    }
    if (data.indexOf(q) === -1) {
        data = data + ',' + q;
        localStorage.setItem('queries', data);
        createRecentSearchBtn(q);
    }
}
//added clear histor fuction to clear searched city list
$("#clear-history").on("click", function (event) {
    $("#historyList").empty();
});