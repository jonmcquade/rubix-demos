/**
 * This file configures the Redux Store
 * Redux Middleware: 
 *  redux-saga: managing synchrounous calls to InstaProxy's paging URLs
 */

/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import DevTools from './components/DevTools';
import rootReducer from './reducers';
import rootSaga from './sagas';
import instaProxySaga from './modules/InstaProxy/sagas';

// Define middleware
const sagaMiddleware = createSagaMiddleware();
 
// Enhancers array is passed to compose()
//  And combined with reducers
const enhancers = [
  applyMiddleware(sagaMiddleware),
];

/**
 * Configure the application state as a Redux store
 * @param {*} initialState 
 */
export default function configureStore(initialState = {}) {
  
  if (process.env.REACT_APP_CLIENT === 'browser' && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  const store = createStore(
    rootReducer, initialState, compose(...enhancers)
  );

  // Initiate sagas
  sagaMiddleware.run(rootSaga);
  sagaMiddleware.run(instaProxySaga);

  // This applies HMR to the store
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
    module.hot.accept('./sagas', () => {
      sagaMiddleware.run(rootSaga);
    });
    module.hot.accept('./modules/InstaProxy/sagas', () => {
      sagaMiddleware.run(instaProxySaga);
    })
  }

  return store;
}
