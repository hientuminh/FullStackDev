import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const ALL_BOOKS = gql`
  query allBooksWithFilter ($genre: String!) {
    allBooks(genre: $genre) {
      title,
      published,
      author { name, born }
      genres
    }
  }
`

const Recommend = ({show, currentUser}) => {
  const queryRecommend = useQuery(ALL_BOOKS, {
    variables: {genre: (currentUser && currentUser.favoriteGenre) || ''}
  })

  if (!show) {
    return null
  }

  if (queryRecommend.loading) {
    return <div>loading...</div>
  }

  const rows = () => queryRecommend.data.allBooks.map(book =>
    <tr key={book.title}>
      <td>{book.title}</td>
      <td>{book.author.name}</td>
      <td>{book.published}</td>
    </tr>
  )

  return (
    <div>
      <h2>Recommendations</h2>

      <p>books in your favorite genre <strong>{currentUser.favoriteGenre}</strong></p>

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
    </div>
  )
}

export default Recommend
