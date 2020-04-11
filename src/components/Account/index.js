import React from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import SignOutButton from '../SignOut';

import { withFirebase } from '../Firebase';

class OnlineLogBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      online: true,
      test: '',
      count: 1
    };
  }

  componentDidMount() {
    // var presenceRef = this.props.database().ref("disconnectmessage");
    // Write a string when this client loses connection
    // presenceRef.onDisconnect().set("I disconnected!");

    this.props.firebase.user(this.props.authUser.uid).update({ online: true});

    // var presenceRef = this.props.firebase.user(this.props.authUser.uid).ref("online");
    // // Write a string when this client loses connection
    // presenceRef.onDisconnect().set("I disconnected!");

    // this.props.firebase.user(this.props.authUser.uid).ref("online").onDisconnect().set("I disconnected!")

    // this.props.firebase.online.on('child_changed', (snap) => (
    //   console.log(snap)
    // ));

    this.props.firebase
    .online(this.props.authUser.uid)
    .on('value', snapshot => {
      const status = snapshot.val();
      this.setState({online: status})
    });

    this.props.firebase
    .online(this.props.authUser.uid)
    .onDisconnect().set(false);
    // .on('value', snapshot => {
    //   const status = snapshot.val();
    //   this.setState({online: status})
    // });

  };

  componentWillUnmount() {
    this.logOff()
  }

  logOn() {
    this.props.firebase
    .online(this.props.authUser.uid)
    .set(true);

    this.props.firebase
    .online(this.props.authUser.uid)
    .on('value', snapshot => {
      const status = snapshot.val();
      this.setState({online: status})
    });
  }

  logOff() {
    this.props.firebase
    .online(this.props.authUser.uid)
    .set(false);

    this.props.firebase
    .online(this.props.authUser.uid)
    .off();
  }

  render() {
    return (
      <div>
        {(
          this.state.online ? 
          <span className="ml-1 badge badge-success">Online</span>
          :
          <span className="ml-1 badge badge-danger">Offline</span>
        )}

        <span className="ml-1 badge badge-articles">{this.state.count} Now</span>

        {(
          this.state.online ? 
          <span onClick={() => this.logOff()} className="ml-1 badge badge-danger">Log Off</span>
          :
          <span onClick={() => this.logOn()} className="ml-1 badge badge-success">Log On</span>
        )}


        {/* <span className="ml-1 badge badge-dark">12 Today</span> */}

      </div>
    )
  }

}

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div style={{height: '100vh', marginTop: '-50px'}} className="container">
        <div className="row h-100 justify-content-center">

        <div className="col-sm-6 my-auto">

          <OnlineLog authUser={authUser}/>
          <div className="card card-block p-5">
            <h1>{authUser.username}</h1>
            <h3 className="text-muted">{authUser.email}</h3>

            {!authUser.roles.ADMIN ? (
              <span></span>
            ) : (
              <div><span className="profile-role badge badge-pill badge-articles">Admin</span></div>
            )}

            <div className="mt-4"><PasswordForgetForm /></div>
            <div className="mt-4"><PasswordChangeForm /></div>
            <div><SignOutButton className="btn btn-dark mt-4"/></div>
          </div>

        </div>

        <div className="col-sm-6 my-auto">

          <div className="card card-block p-5">

            <form action="">

            

            <div className="group d-flex justify-content-between">

              <div className="group d-flex">
                <div className="lead">MySQL:</div>
                <div className="lead ml-1">0</div>
              </div>

              <div className="group d-flex">
                <div className="lead">Firebase:</div>
                <div className="lead ml-1">000000042</div>
              </div>

            </div>

            <div className="group d-flex mt-3">
              <div className="lead">Email:</div>
              <div className="lead ml-1">example@provider.com</div>
            </div>

            <div className="group d-flex mt-3">
              <div className="lead">Joined</div>
              <div className="lead ml-1">00/00/0000</div>
            </div>

            <div className="row">

              <div className="col-12 col-md-6">

                <div className="form-group mt-3">
                  <label for="exampleInputEmail1">First Name:</label>
                  <input
                    name="passwordOne"
                    // value={passwordOne}
                    // onChange={this.onChange}
                    className="form-control"
                    type="password"
                    placeholder=""
                  />
                </div>

              </div>

              <div className="col-12 col-md-6">

                <div className="form-group mt-3">
                  <label for="exampleInputEmail1">Last Name:</label>
                  <input
                    name="passwordOne"
                    // value={passwordOne}
                    // onChange={this.onChange}
                    className="form-control"
                    type="password"
                    placeholder=""
                  />
                </div>
                
              </div>

              <div className="col-12 col-md-6">

                <div className="form-group mt-3">
                  <label for="exampleInputEmail1">Birthday:</label>
                  <input
                    name="passwordOne"
                    // value={passwordOne}
                    // onChange={this.onChange}
                    className="form-control"
                    type="password"
                    placeholder=""
                  />
                </div>
                
              </div>

              <div className="col-12 col-md-6">

                <div className="form-group mt-3">
                  <label for="exampleInputEmail1">Zip:</label>
                  <input
                    name="passwordOne"
                    // value={passwordOne}
                    // onChange={this.onChange}
                    className="form-control"
                    type="password"
                    placeholder=""
                  />
                </div>
                
              </div>

            </div>

            

            </form>

          </div>

        </div>

      </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

const OnlineLog = withFirebase(OnlineLogBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);