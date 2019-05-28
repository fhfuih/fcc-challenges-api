// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

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

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
