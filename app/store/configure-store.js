 
import { createStore, applyMiddleware } from 'redux';
// import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from '../reducers/reducer';

const middlewares = [];
const createLogger = require('redux-logger');

// configuring saga middleware
// const sagaMiddleware = createSagaMiddleware();

// middlewares.push(sagaMiddleware);

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
//   // install saga run
//   // store.runSaga = sagaMiddleware.run;
//   // store.close = () => store.dispatch(END);
  return store;
}

 
