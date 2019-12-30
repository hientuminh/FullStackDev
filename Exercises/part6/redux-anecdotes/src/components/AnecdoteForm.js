import React from 'react'
import { createNewAnec } from '../reducers/anecdoteReducer'
import { createNewNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({store}) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.dote.value
    event.target.dote.value = ''
    store.dispatch(createNewAnec(content))
    store.dispatch(createNewNotification(content))
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
