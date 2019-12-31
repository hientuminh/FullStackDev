import anecdotesService from '../services/anecdotes'

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

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INITIAL',
      data: anecdotes
    })
  }
}

export const createNewAnec = (content) => {
  return async dispatch => {
    const newAnec = await anecdotesService.createNew(content)
    dispatch({
      type: 'ADD_NEW',
      data: { newAnec: newAnec }
    })
  }
}
export const upVote = (anecdote) => {
  return async dispatch => {
    const newObject = { ...anecdote, votes: anecdote.votes + 1}
    const newAnec = await anecdotesService.updateAnec(newObject)
    dispatch({
      type: 'UPVOTE',
      data: { id: newAnec.id }
    })
  }
}

export default anecdoteReducer
