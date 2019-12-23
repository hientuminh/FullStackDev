const exampleRouter = require('express').Router()

exampleRouter.get('/', async (request, response, next) => {
  console.log(request.token)
  return response.json({message: true})
})

module.exports = exampleRouter
