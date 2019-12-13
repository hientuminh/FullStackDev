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
      if (window.confirm(`${phoneBook.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatePhoneBook = persons.find(person => person.name === phoneBook.name)
        const changePhoneBook = { ...updatePhoneBook, number: phoneBook.number }
        personService
          .updatePhoneBook(updatePhoneBook.id, changePhoneBook)
          .then(returnedPhoneBook => {
            setPersons(persons.map(person => person.id !== updatePhoneBook.id ? person : returnedPhoneBook))
          })
          .catch(error => {
            alert('the phonebook was updated failed')
          })
      }
    } else if (phoneBook.name === '' || phoneBook.number === '') {
      alert('You can NOT input empty number or name')
    } else {
      const phoneBookObject = {
        name: phoneBook.name,
        number: phoneBook.number,
        id: persons.length + 1
      }

      personService
        .createPhoneBook(phoneBookObject)
        .then(returnedPhoneBook => {
          setPersons(persons.concat(phoneBookObject))
        })
        .catch(error => {
          alert('the phonebook was created failed')
        })
    }
    setPhoneBook({name: '', number: ''})
    setSearchName('')
  }

  const handleInputChange = (event) => {
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

  const handleClickDeletePerson = id => {
    personService
      .deletePhoneBook(id)
      .then(returnedPhoneBook => {
        setPersons(persons.filter(person => person.id !== parseInt(id)))
      })
      .catch(error => {
        alert('the phonebook was deleted failed')
      })
  }

  const allOfPerson = () => persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase().trim()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchName={searchName}
        onPhoneBookFilterChange={handlePhoneBookFilter}/>
      <h3>Add a new</h3>
      <PersonForm
        onSubmissionChange={handleFormSubmission}
        nameValue={phoneBook.name}
        numberValue={phoneBook.number}
        onInputChange={handleInputChange}
      />
      <Persons
        persons={allOfPerson()} onClickDeletePerson={handleClickDeletePerson}
      />
    </div>
  )
}

export default App
