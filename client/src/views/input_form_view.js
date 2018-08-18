const PubSub = require('../helpers/pub_sub.js');

const InputFormView = function (form){
  this.form = form;
};

InputFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);

  });
};

InputFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  console.log(evt.target.location.value);
  const location = evt.target.location.value;
  PubSub.publish('InputFormView:location-ready', location);
  const newSearch = this.createSearch(evt.target);
  PubSub.publish('InputFormView:search-submitted', newSearch);
  evt.target.reset();
};

InputFormView.prototype.convertDateToSecondsSince1970 = function (form) {

  const dateSearched = form.date.value;
  const dateSearchedInSeconds = Date.parse(dateSearched) / 1000;

  console.log(dateSearchedInSeconds);
  PubSub.publish('InputFormView:date-ready', dateSearchedInSeconds);

};

InputFormView.prototype.createSearch = function (form) {

const secondsForUrl = this.convertDateToSecondsSince1970(form);
//
// const newSearch = {
//   location: form.location.value,
//   date: secondsForUrl
// }
// 
// return newSearch;
};

module.exports = InputFormView;
