/** 
  * @desc this app uses a url parameter date value to output the date formatted as unix code and natural language.
  * @author Garrick McCaskill kiwilifter808@gmail.com
  * @required express, strftime
**/

var moment = require('moment');
var express = require('express');
var app = express();


function dateIsTimestamp(date) {
    return moment.unix(date).isValid();
}

function dateIsNaturalDate(date) {
    return moment(date, 'MMMM DD, YYYY').isValid();
}

function convertToTimestamp(naturalDate) {
    return moment(naturalDate, 'MMMM DD, YYYY').unix();
}

function convertToNaturalDate(timestamp) {
    return moment.unix(timestamp).format('MMMM DD, YYYY');
}

/**
 * @desc  loads the index.html or an error message if problem with connection.
**/

app.get("/", (req,res) => {
  res.sendFile('index.html', {root: __dirname}, function(err) {
    if (err) {
      console.log(err);
      res.send("Sorry app not working. :(");
      res.status(err.status).end();
    }
  });
});

/**
 * @desc  a string as a parameter, passed through the url, is checked to see whether that string contains either a
 * unix timestamp or a natural language date (example: January 1, 2016).
 * @param {string}
 * @returns {string} the Unix timestamp and the natural language form of the date passed in or null.
 **/
app.get('/:date', (req, res) => {
    var date = req.params.date
    ,unixTimestamp
    ,naturalDate;

    
    if(dateIsTimestamp(date)){
        unixTimestamp = date;
        naturalDate = convertToNaturalDate(date);

    } else if (dateIsNaturalDate(date)){
        unixTimestamp = convertToTimestamp(date);
        naturalDate = date;

    } else {
        unixTimestamp = null;
        naturalDate = null;
    }

    var objectToSend = {
        "unix": unixTimestamp,
        "natural": naturalDate
    };

    res.send(objectToSend);
});

app.listen(process.env.PORT || 8080, function () {
  console.log('App listening on port 8080 or server appointed port.');
});