const PubSub = require('../helpers/pub_sub.js');
const LEAFLET_TOKEN = require('../../../leaflet_token.js');

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
      accessToken: LEAFLET_TOKEN
  }).addTo(this.map);




//

};

MapView.prototype.center = function (position) {
    this.map.setView(position ,13);
};


MapView.prototype.addMarker = function (position) {
   // L.marker(position).addTo(this.map);
   var violetIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.marker(position, {icon: violetIcon}).addTo(this.map).bindPopup('Your Selected Location');

};

MapView.prototype.fourSquare = function (hotelPosition, hotelDetails) {
  var redIcon = new L.Icon({
 iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
 shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
 iconSize: [25, 41],
 iconAnchor: [12, 41],
 popupAnchor: [1, -34],
 shadowSize: [41, 41]
});

  L.marker(hotelPosition, {icon: redIcon}).addTo(this.map).bindPopup(`${hotelDetails}`);

};

module.exports = MapView;
