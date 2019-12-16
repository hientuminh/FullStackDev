import React from 'react'

const Filter = ({searchName, onPhoneBookFilterChange}) => {
  return (
    <div>
      filter shown with <input value={searchName} name="search_name" onChange={onPhoneBookFilterChange}/>
    </div>
  )
}

export default Filter
