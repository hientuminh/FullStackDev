import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation, useApolloClient, useSubscription } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born,
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query allBooksWithFilter {
    allBooks {
      title,
      published,
      author { name, born }
      genres
    }
  }
`

const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $genres: [String!], $author: String!) {
    addBook(
      title: $title,
      published: $published,
      genres: $genres,
      author: $author
    ) {
      title
      published
      genres
      author
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      bookCount
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

const CURRENT_USER = gql`
  query {
    me {
      id
      username
      favoriteGenre
    }
  }
`

const BOOK_ADDED = gql`
  subscription BookAdded {
    bookAdded {
      title
      published
      genres
      author {
        name
      }
    }
  }
`

const App = () => {
  const user = useQuery(CURRENT_USER)
  useEffect(() => {
    const local = localStorage.getItem('user-token')
    if (local) {
      setToken(local)
    }
    if (!user.loading && user.data && user.data.me) {
      setCurrentUser(user.data.me)
    }
  }, [user.loading])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("=========")
      console.log(subscriptionData)
    }
  })

  const [page, setPage] = useState('authors')
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}]
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const [login] = useMutation(LOGIN, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <LoginForm show={page === 'login'} login={login} setToken={(token) => setToken(token)}/>
    )
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => handleLogout()}>logout</button>
      </div>

      <Authors show={page === 'authors'} result={authors} editAuthor={editAuthor}/>

      <Books show={page === 'books'}/>

      <NewBook show={page === 'add'} addBook={addBook} />

      <Recommend show={page === 'recommend'} currentUser={currentUser} />

    </div>
  )
}

export default App
