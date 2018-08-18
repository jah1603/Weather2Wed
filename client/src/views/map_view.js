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
  var mymap = L.map('mapid').setView(evt.detail, 13);
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.satellite',
      accessToken: 'pk.eyJ1Ijoic2ZyMTk4MSIsImEiOiJjamt3dXN4ZjQwMXhqM3Zuc3k2YzIzZ2NhIn0.seZTJewmJSw7dqlgaEV6-Q'
  }).addTo(mymap);
  var marker = L.marker([55.95, -3.19]).addTo(mymap);
  var circle = L.circle([55.9470, -3.2020], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 100
  }).addTo(mymap);

})


// this.container.appendChild(mymap)

};



module.exports = MapView;
