const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', { title: 1, url: 1 })
    response.json(users.map(user => user.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()
    response.json(savedUser)
  } catch (e) {
    next(e)
  }
})

usersRouter.get('/:id', async (request, response, next) => {
  try {
    const returnedUser = await User.findById(request.params.id)
    if (returnedUser) {
      response.json(returnedUser.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

module.exports = usersRouter
