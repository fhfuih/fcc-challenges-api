const mongoose = require('mongoose')
const shortid = require('shortid')
const URL = require('url')
const dns = require('dns')

function validateUrlFormat (url) {
  const { protocol } = new URL.URL(url)
  return protocol === 'http:' || protocol === 'https:'
}

function validateUrlResolve (url) {
  const { host } = new URL.URL(url)
  return new Promise((resolve, reject) => {
    dns.lookup(host, err => {
      resolve(!err)
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
    validate: [
      {
        validator: validateUrlFormat,
        message: 'The URL is malformed or not of HTTP(S) protocol'
      },
      {
        validator: validateUrlResolve,
        message: 'The URL points to nowhere'
      }
    ]
  }
}, {
  capped: 4096,
  collection: 'ShortUrl'
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
