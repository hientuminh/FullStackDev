import React from 'react'

const Filter = ({searchName, onFilterChange}) => {
  return (
    <div>
      filter shown with <input value={searchName} name="search_name" onChange={onFilterChange}/>
    </div>
  )
}

export default Filter
