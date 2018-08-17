const DarkSky = require('./models/darkSky.js');
const ListView = require('./views/list_view.js');
const MapView = require('./views/map_view.js');



document.addEventListener('DOMContentLoaded', ()=> {
  console.log("Java script loaded");
const darkSKy = new DarkSky();
darkSKy.bindEvents();
const map = document.querySelector('#mapid');
const mapView = new MapView(map);
mapView.bindEvents();
const weather = document.querySelector('div#weather')
const listView = new ListView(weather);
listView.bindEvents();


})
