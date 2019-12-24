import React, { useState, useEffect } from 'react'
const Blog = ({ blog, handleLikeBlog, handleDeleteBlog }) => {
  const [visible, setVisible] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggerUserJSON = window.localStorage.getItem('loggedUser')
    if (loggerUserJSON) {
      const user = JSON.parse(loggerUserJSON)
      setUser(user)
    }
  }, [])

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeAction = (event) => {
    event.stopPropagation()
    handleLikeBlog(blog)
  }

  const removeAction = (event) => {
    event.stopPropagation()
    if (window.confirm(`Do you want to delete ${blog.title}?`)) {
      handleDeleteBlog(blog)
    }

  }

  const blogBasicInfo = () => (
    <div>
      {blog.title} by <strong>{blog.author}</strong>
    </div>
  )

  const removeButton = () => (
    <button onClick={removeAction}>remove</button>
  )

  const blogDetailInfo = () => (
    <div>
      <p>{blog.id}</p>
      <p>{blog.title}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button onClick={likeAction}>like</button></p>
      <p>added by {blog.author}</p>
      {user && user.username === blog.user.username && removeButton()}
    </div>
  )

  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        {visible ?
          blogDetailInfo() :
          blogBasicInfo()
        }
      </div>
    </div>
  )
}

export default Blog
