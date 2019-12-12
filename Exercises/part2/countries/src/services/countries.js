import axios from 'axios'

const baseUrl = 'https://restcountries.eu/rest/v2/'

const getCountryByName = (searchName) => {
  let uri = 'all'
  if (!!searchName.trim()) {
    uri = `name/${searchName}`
  }
  const promise = axios.get(`${baseUrl}${uri}`)
  return promise.then(response => response.data)
}

export default { getCountryByName }
