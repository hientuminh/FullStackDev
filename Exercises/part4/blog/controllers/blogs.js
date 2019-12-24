const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token
  try {
    const decodedToken = jwt.verify(token, config.SECRET)
    const user = await User.findById(decodedToken.id)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
      title: body.title,
      url: body.url,
      author: user.username,
      user: user._id,
      likes: body.likes
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } catch (e) {
    next(e)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const token = request.token
  console.log(request.params.id)
  try {
    const decodedToken = jwt.verify(token, config.SECRET)
    const user = await User.findById(decodedToken.id)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const returnedBlog = await Blog
      .findByIdAndUpdate(
        request.params.id,
        {$inc: { likes: 1}},
        {new: true})
    response.status(201).json(returnedBlog)
  } catch (e) {
    next(e)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const returnedBlog = await Blog.findById(request.params.id)
    if (returnedBlog) {
      response.json(returnedBlog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  return response.status(204).end()

  const token = request.token
  try {
    const decodedToken = jwt.verify(token, config.SECRET)
    const returnedBlog = await Blog
                                .findById(request.params.id)
                                .populate('user', { username: 1, name: 1 })
    if (returnedBlog.user._id.toString() === decodedToken.id) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(401).json({ error: 'permission deiend '})
    }

  } catch (e) {
    next(e)
  }
})

module.exports = blogsRouter
