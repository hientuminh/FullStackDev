import React from 'react'
import { connect } from 'react-redux'
import { createNewAnec } from '../reducers/anecdoteReducer'
import { createNewNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.dote.value
    event.target.dote.value = ''
    props.createNewAnec(content)
    props.createNewNotification(`You added new note with '${content}'`, 10)
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

const mapDispatchToProps = dispatch => {
  return {
    createNewAnec: anecdote => {
      dispatch(createNewAnec(anecdote))
    },
    createNewNotification: (content, time) => {
      dispatch(createNewNotification(content, time))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
