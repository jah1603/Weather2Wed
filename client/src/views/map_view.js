const PubSub = require('../helpers/pub_sub.js');

const MapView = function (container) {
  this.container = container;
  this.map = null
}

// creates map on input from user
MapView.prototype.bindEvents = function () {

  this.map = L.map('mapid').setView([55.952535,-3.191916], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoic2ZyMTk4MSIsImEiOiJjamt3dXN4ZjQwMXhqM3Zuc3k2YzIzZ2NhIn0.seZTJewmJSw7dqlgaEV6-Q'
  }).addTo(this.map);




//

};

MapView.prototype.center = function (position) {
    this.map.setView(position ,13);
};


MapView.prototype.addMarker = function (position) {
   L.marker(position).addTo(this.map);

};

MapView.prototype.fourSquare = function (hotelPosition, hotelDetails) {

  L.marker(hotelPosition).addTo(this.map).bindPopup(`${hotelDetails}`);

};

module.exports = MapView;
