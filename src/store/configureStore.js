import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import expensesReducer from '../reducers/expenses';
// import filtersReducer from '../reducers/filters';
// import siteReducer from '../reducers/site';
// import employeesReducer from '../reducers/employees';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      expenses: expensesReducer,
      // filters: filtersReducer,
      // site: siteReducer,
      // employees: employeesReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
