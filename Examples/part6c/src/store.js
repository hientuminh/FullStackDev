import { createStore, combineReducers, applyMiddware } from 'redux'
import thunk from 'redux-thunk'

import noteReducer from './reducers/noteReducer'
import filter from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer, applyMiddware(thunk))

export default store
