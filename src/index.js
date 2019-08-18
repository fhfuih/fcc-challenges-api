'use strict'

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes')
const errors = require('./middleware/errors')

const app = express()
const {
  PORT: port = 8000,
  DB_URL: mongooseUrl = 'mongodb://127.0.0.1:27017/test'
} = process.env

mongoose.connect(mongooseUrl, {
  keepAlive: true,
  useNewUrlParser: true
})
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to MongoDB ${mongooseUrl}`)
})

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.use(router)
app.use(errors)
app.use((req, res) => {
  res.status(400).json({
    error: {
      message: 'Bad Requst'
    }
  })
})

app.listen(port, '0.0.0.0', () => console.log(`App listening on port ${port}!`))
