const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');
const API_KEY = require('../helpers/api_key.js');


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
  const url = `https://api.darksky.net/forecast/${API_KEY}/${location},${seconds}`
  console.log(url);
  const request = new Request (url);
  request.getAll((data)=>{
    this.data = data;
    console.log("HELLOE");
    PubSub.publish('DarkSky:weatherReady', this.data);

  })



};






module.exports = DarkSky;
