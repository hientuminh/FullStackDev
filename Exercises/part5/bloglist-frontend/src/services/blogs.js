import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data).catch(error => Promise.reject(error.response))
}

const updateBlog = updateObject => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.put(`${baseUrl}/${updateObject.id}`, updateObject, config)
  return request.then(response => response.data).catch(error => Promise.reject(error.response))
}

const deleteBlog = blogId => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.delete(`${baseUrl}/${blogId}`, config)
  return request.then(response => response.data).catch(error => Promise.reject(error.response))
}

export default { getAll, createBlog, updateBlog, deleteBlog, setToken }
