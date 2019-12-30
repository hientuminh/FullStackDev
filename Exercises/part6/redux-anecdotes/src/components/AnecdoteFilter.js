import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const AnecdoteList = ({store}) => {
  const filterAnecdote = (event) => {
    const filter = event.target.value
    store.dispatch(filterChange(filter))
  }
  const style = {
    marginBottom: 10
  }
  return (
    <div style={style}>
      filter
      <input type='text' onChange={(e) => filterAnecdote(e)}/>
    </div>
  )
}

export default AnecdoteList
