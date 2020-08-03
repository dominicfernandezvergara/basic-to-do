import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


import weatherReducer from './weatherStore'
import taskTodoReducer from './todoStore'

const rootReducer = combineReducers({
  weather: weatherReducer,
  taskTodo: taskTodoReducer,
})

// para configurar la extension de google chrome
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  return store;
}