const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const FourSquare = function (){
  this.data = null;
}

FourSquare.prototype.bindEvents = function () {
   PubSub.subscribe("Geocode:location-ready", (evt)=>{
     const position = evt.detail;
     this.getEventData(position);
   })

};

FourSquare.prototype.getEventData = function (location) {
  const url = `http://localhost:8080/hotel/${location}`
  const request = new Request (url);
   request.get()
   .then((data)=>{
   this.data = data;

   PubSub.publish('FourSquare:hotel-ready', this.data);
   })
  };

  module.exports = FourSquare;
