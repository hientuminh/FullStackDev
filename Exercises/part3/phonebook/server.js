require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const rfs = require('rotating-file-stream')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Person = require('./models/person')

// create a write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('combined', {stream: accessLogStream }))
app.use(bodyParser.json())

//
// mongoose.connect(url, { useNewUrlParser: true })
//   .then(result => {
//     console.log('connected to MongoDB')
//   })
//   .catch((error) => {
//     console.log('error connecting to MongoDB:', error.message)
//   })

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON())
  })
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person.deleteOne({_id: id}).then(deletedPerson => {
    res.status(204).end()
  })
})

app.put('/api/persons/:id', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  Person.findOneAndUpdate({_id: body.id}, {$set: {number: body.number}}, {new: true}).then(updatedPerson => {
    console.log(updatedPerson)
    res.json(updatedPerson.toJSON())
  })
})

const PORT = 3001
const HOST = 'localhost'
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
