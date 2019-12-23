const requestLogger = (request, response, next) => {
  console.info('Method:', request.method)
  console.info('Path:  ', request.path)
  console.info('Body:  ', request.body)
  console.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  } else {
    request.token = null
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).end({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(422).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token'})
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler
}
