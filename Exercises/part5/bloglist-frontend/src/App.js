import React, { useState, useEffect } from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [ message, setMessage] = useState({type: '', content: ''})

  useEffect(() => {
    blogService
      .getAll()
      .then(initBlogs => setBlogs(initBlogs))
  }, [])

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const messageShow = {type: '', content: ''}
    setMessage(messageShow)
    try {
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      const messageShow = {type: 'error', content: 'wrong username or password'}
      setMessage(messageShow)
      setTimeout(() => {
        setMessage({type: '', content: ''})
      }, 5000)
    }
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        const messageShow = {type: 'success', content: `a new blog ${blogObject.title} by ${blogObject.author} added`}
        setMessage(messageShow)
      })
      .catch(response => {
        const messageShow = {type: 'error', content: 'There is ISE'}
        setMessage(messageShow)
        setTimeout(() => {
          setMessage({type: '', content: ''})
        }, 5000)
      })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLogout = (event) => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={message}/>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const rows = () => blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )

  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message}/>
      {user.username} logged in <button type="submit" onClick={handleLogout}>Logout</button>

      <h2>create new</h2>
      {blogForm()}
      <br />
      {rows()}
    </div>
  )
}

export default App
