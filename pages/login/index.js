import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

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
            <SignInFormBase />
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
        const self = this
  
        //   if (this.props.auth.isAuthenticated) {
        //     this.props.history.push("/home");
        //   }
  
        // axios.get('/api/ping')
        // .then(function (response) {
        //     console.log("The server is up!");
        //     self.setState({serverUp: true});
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }
  
    componentWillReceiveProps(nextProps) {
  
    //   if (nextProps.auth.isAuthenticated) {
    //     this.props.setUserDetails(nextProps.auth.user.id);
    //     this.props.history.push("/home"); // push user to dashboard when they login
    //   }
  
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
  
      console.log(userData);
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
  
          {this.state.serverUp ? 
          null
          :
          <div className="alert alert-danger mt-3">Login Down! Signing in will not work in mean time.</div>
          }
  
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
  
          <div className="connections mt-4">
  
            <div className="text-muted">Or sign in with:</div>
  
            <div className="connection mt-2">
              <i className="fab fa-2x fa-google"></i>
              <i className="fab fa-2x fa-apple ml-2"></i>
              <i className="fab fa-2x fa-linkedin ml-2"></i>
              <i className="fab fa-2x fa-twitter ml-2"></i>
            </div>
  
          </div>
  
          <div className="dual-header mt-4">
            {/* <PasswordForgetLink /> */}
            {/* <SignUpLink /> */}
          </div>
  
        </form>
      );
    }
}

export default SignInPage