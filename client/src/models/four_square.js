const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const FourSquare = function (){
  this.data = null;
}

FourSquare.prototype.getEventData = function () {
  fetch('https://api.foursquare.com/v2/venues/explore?client_id=ECYAMHN5CN5CXNP5XIRTG0AA53XTPM4EW2EURFBBBI0GVZNK&client_secret=JG53XOT4NE5VDDEIPD34SL0H3VWDAS2AUH4UBNNPE4OMVLRP&v=20180323&limit=1&ll=40.7243,-74.0018&query=wedding')
     .then(function() {
         // Code for handling API response
     })
     .catch(function() {
         // Code for handling errors
     });
  })
