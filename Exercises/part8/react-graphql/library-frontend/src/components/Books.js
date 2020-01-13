import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient } from '@apollo/react-hooks'

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

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const client = useApolloClient()
  useEffect(() => {
    client
      .query({query: ALL_BOOKS})
      .then(res => setBooks(res.data.allBooks))

  }, [])

  if (!props.show) {
    return null
  }
  //
  // if (queryBook.loading) {
  //   return <div>loading...</div>
  // }

  const getUnique = (array) => {
      let uniqueArray = [];

      for(let value of array){
          if(uniqueArray.indexOf(value) === -1){
              uniqueArray.push(value);
          }
      }
      return uniqueArray;
  }

  let genres = []

  books.forEach(book => {
    genres = genres.concat(book.genres)
  })

  genres = getUnique(genres)

  const booksToShow = !genre
    ? books
    : books.filter(book => book.genres.includes(genre))

  const rows = () => booksToShow.map(book =>
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )
  return (
    <div>
      <h2>books</h2>

      <div> in genre <strong>{genre ? genre : 'all pattern'}</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {rows()}
        </tbody>
      </table>
      <div>
      {genres.map(a =>
        <button key={a} onClick={() => setGenre(a)}>{a}</button>
      )}
      <button onClick={() => setGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
