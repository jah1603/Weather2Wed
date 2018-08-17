const fetch = require('node-fetch');

const Request = function (url) {
  this.url = url;
};
//fetch(request, {mode: 'cors'});
Request.prototype.get = function (onComplete) {
  return fetch(this.url)
    .then((response) => {
      response.json()});

};

 Request.prototype.getAll = function (onComplete) {
   const xhr = new XMLHttpRequest();
   xhr.open('GET', this.url);
   xhr.addEventListener('load', function() {
     if(this.status !== 200){
       return;
     }
     const data = JSON.parse(this.responseText)

     console.log("data:", data);
     onComplete(data);
   });
   xhr.send();
 };



module.exports = Request;
