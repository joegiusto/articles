import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import { withAuthorization, withEmailVerification } from '../../Session';
import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';

const AdminPage = () => (

 

    <div className="container">
      <div>
        <h1>News Management</h1>
        <p>Portal for admin and writer roles to manage news details.</p>
        <Switch>
          <Route exact path={ROUTES.MANAGE_DETAILS} component={UserItem} />
          <Route exact path={ROUTES.MANAGE} component={IssuesList} />
        </Switch>
      </div>
    </div>



);

class IssuesListBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      loadingStories: false,
      loadingIssues: false,
      loadingMyths: false,

      firebaseStories: [],
      firebaseIssues: [],
      firebaseMyths: [],

      id: "",
      title: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
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
    // this.onListenForNews();

    this.setState({ loadingStories: true });
    this.setState({ loadingIssues: true });
    this.setState({ loadingMyths: true });

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
        firebaseIssues: usersList,
        loadingIssues: false,
      });

    });

    this.props.firebase.stories().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => (
        {
          ...usersObject[key],
          // statesArray: this.convert(usersObject[key].interest.states),
          uid: key,
        }
      ));

      this.setState({
        firebaseStories: usersList,
        loadingStories: false,
      });

    });

    this.props.firebase.myths().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => (
        {
          ...usersObject[key],
          // statesArray: this.convert(usersObject[key].interest.states),
          uid: key,
        }
      ));

      this.setState({
        firebaseMyths: usersList,
        loadingMyths: false,
      });

    });
    
  }

  componentWillUnmount() {
    this.props.firebase.issues().off();
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
    const { firebaseIssues, firebaseStories, firebaseMyths, loading } = this.state;

    return (
      <div className="row">

        <div className="col-12 col-md-4">
          <div className="news-manage-card stories">
            <div className="header">
              <h4>Stories</h4>
  
              <div>
                <div className="search">Search</div>
                <input className="w-100 form-control" type="text"/>
              </div>

              <div className="sort-control mt-1">
                  <span>Showing:</span>
                
                  <span className="sort-selection active">All Stories</span>
                  <span className="sort-selection">Search Stories</span>
                
              </div>

            </div>
    
            {loading && <div>Loading ...</div>}
    
            <div className="issue-container">
              {firebaseStories.map(user => (
                <div className="issue" key={user.uid}>

                  <div className="id">
                    <strong>ID:</strong> {user.uid}
                  </div>
    
                  <div className="title">
                    <strong> Title:</strong> {user.title}
                  </div>
    
                  <div>   
                    {/* {console.log(user.statesArray)} */}
                    {/* <strong>States:</strong>  */}
                    {/* {user.statesArray === undefined ? 'None' : user.statesArray.map(state => (<div className="badge badge-success ml-1">{state}</div>) ) } */}
                    {/* {user.statesArray.map(state => (
                      <div className="badge badge-success">{state}</div>
                    ))} */}       

                    {/* <span>
                      <strong> Cities:</strong>
                    </span> */}  
                  </div>
    
                  <div className="dual-header">

                    <Link to={`${ROUTES.MANAGE}/stories/${user.uid}`}>
                      Edit
                    </Link>

                    {/* <span onClick={() => (this.removeIssue(user.uid))} className="ml-3" style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}}>
                      Delete
                    </span> */}

                  </div>
    
                </div>
              ))}
            </div>
    
            <div className="footer">
              <h4>Add Story</h4>
    
              <input 
                name='id' 
                type="text" 
                placeholder="Story ID"
                value={this.state.id}
                onChange={this.handleInputChange}
                className="form-control"
              />
    
              <input 
                name='title'
                type="text" 
                placeholder="Story Title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="form-control mt-1"
              />
    
              <button className="btn btn-articles-light mt-1 w-100" type="submit" onClick={() => (this.addIssue()) }>Add</button>
            </div>
          </div>
        </div>
  
        <div className="col-12 col-md-4">
          <div className="news-manage-card issues">
            <div className="header">
              <h4>Issues</h4>
  
              <div>
                <div className="search">Search</div>
                <input className="w-100 form-control" type="text"/>
              </div>

              <div className="sort-control mt-1">
                  <span>Showing:</span>
                
                  <span className="sort-selection active">All Issues</span>
                  <span className="sort-selection">Search Issues</span>
                
              </div>

            </div>
    
            {loading && <div>Loading ...</div>}
    
            <div className="issue-container">
              {firebaseIssues.map(user => (
                <div className="issue" key={user.uid}>

                  <div className="id">
                    <strong>ID:</strong> {user.uid}
                  </div>
    
                  <div className="title">
                    <strong> Title:</strong> {user.title}
                  </div>
    
                  <div>   
                    {/* {console.log(user.statesArray)} */}
                    <strong>States:</strong> 
                    {user.statesArray === undefined ? 'None' : user.statesArray.map(state => (<div className="badge badge-success ml-1">{state}</div>) ) }
                    {/* {user.statesArray.map(state => (
                      <div className="badge badge-success">{state}</div>
                    ))} */}       

                    {/* <span>
                      <strong> Cities:</strong>
                    </span> */}  
                  </div>
    
                  <div className="dual-header">

                    <Link to={`${ROUTES.MANAGE}/issues/${user.uid}`}>
                      Edit
                    </Link>

                    <span onClick={() => (this.removeIssue(user.uid))} className="ml-3" style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}}>
                      Delete
                    </span>

                  </div>
    
                </div>
              ))}
            </div>
    
            <div className="footer">
              <h4>Add Issue</h4>
    
              <input 
                name='id' 
                type="text" 
                placeholder="Issue ID"
                value={this.state.id}
                onChange={this.handleInputChange}
                className="form-control"
              />
    
              <input 
                name='title'
                type="text" 
                placeholder="Issue Title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="form-control mt-1"
              />
    
              <button className="btn btn-articles-light mt-1 w-100" type="submit" onClick={() => (this.addIssue()) }>Add</button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="news-manage-card myths">
            <div className="header">
              <h4>Myths</h4>
  
              <div>
                <div className="search">Search</div>
                <input className="w-100 form-control" type="text"/>
              </div>

              <div className="sort-control mt-1">
                  <span>Showing:</span>
                
                  <span className="sort-selection active">All Myths</span>
                  <span className="sort-selection">Search Myths</span>
                
              </div>

            </div>
    
            {loading && <div>Loading ...</div>}
    
            <div className="issue-container">
              {firebaseMyths.map(user => (
                <div className="issue" key={user.uid}>

                  <div className="id">
                    <strong>ID:</strong> {user.uid}
                  </div>
    
                  <div className="title">
                    <strong> Title:</strong> {user.title}
                  </div>
    
                  <div>   
                    {/* {console.log(user.statesArray)} */}
                    {/* <strong>States:</strong>  */}
                    {/* {user.statesArray === undefined ? 'None' : user.statesArray.map(state => (<div className="badge badge-success ml-1">{state}</div>) ) } */}
                    {/* {user.statesArray.map(state => (
                      <div className="badge badge-success">{state}</div>
                    ))} */}       

                    {/* <span>
                      <strong> Cities:</strong>
                    </span> */}  
                  </div>
    
                  <div className="dual-header">

                    <Link to={`${ROUTES.MANAGE}/myths/${user.uid}`}>
                      Edit
                    </Link>

                    {/* <span onClick={() => (this.removeIssue(user.uid))} className="ml-3" style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}}>
                      Delete
                    </span> */}

                  </div>
    
                </div>
              ))}
            </div>
    
            <div className="footer">
              <h4>Add Myths</h4>
    
              <input 
                name='id' 
                type="text" 
                placeholder="Myth ID"
                value={this.state.id}
                onChange={this.handleInputChange}
                className="form-control"
              />
    
              <input 
                name='title'
                type="text" 
                placeholder="Myth Title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="form-control mt-1"
              />
    
              <button className="btn btn-articles-light mt-1 w-100" type="submit" onClick={() => (this.addIssue()) }>Add</button>
            </div>
          </div>
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