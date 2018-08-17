const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');



const Geocode = function (){
  this.data = null;

}


Geocode.prototype.bindEvents = function () {
  PubSub.subscribe('InputFormView:location-ready', (evt)=>{
    console.log(evt.detail);
    const longLat = evt.detail;
    this.getLocation(longLat);
  });
};

Geocode.prototype.getLocation = function (input) {
  const url = `https://geocode.xyz/${input},region=UK?json=1`
  console.log(url);
  const request = new Request (url);
  request.getAll((data)=>{
    this.data = data;
    console.log("GEOPAGE HELLO");
    // PubSub.publish('DarkSky:weatherReady', this.data);
  })



};






module.exports = DarkSky;
