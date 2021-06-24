var cityFormEl = document.querySelector("#city-form");
var searchHistoryEl = document.querySelector("#search-history");
var forecastResultsEl = document.querySelector("#forecast-results");
var cities = [];
var forecastArr = [];

// function based on selected city to call API that has lat & lon coordinates neccesary to run main API
var getLatAndLon = function (city) {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=43cdeb3bdb5d7232fb98c9ed196e3be8";

  fetch(apiUrl)
    .then(function (response) {
      //   check to see if response is ok
      if (response.ok) {
        return response.json().then(function (data) {
          var name = data.name;
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          getWeatherData(name, lat, lon);
          //   //   getUv(data);
          //   //   valid city was searched therefore we can save city in search history
          //   var saveCity = data.name;
          //   saveCities(saveCity);
        });
      } else {
        alert(
          "There is an error retrieving Weather Data. Please enter a valid City name."
        );
      }
    })
    .catch(function () {
      alert("ERROR: Unable to connect.");
    });
};

// function to use lat & lon for API with ALL info for forcast and weather data
var getWeatherData = function (cityName, cityLat, cityLon) {
  var apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    cityLat +
    "&lon=" +
    cityLon +
    "&exclude=minutely,hourly,alerts&units=imperial&appid=43cdeb3bdb5d7232fb98c9ed196e3be8";
  var confrimCityName = cityName;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json().then(function (data) {
          displayWeatherData(confrimCityName, data);
          createForecastArry(data);
        });
      } else {
        alert(
          "There is an error retrieving Weather Data. Please tryagain later."
        );
      }
    })
    .catch(function () {
      alert("ERROR: Unable to connect.");
    });
};

// function to display weather data for current day
var displayWeatherData = function (weatherCity, weatherData) {
  console.log(weatherCity, weatherData);
  $("#weather-data-main").html("");
  $("#weather-data-info").html("");

  // get and append City Name
  var getCityName = weatherCity;
  var cityName = $("<h2>").text(getCityName);
  cityName.addClass("weather-detail main city-name");
  $("#weather-data-main").append(cityName);

  // get and append Date
  var getDate = moment().format("MMMM DD, YYYY");
  var date = $("<h4>").text(getDate);
  date.addClass("weather-detail main date");
  $("#weather-data-main").append(date);

  // get and append Weather Icon
  var getWeatherIconId = weatherData.current.weather[0].icon;
  var iconUrl =
    "http://openweathermap.org/img/wn/" + getWeatherIconId + "@2x.png";
  var weatherIcon = $("<img>").attr("src", iconUrl);
  weatherIcon.addClass("weather-detail main img-icon right");
  $("#weather-data-main").append(weatherIcon);

  // get and append Description
  var getDescription = weatherData.current.weather[0].description;
  var description = $("<span>").text("Description: " + getDescription);
  description.addClass("weather-detail");
  $("#weather-data-info").append(description);

  // get and append Temp
  var getCityTemp = weatherData.current.temp;
  var cityTemp = $("<span>").text("Temperature: " + getCityTemp + " \u00B0F");
  cityTemp.addClass("weather-detail");
  $("#weather-data-info").append(cityTemp);

  // get and append Humidity
  var getHumidity = weatherData.current.humidity;
  var humidity = $("<span>").text("Humidity: " + getHumidity + "%");
  humidity.addClass("weather-detail");
  $("#weather-data-info").append(humidity);

  // get and append Wind Speed
  var getWindSpeed = weatherData.wind_speed;
  var windSpeed = $("<span>").text("Wind Speed: " + getWindSpeed + " MPH");
  windSpeed.addClass("weather-detail");
  $("#weather-data-info").append(windSpeed);

  //   get and append UVI
  var getUvIndex = weatherData.current.uvi;
  var uvIndex = $("<span>").text("UV Index: " + getUvIndex);

  if (getUvIndex <= 2) {
    uvIndex.addClass("weather-detail favorable");
  } else if (getUvIndex >= 3 || getUvIndex >= 7) {
    uvIndex.addClass("weather-detail moderate");
  } else if (getUvIndex >= 8) {
    uvIndex.addClass("weather-detail extreme");
  }

  $("#weather-data-info").append(uvIndex);
};

