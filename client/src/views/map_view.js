const PubSub = require('../helpers/pub_sub.js');


const MapView = function (container) {
  this.container = container;

}



MapView.prototype.bindEvents = function () {
//55.9533,3.1883
PubSub.subscribe("Geocode:location-ready", (evt)=>{
  this.container.innerHTML = "";
  console.log(evt.detail);
  const position = evt.detail;
  console.log([position]);
  var mymap = L.map('mapid').setView(position, 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1Ijoic2ZyMTk4MSIsImEiOiJjamt3dXN4ZjQwMXhqM3Zuc3k2YzIzZ2NhIn0.seZTJewmJSw7dqlgaEV6-Q'
  }).addTo(mymap);
  var marker = L.marker(position).addTo(mymap);
  var w2wIcon = L.icon({
    iconUrl: 'https://storage.needpix.com/thumbs/heart-47946_1280.png',
    shadowUrl: '',

    iconSize:     [38, 55], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [10, -10], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
  })
  L.marker(position, {icon: w2wIcon}).addTo(mymap).bindPopup("I am a good icon.");



})


// this.container.appendChild(mymap)

};



module.exports = MapView;
