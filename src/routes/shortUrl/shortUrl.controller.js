const ShortUrl = require('./shortUrl.model')

async function create (req, res) {
  const { url } = req.body
  const doc = new ShortUrl({ url })
  await doc.save()
  res.json({
    url,
    short: doc._id
  })
}

async function get (req, res) {
  const id = req.params
  const { url } = await ShortUrl.findById(id)
  res.redirect(url)
}

module.exports = { create, get }
