const { NotFoundError } = require('../../errors/errors')
const ShortUrl = require('./shortUrl.model')

async function create (req, res) {
  const { url } = req.body

  const exsisted = await ShortUrl.findOne({ url })
  if (exsisted) {
    res.json({
      url,
      short: exsisted._id
    })
    return
  }

  const doc = new ShortUrl({ url })
  await doc.save()
  res.json({
    url,
    short: doc._id
  })
}

async function get (req, res) {
  const { id } = req.params
  const { url } = (await ShortUrl.findById(id)) || {}
  if (url) {
    res.redirect(url)
  } else {
    throw new NotFoundError('Short URL record not found')
  }
}

async function list (req, res) {
  const data = await ShortUrl.find()
  res.json({
    data
  })
}

module.exports = { create, get, list }
