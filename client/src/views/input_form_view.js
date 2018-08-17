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

InputFormView.prototype.createSearch = function (form) {
const newSearch = {
  location: form.location.value,
  date: form.date.value
}
return newSearch;
};

module.exports = InputFormView;
