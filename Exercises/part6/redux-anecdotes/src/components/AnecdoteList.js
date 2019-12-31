import React from 'react'
import { connect } from 'react-redux'
import { upVote } from '../reducers/anecdoteReducer'
import { upVoteNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.upVote(anecdote)
    props.upVoteNotification(anecdote.content)
  }

  return (
    <div>
    {props.anecdoteToShow.map(anecdote =>
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

const anecdoteToShow = (state) => {
  const anecdotes = state.anecdote
  const filter = state.filter
  return anecdotes
          .sort((a,b) => (b.votes > a.votes) ? 1 : ((a.votes > b.votes) ? -1 : 0))
          .filter(ano => ano.content.includes(filter))
}

const mapStateToProps = (state) => {
  return {
    anecdoteToShow: anecdoteToShow(state)
  }
}

const mapDispatchToProps = {
  upVote, upVoteNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
