import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import { withAuthorization, withEmailVerification } from '../../Session';
import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';

const AdminPage = () => (

  <div className="row">

    <div className="col-4">
      <div>
        <h1>Admin</h1>
        <p>The Admin Page is accessible by every signed in admin user.</p>
        <Switch>
          <Route exact path={ROUTES.MANAGE_DETAILS} component={UserItem} />
          <Route exact path={ROUTES.MANAGE} component={IssuesList} />
        </Switch>
      </div>
    </div>

  </div>

);

class IssuesListBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      loading: false,
      users: [],

      id: "",
      title: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    // this.addIssue = this.addIssue.bind(this);
  }

  convert(fakeArray) {

    if (fakeArray !== undefined) {
      const str = [...fakeArray.split(",")];
      console.log(str.length);

      return (str);
      
    } else {
      return undefined;
    }

  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.issues().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => (
        {
          ...usersObject[key],
          statesArray: this.convert(usersObject[key].interest.states),
          uid: key,
        }
      ));

      this.setState({
        users: usersList,
        loading: false,
      });

    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addIssue() {
    
    this.props.firebase.issue(this.state.id).set({

      title: this.state.title,
      interest: {
        states: "None",
        city: 'None'
      } 

    });

    this.setState({

      id: '', 
      title: '', 

    });
  }

  removeIssue(id) {
    this.props.firebase.issue(id).set({

    })
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h2>Issues</h2>

        {loading && <div>Loading ...</div>}

        <ul>
          {users.map(user => (
            <div key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>

              <span>
                <strong> Title:</strong> {user.title}
              </span>

              <div>

                <span>

                  {console.log(user.statesArray)}

                  <strong>States: {user.statesArray === undefined ? 'None' : user.statesArray.map(state => (<div className="badge badge-success">{state}</div>) ) }</strong>

                  {/* {user.statesArray.map(state => (
                    <div className="badge badge-success">{state}</div>
                  ))} */}
                  
                </span>

                <span>
                  <strong> Cities:</strong>
                </span>

              </div>

              <div>
                <Link to={`${ROUTES.MANAGE}/issues/${user.uid}`}>
                  Details
                </Link>
                <span onClick={() => (this.removeIssue(user.uid))} className="ml-3" style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}}>
                  Delete
                </span>
              </div>

            </div>
          ))}
        </ul>

        <div>
          <h2>Add Issue</h2>

          <input 
            name='id' 
            type="text" 
            placeholder="ID"
            value={this.state.id}
            onChange={this.handleInputChange}
          />

          <input 
            name='title'
            type="text" 
            placeholder="TITLE"
            value={this.state.title}
            onChange={this.handleInputChange}
          />

          <button type="submit" onClick={() => (this.addIssue()) }>Add</button>
        </div>

      </div>
    );
  }
}

const UserItem = ({ match }) => (
  <div>
  <h2>Editing Issue ({match.params.id})</h2>
  </div>
);

const condition = authUser =>
authUser && !!authUser.roles[ROLES.ADMIN];

const IssuesList = withFirebase(IssuesListBase);

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(AdminPage);