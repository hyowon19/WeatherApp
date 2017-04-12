(function() {
  var DARKSKY_API_URL = 'https://api.darksky.net/forecast/';
  var DARKSKY_API_KEY = '3ea9e1be68db69da4cdf571131aa0708';
  var CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

  var GOOGLE_MAPS_API_KEY = 'AIzaSyBeHeehDomEr4vqQ_qoAUzZZ2nS-gye7GA';
  var GOOGLE_MAPS_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

  function getCurrentWeather(coords) {
    var url = `${CORS_PROXY}${DARKSKY_API_URL}${DARKSKY_API_KEY}/${coords.lat},${coords.lng}`;
    return (
      fetch(url)
      .then(response => response.json())
      .then(data => data.currently)
    );
  }

  function getCoordinatesForCity(cityName) {
    var url = `${GOOGLE_MAPS_API_URL}?address=${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
    return (
      fetch(url)
      .then(response => response.json())
      .then(data => data.results[0].geometry.location)
    );
  }

  var app = document.querySelector('#app');
  var cityForm = app.querySelector('.city-form');
  var cityInput = cityForm.querySelector('.city-input');
  var getWeatherButton = cityForm.querySelector('.get-weather-button');
  var cityWeather = app.querySelector('.city-weather');
  var weatherData = app.querySelector('.weather-data');

  cityForm.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the form from submitting

    var city = cityInput.value;

    getCoordinatesForCity(city)
    .then(getCurrentWeather)
    .then(function(weather) {
      while (listing.hasChildNodes()) {
        listing.removeChild(listing.lastChild);
      }
      var statsToKeep = ['temperature','summary','nearestStormDistance','windSpeed','visibility']; // can input known object 'keys' in this array, it will be used with the find method
      for (key in weather){  // this will loop through all the keys in the weather object
        if(statsToKeep.find(function(element) {
          return element === key;})) { // using the find method, returning elements that match/exist in the statsToKeep array
            var newList = document.createElement('li');  //creating element li
            var newHeader = document.createElement('h2');
            var newPara = document.createElement('p');
            newList.className = `li-${key}`;
            weatherData.appendChild(newList);
            newHeader.innerText = `${key}`;
            newPara.innerText = `${weather[key]}`;
            newList.appendChild(newHeader);
            newList.appendChild(newPara);
        }
      }
    })
  });
})();
