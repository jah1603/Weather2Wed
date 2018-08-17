const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const DarkSky = function (){
  this.data = null;
}

DarkSky.prototype.bindEvents = function () {
  //Subscribe to request
  const location = "23.4162,25.6628"

  const seconds = "1534494903"
  this.getWeatherData(location, seconds);
};

DarkSky.prototype.getWeatherData = function (location, seconds) {
  const url = `http://localhost:8080/weather/${location}/${seconds}`
  const request = new Request (url);
  request.get()
  .then((data)=>{
    console.log(data);
  this.data = data;
  PubSub.publish('DarkSky:weather-ready', this.data);
  })

};

module.exports = DarkSky;
