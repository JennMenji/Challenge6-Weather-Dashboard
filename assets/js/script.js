var cityFormEl = document.querySelector("#city-form");
var getLocation = function () {};

var getWeatherData = function () {
  var apiUrl =
    "http://api.openweathermap.org/data/2.5/weather?zip=32806,us&appid=43cdeb3bdb5d7232fb98c9ed196e3be8";

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
};

getWeatherData();
