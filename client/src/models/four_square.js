const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');


const FourSquare = function (){
  this.data = null;
}

FourSquare.prototype.bindEvents = function () {

     PubSub.subscribe("ResultView:map-request", (evt)=>{
       const position = evt.detail;
       console.log("This has been Published a lot of times?");
       this.getEventData(position);
      })

};

FourSquare.prototype.getEventData = function (location) {
  const url = `http://localhost:8080/hotel/${location}`

  const request = new Request (url);
   request.get()
   .then((data)=>{
   this.data = data;

   console.log("This is being called");
   PubSub.publish('FourSquare:hotel-ready', this.data);
   console.log(this.data);
   })
  };

  module.exports = FourSquare;
