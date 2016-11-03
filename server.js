var express = require('express');
var strftime = require('strftime');
var app = express();
console.log(strftime('%B %d, %Y %H:%M:%S')); // => April 28, 2011 18:21:08
console.log(strftime('%F %T', new Date(1307472705067))); // => 2011-06-07 18:51:45

var port = process.env.PORT || 8080;

app.get('/', function (req, res) {
  
  
  
  
  res.send('Output goes here!');
});

app.listen(port, function () {
  console.log('Example app listening on port '+ port +'!');
});