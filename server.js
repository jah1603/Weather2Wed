const express = require('express');
const app = express();
const fetch = require('node-fetch')
const API_KEY = require('./api_key.js');

var port = process.env.PORT || 8080;

app.use(express.static('client/public'))

app.get('/', function(req, res){
  res.sendFile('index.html');
});

app.get('/weather/:location/:date' , function(req, res){
  const location = "23.4162,25.6628";
  const date = "1534494903";
  const url = `https://api.darksky.net/forecast/${API_KEY}/${location},${date}`
  fetch(url)
  .then(res =>  res.json())
  .then(data => res.json(data));

})



app.listen(port, function(){
  console.log('Our app is running on http://localhost:' + port)
});
