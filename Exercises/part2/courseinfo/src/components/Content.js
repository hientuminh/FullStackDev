import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
  const showParts = () =>
    parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)

  const total = parts.reduce((a, b) => a + (b['exercises'] || 0), 0);
  return (
    <div>
      {showParts()}
      <strong>total of {total} exercises</strong>
    </div>
  )
}

export default Content
