function getMetadata (req, res) {
  const { size, originalname: name } = req.file
  res.json({ size, name })
}

module.exports = { getMetadata }
