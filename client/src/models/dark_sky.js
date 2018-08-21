const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const DarkSky = function (){
  this.data = null;
}

// listens for the date input and location input
DarkSky.prototype.bindEvents = function () {


     PubSub.subscribe("Geocode:location-ready", (evt)=>{

      const position = evt.detail[0];
      const date = evt.detail[1];
      this.getWeatherData(position, date);
     })




};

// gets weather data from api
DarkSky.prototype.getWeatherData = function (location, seconds) {
  const url = `http://localhost:8080/weather/${location}/${seconds}`
  const request = new Request (url);
  request.get()
  .then((data)=>{
  this.data = data;
  PubSub.publish('DarkSky:weather-ready', this.data);
  })

};

module.exports = DarkSky;
