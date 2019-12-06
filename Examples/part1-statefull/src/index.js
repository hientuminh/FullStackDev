import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = (props) => (
  <div>{props.counter}</div>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const App = (props) => {
  const [ counter, updateCounter ] = useState(0)

  const setToValue = (value) => () => { updateCounter(value) }

  return (
    <div>
      <Display counter={counter} />
      <Button
        onClick={setToValue(counter + 1)}
        text= 'plus'
      />
      <Button
        onClick={setToValue(counter - 1)}
        text= 'minus'
      />
      <Button
        onClick={setToValue(0)}
        text= 'zero'
      />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
