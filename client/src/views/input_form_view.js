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
  const referenceDate = new Date('1970-12-25T00:00:00')
  const referenceDateInMilliseconds = Date.parse(referenceDate);
  const urlInputMilliseconds = dateSearchedInMilliseconds - referenceDateInMilliseconds;
  return urlInputMilliseconds;
};

InputFormView.prototype.createSearch = function (form) {

const millisecondsForUrl = this.convertDateToMilliseconds(form);

const newSearch = {
  location: form.location.value,
  date: millisecondsForUrl
}
console.log(newSearch);
return newSearch;
};

module.exports = InputFormView;
