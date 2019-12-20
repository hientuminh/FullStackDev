const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'CirCleCI',
    author: 'HienTu',
    url: 'https://github.com/hientuminh/FullStackDev',
    likes: 9
  },
  {
    title: 'DevOps',
    author: 'HienTu',
    url: 'https://github.com/hientuminh/FullStackDev',
    likes: 91
  },
  {
    title: 'Travis',
    author: 'Yljo',
    url: 'https://github.com/hientuminh/FullStackDev',
    likes: 7
  }
]

module.exports = {
  initialBlogs
}
