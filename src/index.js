import React from 'react';
import ReactDOM from 'react-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/index.scss';

import App from './components/App';

import * as serviceWorker from './serviceWorker';
// import Firebase, { FirebaseContext } from './components/Firebase';

import { Provider } from 'react-redux';

// import {store, persistor} from './store/configureStore';
// import {store, persistor} from './store/configureStore';
import configureStore from './store/configureStore';

import { PersistGate } from 'redux-persist/integration/react'

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { setStories } from "./actions/stories";
import { setMyths } from "./actions/mythsActions";


const {store, persistor} = configureStore();

// const store = store;

// const initialState = {};
// const store = configureStore(initialStates);

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  store.dispatch(setStories());
  store.dispatch(setMyths());
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
  <FirebaseContext.Provider value={new Firebase()}>
    <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
      <Provider store={store}>
        <App /> 
      </Provider>
    </PersistGate>
  </FirebaseContext.Provider>, 
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
