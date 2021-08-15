import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './rootReducer'

export const createAppStore = preloadedState => createStore(rootReducer, preloadedState || {}, applyMiddleware(thunk))
