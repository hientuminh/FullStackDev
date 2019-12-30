import React from 'react'
import { connect } from 'react-redux'

import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {

  const filterClicked = (value) => {
    props.filterChange(value)
  }

  return (
    <div>
      <div>
        all
        <input
          type="radio"
          name="filter"
          onChange={() => filterClicked('ALL')}
        />
        important
          <input
            type="radio"
            name="filter"
            onChange={() => filterClicked('IMPORTANT')}
          />
        no important
        <input
          type="radio"
          name="filter"
          onChange={() => filterClicked('NOIMPORTANT')}
        />
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    filterChange: value => {
      dispatch(filterChange(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(VisibilityFilter)
