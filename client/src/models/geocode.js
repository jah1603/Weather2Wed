const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const Geocode = function (){
  this.data = null;
}

// listens for input
Geocode.prototype.bindEvents = function () {
  PubSub.subscribe('InputFormView:location-ready', (evt) => {
    const longLat = evt.detail;
    this.getLocation(longLat);
  });
};

// Geocode.prototype.getLocation = function (input) {
//   const url = `https://geocode.xyz/${input},region=UK?json=1`
//   console.log(url);
//   const request = new Request (url);
//   request.getAll((data)=>{
//     this.data = data;
//     console.log("GEOPAGE HELLO");
//     // PubSub.publish('DarkSky:weatherReady', this.data);
//   })

//gets location from api
Geocode.prototype.getLocation = function (location) {
  const url = `http://localhost:8080/longlat/${location}`
  const request = new Request (url);
  request.get()
  .then((data)=>{
  const lat = parseFloat(data.items[0].lat);
  const long = parseFloat(data.items[0].long);
  const position = [lat,long];
  //const position = `${data.items[0].lat},${data.items[0].long}`

  PubSub.publish('Geocode:location-ready', position);
  })

};

module.exports = Geocode;
