// Key into the server
var api_key = "83516de6bf1e3fb4d87d3823f33c6bd2";
var historyEl = document.querySelector("#history");
  var inputEl = document.querySelector("#city-name");
  var currentCity = document.querySelector("#currentCity");
  var searchedCities = document.querySelector("#searchedCities");
  
  function renderSearchedCities() {
      searchedCities.innerHTML = "";
    for (i = 0; i < weatherHistory.length; i++) {
      var searchedEl = document.createElement("p");
      searchedEl.textContent = weatherHistory[i];
      searchedCities.append(searchedEl);
    }
  }

  function getFahrenheit(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
  }
  //function takes city name and retrieves weather data for that city
  function getWeather(city) {
    var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    //send fetch request to get latitude and longitude
    fetch(currentWeatherUrl)
      .then((data) => data.json())
      .then(function (weather) {
        console.log(weather);
        if (weather.cod === "404") {
          alert("City not found");
          return;
        }
        currentCity.innerHTML = "" + weather.name;
        
        var lat = weather.coord.lat;
        var lon = weather.coord.lon;
        
        //api call for the latitude and longitude
        var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
        fetch(onecallURL)
          .then((data) => data.json())
          .then(function (onecallData) {
            console.log(onecallData);
            buildDashboard(onecallData);
          });
      });
  }
  
  function buildDashboard(data) {
    var currentDate = new Date(data.current.dt * 1000);
    console.log(currentDate);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    var currentTemperature = document.querySelector("#temp");
    var currentHumidity = document.querySelector("#humidity");
    var currentUvi = document.querySelector("#uvi");
    var searchBtn = document.querySelector("#searchBtn");
    var clearHistoryBtn = document.querySelector("#clearHistoryBtn");


    currentCity.innerHTML += " (" + month + "/" + day + "/" + year + ") ";
    currentTemperature.innerHTML =
      "Temperature: " + getFahrenheit(data.current.temp) + " F";
    currentHumidity.innerHTML = "Humidity: " + data.current.humidity + " %";
    currentUvi.innerHTML = "UV Index: " + data.current.uvi;
    var cityForecast = document.querySelector("#forecast");
    cityForecast.innerHTML = "";


    for (i = 0; i < 5; i++) {
      var forecastIndex = data.daily[i];
      console.log(forecastIndex);
      cityForecast.append(buildForecast(forecastIndex));
    }
  }
  
  function buildForecast(forecast) {
    // Container for the forecast
    var col = document.createElement("div");

    col.classList.add("col", "cards");
    var forecastContainer = document.createElement("div");
    forecastContainer.classList.add("big-primary", "rounded", "p-5");
  
    // Create forecast image
    var forecastImg = document.createElement("img");
    forecastImg.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
    );
  
    // Format forecast Date
    var forecastDate = new Date(forecast.dt * 1000);
    var forecastDay = forecastDate.getDate();
    var forecastMonth = forecastDate.getMonth() + 1;
    var forecastYear = forecastDate.getFullYear();
    var forecastDateEl = document.createElement("h4");

    forecastDateEl.innerHTML =
      forecastMonth + "/" + forecastDay + "/" + forecastYear;
  
    // Forecast Temperature
    var forecastTemp = document.createElement("p");
    forecastTemp.innerHTML = "Temp: " + getFahrenheit(forecast.temp.day) + " F";
  
    // Forecast Humidity
    var forecastHumidity = document.createElement("p");
    forecastHumidity.innerHTML = "Humidity: " + forecast.humidity + "%";
  
    // Append to forecast Container
    forecastContainer.append(
      forecastDateEl,
      forecastImg,
      forecastTemp,
      forecastHumidity
    );
  
    // append forecast container to parent div
    col.append(forecastContainer);
  
    // Return formatted col div
    return col;
  }
  
  var weatherHistory = JSON.parse(localStorage.getItem("search")) || [];
  console.log(weatherHistory);
  renderSearchedCities();
  
  searchBtn.addEventListener("click", function (e) {
    var searchCity = inputEl.value;
    getWeather(searchCity);
    getRandomImage();
    weatherHistory.push(searchCity);
    renderSearchedCities();
    localStorage.setItem("search", JSON.stringify(weatherHistory));
  });
  
  clearHistoryBtn.addEventListener("click", function () {
    localStorage.clear();
    weatherHistory = [];
    searchedCities.innerHTML = "";
  });

