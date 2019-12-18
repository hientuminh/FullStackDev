import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

const createPhoneBook = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data).catch(error => Promise.reject(error.response))
}

const updatePhoneBook = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data).catch(error => Promise.reject(error.response))
}

const deletePhoneBook = id => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data).catch(error => Promise.reject(error.response))
}

export default { getAll, createPhoneBook, updatePhoneBook, deletePhoneBook }
