import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div className="ForgotPasswordPage">
    <div className="ForgotPasswordContainer">
      <div className="border-decal"></div>
      <PasswordForgetForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    // const { email } = this.state;

    // this.props.firebase
    //   .doPasswordReset(email)
    //   .then(() => {
    //     this.setState({ ...INITIAL_STATE });
    //   })
    //   .catch(error => {
    //     this.setState({ error });
    //   });

    // event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    const matcher = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // console.log()
    // const isInvalid = email === '' && matcher.test(email) !== true;
    const isInvalid = matcher.test(email) === false;

    return (
      <form onSubmit={this.onSubmit}>

        <h1>Forgot Password?</h1>

        <input
          name="email"
          className="form-control"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <button className="btn btn-dark my-3" disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}

        <div className="dual-header mt-5">
          <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
          <p>Meant to sign in? <Link to={ROUTES.SIGN_IN}>Sign In</Link></p>
        </div>

      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = PasswordForgetFormBase;

export { PasswordForgetForm, PasswordForgetLink };