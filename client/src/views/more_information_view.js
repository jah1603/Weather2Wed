const PubSub = require('../helpers/pub_sub.js');

const MoreInformation = function(container, weatherData) {
  this.container = container;
  this.weatherData = weatherData;
};

MoreInformation.prototype.render = function() {

  //
  // const this.container = document.createElement('table');
  // this.container.classList.add('more_information');

  const sunriseRow = document.createElement('tr');

  const sunriseIcon = document.createElement('td');
  const sunriseLogo = document.createElement('img');
  sunriseLogo.src = 'images/weather_icons/sunset.png';
  sunriseIcon.appendChild(sunriseLogo);

  const sunriseDetail = document.createElement('td');
  const sunriseTime = document.createElement('p');
  sunriseTime.textContent = `Sunrise at ${this.weatherData.daily.data[0].sunriseTime}`;
  sunriseDetail.appendChild(sunriseTime);

  sunriseRow.appendChild(sunriseIcon);
  sunriseRow.appendChild(sunriseTime);
  this.container.appendChild(sunriseRow);

 const moonPhaseRow = document.createElement('tr');
 const moonIcon = document.createElement('td');
  const moonPhaseLogo = document.createElement('img');
  moonPhaseLogo.src = 'images/weather_icons/moon.png';
  moonIcon.appendChild(moonPhaseLogo);

  const moonPhaseDescription = document.createElement('td');
  const moonPhase = document.createElement('p');
  moonPhase.textContent = `the moon phase is ${this.weatherData.daily.data[0].moonPhase}`;
  moonPhaseDescription.appendChild(moonPhase);
moonPhaseRow.appendChild(moonIcon);
moonPhaseRow.appendChild(moonPhaseDescription);
this.container.appendChild(moonPhaseRow);


const tempHighAndLowRow = document.createElement('tr');
const tempHighAndLowIcon = document.createElement('td');

  const tempHighAndLowLogo = document.createElement('img');
  tempHighAndLowLogo.src = 'images/weather_icons/temperature.png';
  tempHighAndLowIcon.appendChild(tempHighAndLowLogo);

  const tempHighAndLowDetail = document.createElement('td');
  const tempSummary = document.createElement('p');
  const highTime = this.weatherData.daily.data[0].temperatureHighTime;
  const lowTime = this.weatherData.daily.data[0].temperatureLowTime;
  const tempHigh = this.weatherData.daily.data[0].temperatureHigh;
  const tempLow = this.weatherData.daily.data[0].temperatureLow;
  tempSummary.textContent = `the day's lowest temperature is ${tempLow}C at ${lowTime} and the highest temperature will be ${tempHigh}C at ${highTime}`
  tempHighAndLowDetail.appendChild(tempSummary);


  tempHighAndLowRow.appendChild(tempHighAndLowIcon);
  tempHighAndLowRow.appendChild(tempHighAndLowDetail);
  this.container.appendChild(tempHighAndLowRow);


const humidityRow = document.createElement('tr');
const humidityIcon = document.createElement('td');

const humidityLogo = document.createElement('img');
humidityLogo.src = 'images/weather_icons/pine.png'
humidityIcon.appendChild(humidityLogo);

const humidityDetail = document.createElement('td');
  const humidity = document.createElement('p');
  humidity.textContent = `humidity: ${this.weatherData.daily.data[0].humidity}`;
  humidityDetail.appendChild(humidity);

  humidityRow.appendChild(humidityIcon);
  humidityRow.appendChild(humidityDetail);
  this.container.appendChild(humidityRow);


  const windRow = document.createElement('tr');
  const windIcon = document.createElement('td');
  const windLogo = document.createElement('img');
  windLogo.src = 'images/weather_icons/wind-speed.png'
  windIcon.appendChild(windLogo);

  const windDetail = document.createElement('td');

  const windSpeed = document.createElement('p');
  windSpeed.textContent = `Wind speed: ${this.weatherData.daily.data[0].windSpeed} mph`;
  windDetail.appendChild(windSpeed);
  windRow.appendChild(windIcon);
  windRow.appendChild(windDetail);
  this.container.appendChild(windRow);

  const cloudRow = document.createElement('tr');
  const cloudIcon = document.createElement('td');
  const cloudLogo = document.createElement('img');
  cloudLogo.src = 'images/weather_icons/clouds.png'
  cloudIcon.appendChild(cloudLogo);

  const cloudDetail = document.createElement('td');
  const cloudCover = document.createElement('p');
  cloudCover.textContent = `cloud cover: ${this.weatherData.daily.data[0].cloudCover}%`;
  cloudDetail.appendChild(cloudCover);

  cloudRow.appendChild(cloudIcon);
  cloudRow.appendChild(cloudDetail);
  this.container.appendChild(cloudRow);








};


module.exports = MoreInformation;
