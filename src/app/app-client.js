import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './style/styles.less'

import App from './component/app/App'
import { createAppStore } from './store'

const store = createAppStore(window.__PRELOADED_STATE__ || {})
delete window.__PRELOADED_STATE__

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('main')
)
