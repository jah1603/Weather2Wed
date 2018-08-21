const PubSub = require('../helpers/pub_sub.js');

const MoreInformation = function(container, weatherData) {
  this.container = container;
  this.weatherData = weatherData;
};

MoreInformation.prototype.convertMoonPhaseNumberToName = function () {
  if (this.weatherData.daily.data[0].moonPhase < 0.125 && this.weatherData.daily.data[0].moonPhase >= 0){
    var moonPhaseName = 'new_moon.jpg'
  }
  elseif(this.weatherData.daily.data[0].moonPhase < 0.125 && this.weatherData.daily.data[0].moonPhase >= 0){
    
  }
};

MoreInformation.prototype.render = function() {

  const moreInfoContainer = document.createElement('div');
  moreInfoContainer.classList.add('more_information');
  console.log("weatherData:", this.weatherData);

  const sunriseLogo = document.createElement('img');
  sunriseLogo.src = 'images/weather_icons/sunset.png';
  moreInfoContainer.appendChild(sunriseLogo);
  const sunriseTime = document.createElement('p');
  sunriseTime.textContent = `Sunrise at ${this.weatherData.daily.data[0].sunriseTime}`;
  moreInfoContainer.appendChild(sunriseTime);

  const moonPhaseLogo = document.createElement('img');
  moonPhaseLogo.src = 'images/weather_icons/moon.png';
  moreInfoContainer.appendChild(moonPhaseLogo);
  const moonPhase = document.createElement('p');
  moonPhase.textContent = `the moon phase is ${this.weatherData.daily.data[0].moonPhase}`;
  moreInfoContainer.appendChild(moonPhase);


  const tempHighAndLowLogo = document.createElement('img');
  tempHighAndLowLogo.src = 'images/weather_icons/temperature.png';
  moreInfoContainer.appendChild(tempHighAndLowLogo);

  const tempSummary = document.createElement('p');
  const highTime = this.weatherData.daily.data[0].temperatureHighTime;
  console.log(highTime);
  const lowTime = this.weatherData.daily.data[0].temperatureLowTime;
  const tempHigh = this.weatherData.daily.data[0].temperatureHigh;
  const tempLow = this.weatherData.daily.data[0].temperatureLow;
  tempSummary.textContent = `the day's lowest temperature is ${tempLow}C at ${lowTime} and the highest temperature will be ${tempHigh}C at ${highTime}`
  moreInfoContainer.appendChild(tempSummary);




  const humidity = document.createElement('p');
  humidity.textContent = `humidity: ${this.weatherData.daily.data[0].humidity}`;
  moreInfoContainer.appendChild(humidity);

  const windLogo = document.createElement('img');
  windLogo.src = 'images/weather_icons/wind-speed.png'
  moreInfoContainer.appendChild(windLogo);
  const windSpeed = document.createElement('p');
  windSpeed.textContent = `Wind speed: ${this.weatherData.daily.data[0].windSpeed} mph`;
  moreInfoContainer.appendChild(windSpeed);

  const cloudLogo = document.createElement('img');
  cloudLogo.src = 'images/weather_icons/clouds.png'
  moreInfoContainer.appendChild(cloudLogo);
  const cloudCover = document.createElement('p');
  cloudCover.textContent = `cloud cover: ${this.weatherData.daily.data[0].cloudCover}%`;
  moreInfoContainer.appendChild(cloudCover);


  this.container.appendChild(moreInfoContainer)







};


module.exports = MoreInformation;
