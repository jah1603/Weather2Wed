const PubSub = require('../helpers/pub_sub.js');

const MoreInformation = function(container, weatherData) {
  this.container = container;
  this.weatherData = weatherData;
};

MoreInformation.prototype.convertMoonPhaseNumberToImageName = function () {
  if (this.weatherData.daily.data[0].moonPhase == 0){
    var moonPhaseName = 'new_moon.jpg'
  }
  else if(this.weatherData.daily.data[0].moonPhase <= 0.167 && this.weatherData.daily.data[0].moonPhase > 0){
    var moonPhaseName = 'waxing_crescent.jpg'
  }
  else if(this.weatherData.daily.data[0].moonPhase <= 0.33 && this.weatherData.daily.data[0].moonPhase > 0.167){
    var moonPhaseName = 'first_quarter.jpg'
  }
  else if(this.weatherData.daily.data[0].moonPhase == 0.50){
    var moonPhaseName = 'full_moon.jpg'
  }
  else if(this.weatherData.daily.data[0].moonPhase <= 0.667 && this.weatherData.daily.data[0].moonPhase > 0.50){
    var moonPhaseName = 'waxing_gibbous.jpg'
  }
  else if(this.weatherData.daily.data[0].moonPhase <= 0.833 && this.weatherData.daily.data[0].moonPhase > 0.667){
    var moonPhaseName = 'last_quarter.jpg'
  }
  else if(this.weatherData.daily.data[0].moonPhase < 1 && this.weatherData.daily.data[0].moonPhase >= 0.833 ){
    var moonPhaseName = 'waning_gibbous.jpg'
  }
  else{
    var moonPhaseName = 'waning_crescent.jpg'
  }
  return moonPhaseName;
};

MoreInformation.prototype.convertMoonPhaseNumberToName = function () {
  if (this.weatherData.daily.data[0].moonPhase == 0){
    var moonPhaseName = 'New moon'
  }
  else if(this.weatherData.daily.data[0].moonPhase <= 0.167 && this.weatherData.daily.data[0].moonPhase > 0){
    var moonPhaseName = 'Waxing crescent moon'
  }
  else if(this.weatherData.daily.data[0].moonPhase <= 0.33 && this.weatherData.daily.data[0].moonPhase > 0.167){
    var moonPhaseName = 'First quarter moon'
  }
  else if(this.weatherData.daily.data[0].moonPhase == 0.50){
    var moonPhaseName = 'Full moon'
  }
  else if(this.weatherData.daily.data[0].moonPhase <= 0.667 && this.weatherData.daily.data[0].moonPhase > 0.50){
    var moonPhaseName = 'Waxing gibbous moon'
  }
  else if(this.weatherData.daily.data[0].moonPhase <= 0.833 && this.weatherData.daily.data[0].moonPhase > 0.667){
    var moonPhaseName = 'Last quarter moon'
  }
  else if(this.weatherData.daily.data[0].moonPhase < 1 && this.weatherData.daily.data[0].moonPhase >= 0.833 ){
    var moonPhaseName = 'Waning gibbous moon'
  }
  else{
    var moonPhaseName = 'Waning crescent moon'
  }
  return moonPhaseName;
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
  moonPhaseLogo.src = `images/weather_icons/${this.convertMoonPhaseNumberToImageName()}`;
  moreInfoContainer.appendChild(moonPhaseLogo);
  const moonPhase = document.createElement('p');
  moonPhase.textContent = this.convertMoonPhaseNumberToName();
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
