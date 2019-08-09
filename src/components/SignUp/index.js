import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

// import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import moment from 'moment';

const SignUpPage = () => (
  <div className="SignUpPage">
    
    <div class="SignUpContainer">
      <div class="border-decal"></div>
      <SignUpForm />
    </div>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { username, nameFirst , nameLast, email, passwordOne, isAdmin } = this.state;

    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            // username,
            nameFirst,
            nameLast,
            email,
            roles,
            dateCreation: moment().unix()
          });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.OUTSET);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
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

        <div class="row">

          <div class="col">
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
  
          <div class="col">
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
              <label className="heading-font" for="inputEmail">Last Name:</label>
            </div>
          </div>
        </div>

        <div className="row">

          <div className="col">
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
  
          <div className="col">
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
          <span>Meant to sign in? <Link to={ROUTES.SIGN_IN}>Sign In</Link></span>
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

export default SignUpPage;

export { SignUpForm, SignUpLink };