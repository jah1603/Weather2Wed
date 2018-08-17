const PubSub = require('../helpers/pub_sub.js');
const DarkSky = require('../models/dark_sky.js');

const ResultView = function (container) {
  this.container = container;
  this.darkSky = new DarkSky();
}



ResultView.prototype.bindEvents = function () {
  PubSub.subscribe('DarkSky:weather-ready', (evt)=>{

    console.log(evt.detail);
    const weatherReport = document.createElement("H3");
    weatherReport.textContent = evt.detail.hourly.summary;

    this.container.appendChild(weatherReport);
  })

};

module.exports = ResultView;
