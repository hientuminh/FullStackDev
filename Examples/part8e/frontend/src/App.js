import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useSubscription ,useApolloClient } from '@apollo/react-hooks'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import PhoneForm from './components/PhoneForm'
import LoginForm from './components/LoginForm'

const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone 
    address {
      street 
      city
    }
  }
`

const ALL_PERSONS = gql`
  {
    allPersons  {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}  
`

const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS} 
`

const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone)  {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS} 
`
const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const PERSON_ADDED = gql`
  subscription {
    personAdded {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)

  const notify = (message, addedPerson) => {
    setErrorMessage(message)
    updateCacheWith(addedPerson)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const client = useApolloClient()

  const persons = useQuery(ALL_PERSONS) 

  const updateCacheWith = (addedPerson) => {
    console.log("==========")
    console.log(addPerson)
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_PERSONS })
    if (!includedIn(dataInStore.allPersons, addedPerson)) {
      dataInStore.allPersons.push(addedPerson)
      client.writeQuery({
        query: ALL_PERSONS,
        data: dataInStore
      })
    }   
  }

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded
      alert(`${addedPerson.name} added`)
      notify(`${addedPerson.name} added`, addedPerson)
    }
  })

  const [addPerson] = useMutation(CREATE_PERSON, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addPerson)
    }
  })

  const [editNumber] = useMutation(EDIT_NUMBER)

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const errorNotification = () => errorMessage &&
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>

  if (!token) {
    return (
      <div>
        {errorNotification()}
        <h2>Login</h2>
        <LoginForm
          login={login}
          setToken={(token) => setToken(token)}
        />
      </div>
    )
  }

  return (
    <div>
      {errorNotification()}
      <Persons result={persons} />

      <h2>create new</h2>
      <PersonForm addPerson={addPerson} />

      <h2>change number</h2>
      <PhoneForm editNumber={editNumber} />

      <button onClick={logout}>logout</button>
    </div>
  )
}

export default App