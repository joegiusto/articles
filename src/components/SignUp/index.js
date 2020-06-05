import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { connect } from "react-redux";

import { compose } from 'recompose';

import axios from 'axios';

import { registerUser } from "../../actions/authActions";

import { PasswordForgetLink } from '../PasswordForget';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import moment from 'moment';


const SignUpPage = () => (
  <div className="SignUpPage">
    
    <div className="SignUpContainer">
      <div className="border-decal"></div>
      <SignUpFormConnect />
    </div>
    
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: true,
  outsetOverride: true,
  error: null,
  serverUp: false,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const self = this;

    // We need to check if the server is up before allowing users to sign up.
    axios.get('/api/ping')
    .then(function (response) {
      console.log("The server is up!");
      self.setState({serverUp: true});
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const { username, nameFirst , nameLast, email, passwordOne, passwordTwo, isAdmin, outsetOverride } = this.state;
    
    const newUser = {
      first_name: nameFirst,
      last_name: nameLast,
      email: email,
      password: passwordOne,
      password2: passwordTwo
    };

    this.props.registerUser(newUser, this.props.history); 
  };
  

  render() {
    const {
      username,
      nameFirst,
      nameLast,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      // username === '';
      nameFirst === '' ||
      nameLast === '';

    return (
      <form onSubmit={this.onSubmit}>

        {this.state.serverUp ? 
        null
        :
        <div className="alert alert-danger mt-3">Server Down! Signing up will not work in mean time.</div>
        }
        
      
        <h1>Sign Up</h1>

        {/* <input
          name="username"
          value={username}
          onChange={this.onChange}
          className="form-control" 
          type="text"
          placeholder="Full Name"
        /> */}

        <div className="form-label-group">
          <input 
            name="email"
            type="email" 
            value={email}
            onChange={this.onChange}
            className="form-control" 
            aria-describedby="emailHelp" 
            placeholder="you@email.com"
            autocorrect="off"
            spellcheck="false"
            // TODO - autofocus is not working, gonna guess side menu is causing this
            // autofocus
          />
          <label className="heading-font" for="inputEmail">Email address:</label>
        </div>

        <div className="row">

          <div className="col">
            <div className="form-label-group">
              <input 
                name="nameFirst"
                type="text" 
                value={nameFirst}
                onChange={this.onChange}
                className="form-control" 
                aria-describedby="usernameHelp" 
                placeholder="First and Last"
                autocorrect="off"
                spellcheck="false"
                // TODO - autofocus is not working, gonna guess side menu is causing this
                // autofocus
              />
              <label className="heading-font" for="inputEmail">First Name:</label>
            </div>
          </div>
  
          <div className="col">
            <div className="form-label-group">
              <input 
                name="nameLast"
                type="text" 
                value={nameLast}
                onChange={this.onChange}
                className="form-control" 
                aria-describedby="usernameHelp" 
                placeholder="First and Last"
                autocorrect="off"
                spellcheck="false"
                // TODO - autofocus is not working, gonna guess side menu is causing this
                // autofocus
              />
              <label className="heading-font" for="inputEmail">Last Name: <span className="extra">(Optional)</span></label>
            </div>
          </div>
        </div>

        <div className="row">

          <div className="col-12 col-md-6">
            <div className="form-label-group">
              <input 
                name="passwordOne"
                type="password" 
                value={passwordOne}
                onChange={this.onChange}
                className="form-control" 
                aria-describedby="passwordHelp" 
                placeholder="Password"
                autocorrect="off"
                spellcheck="false"
                // TODO - autofocus is not working, gonna guess side menu is causing this
                // autofocus
              />
              <label className="heading-font" for="inputEmail">Password:</label>
            </div>
          </div>
  
          <div className="col-12 col-md-6">
            <div className="form-label-group">
              <input 
                name="passwordTwo"
                type="password" 
                value={passwordTwo}
                onChange={this.onChange}
                className="form-control" 
                aria-describedby="passwordHelp" 
                placeholder="Password"
                // autocorrect="off"
                // spellcheck="false"
                // TODO - autofocus is not working, gonna guess side menu is causing this
                // autofocus
              />
              <label className="heading-font" for="inputEmail">Confirm Password:</label>
            </div>
          </div>

        </div>

        {/* <input
          name="email"
          value={email}
          onChange={this.onChange}
          className="form-control" 
          type="text"
          placeholder="Email Address"
        />

        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          className="form-control" 
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          className="form-control" 
          type="password"
          placeholder="Confirm Password"
        /> */}

        {/* <label>
        Admin:
        <input
          name="isAdmin"
          type="checkbox"
          checked={isAdmin}
          onChange={this.onChangeCheckbox}
        />
        </label> */}

        <button disabled={isInvalid} type="submit" className="btn btn-articles-light">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}

        <div className="dual-header mt-5">
          <PasswordForgetLink />
          {/* <SignUpLink /> */}
          <p>Meant to sign in? <Link to={ROUTES.SIGN_IN}>Sign In</Link></p>
        </div>

      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

SignUpForm.propTypes = {
  // registerUser: PropTypes.func.isRequired,
  // auth: PropTypes.object.isRequired,
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const SignUpFormConnect = connect(
  mapStateToProps,
  { registerUser }
)(withRouter(SignUpForm));

export default SignUpPage;

// const SignUpForm = compose(
//   withRouter,
//   withFirebase,
// )(SignUpFormBase);

// export default SignUpPage;

export { SignUpForm, SignUpLink };