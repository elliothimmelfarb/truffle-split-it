import { createStore, combineReducers, applyMiddleware } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history)

const middlewares = [
  thunk,
  historyMiddleware,
]

const enhancers = [
  applyMiddleware(...middlewares),
  // other store enhancers if any
]

const composeEnhancers = composeWithDevTools({
  // other compose enhancers if any
  // Specify here other options if needed
})


export default function configureStore(initialState = {}) {
  return createStore(
    combineReducers({
      // ...reducers,
      router: routerReducer
    }),
    composeEnhancers(...enhancers)
  )
}
