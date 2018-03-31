import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'

export const history = createHistory()

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

export default function configureStore(rootReducer, initialState = {}) {
  return createStore(
    rootReducer,
    composeEnhancers(...enhancers)
  )
}
