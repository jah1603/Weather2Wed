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
const precipProbArray = this.getRainProbability(location,seconds);
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

DarkSky.prototype.arrayElementNotUndefined = function (element) {
  return element !== undefined;
};

DarkSky.prototype.getRainProbability = function (location, seconds) {
  const secondsInYear = 31536000
  const years = parseInt(seconds / secondsInYear);
  const secondsInTwelveDays = (12*86400);
  const unixYears = (years * secondsInYear);
  console.log("unixYears is",unixYears);
  const positionInYear = ((seconds - unixYears) - secondsInTwelveDays);
  console.log("position in year:",positionInYear);
  console.log(years);
//TODO: please note to limit the number of requests to DarkSky during development we are iterating a lower than optimum numbers of times for our result
  const startPoint2015 = positionInYear + (secondsInYear * 45);




  var rainChanceArray = [];
   for (i = startPoint2015; i <= Date.now()/1000; i+= secondsInYear ){
     const url = `http://localhost:8080/weather/${location}/${i}`
      const request = new Request (url);
      request.get()
      .then((data)=>{
      this.data = data;
      rainChanceArray.push(this.data.daily.data[0].precipProbability);
       })
     }

     // .then((data) =>{
     for (var i = 0; i < (rainChanceArray.length - 1); i++){
       if (rainChanceArray[i] !== undefined){
         console.log(rainChanceArray[i]);
       }
     }
   // }
   // );



console.log("rain chance:", rainChanceArray);


// const stuff = function(){
// for (var i = 0; i < (rainChanceArray.length - 1); i++){
//   console.log("Hi");
//   if (rainChanceArray[i] !== undefined){
//     console.log("Hi2");
//   }
// }
// }

// reduce(reducer, 0);







};

module.exports = DarkSky;
