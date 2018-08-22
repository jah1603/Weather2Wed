const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');


const FourSquare = function (){
  this.data = null;
}

FourSquare.prototype.bindEvents = function () {

     PubSub.subscribe("ResultView:map-request", (evt)=>{
       const position = evt.detail;
       console.log("this has been requested");
       this.getEventData(position);
      })

};

FourSquare.prototype.getEventData = function (location) {
  console.log("This is also runnning");
  const url = `http://localhost:8080/hotel/${location}`
  const request = new Request (url);
   request.get()
   .then((data)=>{
     console.log("test string");
   this.data = data;
   PubSub.publish('FourSquare:hotel-ready', this.data);
   })
  };

  module.exports = FourSquare;
