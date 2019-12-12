import React from 'react'

const Filter = ({searchName, onChange}) => {
  return (
    <div>
      filter shown with <input value={searchName} name="search_name" onChange={onChange}/>
    </div>
  )
}

export default Filter
