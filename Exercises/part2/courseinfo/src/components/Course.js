import React from 'react'
import Header from './Header'
import Content from './Content'

const Course = ({parts, name}) => {
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
    </div>
  )
}

export default Course
