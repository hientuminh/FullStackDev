import React from 'react'
import Person from './Person'

const Persons = (props) => {
  const persons = () => props.persons.map(person =>
    <Person
      key={person.name}
      name={person.name}
      number={person.number} />
  )

  return (
    <div>{persons()}</div>
  )
}

export default Persons
