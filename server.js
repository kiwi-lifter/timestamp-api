/** 
  * @desc this app uses a url parameter date value to output the date formatted as unix code and natural language.
  * @author Garrick McCaskill kiwilifter808@gmail.com
  * @required express, strftime
**/

var express = require('express')
  ,strftime = require('strftime')
  ,app = express();

app.get("/", (req,res) => {
  
  res.send( "<h1>API Basejump: Timestamp microservice</h1><p>For more information visit this <a href='https://timestamp-ms.herokuapp.com/'>link</a></P>");
  
});

/**
 * @desc  a string as a parameter, passed through the url, is checked to see whether that string contains either a
 * unix timestamp or a natural language date (example: January 1, 2016).
 * @param {string}
 * @returns {string} the Unix timestamp and the natural language form of the date passed in or null
 **/
app.get('/:query', (req, res) => {
  
  var query = req.params.query
    ,output = {}
    ,time;
  
  if (isNaN(Number(query))) { //if not timestamp
    if (new Date(query) !== 'Invalid Date') { //if valid date
      time = new Date(query);
    } else {
      time = null;
    }
  } else { //if timestamp
    time = new Date(Number(query) * 1000);
  }

  time === null ? output = { 'unix': null, 'natural': null } : output = { 'unix': time.getTime() / 1000, 'natural': strftime('%B %d, %Y', time) } ;

  res.send(JSON.stringify(output));
    
});
 
app.listen(process.env.PORT || 8080, function () {
  console.log('Example app listening on port 8080!');
});