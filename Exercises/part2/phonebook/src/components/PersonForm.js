import React from 'react'

const PersonForm = ({onSubmit, nameValue, numberValue, onChange}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={nameValue} name="name" onChange={onChange}/>
      </div>
      <div>
        number: <input value={numberValue} name="number" onChange={onChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
