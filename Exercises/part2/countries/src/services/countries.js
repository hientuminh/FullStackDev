import axios from 'axios'

const baseUrl = 'https://restcountries.eu/rest/v2/'

const getAll = () => {
  const promise = axios.get(baseUrl + 'all')
  return promise.then(response => response.data)
}

const findByName = (searchName) => {
  const promise = axios.get(`${baseUrl}name/${searchName}`)
  return promise.then(response => response.data)
}

export default { getAll, findByName }
