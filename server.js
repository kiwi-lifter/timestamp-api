
/**
 * @description  a string as a parameter, passed through the url, is checked to see whether that string contains either a
 * unix timestamp or a natural language date (example: January 1, 2016).
 * @returns the Unix timestamp and the natural language form of the date or null
 **/
 
var express = require('express');
var strftime = require('strftime');
var app = express();


app.get('/', function (req, res) {
  
  
  
  
  res.send('Output goes here!');
});

app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!');
});