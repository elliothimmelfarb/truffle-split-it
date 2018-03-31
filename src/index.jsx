import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'

import './styles/index.css'
import './styles/material-icons.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import configureStore, {history} from './store'
import rootReducer from './rootReducer'

const store = configureStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
