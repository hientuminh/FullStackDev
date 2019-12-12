import React from 'react'

const PersonForm = ({onSubmissionChange, nameValue, numberValue, onInputChange}) => {
  return (
    <form onSubmit={onSubmissionChange}>
      <div>
        name: <input value={nameValue} name="name" onChange={onInputChange}/>
      </div>
      <div>
        number: <input value={numberValue} name="number" onChange={onInputChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
