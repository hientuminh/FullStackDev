import React, { useState } from 'react'
import { Query, Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

import Persons from './components/Persons'

const ALL_PERSONS = gql`
{
  allPersons  {
    name
    phone
    id
  }
}
`

const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

const EDIT_NUMBER = gql`
mutation editNumber($name: String!, $phone: String!) {
  editNumber(name: $name, phone: $phone)  {
    name
    phone
    address {
      street
      city
    }
    id
  }
}
`

const PersonForm = (props) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    await props.addPerson({
      variables: { name, phone, street, city }
    })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

const PhoneForm = (props) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    await props.editNumber({
      variables: { name, phone }
    })

    setName('')
    setPhone('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <button type='submit'>change number</button>
      </form>
    </div>
  )
}

const App = () => {
  const persons = useQuery(ALL_PERSONS)
  const [errorMessage, setErrorMessage] = useState(null)
  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [addPerson] = useMutation(CREATE_PERSON, {
    onError: handleError,
    refetchQueries: [{ query: ALL_PERSONS }]
  })

  const [editNumber] = useMutation(EDIT_NUMBER)

  return (
    <div>
      {errorMessage &&
          <div style={{color: 'red'}}>
            {errorMessage}
          </div>
        }
      <Persons result={persons} />
      <h2>create new with useMutation hook</h2>
      <PersonForm addPerson={addPerson} />
      <h2>create new</h2>
      <Mutation
        mutation={CREATE_PERSON}
        refetchQueries={[{query: ALL_PERSONS}]}
        onError={handleError}
      >
        {(addPerson) =>
          <PersonForm
            addPerson={addPerson}
          />
        }
      </Mutation>
      <h2>change number with useMutation hook</h2>
      <PhoneForm editNumber={editNumber} />

      <h2>change number</h2>
      <Mutation
        mutation={EDIT_NUMBER}
      >
        {(editNumber) =>
          <PhoneForm
            editNumber={editNumber}
          />
        }
      </Mutation>
    </div>
  )
}

export default App
