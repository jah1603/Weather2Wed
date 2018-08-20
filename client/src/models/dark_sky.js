const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const DarkSky = function (){
  this.data = null;
}

// listens for the date input and location input
DarkSky.prototype.bindEvents = function () {
  PubSub.subscribe("InputFormView:date-ready", (evt)=>{
    const date = evt.detail;
    PubSub.subscribe("Geocode:location-ready", (evt)=>{
      const position = evt.detail;
      this.getWeatherData(position, date);
    })
    //call get weatherdata
  })

  
};

// gets weather data from api
DarkSky.prototype.getWeatherData = function (location, seconds) {
  const url = `http://localhost:8080/weather/${location}/${seconds}`
  const request = new Request (url);
  //TODO: write comment var precipProbability = this.getRainProbability(location, seconds);
const precipProb = this.getRainProbability(location,seconds);
  request.get()
  .then((data)=>{
  this.data = data;
  //this.data something add prob into
  PubSub.publish('DarkSky:weather-ready', this.data);
  })

};
//
// TODO: the rain(location, seconds)
//  const years = seconds % secondsInAYear
// for i = 0 + ( secondsInYear * years), i < years ++ {
//
// }



DarkSky.prototype.getRainProbability = function (location, seconds) {
  const years = parseInt(seconds / 31536000);
  const secondsInTwelveDays = (12*86400);
  const unixYears = (years * 31536000);
  console.log("unixYears is",unixYears);
  const positionInYear = ((seconds - unixYears) - secondsInTwelveDays);
  console.log("position in year:",positionInYear);
  console.log(years);
  // for (var i = )
  // for (var i = positionInYear; i <= unixYears; i+31536000 ){
  //   // const url = `http://localhost:8080/weather/${location}/${i}`
  //   // const request = new Request (url);
  //   // request.get()
  //   // .then((data)=>{
  //   // this.data = data;
  //   console.log("A loop has happened", i);
  //
  //
  // };

  var probability = "tbc"
  return probability;
};

module.exports = DarkSky;
