const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');



const Geocode = function (){
  this.data = null;

}


Geocode.prototype.bindEvents = function () {
  //Subscribe to user input -

  //this.getLocation(location);


};


Geocode.prototype.getLocation = function (input) {
  const url = `https://geocode.xyz/${input},region=UK?json=1`
  console.log(url);
  const request = new Request (url);
  request.getAll((data)=>{
    this.data = data;
    console.log("HELLOE");
    PubSub.publish('DarkSky:weatherReady', this.data);

  })



};






module.exports = DarkSky;
