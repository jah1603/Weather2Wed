const PubSub = require('../helpers/pub_sub.js');

const MoreInformation = function (container, weatherData) {
  this.container = container;
  this.weatherData = weatherData;
};

MoreInformation.prototype.render = function () {

  const moreInfoContainer = document.createElement('div');
  moreInfoContainer.classList.add('more_information');
  console.log("weatherData:", this.weatherData);

  const sunriseLogo = document.createElement('img');
  sunriseLogo.src = 'images/weather_icons/sunset.png';
  this.container.appendChild(sunriseLogo);
const sunriseTime = document.createElement('p');
sunriseTime.textContent = `Sunrise at ${this.weatherData.daily.data[0].sunriseTime}`;
moreInfoContainer.appendChild(sunriseTime);




this.container.appendChild(moreInfoContainer)


  //
  //
  // "sunriseTime": 1566190374,
  //
  // "moonPhase": 0.62,
  //
  // "temperatureHigh": 62.73,
  //
  // "temperatureHighTime": 1566223200,
  // "temperatureLow": 54.79,
  //
  // "temperatureLowTime": 1566273600,
  //
  //
  // "humidity": 0.79,
  //
  // "windSpeed": 4.55,
  //
  //
  // "cloudCover": 0.69,





};


module.exports = MoreInformation;
