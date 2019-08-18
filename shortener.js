const dns = require('dns');
const shortid = require('shortid');
const mongoose = require('mongoose');

shortid.characters('1234567890');
// mongoose.connect(process.env.MONGO, {useNewUrlParser: true});

let ShortUrlSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  url: {
    type: String,
    required: true,
    unique: true
  }
}, {
  capped: {
    size: 1024,
    max: process.env.MAX_URL_ENTRIES
  },
  collection: "ShortUrl",
});

let ShortUrl = mongoose.model('ShortUrl', ShortUrlSchema);

function addUrl(url, done) {
  /*
   * urlData: {url, short, passphrase}
   * done:    function(err, {url, short, passphrase})
  */
  dns.lookup(urlData.url, function(err) {
    if (err)
      return done(err);
    let document = new ShortUrl({ url });
    document.save(function(err, doc) {
      if (err)
        return done(err);
      return done(null, doc);
    })
  });
}

function visitUrl(short, done) {
  /*
   * short: the digit code of the short url
   * done:  function(err, urlString)
  */
  ShortUrl.findOne({ _id: short }, "url", function(err, data) {
    if (err)
      return done(err);
    return done(null, data);
  })
}

function getShortenedUrl(req, id) {
  const { API_PREFIX = `${req.protocol}://${req.get('host')}${req.baseUrl}` } = process.env;
  return `${API_PREFIX}/api/shorturl/${id}`;
}

module.exports = {
  addUrl,
  visitUrl,
  getShortenedUrl
};
