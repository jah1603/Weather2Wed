const PubSub = require('../helpers/pub_sub.js');
const DarkSky = require('../models/dark_sky.js');
const MoreInformation= require('./more_information_view.js');
const MapView = require('./map_view.js');
const ConversionMethods = require('../models/conversion_methods.js');

const ResultView = function (container) {
  this.container = container;
}

// loads icons related to weather on that date
// TODO: target results view, use grid & resize icons
ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('DarkSky:weather-ready', (evt)=>{

    const conversionMethods = new ConversionMethods();

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
    const date = conversionMethods.timeConverter(evt.detail.daily.data[0].time);

    header.textContent = `Typical weather for ${date}: ${evt.detail.daily.data[0].summary}`;
    modalHeader.appendChild(header);
    // END CREATE MODAL CONTENT

    // CREATE MODAL BODY
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalContent.appendChild(modalBody);

    //TODO: Render results TABLE
    // rendertable()
    //append table


    ResultView.prototype.renderTable = function () {
      const resultsTable = document.createElement('table');
      this.renderDailyAverage();
      this.renderRain();
      this.renderSunTimes();
      this.renderMoonPhase();
      this.renderHighAndLow();
      this.renderHumidity();
      this.renderWindSpeed();
      this.renderCloudCover();
      modalBody.appendChild(resultsTable);
    };

    // CREATE TABLE ELEMENTS: Daily Average
    ResultView.prototype.renderDailyAverage = function () {
      const dailyAverage = document.createElement('tr');
      const dailyAverageIcon = document.createElement('td');

      const icon = evt.detail.daily.data[0].icon;
      const weatherIcon = document.createElement('img');
      weatherIcon.src = `images/weather_icons/${icon}.png`;
      dailyAverageIcon.appendChild(weatherIcon);

      const averageDailyTemperature = document.createElement('td');
      dailyAverage.appendChild(dailyAverageIcon);
      const dailyAverage = document.createElement('tr');
      const dailyAverageIcon = document.createElement('td');

      const icon = evt.detail.daily.data[0].icon;
      const weatherIcon = document.createElement('img');
      weatherIcon.src = `images/weather_icons/${icon}.png`;
      dailyAverageIcon.appendChild(weatherIcon);

      const averageDailyTemperature = document.createElement('td');
      dailyAverage.appendChild(dailyAverageIcon);
      resultsTable.appendChild(dailyAverage);

    };

    // CREATE TABLE ELEMENTS: Rain
    ResultView.prototype.renderRain = function () {
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

    };

      // CREATE TABLE ELEMENTS: Sunrise and Sunset

   ResultView.prototype.methodName = function () {
     const sunsetRow = document.createElement('tr');
     const sunsetIcon = document.createElement('td');

     const sunsetLogo = document.createElement('img');
     sunsetLogo.src = 'images/weather_icons/sunset.png';
     sunsetIcon.appendChild(sunsetLogo);

     const dailySunsetTime = document.createElement('td');
     const sunsetTime = evt.detail.daily.data[0].sunsetTime;
     const sunriseTime = evt.detail.daily.data[0].sunriseTime;
     const betterSunriseTime = conversionMethods.timeConverterToHours(sunriseTime);
     const betterSunsetTime = conversionMethods.timeConverterToHours(sunsetTime);

     const actualSunsetTime = document.createElement('p');
     actualSunsetTime.textContent = `Sunrise: ${betterSunriseTime} Sunset: ${betterSunsetTime}`;
     dailySunsetTime.appendChild(actualSunsetTime);
     sunsetRow.appendChild(sunsetIcon);
     sunsetRow.appendChild(dailySunsetTime);
     resultsTable.appendChild(sunsetRow);

};



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
    let x = "Hello!";

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


    evt.detail.daily.data[0].temperatureHigh = conversionMethods.fahrenheitToCelsius(evt.detail.daily.data[0].temperatureHigh);

    evt.detail.daily.data[0].temperatureLow = conversionMethods.fahrenheitToCelsius(evt.detail.daily.data[0].temperatureLow);

    evt.detail.daily.data[0].temperatureHighTime =
   conversionMethods.timeConverterToHours(evt.detail.daily.data[0].temperatureHighTime);

    evt.detail.daily.data[0].temperatureLowTime = conversionMethods.timeConverterToHours(evt.detail.daily.data[0].temperatureLowTime);


// RESULTS OVERLAY PAGE
    const moreInformation = new MoreInformation(resultsTable, evt.detail, evt.detail.daily.data[0].time);
    moreInformation.render();


    function overlayShow() {
      document.getElementById("overlay").className += " show";
    }

    function overlayHide() {
      document.getElementById("overlay").classList.remove("show");
    }

  })

};

module.exports = ResultView;
