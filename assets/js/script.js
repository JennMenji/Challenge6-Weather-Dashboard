var cityFormEl = document.querySelector("#city-form");
var searchHistoryEl = document.querySelector("#search-history");
var cities = [];
// get the city
// store into local storage

$("#city-form").submit(function (event) {
  var cityInput = $("#city-input").val().trim();
  getWeatherData(cityInput);
  createCityBtns(cityInput);

  event.preventDefault();
  document.querySelector("#city-form").reset();
});

// var saveCities = function () {
//   localStorage.setItem("cities", JSON.stringify(cities));
// };

// var loadSavedCities = function () {
//   cities = JSON.parse(localStorage.getItem("cit"));

//   console.log(cities);
// };

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

var createCityBtns = function (cities) {
  $("#search-history").html("");
  var cityBtn = $("<button>").text(cities);
  cityBtn.addClass("waves-effect waves-light btn col s12");
  $("#search-history").append(cityBtn);
};

var displayWeatherData = function (cityData) {
  $("#weather-data").html("");
  $("#weather-icon").html("");

  // append City Name
  var getCityName = cityData.name;
  var cityName = $("<h2>").text(getCityName);
  cityName.addClass("weather-detail city-name");
  $("#weather-data").append(cityName);

  //   append Date
  var getDate = moment().format("MMMM DD, YYYY");
  var date = $("<h4>").text(getDate);
  date.addClass("weather-detail date");
  $("#weather-data").append(date);

  // append Temp
  var getCityTemp = cityData.main.temp;
  var cityTemp = $("<span>").text("Temperature: " + getCityTemp + " \u00B0F");
  cityTemp.addClass("weather-detail");
  $("#weather-data").append(cityTemp);

  // append Humidity
  var getHumidity = cityData.main.humidity;
  var humidity = $("<span>").text("Humidity: " + getHumidity + "%");
  humidity.addClass("weather-detail");
  $("#weather-data").append(humidity);

  // append Wind Speed
  var getWindSpeed = cityData.wind.speed;
  var windSpeed = $("<span>").text("Wind Speed: " + getWindSpeed + " MPH");
  windSpeed.addClass("weather-detail");
  $("#weather-data").append(windSpeed);

  //   loadSavedCities();

  //   //   append Weather Icon
  //   var getWeatherIcon = cityData.weather;
  //   console.log(weatherIcon);
  //   var weatherIcon = $("<img>");
  //   weatherIcon.setAttr("src", getWeatherIcon);
  //   weatherIcon.addClass("icon");
  //   weatherIconEl.appendChild(weatherIcon);
};

// getWeatherData();
// cityFormEl.addEventListener("submit", getLocation());
