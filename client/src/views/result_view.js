const PubSub = require('../helpers/pub_sub.js');
const DarkSky = require('../models/dark_sky.js');
const MoreInformation= require('./more_information_view.js');

const ResultView = function (container) {
  this.container = container;
  this.darkSky = new DarkSky();
}

// loads icons related to weather on that date
// TODO: target results view, use grid & resize icons
ResultView.prototype.bindEvents = function () {

  PubSub.subscribe('DarkSky:weather-ready', (evt)=>{


    this.container.innerHTML = "";

    const weatherReport = document.createElement("H3");
    const date = timeConverter(evt.detail.daily.data[0].time);
    const icon = evt.detail.daily.data[0].icon;
    weatherReport.textContent = `Typically on ${date}, the weather at this location is ${evt.detail.daily.data[0].summary}`;
    this.container.appendChild(weatherReport);

    const weatherIcon = document.createElement('img');
    weatherIcon.src = `images/weather_icons/${icon}.png`;
    this.container.appendChild(weatherIcon);
    // temperature for the afternoon
    //const temperature = evt.detail.hourly.data[14]

    const temp = farenToCelsius(evt.detail.hourly.data[14].temperature);

    const temperature = document.createElement('p');
    temperature.classList.add("temperature_day")
    temperature.textContent = `${temp}C`
    this.container.appendChild(temperature);

    const rainChance = Math.round(evt.detail.daily.data[0].precipProbability*100);


    const rainLogo = document.createElement('img');
    rainLogo.src = 'images/weather_icons/rain_chance.png';
    this.container.appendChild(rainLogo);

    const rain = document.createElement("p");
    rain.textContent = `${rainChance}%`
    this.container.appendChild(rain);

    const sunsetLogo = document.createElement('img');
    sunsetLogo.src = 'images/weather_icons/sunset.png';
    this.container.appendChild(sunsetLogo);

    const sunsetTime = evt.detail.daily.data[0].sunsetTime;
    const betterSunsetTime = timeConverterToHours(sunsetTime);

    const actualSunsetTime = document.createElement('p');
    actualSunsetTime.textContent = `Sunset at ${betterSunsetTime}`;
    this.container.appendChild(actualSunsetTime)

    evt.detail.daily.data[0].sunriseTime = timeConverterToHours(evt.detail.daily.data[0].sunriseTime);

    evt.detail.daily.data[0].temperatureHigh = farenToCelsius(evt.detail.daily.data[0].temperatureHigh);

    evt.detail.daily.data[0].temperatureLow = farenToCelsius(evt.detail.daily.data[0].temperatureLow);

    evt.detail.daily.data[0].temperatureHighTime =
   timeConverterToHours(evt.detail.daily.data[0].temperatureHighTime);

    evt.detail.daily.data[0].temperatureLowTime = timeConverterToHours(evt.detail.daily.data[0].temperatureLowTime);



    const moreInformation = new MoreInformation(this.container, evt.detail);
    moreInformation.render();







  })

// should time converter, farenToCelsius & timeConverter be in their own js file?
  function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = date + ' ' + month  ;
  return time;
}

function farenToCelsius(faren){
  const celsius = Math.round(((faren - 32)/1.8));
  return celsius;
}

function timeConverterToHours(UNIX_timestamp){
var a = new Date(UNIX_timestamp * 1000);

var hour = a.getHours(); // makes time easier to read (presumes wedding is pm!)
var min = a.getMinutes();
if (min < 10){
  min = `0${min}`;
}
if (hour > 12){
var time = hour-12 + ':' + min + ' pm'  ;
}else{
var time = hour + ':' + min + ' am'  ;
}
console.log(hour);
return time;
}



};

module.exports = ResultView;
