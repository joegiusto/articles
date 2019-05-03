import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startLogout } from '../actions/auth'

export const LoginPage = ({startLogin, startLogout}) => (
  <div className='container'>
    <button onClick={startLogin}>Login</button>
    <button onClick={startLogout}>Logout</button>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin()),
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);