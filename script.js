// Key into the server
var api_key = "83516de6bf1e3fb4d87d3823f33c6bd2";
var historyEl = document.querySelector("#history");
var inputEl = document.querySelector("#cityName");
var currentCity = document.querySelector("#currentCity");
var weatherHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(weatherHistory);
// Function to convert Kelvins to Farenheit
function getFahrenheit(K) {
  return Math.floor((K - 273.15) * 1.8 + 32);
}
//function takes city name and retrieves weather data for that city
function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  
  //send fetch request to get latitude and longitude
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      if (weather.cod === "404") {
        alert("City not found");
        return;
      }
      currentCity.innerHTML =
        "" + weather.name + " " + moment().format("MMMM Do YYYY");
      //   naming latitude and longitude
      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      //api call for the latitude and longitude
      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (onecallData) {
          buildDashboard(onecallData);
        });
    });
    console.log(currentCity)
    console.log(currentWeatherUrl)
  // Creating the visual display using moment for the present day info
  function buildDashboard(data) {
    var currentTemperature = document.querySelector("#temp");
    var currentHumidity = document.querySelector("#humidity");
    var currentUvi = document.querySelector("#uvi");
    currentTemperature.innerHTML =
      "Temperature: " + getFahrenheit(data.current.temp) + " F";
    currentHumidity.innerHTML = "Humidity: " + data.current.humidity + " %";
    currentUvi.innerHTML = "UV Index: " + data.current.uvi;
    // Adds the days on to the future forecast
    var cityForecast = document.querySelector("#forecast");
    for(i=0; i< 5; i++){
        var forecastIndex = data.daily[i];  
      // Attaches the city forecast to the build forecast elements
      cityForecast.append(buildForecast(forecastIndex));
    }

    function buildForecast(forecast) {
      var col = document.createElement("div");
      col.classList.add("col");
      var forecastContainer = document.createElement("div");
      forecastContainer.classList.add("big-primary", "rounded", "p-5");
      // Pulls from a date index of future
      var forecastDate = new Date(data.daily[i].dt * 1000);
      var forecastDay = forecastDate.getDate();
      var forecastMonth = forecastDate.getMonth() + 1;
      var forecastYear = forecastDate.getFullYear();
      var forecastDate = document.createElement("h4");
      forecastDate.textContent = forecast.forecastDate;

      forecastDate.innerHTML =
        forecastMonth + "/" + forecastDay + "/" + forecastYear;
      var forecastTemp = document.createElement("p");
      
      // I built a get Farenheit function  to convert the temperature from Kelvins to Farenheit
      forecastTemp.innerHTML =
        "Temp: " + getFahrenheit(data.daily[i].temp.day) + " F";

    
      var forecastHumidity = document.createElement("p");
      forecastHumidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";
      forecastContainer.append(forecastDate, forecastTemp, forecastHumidity);
      col.append(forecastContainer);
      return col;
    }
  }
}
// }
searchBtn.addEventListener("click", function (e) {
  var searchCity = inputEl.value;
  getWeather(searchCity);
  weatherHistory.push(searchCity);
  localStorage.setItem("search", JSON.stringify(weatherHistory));
});
clearHistoryBtn.addEventListener("click", function () {
  weatherHistory = [];
});




historyEl.addEventListener("click", function(e) {
    e.preventDefault()
   if (!e.target.matches("li")) return;
   getWeather(e.target.textValue)
   buildDashboard.buildForecast
   console.log(e.target.textValue)
});

// function handleCity(){
//     // treat as a catch all for each item in history array
//     if (!weatherHistory(cityName)) {
//        for each weatherHistory.push.(cityName);
//     }
// }
// localStorage.setItem("search", JSON.stringify(weatherHistory))

// handleCity()

// // Each item gets a p tag 
// // add an event listener
// // call getWeather and buildDashboard using the value of whatever 
// // Push into history array the most recent search
// // After the array has been updated, we store it under the key of history so that when the page reloads you get the most recent search.

// renderPast()
// function renderPast(){
//     for (var city of weatherHistory){
//         var previousCity = document.createElement("li");
//         previousCity.textContent = cityName
//         history.append(previousCity);
// }
// };
// handleCity(searchCity)









































// this is where I actually need to comment out old code 

// var historyEl = document.querySelector("#history");
// var weatherHistory = JSON.parse(localStorage.getItem("city")) || [];
// console.log(weatherHistory)

// // function takes city and retrieves weather data for that city
// function getWeather(city){
//     var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

//     // send fetch request to get latitude and longitude
//     fetch(currentWeatherUrl)
//     .then((data)=> data.json())
//     .then(function (weather){
//         console.log(weather);

//         todaysWeather(weather);
//         if (weather.cod === "404"){
//             alert("City not found");
//             return;
//         }
//         var lat = weather.coord.lat;
//         var lon = weather.coord.lon;

//         // API Call for the latitiude and Longitude
//         var onecallURL =  `https://api.openweathermap.org/data/2.5.onecall?lat=${lat}&lon-${lon}&exclude-{part}&appid-${api_key}`;
//         fetch(onecallURL)
//         .then((data) => data.json())
//         .then(function (onecallData){
//             console.log(onecallData);
//             var currentDate = new Date();
//             console.log(currentDate.toDateString());

// }

// var today = document.querySelector(".current-weather");
// var cityEl = document.createElement("h2");
//  cityEl.textContent = currentWeather.name;
//  today.appendChild(cityEl)
//  var tempEl = document.createElement("h2");
//  tempEl.textContent = currentWeather.main.temp
//  today.appendChild(tempEl)
//  var humidityEl = document.createElement("h2");
//  humidityEl.textContent = currentWeather.main.humidity
//  today.appendChild(humidityEl)
//  var uvIndexEl = document.createElement("h2");
//  uvIndexEl.textContent = currentWeather.main.temp
//  today.appendChild(uvIndexEl)

// // When I click submit
// // I want to call getWeather
// // And getFutureWeather

// // $("form-control").val(localStorage.getItem("cities-searched"))

// function todaysWeather(currentWeather){
// }

// getWeather("New York");

// function getFutureWeather(city){
//     var futureWeatherUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}`;
//     // send fetch request to get latitude and longitude
//     fetch(futureWeatherUrl)
//     .then((data)=> data.json())
//     .then(function (weather){
//         console.log(weather);

//         if (weather.cod === "404"){
//             alert("City not found");
//             return;
//         }
//     })
// }

// getFutureWeather("New York");

// // var weather =

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// var onecallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';
// fetch(onecallURL)
// .then((data) => data.json())
// .then(function(oneCallData){
// console.log(oneCallData);
// })
