import React from 'react'
import { upVote } from '../reducers/anecdoteReducer'
import { upVoteNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({store}) => {
  const anecdoteState = store.getState().anecdote
  const filterState = store.getState().filter

  const vote = (anecdote) => {
    store.dispatch(upVote(anecdote.id))
    store.dispatch(upVoteNotification(anecdote.content))
  }
  const anecdotes = () => anecdoteState
                            .sort((a,b) => (b.votes > a.votes) ? 1 : ((a.votes > b.votes) ? -1 : 0))
                            .filter(ano => ano.content.includes(filterState))

  return (
    <div>
    {anecdotes().map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}

export default AnecdoteList
