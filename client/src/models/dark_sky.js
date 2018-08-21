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
//const precipProbArray = this.getRainProbability(location,seconds);
//console.log("The array",precipProbArray);
  request.get()
  .then((data)=>{
  this.data = data;
  // this.data.currently.pressure = precipProbArray;
  console.log("ONE");
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

DarkSky.prototype.getRainProbability = async function (location, seconds) {
  const secondsInYear = 31536000
  const years = parseInt(seconds / secondsInYear);
  const secondsInTwelveDays = (12*86400);
  const unixYears = (years * secondsInYear);
  console.log("unixYears is",unixYears);
  const positionInYear = ((seconds - unixYears) - secondsInTwelveDays);
  console.log("position in year:",positionInYear);


//TODO: please note to limit the number of requests to DarkSky during development we are iterating a lower than optimum numbers of times for our result
  const startPoint2015 = positionInYear + (secondsInYear * 45);
  var rainChanceArray = [];
  var secondsArray = [];
  const midnightToday = new Date(Date.now());
  midnightToday.setHours(0,0,0,0);
  const loopStoppingPoint = midnightToday.getTime()/1000;


   for (i = startPoint2015; i <= 1534847848; i+= secondsInYear ){
     secondsArray.push(i);
};
  for(const date of secondsArray){
    const url = `http://localhost:8080/weather/${location}/${date}`
     const request = new Request (url);
     await request.get()
     .then((data)=>{
     this.data = data;
      rainChanceArray.push(this.data.daily.data[0].precipProbability);

  })
};


  console.log("rain is ifnished", rainChanceArray);
  return rainChanceArray;
};



// });


module.exports = DarkSky;
