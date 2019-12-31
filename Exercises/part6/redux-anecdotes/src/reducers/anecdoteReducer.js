
const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIAL':
      return state.concat(action.data)
    case 'UPVOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'ADD_NEW':
      return state.concat(action.data.newAnec)
    default:
      return state
  }
  return state
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INITIAL',
    data: anecdotes
  }
}

export const createNewAnec = (newAnec) => {
  return {
    type: 'ADD_NEW',
    data: { newAnec: newAnec }
  }
}
export const upVote = (id) => {
  return {
    type: 'UPVOTE',
    data: { id }
  }
}

export default anecdoteReducer
