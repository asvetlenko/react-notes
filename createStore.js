import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import filter from 'redux-localstorage-filter'

import config from 'config'
import rootReducer from './reducers'
import rootSaga from './sagas'
import DevTools from '../components/DevTools'

export default () => {
  const middleware = []
  const enhancers = []

  /* ------------- Thunk Middleware ------------- */
  middleware.push(thunk)

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware))

  /* ------------- Dev Monitor ------------- */
  config.useDevTool && enhancers.push(DevTools.instrument())

  /* ------------- Redux localstorage ------------- */
  const reducer = compose(mergePersistedState())(rootReducer)
  const storage = compose(filter('sessionState'))(adapter(window.localStorage))
  const createPersistentStore = compose(persistState(storage, 'redux-store'))(createStore)

  const store = createPersistentStore(reducer, compose(...enhancers))

  // kick off root saga
  sagaMiddleware.run(rootSaga)

  return store
}
