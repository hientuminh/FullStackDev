import React from 'react'
import { createNewAnec } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({store}) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const dote = event.target.dote.value
    event.target.dote.value = ''
    store.dispatch(createNewAnec(dote))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="dote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
