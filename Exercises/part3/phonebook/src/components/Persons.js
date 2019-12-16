import React from 'react'
import Person from './Person'

const Persons = ({persons, onClickDeletePerson}) => {
  const showPersons = () => persons.map(person =>
    <Person
      key={person.id}
      person={person}
      onClickDeletePerson={onClickDeletePerson}/>
  )

  return (
    <div>{showPersons()}</div>
  )
}

export default Persons
