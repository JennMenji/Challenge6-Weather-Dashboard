var cityFormEl = document.querySelector("#city-form");
var searchHistoryEl = document.querySelector("#search-history");
var cities = [];
// get the city
// store into local storage

var getWeatherData = function (city) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=43cdeb3bdb5d7232fb98c9ed196e3be8";

  fetch(apiUrl)
    .then(function (response) {
      //   check to see if response is ok
      if (response.ok) {
        return response.json().then(function (data) {
          console.log(data);
          displayWeatherData(data);
        });
      } else {
        alert("There is an error retrieving Weather Data");
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

// function to display weather data
var displayWeatherData = function (cityData) {
  $("#weather-data-main").html("");
  $("#weather-data-info").html("");

  // append City Name
  var getCityName = cityData.name;
  var cityName = $("<h2>").text(getCityName);
  cityName.addClass("weather-detail main city-name");
  $("#weather-data-main").append(cityName);

  //   append Date
  var getDate = moment().format("MMMM DD, YYYY");
  var date = $("<h4>").text(getDate);
  date.addClass("weather-detail main date");
  $("#weather-data-main").append(date);

  //   append Weather Icon
  var getWeatherIconId = cityData.weather[0].icon;
  var iconUrl =
    "http://openweathermap.org/img/wn/" + getWeatherIconId + "@2x.png";
  var weatherIcon = $("<img>").attr("src", iconUrl);
  $("#weather-data-main").append(weatherIcon);

  // append Description
  var getDescription = cityData.weather[0].description;
  var description = $("<span>").text("Description: " + getDescription);
  description.addClass("weather-detail");
  $("#weather-data-info").append(description);

  // append Temp
  var getCityTemp = cityData.main.temp;
  var cityTemp = $("<span>").text("Temperature: " + getCityTemp + " \u00B0F");
  cityTemp.addClass("weather-detail");
  $("#weather-data-info").append(cityTemp);

  // append Humidity
  var getHumidity = cityData.main.humidity;
  var humidity = $("<span>").text("Humidity: " + getHumidity + "%");
  humidity.addClass("weather-detail");
  $("#weather-data-info").append(humidity);

  // append Wind Speed
  var getWindSpeed = cityData.wind.speed;
  var windSpeed = $("<span>").text("Wind Speed: " + getWindSpeed + " MPH");
  windSpeed.addClass("weather-detail");
  $("#weather-data-info").append(windSpeed);

  // append UV Index
  //   var getUvIndex = cityData.???;
  //   var uvIndex = $("<span>").text("UV Index: " + getUvIndex);
  //   uvIndex.addClass("weather-detail");
  //   $("#weather-data-info").append(uvIndex);
};

var createCityBtns = function (savedCityName, cityIndex) {
  var cityBtn = document.createElement("button");
  cityBtn.textContent = savedCityName;
  cityBtn.classList.add("waves-effect", "waves-light", "btn", "col", "s12");
  cityBtn.setAttribute("id", "city-btn");
  cityBtn.setAttribute("data-city", cityIndex);
  cityBtn.setAttribute("type", "button");
  searchHistoryEl.appendChild(cityBtn);
};

var saveCities = function (city) {
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
};

var loadSavedCities = function () {
  cities = JSON.parse(localStorage.getItem("cities"));

  if (!cities) {
    cities = [];
  } else {
    for (var i = 0; i < cities.length; i++) {
      var savedCityName = cities[i];
      createCityBtns(savedCityName, [i]);
    }
  }
};

// to get weather data based on search form
$("#city-form").submit(function (event) {
  var cityInput = $("#city-input").val().trim();
  getWeatherData(cityInput);
  saveCities(cityInput);
  //   createCityBtns(cityInput);

  event.preventDefault();
  document.querySelector("#city-form").reset();
});

// to get weather data based on search history buttons
// $("#search-history").click("button", function () {
//   var selectedCity = $(this).attr("data-city");
//   testing(selectedCity);
//   //   var citySelected = $("#city-btn").val().trim();
//   //   getWeatherData(cityInput);
// });

// var testing = function (city) {
//   console.log(city);
// };

loadSavedCities();
