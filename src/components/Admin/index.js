import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
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
  componentDidMount() {
  this.setState({ loading: true });
  this.props.firebase.users().on('value', snapshot => {
  const usersObject = snapshot.val();
  const usersList = Object.keys(usersObject).map(key => ({
    ...usersObject[key],
    uid: key,
    }));
    this.setState({
    users: usersList,
    loading: false,
    });
    });
    }
  componentWillUnmount() {
  this.props.firebase.users().off();
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
    <strong>Username:</strong> {user.username}
    </span>
    <span>
    <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
    Details
    </Link>
    </span>
    </li>
    ))}
    </ul>
    </div>
    );
  }
}

const UserItem = ({ match }) => (
  <div>
  <h2>User ({match.params.id})</h2>
  </div>
);

const condition = authUser =>
authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(AdminPage);