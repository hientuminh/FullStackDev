import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// Use for example 1
// const App = (props) => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//
//   return (
//     <div>
//       <div>
//         {left}
//         <button onClick={() => setLeft(left + 1)}>left</button>
//         <button onClick={() => setRight(right + 1)}>right</button>
//       </div>
//       {right}
//     </div>
//   )
//
// }

// Use for example 2
// const App = (props) => {
//   const [clicks, setClicks] = useState({
//     left: 0, right: 0
//   })
//
//   const handleLeftClick = () => {
//     const newClicks = {
//       ...clicks,
//       left: clicks.left + 1
//       // right: clicks.right
//     }
//     setClicks(newClicks)
//   }
//
//   const handleRightClick = () => {
//     const newClicks = {
//       ...clicks,
//       right: clicks.right + 1
//     }
//     setClicks(newClicks)
//   }
//
//   const handleLeftClick = () => {
//     setClicks({...clicks, left: clicks.left + 1})
//   }
//
//   const handleRightClick = () => {
//     setClicks({...clicks, right: clicks.right + 1})
//   }
//
//   return (
//     <div>
//       <div>
//         {clicks.left}
//         <button onClick={handleLeftClick}>left</button>
//         <button onClick={handleRightClick}>right</button>
//       </div>
//       {clicks.right}
//     </div>
//   )
// }

// NOTES: handle arrays && conditional rendering
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = (props) => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left'/>
        <Button onClick={handleRightClick} text='right'/>
        {right}
        <History allClicks={allClicks}/>
      </div>
    </div>
  )

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
