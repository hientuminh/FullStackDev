const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const exampleRouter = require('./controllers/example')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

const cors = require('cors')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to BD:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(middleware.requestLogger)
// app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.tokenExtractor, blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/example', exampleRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
