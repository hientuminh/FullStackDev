import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({header, anecdote, vote}) => {
  return (
    <div>
      <h2>{header}</h2>
      {anecdote}
      <p> has {vote} votes </p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0))

  const copy = [...vote]

  const handleClick = () => {
    const rand = Math.floor(Math.random() * (props.anecdotes.length - 1)) + 1
    setSelected(rand)
  }

  const handleVoteClick = () => {
    copy[selected] += 1
    setVote(copy)
  }

  const maxVote = Math.max(...vote)
  const maxAnecdote = vote.indexOf(maxVote)

  return (
    <div>
      <Anecdote header="Anecdote today" anecdote={props.anecdotes[selected]} vote={vote[selected]}/>
      <div>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </div>
      <Anecdote header="Anecdote with most votes" anecdote={props.anecdotes[maxAnecdote]} vote={maxVote}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
