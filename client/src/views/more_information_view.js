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

  //
  // const this.container = document.createElement('table');
  // this.container.classList.add('more_information');

  const sunriseRow = document.createElement('tr');

  const sunriseIcon = document.createElement('td');
  const sunriseLogo = document.createElement('img');
  sunriseLogo.src = 'images/weather_icons/sunset.png';
  sunriseIcon.appendChild(sunriseLogo);

  const sunriseDetail = document.createElement('td');
  // const sunriseTime = document.createElement('p');
  // sunriseTime.textContent = `Sunrise at ${this.weatherData.daily.data[0].sunriseTime}`;
  // sunriseDetail.appendChild(sunriseTime);
  //
  // sunriseRow.appendChild(sunriseIcon);
  // sunriseRow.appendChild(sunriseTime);
  // this.container.appendChild(sunriseRow);

 const moonPhaseRow = document.createElement('tr');
 const moonIcon = document.createElement('td');
  const moonPhaseLogo = document.createElement('img');

  moonPhaseLogo.src = `images/weather_icons/${this.convertMoonPhaseNumberToImageName()}`;
  moonIcon.appendChild(moonPhaseLogo);
  const moonPhaseDescription = document.createElement('td');
  const moonPhase = document.createElement('p');
  moonPhase.textContent = this.convertMoonPhaseNumberToName();
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
  tempSummary.textContent = `Low of ${tempLow}°C at ${lowTime}  High of ${tempHigh}°C at ${highTime}`
  tempHighAndLowDetail.appendChild(tempSummary);


  tempHighAndLowRow.appendChild(tempHighAndLowIcon);
  tempHighAndLowRow.appendChild(tempHighAndLowDetail);
  this.container.appendChild(tempHighAndLowRow);


const humidityRow = document.createElement('tr');
const humidityIcon = document.createElement('td');

const humidityLogo = document.createElement('img');
humidityLogo.src = 'images/weather_icons/humidity.jpg'
humidityIcon.appendChild(humidityLogo);

const humidityDetail = document.createElement('td');
  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${this.weatherData.daily.data[0].humidity*100}%`;
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
  cloudCover.textContent = `Cloud cover: ${parseInt(this.weatherData.daily.data[0].cloudCover*100)}%`;
  cloudDetail.appendChild(cloudCover);

  cloudRow.appendChild(cloudIcon);
  cloudRow.appendChild(cloudDetail);
  this.container.appendChild(cloudRow);








};


module.exports = MoreInformation;
