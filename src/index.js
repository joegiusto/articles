import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';

import configureStore from './store/configureStore';
import { firebase } from './firebase/firebase';
import { currentUser } from './actions/site';

import * as serviceWorker from './serviceWorker';

import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/styles.scss';


const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    // ReactDOM.render(jsx, document.getElementById('app'));
    ReactDOM.render(jsx, document.getElementById('root'));
    hasRendered = true;
  }
};

let fillThis = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    fillThis = user;
    // console.log(fillThis);
    store.dispatch(currentUser(user));

    console.log('Logged In');
    // store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === '/login') {
        history.push('/profile');
      }
    // });
  } else {
    renderApp();
    console.log('log out');
    console.log(user);
    history.push('/');
    store.dispatch(currentUser({}));
  }
});
// ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
