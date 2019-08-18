const mongoose = require('mongoose')
const shortid = require('shortid')
const URL = require('url')
const dns = require('dns')

function validateUrl (url) {
  return new Promise((resolve, reject) => {
    let host, protocol

    try {
      const urlObject = new URL.URL(url)
      host = urlObject.host
      protocol = urlObject.protocol
    } catch (e) {
      resolve(false)
    }

    if (protocol !== 'http:' || protocol !== 'https:') {
      resolve(false)
    }

    dns.lookup(host, err => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

const shortUrlSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: validateUrl,
      message: 'Malformed or invalid URL'
    }
  }
}, {
  capped: 4096,
  collection: 'ShortUrl'
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
