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
    "&appid=43cdeb3bdb5d7232fb98c9ed196e3be8";

  fetch(apiUrl)
    .then(function (response) {
      //   check to see if response is ok
      if (response.ok) {
        return response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert("There is an error retrieving Weather Data");
      }
    })
    .catch(function () {
      alert("Unable to connect");
    });
};

// getWeatherData();
// cityFormEl.addEventListener("submit", getLocation());
