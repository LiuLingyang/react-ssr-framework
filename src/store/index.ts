import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

export default initialState => {
  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunkMiddleware),
      (process.env.REACT_ENV !== 'server' &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()) ||
        compose
    )
  );
};
