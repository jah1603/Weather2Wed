const PubSub = require('../helpers/pub_sub.js');
const DarkSky = require('../models/darkSky.js');

const ListView = function (container) {
  this.container = container;
  this.darkSky = new DarkSky();
}



ListView.prototype.bindEvents = function () {
  PubSub.subscribe('DarkSky:weatherReady', (evt)=>{

    console.log(evt.detail);
    const weatherReport = document.createElement("H3");
    weatherReport.textContent = evt.detail.hourly.summary;

    this.container.appendChild(weatherReport);
  })


};



module.exports = ListView;
