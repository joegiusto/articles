import React from 'react';
import ReactDOM from 'react-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/index.scss';

import App from './components/App';

import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';

import { Provider } from 'react-redux';

// import {store, persistor} from './store/configureStore';
// import {store, persistor} from './store/configureStore';
import configureStore from './store/configureStore';

import { PersistGate } from 'redux-persist/integration/react'

const {store, persistor} = configureStore();

// const store = store;

// const initialState = {};
// const store = configureStore(initialStates);

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <PersistGate loading={null} persistor={persistor}>
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
