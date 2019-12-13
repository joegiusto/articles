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

      console.log(snapshot.val());

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
        this.props.firebase.issue(issue.uid).once('value').then(snapshot => {
          const issueSnapshot = snapshot.val();

          console.log(snapshot.val());

          // console.log(snapshot);

          issueSnapshot.uid = snapshot.key;

          this.setState({
            matchedIssues: [
              ...this.state.matchedIssues,
              issueSnapshot,
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
  const { bulkIssues, usersIssues, matchedIssues, loading } = this.state;

   return (
    <div className="subscriptions">

      {loading && <div>Loading ...</div>}

      {matchedIssues.map(object => (
        <div key={object.id} className="subscription" style={ (object.photoExtra ? {background: object.photoExtra + ", url(" + object.photo + ")"} : {background: "url(" + object.photo + ")"} ) }>
          <div className="uid">{object.uid}</div>
          <div className="title">{object.title}</div>
          <div className="slogan">{object.slogan}</div>
          {/* <span>{object.uid}</span> */}
          <div className="dual-header"> 
            <div>
              <span className="states badge badge-dark">{object.interest.states}</span>
              <span className="city badge badge-dark ml-1">{object.interest.city}</span>
            </div>
            <div><span className="settings badge badge-light"><i class="fas fa-cog m-0"></i></span></div>
          </div>
        </div>
      ))}

      <div className="subscription">
        <div className="title">Want more?</div>
        <div className="slogan">
          <div className="search-animation">
            <i class="fas fa-search"></i>
          </div>
        </div>
        <button className="btn btn-articles-light">Explore</button>
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

// export default UserIssues;