import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

const reducers = reducer

export default createStore(reducers, applyMiddleware(thunkMiddleware))