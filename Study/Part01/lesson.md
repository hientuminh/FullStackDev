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
# Javascript
## Content
- Variables
  - let, const
- Arrays
- Objects
- Functions
  - Arrow function
  - Function declaration
- Exercises
- Object methods and "this"
- Class
```
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  greet() {
    console.log('hello, my name is', this.name)
  }
}

const adam = new Person('Adam Ondra', 35)
adam.greet()

const janja = new Person('Janja Garnbret', 22)
janja.greet()
```
# Component state, event handlers
## helper functions
## Destructuring
```
const { name, age } = props
```
## Stateful component
```
const setToValue = (value) => setCounter(value)
```
- Get error to many re-render => it is function call, not reference to the function
- useState uses 2 parameters
```
[thing, setThing] = useState()
```
# A more complex state, debugging React apps
- Simple: useState for every vairable
- Complex: useState({left, right})
- Object spread ...clicks
- it is forbidden in React to mutate state directly, since it can result in unexpected side effects
- Handling arrays vs conditional rendering
- state hook (https://reactjs.org/docs/hooks-state.html)
  - Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.
  - Rules of Hooks
    - hooks may only be called from the inside of a function body that defines a React component
- Passing Event Handlers to Child Components
- Do Not Define Components Within Components
- Useful Reading
  - Offical: https://reactjs.org/docs/hello-world.html
  - Other: https://egghead.io/
