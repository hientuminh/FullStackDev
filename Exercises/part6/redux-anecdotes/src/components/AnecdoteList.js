import React from 'react'
import { upVote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({store}) => {
  const anecdotes = store
                      .getState()
                      .sort((a,b) => (b.votes > a.votes) ? 1 : ((a.votes > b.votes) ? -1 : 0))

  const vote = (id) => {
    store.dispatch(upVote(id))
  }

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList
