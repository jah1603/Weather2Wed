const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const DarkSky = function (){
  this.data = null;
}

DarkSky.prototype.bindEvents = function () {
  //Subscribe to request
  PubSub.subscribe("InputFormView:date-ready", (evt)=>{
    console.log("YO!!!!!");
    console.log(evt.detail);
    const date = evt.detail;
    PubSub.subscribe("Geocode:location-ready", (evt)=>{
      console.log("Geocode:Location-ready");
      const position = evt.detail;
      console.log("position is:", position);
      this.getWeatherData(position, date);

    })

    //call get weatherdata
  })

  //this.getWeatherData(location, seconds);
};

DarkSky.prototype.getWeatherData = function (location, seconds) {
  console.log('calling');
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
