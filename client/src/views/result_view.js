const PubSub = require('../helpers/pub_sub.js');
const DarkSky = require('../models/dark_sky.js');

const ResultView = function (container) {
  this.container = container;
  this.darkSky = new DarkSky();
}

ResultView.prototype.bindEvents = function () {



  PubSub.subscribe('DarkSky:weather-ready', (evt)=>{

    console.log(evt.detail);
    this.container.innerHTML = "";
    const weatherReport = document.createElement("H3");
    const date = timeConverter(evt.detail.currently.time);
    weatherReport.textContent = `Typically on ${date}, the weather at this location is ${evt.detail.currently.summary}`;
    this.container.appendChild(weatherReport);
  })


  function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month  ;
  return time;
}
console.log(timeConverter(0));







};










module.exports = ResultView;
