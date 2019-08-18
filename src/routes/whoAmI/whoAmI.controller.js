function whoAmI (req, res) {
  const { ip, headers } = req
  res.json({
    ip: ip,
    language: headers['accept-language'],
    software: headers['user-agent']
  })
}

module.exports = { whoAmI }