// function to narrow down only the five days needed for forecast
var createForecastArry = function (forecastData) {
  forecastArr = [];

  var nextDayForecast = forecastData.daily[1];
  forecastArr.push(nextDayForecast);
  var secondDayForecast = forecastData.daily[2];
  forecastArr.push(secondDayForecast);
  var thirdDayForecast = forecastData.daily[3];
  forecastArr.push(thirdDayForecast);
  var fourthDayForecast = forecastData.daily[4];
  forecastArr.push(fourthDayForecast);
  var fifthDayForecast = forecastData.daily[5];
  forecastArr.push(fifthDayForecast);

  displayForecastData(forecastArr);
};

// function to display Forcast data
var displayForecastData = function (dailyForecastData) {
  forecastResultsEl.innerHTML = "";

  console.log(dailyForecastData);
  for (var i = 0; i < dailyForecastData.length; i++) {
    var forecastCards = document.createElement("div");
    forecastCards.className =
      "card light-blue darken-4 forecast-card col s12 m6 l3 xl2";
    forecastResultsEl.appendChild(forecastCards);

    var cardContent = document.createElement("div");
    cardContent.className = "forecast-data-info card-content white-text";
    forecastCards.appendChild(cardContent);

    var getForecastIcon = dailyForecastData[i].weather[0].icon;
    var forecastIconUrl =
      "http://openweathermap.org/img/wn/" + getForecastIcon + "@2x.png";
    var forecastIcon = document.createElement("img");
    forecastIcon.src = forecastIconUrl;
    cardContent.appendChild(forecastIcon);

    var forecastTemp = document.createElement("span");
    forecastTemp.textContent =
      "Temperature: " + dailyForecastData[i].temp.day + " \u00B0F";
    cardContent.appendChild(forecastTemp);

    var forecastHumidity = document.createElement("span");
    forecastHumidity.textContent =
      "Humidity: " + dailyForecastData[i].humidity + "%";
    cardContent.appendChild(forecastHumidity);

    var forecastWind = document.createElement("span");
    forecastWind.textContent =
      "Wind Speed: " + dailyForecastData[i].wind_speed + " MPH";
    cardContent.appendChild(forecastWind);
  }

  //
  //   // get and append Weather Icon
  //   var getWeatherIconId = weatherData.current.weather[0].icon;
  //   var iconUrl =
  //     "http://openweathermap.org/img/wn/" + getWeatherIconId + "@2x.png";
  //   var weatherIcon = $("<img>").attr("src", iconUrl);
  //   weatherIcon.addClass("weather-detail main img-icon right");
  //   $("#weather-data-main").append(weatherIcon);
};

var createCityBtns = function (searchedCityName) {
  var cityBtn = document.createElement("button");
  cityBtn.textContent = searchedCityName;

  cityBtn.classList.add(
    "city-btn",
    "waves-effect",
    "waves-light",
    "btn",
    "col",
    "s12"
  );
  cityBtn.setAttribute("type", "button");
  searchHistoryEl.appendChild(cityBtn);
};

var saveCities = function (city) {
  console.log(city);
  cities.push(city);

  const filteredArr = cities.filter((item, i, arr) => arr.indexOf(item) === i);
  localStorage.setItem("cities", JSON.stringify(filteredArr));

  for (var i = 0; i <= filteredArr.length; i++) {
    if (city == filteredArr[i]) {
      return;
    } else {
      createCityBtns(city);
      return;
    }
  }
};

var loadSavedCities = function () {
  cities = JSON.parse(localStorage.getItem("cities"));

  if (!cities) {
    cities = [];
  } else {
    for (var i = 0; i < cities.length; i++) {
      var savedCityName = cities[i];
      createCityBtns(savedCityName);
    }
  }
};

// to get weather data based on search form
$("#city-form").submit(function (event) {
  var cityInput = $("#city-input").val().trim();
  getLatAndLon(cityInput);

  event.preventDefault();
  document.querySelector("#city-form").reset();
});

// to get weather data based on search history buttons
$("#search-history").on("click", ".city-btn", function (e) {
  var selectedCity = e.target.outerText;
  getLatAndLon(selectedCity);
});

loadSavedCities();
