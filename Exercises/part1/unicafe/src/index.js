import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h3>Statistics</h3>
        <h4>No feedback given</h4>
      </div>
    )
  }
  let all = good + bad + neutral;
  let average = 0;
  let positive = '0%';
  if (good || bad || neutral) {
    average = ((good - bad) / all).toFixed(1)
    positive = (good*100 / all).toFixed(1) + '%'
  }

  return (
    <div>
      <h3>Statistics</h3>
      <table>
        <tbody>
          <Statistic text="good" value={good}/>
          <Statistic text="neutral" value={neutral}/>
          <Statistic text="bad" value={bad}/>
          <Statistic text="average" value={average}/>
          <Statistic text="positive" value={positive}/>
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleBad = () => {
    setBad(bad +  1)
  }
  const handleNeutral = () => {
    setNeutral(neutral +  1)
  }

  return (
    <div>
      <h3>give feedback</h3>
      <Button onClick={handleGood} text='Good'/>
      <Button onClick={handleNeutral} text='Neutral'/>
      <Button onClick={handleBad} text='Bad'/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
