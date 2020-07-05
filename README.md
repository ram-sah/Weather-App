
# Week-6: HOME-WORK: 
* By: Ram Sah - https://ram-sah.github.io/Weather-Dashboard

# Server-Side APIs: Weather Dashboard

Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. Your challenge is to build a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.

Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities. The documentation includes a section called "How to start" that will provide basic setup and usage instructions. Use `localStorage` to store any persistent data.

## User Story

AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

## Pseudocode

* search for a city to presented with current and future conditions for that city and that city is added to the search history
* view current weather conditions for that city to presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
* view the UV index to presented with a color that indicates whether the conditions are favorable, moderate, or severe
* view future weather conditions for that city to presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
* click on a city in the search history to again presented with current and future conditions for that city
* open the weather dashboard to presented with the last searched city forecast
## Tech and Features Used
* Open weather current & 5 day forecast API's: https://openweathermap.org/api
* JQuery: https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
* Bootstrap: https://getbootstrap.com/
* Moment.js: https://momentjs.com/
* Font Awesome: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css
* Current Location: https://freegeoip.app/json/

# How can we use Weather Dashboard to Plan for travelling?

* This project has script features of:
* Moment.js for local time, current time with weather Dashboard
* Appended text to HTML for hour time
* An event listener for the search buttons and save to local storage
### This project features responsive design using a Bootstrap layout Has responsive layout for:
* Small devices (landscape phones, 320px and up)  
* Large devices (desktops, 992px and up) 

* To Execute File: Open in browser

# Features:
* Index.html
* Styles.css
* script.js
* Ajax
* Contains:  Variables, including arrays and time conversion 
* Event listeners 
* if/else if statements 
* For Loops 
* Functions 
* Local Storage set and get
### Code Validation:
* These use W3C Code Validators for HTML and CSS
* esprima Syntax Validator 

# Demo
![weather-dashboard](https://user-images.githubusercontent.com/64625123/86528091-f8ec3400-be72-11ea-9b88-2304d9e89adc.gif)


