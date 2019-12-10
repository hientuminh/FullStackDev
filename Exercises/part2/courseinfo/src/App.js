import React from 'react'
import Course from './components/Course'

const App = ({courses}) => {

  const showCourses = () =>
    courses.map(course => <Course key={course.id} parts={course.parts} name={course.name}/>)

  return (
    <div>
      <h1>Web development curriclum</h1>
      {showCourses()}
    </div>
  )
}

export default App
