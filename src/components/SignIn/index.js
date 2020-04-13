import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { connect } from "react-redux";

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { loginUser } from "../../actions/authActions";

const SignInPage = () => (
  <div className="SignInPage">
    {/* <div className="spacer spacer-1"></div> */}
    {/* <div className="spacer spacer-2"></div> */}
    {/* <div className="spacer spacer-3"></div> */}
    {/* <div className="spacer-credit">"Concord Bridge" by Don Troiani</div> */}
    <div className="SignInContainer">
      {/* <h1>Sign In</h1> */}
      <div className="border-decal"></div>
      <div className="border-decal border-decal_top">
        <span className="one"></span>
        <span className="two"></span>
        <span className="three"></span>
      </div>
      <div className="border-decal border-decal_side">
        <span className="one"></span>
        <span className="two"></span>
        <span className="three"></span>
      </div>
      <SignInFormMapped />
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/subscribe");
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/subscribe"); // push user to dashboard when they login
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    const userData = {
      email: email,
      password: password
    };

    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>

        <h1>Sign In</h1>

        <div className="form-label-group">
          <input 
            name="email"
            type="email" 
            value={email}
            onChange={this.onChange}
            className="form-control" 
            // id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            placeholder="you@email.com"
            autocorrect="off"
            spellcheck="false"
            // TODO - autofocus is not working, gonna guess side menu is causing this
            // autofocus
          />
          <label className="heading-font" for="inputEmail">Email address:</label>
        </div>

        <div className="form-label-group">
          <input 
            name="password"
            type="password" 
            value={password}
            onChange={this.onChange}
            className="form-control" 
            // id="exampleInputEmail" 
            aria-describedby="passwordHelp" 
            placeholder="Password"
          />
          <label className="heading-font" for="inputEmail">Password:</label>
        </div>

        <button disabled={isInvalid} type="submit" className="btn btn-articles-light">
          Sign In
        </button>

        {error && <p className="errorMessage">{error.message}</p>}

        <div className="dual-header mt-5">
          <PasswordForgetLink />
          <SignUpLink />
        </div>

      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

SignInForm.propTypes = {
  // loginUser: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const SignInFormMapped = connect(
  mapStateToProps,
  { loginUser }
)(SignInForm);

export default SignInPage;

export { SignInForm };