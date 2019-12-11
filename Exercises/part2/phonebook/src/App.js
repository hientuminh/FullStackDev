import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [ persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons))
  }, [])

  const [ searchName, setSearchName ] = useState('')
  const [ phoneBook, setPhoneBook ] = useState(
    {name: '', number: ''}
  )

  const isDuplicate = () => {
    return persons.find(person => person.name === phoneBook.name)
  }

  const handlePhoneBookFilter = (event) => {
    if (event.target.name === 'search_name') {
      setSearchName(event.target.value)
    }
  }

  const handleFormSubmission = (event) => {
    event.preventDefault()
    if (isDuplicate()) {
      alert(`${phoneBook.name} is already added to phonebook`)
    } else if (phoneBook.name === '' || phoneBook.number === '') {
      alert('You can NOT input empty number or name')
    } else {
      const phoneBookObject = {
        name: phoneBook.name,
        number: phoneBook.number
      }
      setPersons(persons.concat(phoneBookObject))
    }
    setPhoneBook({name: '', number: ''})
    setSearchName('')
  }

  const handleChange = (event) => {
    if (event.target.name === 'name') {
      const newPhoneBook = {
        ...phoneBook,
        name: event.target.value
      }
      setPhoneBook(newPhoneBook)
    }

    if (event.target.name === 'number') {
      const newPhoneBook = {
        ...phoneBook,
        number: event.target.value
      }
      setPhoneBook(newPhoneBook)
    }
  }

  const allOfPerson = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase().trim()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchName={searchName}
        onChange={handlePhoneBookFilter}/>
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={handleFormSubmission}
        nameValue={phoneBook.name}
        numberValue={phoneBook.number}
        onChange={handleChange}
      />
      <Persons
        persons={allOfPerson}
      />
    </div>
  )
}

export default App
