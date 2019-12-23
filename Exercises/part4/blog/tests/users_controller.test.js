const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./users_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = helper.initialUsers
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

test('users are returned as json', async() => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all users are returned', async () => {
  const response = await api.get('/api/users')

  expect(response.body.length).toBe(helper.initialUsers.length)
})
