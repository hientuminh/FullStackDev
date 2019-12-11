import axios from 'axios'

const baseUrl = 'http://localhost:3001/'

const getAll = () => {
  const promise = axios.get(baseUrl + 'persons')
  return promise.then(response => response.data)
}

export default { getAll }
