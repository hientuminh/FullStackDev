import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part {...props.part1}/>
      <Part {...props.part2}/>
      <Part {...props.part3}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  let total = {
    exercises1: 10,
    exercises2: 7,
    exercises3: 14
  }

  let content = {
    part1: { part: part1, exercises: exercises1 },
    part2: { part: part2, exercises: exercises2 },
    part3: { part: part3, exercises: exercises3 }
  }

  return (
    <div>
      <Header course={course} />
      <Content {...content} />
      <Total {...total}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
