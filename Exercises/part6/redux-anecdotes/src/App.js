import React,  { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteFilter from './components/AnecdoteFilter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
    // anecdotesService
    //   .getAll().then(anecdotes => props.initializeAnecdotes(anecdotes))
  }, [])
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification store={props.store} />
      <AnecdoteFilter store={props.store} />
      <AnecdoteForm store={props.store} />
      <AnecdoteList store={props.store} />
    </div>
  )
}

export default connect(
  null, { initializeAnecdotes }
)(App)
