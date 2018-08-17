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
  const newSearch = this.createSearch(evt.target);
  PubSub.publish('InputFormView:search-submitted', newSearch);
  evt.target.reset();
};

InputFormView.prototype.convertDateToMilliseconds = function (form) {
  const dateSearched = form.date.value;
  const dateSearchedInMilliseconds = Date.parse(dateSearched);
  console.log(dateSearchedInMilliseconds);
  const referenceDate = new Date('D2012-02-10T13:19:11+0000')
  const referenceDateInMilliseconds = Date.parse(referenceDate);
  const urlInputMilliseconds = dateSearched - referenceDate;
  return urlInputMilliseconds;
};

InputFormView.prototype.createSearch = function (form) {

const millisecondsForUrl = this.convertDateToMilliseconds(form);

const newSearch = {
  location: form.location.value,
  date: millisecondsForUrl
}
return newSearch;
};

module.exports = InputFormView;
