import React from 'react'
import { connect } from 'react-redux'

import { filterChange } from '../reducers/filterReducer'

const AnecdoteList = (props) => {
  const filterAnecdote = (event) => {
    const filter = event.target.value
    props.filterChange(filter)
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

const mapDispatchToProps = dispatch => {
  return {
    filterChange: filter => {
      dispatch(filterChange(filter))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteList)
