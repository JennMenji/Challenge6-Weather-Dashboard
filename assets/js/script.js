var cityFormEl = document.querySelector("#city-form");
var cityFormEl = document.querySelector;
var getLocation = function () {};

var getWeatherData = function () {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?q=miami&appid=43cdeb3bdb5d7232fb98c9ed196e3be8";

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

getWeatherData();
