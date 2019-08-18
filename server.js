// server.js
// where your node app starts

// init project
const express = require('express');
const shortener = require('./shortener');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

/********************************************
 * 
 * 1. Timestamp
 *
 *******************************************/

app.get('/api/timestamp/:date_string?', function(req, res) {
  let input = Number(req.params.date_string) || req.params.date_string;
  let x = new Date(input);
  let utcstr = x.toUTCString();
  if (utcstr == "Invalid Date") {
    res.json({"error" : "Invalid Date" });
  }
  else {
    res.json({"unix": x.getTime(), "utc" : utcstr});
  }
});

/********************************************
 * 
 * 2. whoami
 *
 *******************************************/

app.get('/api/whoami', function(req, res) {
  // console.log(req.ip, req.headers['x-forwarded-for'], req.connection.remoteAddress);
  res.json({
    "ipaddress": req.ip,
    "language": req.headers['accept-language'],
    "software": req.headers['user-agent']
  })
});

/********************************************
 * 
 * 3. shortener
 * Using 
 *   - generated _id for each url as the shortened url code
 *   - a passphrase to later query their shortened url # 
 *
 *******************************************/

app.post('/api/shorturl/new', function(req, res) {
  const url = req.body;
  
})

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
