import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';
import { compose } from 'recompose';

class UserIssuesBase extends Component {
  constructor(props) {
    super(props);

     this.state = {
      bulkIssues: [],
      usersIssues: [],
      matchedIssues: [],
      loading: false
     };
  }

  componentDidMount() {

    this.setState({ loading: true });

    this.props.firebase.issues().once('value').then(snapshot => {

      const issuesObject = snapshot.val();

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

    this.props.firebase.user_issues(this.props.firebase.auth.currentUser.uid).once('value').then(snapshot => {

      const issuesObject = snapshot.val();

      const issuesList = Object.keys(issuesObject).map(key => (
        {
          ...issuesObject[key],
          uid: key,
        }
      ));

      issuesList.map((issue) => (

        // Returns the uid of each subscribed story
        // console.log(issue)

        // Pass in the uid to find the issue
        this.props.firebase.issue(issue.uid).once('value').then(snapshot => {
          const issueSnapshot = snapshot.val();

          console.log(issueSnapshot);

          this.setState({
            matchedIssues: [
              ...this.state.matchedIssues,
              issueSnapshot
            ]
          })

          // const issueDetails1 = Object.keys(issueDetails).map(key => (
          //   {
          //     ...issueDetails,
          //   }
          // ));

          // this.setState({
          //   matchedIssues: issueDetails1,
          //   loading: false
          // });

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
  const { bulkIssues, usersIssues, loading } = this.state;

   return (
    <div>
      <div>Here is the users retured Issues</div>

      {loading && <div>Loading ...</div>}

      <h5>All</h5>
  
      {bulkIssues.map(object => (
  
        <div key={object.id} className="">
          <span>{object.title}</span>
        </div>
  
      ))}

      <h5>Users</h5>

      {bulkIssues.map(object => (
        
        <div key={object.id} className="">
          <span>{object.title}</span>
        </div>

      ))}

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

// export default UserIssues;