# Introduction to react
## Create App
- Using npx
```
npx create-react-app
npm start
```
- We can delete some files and change the code in index.js. The files App.js, App.css, App.test.js, logo.svg and serviceWorker.js may be deleted as they are not needed in our application right now.
```
import React from 'react'
import ReactDOM from 'react-dom'

const App = () => (
  <div>
    <p>Hello world</p>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))
```
- We can use expression for it in index.js
```
const App = () => {
  const now = new Date();
  const a = 10
  const b = 20
  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a+b}
      </p>
    </div>
  )
}
```
## JSX
-
```
return React.createElement(
  'div',
  null,
  React.createElement(
    'p', null, 'Hello world, it is', now.toString()
  ),
  React.createElement(
    'p', null, a, ' plus ', b, ' is ', a + b
  )
)
```
## Multi components
- We use
```
React.createElement(
  Hello, {name: 'Hien'},
),
```
