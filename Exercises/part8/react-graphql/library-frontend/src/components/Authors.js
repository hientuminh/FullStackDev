import React, { useState, useEffect } from 'react'

const AuthorForm = ({author, handleChange}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  useEffect(() =>{
    setName(author.name)
    setBorn(author.born || '')
  }, [author])

  const submit = (e) => {
    e.preventDefault()
    handleChange({name, born})
    setName('')
    setBorn('')
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
          born <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  )
}

const Authors = ({show, result, editAuthor}) => {
  const [author, setAuthor] = useState(null)
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const handleChange = async ({name, born}) => {
    await editAuthor({
      variables: { name, setBornTo: parseInt(born) }
    })
    setAuthor(null)
  }

  const handleOnClick = (author) => {
    setAuthor(author)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name} onClick={() => handleOnClick(a)}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {author && <AuthorForm author={author} handleChange={handleChange}/> }
    </div>
  )
}

export default Authors
