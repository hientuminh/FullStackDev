const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const rfs = require('rotating-file-stream')
const path = require('path')
const morgan = require('morgan')

// create a write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(morgan('combined', {stream: accessLogStream }))
app.use(bodyParser.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "Tu Hien",
    "number": "+84-932-447376",
    "id": 5
  },
  {
    "name": "Yen Nhi",
    "number": "84-906-464342",
    "id": 6
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

app.get('/persons', (req, res) => {
  res.json(persons)
})


app.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = persons.find(note => note.id === id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/persons', (req, res) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }

  const phoneBook = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(phoneBook)
  res.json(phoneBook)
})

app.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = persons.filter(person => person.id === id)
  res.status(204).end()
})

const PORT = 3001
const HOST = 'localhost'
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
