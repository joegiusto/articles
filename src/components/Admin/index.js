import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

// import { withFirebase } from '../Firebase';
// import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <UserListBase/>
  </div>
);

class UserListBase extends Component {
  constructor(props) {
  super(props);
  
  this.state = {
    loading: false,
    users: [],
  };

  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h2>Users</h2>

        {loading && <div>Loading ...</div>}

        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>

              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>

              <span>
                <strong>Name:</strong> {user.nameFirst + ' ' + user.nameLast}
              </span>

              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>Details</Link>
              </span>

            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AdminPage