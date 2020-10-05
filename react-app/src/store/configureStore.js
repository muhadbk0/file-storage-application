import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import fileReducer from '../reducers/file';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      user: authReducer,
      file: fileReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
