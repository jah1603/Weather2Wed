const DarkSky = require('./models/dark_sky.js');
const ResultView = require('./views/result_view.js');
const MapView = require('./views/map_view.js');
const InputFormView = require('./views/input_form_view.js');
const Geocode = require('./models/geocode.js')


document.addEventListener('DOMContentLoaded', ()=> {
  console.log("Java script loaded");
const dateForm = document.querySelector('form');
const inputFormView = new InputFormView(dateForm);
inputFormView.bindEvents();

const geocode = new Geocode();
geocode.bindEvents();


const map = document.querySelector('#mapid');
const mapView = new MapView(map);
mapView.bindEvents();

const weather = document.querySelector('div#weather')
const resultView = new ResultView(weather);
resultView.bindEvents();


const darkSky = new DarkSky();
darkSky.bindEvents();


})
