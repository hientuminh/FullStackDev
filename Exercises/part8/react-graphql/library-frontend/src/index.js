import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApploClient from 'apollo-boost'
import { ApolloProvider } from "@apollo/react-hooks"

const client = new ApploClient({
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
