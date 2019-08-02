import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const OutsetPage = (props) => (
  <div class="container">
    <h1>Outset</h1>
    <button onClick={() => props.firebase.resetUserOutset('kGAx8gUaKEaBwZ4xuDiQe6zU3qq1') + props.history.push(ROUTES.OUTSET)}>Reset</button>
    <button onClick={() => props.firebase.incrementUserOutset('kGAx8gUaKEaBwZ4xuDiQe6zU3qq1') + props.history.push(ROUTES.OUTSET)}>Finish</button>
    <OutsetList />
    {/* <OutsetForm /> */}
  </div>
);

const OutsetList = () => (
  <div>

    <div>
      <i class="far fa-check-square"></i>
      <span>Privacy, Terms and Cookies</span>
    </div>

    <div>
      <i class="far fa-check-square"></i>
      <span>Profile Questions</span>
    </div>

    <div>
      <i class="far fa-square"></i>
      <span>News Questions</span>
    </div>

    <div>
      <i class="far fa-square"></i>
      <span>Turtorial</span>
    </div>

  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class OutsetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
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
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const OutsetForm = compose(
  withRouter,
  withFirebase,
)(OutsetFormBase);

export default withFirebase(OutsetPage);

export { OutsetForm, SignUpLink };