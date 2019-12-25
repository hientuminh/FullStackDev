import React, { useState, useEffect } from 'react'
import './App.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [ message, setMessage] = useState({ type: '', content: '' })

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

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    const messageShow = { type: '', content: '' }
    setMessage(messageShow)
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      const messageShow = { type: 'error', content: 'wrong username or password' }
      setMessage(messageShow)
      setTimeout(() => {
        setMessage({ type: '', content: '' })
      }, 5000)
    }
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    blogService
      .createBlog(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        const messageShow = { type: 'success', content: `a new blog ${blogObject.title} by ${blogObject.author} added` }
        setMessage(messageShow)
      })
      .catch(() => {
        const messageShow = { type: 'error', content: 'There is ISE' }
        setMessage(messageShow)
        setTimeout(() => {
          setMessage({ type: '', content: '' })
        }, 5000)
      })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleLikeBlog = (blog) => {
    const updateBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    blogService
      .updateBlog(updateBlog)
      .then(returnedBlog => {
        const foundIndex = blogs.findIndex(x => x.id === returnedBlog.id)
        blogs[foundIndex] = returnedBlog
        // const newBlogs = [...blogs]
        setBlogs([...blogs])
      })
      .catch(() => {
        const messageShow = { type: 'error', content: 'There is ISE' }
        setMessage(messageShow)
        setTimeout(() => {
          setMessage({ type: '', content: '' })
        }, 5000)
      })
  }

  const handleDeleteBlog = (blog) => {
    blogService
      .deleteBlog(blog.id)
      .then(() => {
        setBlogs(blogs.filter(x => x.id !== blog.id))
      })
      .catch(() => {
        const messageShow = { type: 'error', content: 'There is ISE' }
        setMessage(messageShow)
        setTimeout(() => {
          setMessage({ type: '', content: '' })
        }, 5000)
      })
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message}/>
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
          />
        </Togglable>
      </div>
    )
  }

  const blogForm = () => (
    <div>
      <Togglable buttonLabel='create' ref={blogFormRef}>
        <BlogForm
          handleSubmit={handleCreateBlog}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>
    </div>
  )

  const rows = () => blogs
    .sort((a,b) => (b.likes > a.likes) ? 1 : ((a.likes > b.likes) ? -1 : 0))
    .map(blog =>
      <Blog key={blog.id} blog={blog}
        handleLikeBlog={handleLikeBlog}
        handleDeleteBlog={handleDeleteBlog}
      />
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
