import React from 'react';
import { compose } from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import SignOutButton from '../SignOut';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <div style={{height: '100vh', marginTop: '-50px'}} className="container">
        <div class="row h-100 justify-content-center">
        <div class="col-sm-6 my-auto">
          <div class="card card-block p-5">
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
      </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);