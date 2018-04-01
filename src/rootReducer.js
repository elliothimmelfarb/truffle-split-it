import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import app from './App.ducks'
import create from './_Create/Create.ducks'

export default combineReducers({
  app,
  create,
  router: routerReducer,
})
