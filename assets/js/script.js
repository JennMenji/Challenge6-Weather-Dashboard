var cityFormEl = document.querySelector("#city-form");
var searchHistoryEl = document.querySelector("#search-history");
var cities = [];
// get the city
// store into local storage

// function to get today's Weather Data
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
          getUv(data);
        });
      } else {
        alert("There is an error retrieving Weather Data");
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

// function to get UV Index
var getUv = function (weatherData) {
  var lat = weatherData.coord.lat;
  var lon = weatherData.coord.lon;

  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=minutely,hourly,daily,alerts&appid=43cdeb3bdb5d7232fb98c9ed196e3be8";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
          console.log(data);
          displayUvData(data);
        });
      } else {
        alert("Could not fetch UV Index");
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
  weatherIcon.addClass("weather-detail main img-icon right");
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
};

// append UV Index
var displayUvData = function (uvDataCall) {
  var getUvIndex = uvDataCall.current.uvi;
  console.log(getUvIndex);
  var uvIndex = $("<span>").text("UV Index: " + getUvIndex);

  if (getUvIndex <= 2) {
    uvIndex.addClass("weather-detail favorable");
    console.log("added1");
  } else if (getUvIndex >= 3 || getUvIndex >= 7) {
    uvIndex.addClass("weather-detail moderate");
    console.log("added2");
  } else if (getUvIndex >= 8) {
    uvIndex.addClass("weather-detail extreme");
    console.log("added3");
  }
  //   append to page
  $("#weather-data-info").append(uvIndex);
};

// function to get 5 Day Forecast
var getForecastData = function (city) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&appid=43cdeb3bdb5d7232fb98c9ed196e3be8";

  fetch(apiUrl)
    .then(function (response) {
      //   check to see if response is ok
      if (response.ok) {
        return response.json().then(function (data) {
          displayForecastData(data);
        });
      } else {
        alert("There is an error retrieving Weather Data");
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

// function to display Forcast data
var displayForecastData = function (forcastData) {
  console.log(forcastData);
};

var createCityBtns = function (savedCityName, cityIndex) {
  var cityBtn = document.createElement("button");
  cityBtn.textContent = savedCityName;
  cityBtn.classList.add(
    "city-btn",
    "waves-effect",
    "waves-light",
    "btn",
    "col",
    "s12"
  );
  cityBtn.setAttribute("data-city", cityIndex);
  cityBtn.setAttribute("type", "button");
  searchHistoryEl.appendChild(cityBtn);
};

var saveCities = function (city) {
  cities.push(city);

  const filteredArr = cities.filter((item, i, arr) => arr.indexOf(item) === i);

  localStorage.setItem("cities", JSON.stringify(filteredArr));
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
  getForecastData(cityInput);
  saveCities(cityInput);
  createCityBtns(cityInput);

  event.preventDefault();
  document.querySelector("#city-form").reset();
});

// to get weather data based on search history buttons
$("#search-history").on("click", ".city-btn", function (e) {
  var selectedCity = e.target.outerText;
  getWeatherData(selectedCity);
  getForecastData(selectedCity);
});

var testing = function (city) {
  console.log(city);
};

loadSavedCities();
