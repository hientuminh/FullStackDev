import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

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
  {
    allBooks {
      title,
      published,
      author,
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

const App = () => {
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{query: ALL_BOOKS}, {query: ALL_AUTHORS}]
  })
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} result={authors} editAuthor={editAuthor}/>

      <Books show={page === 'books'} result={books} />

      <NewBook show={page === 'add'} addBook={addBook} />
    </div>
  )
}

export default App
