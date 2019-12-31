import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// const render = () => {
//   ReactDOM.render(
//     <App store={store} />,
//     document.getElementById('root')
//   )
// }
//
// render()
// store.subscribe(render)
