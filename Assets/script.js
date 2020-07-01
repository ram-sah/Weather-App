
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
    // showHistory(); 

    //Show the History 
    function showHistory () {
        $("#clearTable").empty()
        for (var i = 0; i< historyArray.length; i++){
            console.log(historyArray[i])
            $("#clearTable").prepend("<tr><td>" + historyArray[i] + "</td></tr>")
    }
}

    $('#search-button').on("click", function (event) {
        // Preventing the button from trying to submit the form
        event.preventDefault();
        var city = $("#city-input").val();
        if (historyArray.indexOf(city) === -1){
            historyArray.push(city)
            localStorage.setItem("weather", JSON.stringify(historyArray))
            
        }       
            showHistory();
     
       
        // API key for weather database"
        var APIkey = '0ec949b8b13f2ad5d8653cd84a541bde';
        // Here we are building the URL we need to query the database
        var query = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIkey;
       

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
            
        //Five Days forcast 
            
            var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkey;
        
        $.ajax({
            url: fiveDay,
            method: "GET"
           
        }).then(function (response) {
            const fiveDiv = $("<div>");
            for (var i= 0; i < fiveDiv.length; i++){
                console.log(response)
                // const forecastIndex = "";
                // const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                // const forecastDay = forecastDate.getDate();
                // const forecastMonth = forecastDate.getMonth() + 1;
                // const forecastYear = forecastDate.getFullYear();
               
                // forecastDateEl = $("<p>").setAttribute("class","mt-3 mb-0 forecast-date");
                // forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                // fiveDiv[i].append(forecastDateEl);

                // const forecastWeatherEl = ("<img>");
                // forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                // forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
                // fiveDiv[i].append(forecastWeatherEl);
                // const forecastTempEl = $("<p>");
                // forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                // fiveDiv[i].append(forecastTempEl);
                // const forecastHumidityEl = $("<p>");
                // forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                // fiveDiv[i].append(forecastHumidityEl);
                // $("#5days").append(fiveDiv);
            }

        })
    })
})


$("#clear-history").on("click", function (event) {
    $("#clearTable").empty();
    
});

