import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { autoRehydrate, persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import thunk from 'redux-thunk';

import expensesReducer from '../reducers/expenses';
import authReducer from "../reducers/authReducer";

import storiesReducer from "../reducers/stories";
import issuesReducer from "../reducers/issues";
import mythsReducer from "../reducers/mythsReducer";
import submissionsReducer from "../reducers/submissionsReducer";
import siteReducer from "../reducers/siteReducer";
import notificationAreaReducer from "../reducers/notificationAreaReducer";
import errorReducer from "../reducers/errorReducer";
// import filtersReducer from '../reducers/filters';
// import siteReducer from '../reducers/site';
// import employeesReducer from '../reducers/employees';

import { logoutUser } from "../actions/authActions";

const persistConfig = {
  // transforms: [immutableTransform()],
  key: 'root',
  blacklist: ['stories', 'user.subscriptionsBulk', 'notificationArea'],
  storage,
}

// const persistConfigSite = {
//   // transforms: [immutableTransform()],
//   key: 'root',
//   blacklist: ['stories', 'user.subscriptionsBulk', 'notificationArea'],
//   storage,
// }

const persistedReducer = persistReducer(
  persistConfig, 
  combineReducers({
    expenses: expensesReducer,
    auth: authReducer,
    errors: errorReducer,
    notificationArea: notificationAreaReducer,
    stories: storiesReducer,
    issues: issuesReducer,
    myths: mythsReducer,
    submissions: submissionsReducer,
    // site: siteReducer,
    site: siteReducer,
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

  let persistor = persistStore(store, null, () => {
    // console.log("Fires on rehydrate");
  })

  return { store, persistor };
  
};
