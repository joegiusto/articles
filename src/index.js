import React from 'react';
import ReactDOM from 'react-dom';

import './assets/scss/index.scss';

import App from './components/App';

import * as serviceWorker from './serviceWorker';

// Passport Related
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

// Redux Realted
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import { PersistGate } from 'redux-persist/integration/react'

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { setStories } from "./actions/stories";
import { setMyths } from "./actions/mythsActions";
import { setIssues } from "./actions/issues";
import { setSubmissions } from 'actions/submissionsActions';

const {store, persistor} = configureStore();

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  console.log("We meade it here!")
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

ReactDOM.render(
  <PersistGate loading={<h1>Test</h1>} persistor={persistor}>

    {store.dispatch(setMyths())}
    {store.dispatch(setStories())}
    {store.dispatch(setIssues())}
    {store.dispatch(setSubmissions())}

    <Provider store={store}>
      <App /> 
    </Provider>

  </PersistGate>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister();
// serviceWorker.register({
  // onSuccess: () => console.log("Service worker installed"),
  // onUpdate: reg => console.log(reg),
// });
