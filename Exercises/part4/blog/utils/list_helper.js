const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return;
  }
  const blog = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })

  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    _id: 8
  }
}

const mostBlogs = (blogs) => {
  return {}
}

const mostLikes = (blogs) => {
  return {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
