import React from 'react'
import { connect } from 'react-redux'
import { createNewAnec } from '../reducers/anecdoteReducer'
import { createNewNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.dote.value
    event.target.dote.value = ''
    props.createNewAnec(content)
    props.createNewNotification(content)
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
    createNewAnec: content => {
      dispatch(createNewAnec(content))
    },
    createNewNotification: content => {
      dispatch(createNewNotification(content))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
