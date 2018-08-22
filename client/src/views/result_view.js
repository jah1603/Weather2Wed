const PubSub = require('../helpers/pub_sub.js');
const DarkSky = require('../models/dark_sky.js');
const MoreInformation= require('./more_information_view.js');
const MapView = require('./map_view.js');
const ConversionMethods = require('../models/conversion_methods.js');

const ResultView = function (container) {
  this.container = container;
  this.conversionMethods = new ConversionMethods();
  this.resultsTable = null;
  this.modalBody = null;
}

// loads icons related to weather on that date
// TODO: target results view, use grid & resize icons
ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('DarkSky:weather-ready', (evt)=>{
    this.container.innerHTML = "";

    // CREATE MODAL
    this.container.style.display = 'block';
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        this.container.style.display = "none";
      }
    });
    // END CREATE MODAL

    // CREATE MODAL CONTENT
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    this.container.appendChild(modalContent);

    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header');
    modalContent.appendChild(modalHeader);

    const span = document.createElement('span');
    span.classList.add("close");
    span.textContent = '\u00D7';
    span.addEventListener('click', () => {
        this.container.style.display = "none";
    });
    modalHeader.appendChild(span);


    const header = document.createElement('h2');
    const date = this.conversionMethods.timeConverter(evt.detail.daily.data[0].time);

    header.textContent = `Typical weather for ${date}: ${evt.detail.daily.data[0].summary}`;
    modalHeader.appendChild(header);
    // END CREATE MODAL CONTENT

    // CREATE MODAL BODY
    this.modalBody = document.createElement('div');
    console.log(this.modalBody);
    this.modalBody.classList.add('modal-body');
    modalContent.appendChild(this.modalBody);
    // END CREATE MODAL BODY

    //render results table
    this.renderTable(evt);


    // Map Nesting

    const mapArea = document.createElement('div');
    mapArea.setAttribute("id", "mapid")
    this.modalBody.appendChild(mapArea);
    const mapView = new MapView(mapArea);
    const latitude = evt.detail.latitude;
    const longitude = evt.detail.longitude;
    const position = [latitude,longitude];
    mapView.bindEvents();
    mapView.center(position);
    mapView.addMarker(position);
    // Page loaded and ready for map details
    PubSub.publish("ResultView:map-request", (position));


    // Four square response
    PubSub.subscribe("FourSquare:hotel-ready", (evt)=> {
    let x = "Hello!";

      console.log("another quote");
      console.log("Ran at these times:", x);


      for (var i = 0; i < evt.detail.response.venues.length; i++){

        const hotelPosition = [evt.detail.response.venues[i].location.lat, evt.detail.response.venues[i].location.lng];
        var hotelDetails = '';
        const hotelName = evt.detail.response.venues[i].name;
        hotelDetails += `${hotelName} `;
         if (evt.detail.response.venues[i].location.address){
         const hotelAddress = evt.detail.response.venues[i].location.address;
         hotelDetails += `${hotelAddress} `;
       }
         if (evt.detail.response.venues[i].location.postalCode){
         const hotelPostcode = evt.detail.response.venues[i].location.postalCode;
         hotelDetails += `${hotelPostcode}`
       }
         mapView.fourSquare(hotelPosition, hotelDetails);
       }
     });





// RESULTS OVERLAY PAGE



    function overlayShow() {
      document.getElementById("overlay").className += " show";
    }

    function overlayHide() {
      document.getElementById("overlay").classList.remove("show");
    }

  })

};

// Render results TABLE
ResultView.prototype.renderTable = function (evt) {

  this.resultsTable = document.createElement('table');
  this.renderDailyAverage(evt);
  this.renderRain(evt);
  this.renderSunTimes(evt);
  const moreInformation = new MoreInformation(this.resultsTable, evt.detail, evt.detail.daily.data[0].time);
  moreInformation.render();
  this.modalBody.appendChild(this.resultsTable);

};

// CREATE TABLE ELEMENTS: Daily Average
ResultView.prototype.renderDailyAverage = function (evt) {
  const dailyAverage = document.createElement('tr');
  const dailyAverageIcon = document.createElement('td');

  const icon = evt.detail.daily.data[0].icon;
  const weatherIcon = document.createElement('img');
  weatherIcon.src = `images/weather_icons/${icon}.png`;
  dailyAverageIcon.appendChild(weatherIcon);

  const averageDailyTemperature = document.createElement('td');
const temp = this.conversionMethods.fahrenheitToCelsius(evt.detail.hourly.data[14].temperature);
  averageDailyTemperature.textContent = `Average temp: ${temp}°C`;
  dailyAverage.appendChild(dailyAverageIcon);
  dailyAverage.appendChild(averageDailyTemperature);
  this.resultsTable.appendChild(dailyAverage);

};

// CREATE TABLE ELEMENTS: Rain
ResultView.prototype.renderRain = function (evt) {
  const rainRow = document.createElement('tr');
  const rainIcon = document.createElement('td');

  const rainLogo = document.createElement('img');
  rainLogo.src = 'images/weather_icons/rain_chance.png';
  rainIcon.appendChild(rainLogo);

  const rainPercentage = document.createElement('td');
  const rainChance = Math.round(evt.detail.daily.data[0].precipProbability*100);
  const rain = document.createElement("p");
  rain.textContent = `Chance of rain: ${rainChance}%`
  rainPercentage.appendChild(rain);
  rainRow.appendChild(rainIcon);
  rainRow.appendChild(rainPercentage);
  this.resultsTable.appendChild(rainRow);

};

  // CREATE TABLE ELEMENTS: Sunrise and Sunset

ResultView.prototype.renderSunTimes = function (evt) {
 const sunsetRow = document.createElement('tr');
 const sunsetIcon = document.createElement('td');

 const sunsetLogo = document.createElement('img');
 sunsetLogo.src = 'images/weather_icons/sunset.png';
 sunsetIcon.appendChild(sunsetLogo);

 const dailySunsetTime = document.createElement('td');
 const sunsetTime = evt.detail.daily.data[0].sunsetTime;
 const sunriseTime = evt.detail.daily.data[0].sunriseTime;
 const betterSunriseTime = this.conversionMethods.timeConverterToHours(sunriseTime);
 const betterSunsetTime = this.conversionMethods.timeConverterToHours(sunsetTime);

 const actualSunsetTime = document.createElement('p');
 actualSunsetTime.textContent = `Sunrise: ${betterSunriseTime} Sunset: ${betterSunsetTime}`;
 dailySunsetTime.appendChild(actualSunsetTime);
 sunsetRow.appendChild(sunsetIcon);
 sunsetRow.appendChild(dailySunsetTime);
 this.resultsTable.appendChild(sunsetRow);

};


module.exports = ResultView;
