import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import app from './app.ducks'

export default combineReducers({
  app,
  router: routerReducer,
})
