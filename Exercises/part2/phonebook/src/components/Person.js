import React from 'react'

const Person = (props) => {
  const handleClick = (e) => {
    if (window.confirm(`Do you want to delete ${props.person.name}?`)) {
      props.onClickDeletePerson(e.target.value)
    }
  }
  return (
    <div>
      {props.person.name}: {props.person.number} <button value={props.person.id} onClick={(e) => handleClick(e)}>delete</button>
    </div>
  )
}

export default Person
