import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { autoRehydrate, persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import thunk from 'redux-thunk';

import expensesReducer from '../reducers/expenses';
import authReducer from "../reducers/authReducer";

import storiesReducer from "../reducers/stories";
import mythsReducer from "../reducers/mythsReducer";

import errorReducer from "../reducers/errorReducer";
// import filtersReducer from '../reducers/filters';
import siteReducer from '../reducers/site';
// import employeesReducer from '../reducers/employees';

const persistConfig = {
  // transforms: [immutableTransform()],
  key: 'root',
  blacklist: ['stories', 'user.subscriptionsBulk'],
  storage,
}

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    expenses: expensesReducer,
    auth: authReducer,
    errors: errorReducer,
    stories: storiesReducer,
    myths: mythsReducer,
    // filters: filtersReducer,
    // site: siteReducer,
    // employees: employeesReducer
  })
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {

  let store = createStore(
    persistedReducer,
    {},
    composeEnhancers(
      applyMiddleware(thunk)
    )
  )

  let persistor = persistStore(store)

  return { store, persistor };
  
};
