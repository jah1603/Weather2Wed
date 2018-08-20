const PubSub = require('../helpers/pub_sub.js');

const MapView = function (container) {
  this.container = container;
}

// creates map on input from user
MapView.prototype.bindEvents = function () {

  var mymap = L.map('mapid').setView([55.952535,-3.191916], 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoic2ZyMTk4MSIsImEiOiJjamt3dXN4ZjQwMXhqM3Zuc3k2YzIzZ2NhIn0.seZTJewmJSw7dqlgaEV6-Q'
  }).addTo(mymap);



PubSub.subscribe("Geocode:location-ready", (evt)=>{
  position = evt.detail;
  mymap.setView(position ,13);
  var marker = L.marker(position).addTo(mymap);

})

PubSub.subscribe("FourSquare:hotel-ready", (evt)=> {

   for (var i = 0; i < evt.detail.response.venues.length; i++){
     console.log("my log:", evt.detail.response.venues);
     const hotelPosition = [evt.detail.response.venues[i].location.lat, evt.detail.response.venues[i].location.lng];
     const hotelName = evt.detail.response.venues[i].name;
     var marker = L.marker(hotelPosition).addTo(mymap).bindPopup(`${hotelName}`);

   }


});


// do we need this ---
// var map = L.map('map-preview').setView([48.46477, 7.88112], 15);
// mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
// L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; ' + mapLink + ' Contributors', maxZoom: 18,}).addTo(map);
// var marker = L.marker([48.46477, 7.88112]).addTo(map);
// map.scrollWheelZoom.disable();
// this.container.appendChild(mymap)

// console.log(position);
// var w2wIcon = L.icon({
//   iconUrl: 'https://storage.needpix.com/thumbs/heart-47946_1280.png',
//   shadowUrl: '',
//
//   iconSize:     [38, 55], // size of the icon
//   shadowSize:   [50, 64], // size of the shadow
//   iconAnchor:   [10, -10], // point of the icon which will correspond to marker's location
//   shadowAnchor: [0, 0],  // the same for the shadow
//   popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
// })
// L.marker(position, {icon: w2wIcon}).addTo(mymap).bindPopup("i am not a great icon");


};

module.exports = MapView;
