const PubSub = require('../helpers/pub_sub.js');

const InputFormView = function (form){
  this.form = form;
};

InputFormView.prototype.bindEvents = function () {
  this.form.addEventListener('submit', (evt) => {
    console.log(evt);
    this.handleSubmit(evt);

  });
};

InputFormView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  console.log(evt.target.location.value);
  const location = evt.target.location.value;
  PubSub.publish('InputFormView:location-ready', location);
  const newSearch = this.createSearch(evt.target);
  console.log(evt);
  PubSub.publish('InputFormView:search-submitted', newSearch);
  evt.target.reset();
};

InputFormView.prototype.convertDateToSecondsSince1970 = function (form) {
   const newYearsDay2019 = 1483228800;

  const dateSearched = form.range.valueAsNumber + newYearsDay2019; // time in seconds since 1970
  console.log("date searched:",dateSearched);

  PubSub.publish('InputFormView:date-ready', dateSearched);

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
