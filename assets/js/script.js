var cityFormEl = document.querySelector("#city-form");
var searchHistoryEl = document.querySelector("#search-history");

// var getLocation = function (event) {
//   var textInput = document.querySelector("#city-input").value.trim;

//   event.preventDefault();
// };

$("#city-form").submit(function (event) {
  var cityInput = $("#city-input").val().trim();
  getWeatherData(cityInput);
  event.preventDefault();
});

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

var displayWeatherData = function (cityData) {
  // append City Name
  var cityName = cityData.name;
  $(".city-name").text(cityName);

  console.log(cityData.weather.icon);
  console.log(cityData.main.temp + " F");
  console.log(cityData.main.humidity);
  console.log(cityData.wind.speed + " mph");
};

// getWeatherData();
// cityFormEl.addEventListener("submit", getLocation());
