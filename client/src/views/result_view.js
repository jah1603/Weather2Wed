const PubSub = require('../helpers/pub_sub.js');
const DarkSky = require('../models/dark_sky.js');
const MoreInformation= require('./more_information_view.js');
const MapView = require('./map_view.js');

const ResultView = function (container) {
  this.container = container;
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
    const date = timeConverter(evt.detail.daily.data[0].time);

    header.textContent = `Typical weather for ${date}: ${evt.detail.daily.data[0].summary}`;
    modalHeader.appendChild(header);
    // END CREATE MODAL CONTENT

    // CREATE MODAL BODY
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalContent.appendChild(modalBody);

    // CREATE TABLE ELEMENTS
    const resultsTable = document.createElement('table');
    const dailyAverage = document.createElement('tr');
    const dailyAverageIcon = document.createElement('td');

    const icon = evt.detail.daily.data[0].icon;
    const weatherIcon = document.createElement('img');
    weatherIcon.src = `images/weather_icons/${icon}.png`;
    dailyAverageIcon.appendChild(weatherIcon);

    const averageDailyTemperature = document.createElement('td');
    dailyAverage.appendChild(dailyAverageIcon);

    // temperature for the afternoon
    const temp = farenToCelsius(evt.detail.hourly.data[14].temperature);

    const temperature = document.createElement('p');
    temperature.classList.add("temperature_day")
    temperature.textContent = `Average temp: ${temp}°C`
    averageDailyTemperature.appendChild(temperature);
    dailyAverage.appendChild(averageDailyTemperature);
    resultsTable.appendChild(dailyAverage);

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
    resultsTable.appendChild(rainRow);

    const sunsetRow = document.createElement('tr');
    const sunsetIcon = document.createElement('td');

    const sunsetLogo = document.createElement('img');
    sunsetLogo.src = 'images/weather_icons/sunset.png';
    sunsetIcon.appendChild(sunsetLogo);

    const dailySunsetTime = document.createElement('td');
    const sunsetTime = evt.detail.daily.data[0].sunsetTime;
    const sunriseTime = evt.detail.daily.data[0].sunriseTime;
    const betterSunriseTime = timeConverterToHours(sunriseTime);
    const betterSunsetTime = timeConverterToHours(sunsetTime);

    const actualSunsetTime = document.createElement('p');
    actualSunsetTime.textContent = `Sunrise: ${betterSunriseTime} Sunset: ${betterSunsetTime}`;
    dailySunsetTime.appendChild(actualSunsetTime);
    sunsetRow.appendChild(sunsetIcon);
    sunsetRow.appendChild(dailySunsetTime);
    resultsTable.appendChild(sunsetRow);
    modalBody.appendChild(resultsTable);
    // END CREATE MODAL BODY

    // Map Nesting

    const mapArea = document.createElement('div');
    mapArea.setAttribute("id", "mapid")
    modalBody.appendChild(mapArea);
    const mapView = new MapView(mapArea);
    const latitude = evt.detail.latitude;
    const longitude = evt.detail.longitude;
    const position = [latitude,longitude];
    mapView.bindEvents();
    mapView.center(position);
    mapView.addMarker(position);
    PubSub.publish("ResultView:map-request", (position));



  PubSub.subscribe("FourSquare:hotel-ready", (evt)=> {


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



    // CREATE MODAL FOOTER
    // const footer = document.createElement('div');
    // footer.classList.add('modal-footer');
    // modalContent.appendChild(footer);
    //
    // const footerText = document.createElement('h3');
    // footerText.textContent = `I'm the footer :)`;
    // footer.appendChild(footerText);
    // END CREATE MODAL FOOTER


    // Pass readable time to nested view
    evt.detail.daily.data[0].sunriseTime = timeConverterToHours(evt.detail.daily.data[0].sunriseTime);

    evt.detail.daily.data[0].temperatureHigh = farenToCelsius(evt.detail.daily.data[0].temperatureHigh);

    evt.detail.daily.data[0].temperatureLow = farenToCelsius(evt.detail.daily.data[0].temperatureLow);

    evt.detail.daily.data[0].temperatureHighTime =
   timeConverterToHours(evt.detail.daily.data[0].temperatureHighTime);

    evt.detail.daily.data[0].temperatureLowTime = timeConverterToHours(evt.detail.daily.data[0].temperatureLowTime);


// RESULTS OVERLAY PAGE
    const moreInformation = new MoreInformation(resultsTable, evt.detail);
    moreInformation.render();


    function overlayShow() {
      document.getElementById("overlay").className += " show";
    }

    function overlayHide() {
      document.getElementById("overlay").classList.remove("show");
    }

  })


// should time converter, farenToCelsius & timeConverter be in their own js file?
  function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var month = months[a.getMonth()];
  var date = a.getDate();

  if (date == 3) {
   var formattedDate = `${date}rd`
} else if (date == 2) {
   var formattedDate = `${date}nd`
}
else if (date == 1) {
   var formattedDate = `${date}st`
}
else if (date == 21) {
   var formattedDate = `${date}st`
}
else if (date == 31) {
   var formattedDate = `${date}st`
}
else if (date == 22) {
   var formattedDate = `${date}nd`
}
else if (date == 23) {
   var formattedDate = `${date}rd`
}
 else {
   var formattedDate = `${date}th`
}

  var hour = a.getHours();
  var min = a.getMinutes();
  var time = 'the ' + formattedDate + ' of ' + month  ;
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

return time;
}




};

module.exports = ResultView;
