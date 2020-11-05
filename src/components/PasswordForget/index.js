import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs'

import * as ROUTES from '../../constants/routes';

// const PasswordForgetPage = () => (
//   <div className="ForgotPasswordPage">
//     <div className="ForgotPasswordContainer">
//       <div className="border-decal"></div>
//       <PasswordForgetForm />
//     </div>
//   </div>
// );

const INITIAL_STATE = {
  email: '',
  error: null,
  token: '',
  tokenValid: false,
  newPassword: '',
  newPasswordConfirm: '',
  recoverSuccess: false
};

class PasswordForget extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    var prefixed = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

    console.log(`Got the token ${prefixed.token}`)

    this.setState({
      token: prefixed.token
    }, () => {
      
      if (this.state.token !== '' && this.state.token !== undefined && this.state.token !== null) {

        axios
        .post("/reset", {
          token: this.state.token
        })
        .then(res => {
          console.log(res);

          this.setState({
            tokenValid: true
          })
        })
        .catch(err => {
          console.log(err.response)
          this.setState({
            error: err.response.data.message
          })
        });

      }

    })
  }

  onSubmit = event => {
    event.preventDefault();
    console.log("Submit")

    axios
    .post("/recover", {
      email: this.state.email
    })
    .then(res => {
      console.log(res)

      this.setState({
        recoverSuccess: true
      })
    })
    .catch(err => {
      console.log(err.response)

      this.setState({
        error: err.response.data.message
      })
    });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  resetPassword() {
    console.log({
      token: this.state.token,
      newPassword: this.state.newPassword,
      newPasswordConfirm: this.state.newPasswordConfirm
    })

    axios
    .post("/resetPassword", {
      token: this.state.token,
      newPassword: this.state.newPassword
    })
    .then(res => {
      console.log(res);
      this.props.history.push(ROUTES.SIGN_IN);
    })
    .catch(err => {
      this.setState({
        error: err.response.data.message
      })
    });

  }

  render() {
    const { email, error } = this.state;

    const matcher = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // console.log()
    // const isInvalid = email === '' && matcher.test(email) !== true;
    const isInvalid = matcher.test(email) === false;

    return (
      <div className="ForgotPasswordPage">
        <div className="ForgotPasswordContainer">

          <div className="border-decal"></div>

          <form onSubmit={this.onSubmit}>

            <h1>Forgot Password?</h1>

            {!this.state.tokenValid ?

              this.state.recoverSuccess ? 
              <div className="alert alert-articles">
                <div className="alert-heading">Check your email to reset password.</div>
              </div>
              :
              <>

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

              </>

            :

            <>

            {/* <input
              name="newPassword"
              className="form-control"
              value={this.state.newPassword}
              onChange={this.onChange}
              type="text"
              placeholder="Password"
            /> */}

            <div className="form-group articles">
              <label for="newPassword">New Password</label>
              <input 
                name="newPassword"
                className="form-control with-label"
                value={this.state.newPassword}
                onChange={this.onChange}
                type="password"
              />
            </div>

            <div className="form-group articles">
              <label for="newPassword">Confirm Password</label>
              <input 
                name="newPasswordConfirm"
                className="form-control with-label"
                value={this.state.newPasswordConfirm}
                onChange={this.onChange}
                type="password"
              />
            </div>

            {/* <input
              name="newPasswordConfirm"
              className="form-control"
              value={this.state.newPasswordConfirm}
              onChange={this.onChange}
              type="text"
              placeholder="Confirm Password"
            /> */}

            <button className="btn btn-dark my-3" type="button" disabled={this.state.newPassword === '' || this.state.newPasswordConfirm === '' || (this.state.newPassword !== this.state.newPasswordConfirm)} onClick={() => this.resetPassword()}>
              Change My Password
            </button>

            </>

            }

            {error && <p>{error}</p>}

            <div className="dual-header mt-5">
              <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
              <p>Meant to sign in? <Link to={ROUTES.SIGN_IN}>Sign In</Link></p>
            </div>

          </form>

        </div>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForget;

// const PasswordForgetForm = PasswordForgetFormBase;

export { PasswordForgetLink };