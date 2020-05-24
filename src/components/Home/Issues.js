import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import SubscriptionCard from './SubscriptionCard';

class UserIssuesBase extends Component {
  constructor(props) {
    super(props);

     this.state = {
      bulkIssues: [],
      usersIssues: [],
      matchedIssues: [],
      render: props.get,
      loading: false
     };
  }

  componentDidMount() {

    // var cat = 'news/issues';
    // var cat = 'stories';
    // var cat = 'orders';

    this.setState({ loading: true });

    this.props.firebase.catagory('news/issues').once('value').then(snapshot => {

    // this.props.firebase.issues().once('value').then(snapshot => {

      const issuesObject = snapshot.val();

      // console.log(snapshot.val());

      const issuesList = Object.keys(issuesObject).map(key => (
        {
          ...issuesObject[key],
          uid: key,
        }
      ));

      this.setState({
        bulkIssues: issuesList,
        loading: false
      });

    });

    this.props.firebase.user_issues('news/issues', 'issues', this.props.firebase.auth.currentUser.uid).once('value').then(snapshot => {

      const issuesObject = snapshot.val();

      console.log(snapshot.val());

      const issuesList = Object.keys(issuesObject).map(key => (
        {
          // ...issuesObject,
          uid: key,
        }
      ));

      issuesList.map((issue) => (

        // Returns the uid of each subscribed story
        // console.log(issue)

        // Pass in the uid to find the issue
        this.props.firebase.catagory('news/issues').once('value').then(snapshot => {
          const issueSnapshot = snapshot.val();

          // console.log(snapshot.val());

          // console.log(snapshot);

          issueSnapshot.uid = snapshot.key;

          this.setState({
            matchedIssues: [
              ...this.state.matchedIssues,
              issueSnapshot,
            ]
          })

        })

      ));

      this.setState({
        usersIssues: issuesList,
        loading: false
      });

    });

  }

  componentWillUnmount() {

  }
 
 render() {
  const { bulkIssues, usersIssues, matchedIssues, loading } = this.state;

   return (
    <div className="subscriptions">

      <div className="subscriptions-button filter w-100">
        <div className="badge badge-dark ml-5">List View</div>
        <div className="badge badge-dark ml-1">Card View</div>
      </div>

      {loading && <div>Loading ...</div>}

      {this.props.get === 'all' ?
      bulkIssues.map(object => (
        <SubscriptionCard object={object}/>
        // <h1>obj</h1>
      ))
      :
      bulkIssues.map(object => (
        <SubscriptionCard get={this.props.get} sub={this.props.sub} object={object}/> 
        // <h1>{object.title}</h1>
      ))
      }

      <div className="subscription">
        <div className="uid">10 Issues and Growing</div>
        <div className="title" style={{textDecoration: 'underline'}}>Want more?</div>
        <div className="slogan">
          <div className="search-animation">
            <i className="fas fa-search"></i>
          </div>
        </div>
        <button className="btn btn-articles-light" style={{backgroundColor: 'black', color: 'white'}}>Explore</button>
      </div>
    </div>
   )
  }
}

const condition = authUser => !!authUser;

const UserIssues = withFirebase(UserIssuesBase);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(UserIssues);