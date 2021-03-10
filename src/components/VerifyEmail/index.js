import React, { Component } from 'react';
import axios from 'axios'
import { connect } from "react-redux";
import qs from 'qs'
import { verifyEmail } from '../../actions/authActions'

import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resent: false,
      getToken: null,
      error: ''
    }

    this.resendEmail = this.resendEmail.bind(this);
    this.verifyToken = this.verifyToken.bind(this);
  }

  componentDidMount() {
    var prefixed = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

    this.setState({
      getToken: prefixed.token
    })
  }

  verifyToken() {
    console.log("Resent token")

    axios
    .get("/api/users/verify", {
      params: {
        token: this.state.getToken
      }
    })
    .then(res => {
      console.log(res)
      // console.log("Made it here")
      this.props.verifyEmail()
      // console.log("Made it here")
      this.props.history.push('/home')
      // console.log("Made it here")

      // Funny story, wasted some time trying to fix this because it wasn't working when I clicked the button but it was because the email send me to :8080 instead of :3000 and I was running an old build of the site before it had this so of course clicking the button did nothing on that version. My time was wasted so figured I waste yours :) ... running npm run build now
    })
    .catch(err => {
      console.log(err.response)

      this.setState({
        error: err.response.data.message
      })
    });
  }

  resendEmail() {
    const self = this;
    console.log("Resending verification email")

    axios
    .post("/api/users/resendToken", {
      email: this.props.user_details.email
    })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    });

    self.setState({
      resent: !this.state.resent
    })
  }

  render() {

    return(
      <section className="verify-email">
        <div className="container">
          <div className="row h-100 justify-content-center">
            <div className="col-sm-6 my-auto">
              <div className="card shadow-sm">

                <div className="card-body">
                  <h1>Verify Email</h1>
                  <p>Please verify your email so you can access our site.</p>
                </div>

                <div className="card-footer p-0 px-2 pt-3">

                  {/* <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.HOME}>Home Page</Link></p>
                    <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.LANDING}>Landing Page</Link></p>
                  </div> */}

                  <div className="alert alert-light">

                    <div className="form-group articles">
                      <label htmlFor="">Code</label>
                      <input value={this.state.getToken} className="form-control with-label" type="text"/>
                    </div>

                    <button onClick={this.verifyToken} className="btn btn-articles-light">Submit</button>

                    {
                      this.state.error !== '' ? 
                      <div className="alert alert-danger mt-3">
                        {this.state.error}
                      </div>
                      :
                      null
                    }

                    <div className="title mt-3">Don't have a code?</div>
                    <div className="text">Check your email for the one we sent you when you signed up, please click the verify email button or insert the code we sent you here. If it has expired generate a new code below.</div>

                    <div className="hover-icon">
                      <i className="fas fa-phone"></i>
                    </div>

                  </div>

                  <div className="alert alert-light">
                    <div className="title">Expired or Missing?</div>
                    <button onClick={this.resendEmail} disabled={this.state.resent ? true : false} className="btn btn-articles-light">Send Another</button>
                  </div>
                  
                </div>

                {/* <div style={{backgroundColor: 'rgb(49 49 49);'}} className="card-footer py-2 text-center">
                  <Link to={ROUTES.COMMUNITY}><button className="btn btn-articles-light alt">Support Hub</button></Link>
                </div> */}

              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

// export default VerifyEmail 

const mapStateToProps = state => ({
  user_details: state.auth.user_details,
});

export default connect(
  mapStateToProps,
  { verifyEmail }
)(VerifyEmail);