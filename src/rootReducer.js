import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import app from './App.ducks'
import create from './_Create/Create.ducks'
import view from './_View/View.ducks'

export default combineReducers({
  app,
  create,
  view,
  router: routerReducer,
})
