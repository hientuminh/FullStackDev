const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Component testing is done with react-testing-library',
    author: 'HienTu',
    likes: 5,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'HienTu',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451df7571c224a31b5c8bh',
    title: 'CircleCi',
    author: 'YenNhi',
    likes: 15,
    user: {
      _id: '5a437a9e514ab7f168ddf135',
      username: 'YenNhi',
      name: 'Matti Luukkainen'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }
