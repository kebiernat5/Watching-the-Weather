var api_key = "66063a7da8550b0c7ad783d805bd48b7";


var button = document.querySelector("#submit")
button.addEventListener("click", function (){
    getWeather(document.querySelector(".form-control").value)
});

// When I click submit
// I want to call getWeather
// And getFutureWeather

// $("form-control").val(localStorage.getItem("cities-searched"))


function getWeather(city){
    var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    // send fetch request to get latitude and longitude
    fetch(currentWeatherUrl)
    .then((data)=> data.json())
    .then(function (weather){
        console.log(weather);
        todaysWeather(weather);
        if (weather.cod === "404"){
            alert("City not found");
            return;
        }
    })
}

function todaysWeather(currentWeather){
   var today = document.querySelector(".current-weather");
   var cityEl = document.createElement("h2");
    cityEl.textContent = currentWeather.name;
    today.appendChild(cityEl)
    var tempEl = document.createElement("h2");
    tempEl.textContent = currentWeather.main.temp
    today.appendChild(tempEl)
    var humidityEl = document.createElement("h2");
    humidityEl.textContent = currentWeather.main.humidity
    today.appendChild(humidityEl)
    var uvIndexEl = document.createElement("h2");
    uvIndexEl.textContent = currentWeather.main.temp
    today.appendChild(uvIndexEl)
}

getWeather("New York");


























// function getFutureWeather(city){
//     var futureWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
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

// var weather = 
// var lat = weather.coord.lat;
// var lon = weather.coord.lon;

// var onecallURL = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}';
// fetch(onecallURL)
// .then((data) => data.json())
// .then(function(oneCallData){
// console.log(oneCallData);
// })


getWeather("Temecula")