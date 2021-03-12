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