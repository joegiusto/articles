import React, { Component } from 'react';
// import { compose } from 'recompose';
// import { withAuthorizationHide } from '../Session';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import { Switch, Route, Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import moment from 'moment';
// import SubmissionItem from './SubmissionItem';

const Submissions = () => (
  <div className='container-fluid'>

    <div className="row my-auto justify-content-between">

      <div className="col-12 col-md-3 pl-md-0">

        <div className="submission-side-panel">

          <div className="top">
            <h1 className="submission-side-panel_title">Submission Area</h1>
            <p className="submission-side-panel_slogan">Here artist and individuals can submit clothing ideas of thier own to have a chance to be voted on and picked to go in our shop. Artist will recieve 50% of net profit for the sales of their design.</p>
          </div>
  
          <div className="steps">
            <div className="step one">
              <i class="fas fa-pencil-ruler"></i>
              <div>
                <h5>Step One</h5>
                <p>Create a design</p>
              </div>
            </div>
    
            <div className="step two">
              <i className="far fa-thumbs-up"></i>
              <div>
                <h5>Step Two</h5>
                <p>Submit design and wait for our approval</p>
                <a href="">Terms</a>
              </div>
            </div>
    
            <div className="step three">
              <i class="fas fa-trophy"></i>
              <div>
                <h5>Step Three</h5>
                <p>Users will vote on designs, top design gets thier item added to the store for a month, thier submission mailed to them, and recieve a percent of the profit from thier items sales.</p>
              </div>
            </div>
          </div>

          <Link to={ROUTES.STORE_SUBMISSIONS_SUBMIT}><button className="submission-side-panel_submit btn btn-dark w-100 mt-3">Submit a Design <i className="fas fa-mouse-pointer ml-2"></i></button></Link>
          <Link to={ROUTES.STORE_SUBMISSIONS}><button className="submission-side-panel_submit btn btn-dark w-100 mt-3">View Designs <i className="fas fa-mouse-pointer ml-2"></i></button></Link>
          
          
        </div>

      </div>

      <div className="col-12 col-md-9">

        <div>
          
          <Switch>
          <Route exact path={ROUTES.STORE_SUBMISSIONS} render={() =>
            <div className="listings">
              <h1>
                {moment().format('MMMM')} Submissions
              </h1>

              <h5>Next Pick At End of Month <span className="badge badge-danger"><Countdown date={moment().startOf('month').add(1, 'months').format('YYYY-MM-DD')} /></span></h5>
  
              <p>Sort by <a href="#">Top</a> <a href="#">New</a> <a href="#">Controversial</a></p>
              <div className="filters">
                <div className="badge badge-dark">Top</div>
                <div className="badge badge-light">New</div>
                <div className="badge badge-light">Controversial</div>
              </div>


              <div className="login-alert alert alert-danger w-100">
                <div className="d-flex align-items-center justify-content-between">
                  <span>You must be logged into vote and filter</span>
                  <button className="btn btn-articles-light">Log In</button>
                </div>
              </div>

              <FirebaseVoteList/>
            </div>
          } />
          <Route path={ROUTES.STORE_SUBMISSIONS_SUBMIT} component={SubmitBase} />
          </Switch>

        </div>
        
      </div>
    </div>

  </div>
);

class FirebaseVoteListBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      loading: false,
      submissions: [],
    };

  }

  componentDidMount() {

    this.setState({ 
      loading: true 
    });

    this.props.firebase.submissions().on('value', snapshot => {

      const submissionsObject = snapshot.val();

      const submissionsList = Object.keys(submissionsObject).map(key => ({
        ...submissionsObject[key],
        uid: key,
      }));

      this.setState({
        submissions: submissionsList,
        loading: false,
      });

    });
  }

  componentWillUnmount() {
  this.props.firebase.submissions().off();
  }

  // TODO Figure out if this is where this stuff should be (I think it should) and how to access these from the child components this renders.
  // subtract = (uid, amount) => {
  //   console.log(uid);
  //   this.props.firebase.submission(uid).update({votes: amount - 1});

  //   this.props.firebase.submission(uid + '/likes').child('1kgzHcDlDJbBVppJlVXqpsgvhAa2').set({like: false})
  // }

  // netural = (uid, amount) => {
  //   this.props.firebase.submission(uid + '/likes').child('1kgzHcDlDJbBVppJlVXqpsgvhAa2').set({})
  // }

  // add = (uid, amount) => {
  //   console.log(uid);
  //   this.props.firebase.submission(uid).update({votes: amount + 1});

  //   // Create a new post reference with an auto-generated id
  //   this.props.firebase.submission(uid + '/likes/backupModel').push({user: "1kgzHcDlDJbBVppJlVXqpsgvhAa2"});

  //   // Create a new post reference with a id of the auth.user, I think this will be faster so gonna use this to.
  //   this.props.firebase.submission(uid + '/likes').child('1kgzHcDlDJbBVppJlVXqpsgvhAa2').set({like: true})
  // }

  render() {
    const { submissions, loading } = this.state;
    return (
    <div>
      {loading && <div>Loading ...</div>}
      <div className="row">

        {submissions.map(submission => (
          <FirebaseVoteItem function={this.add} name={submission.name} state={submission.state} photo={submission.photo} submission={submission} key={'extra-' + submission.uid}/> 
        ))}

        {submissions.map(submission => (
          <FirebaseVoteItem function={this.add} name={submission.name} state={submission.state} photo={submission.photo} submission={submission} key={'extra-' + submission.uid}/> 
        ))}

        {submissions.map(submission => (
          <FirebaseVoteItem function={this.add} name={submission.name} state={submission.state} photo={submission.photo} submission={submission} key={'extra-' + submission.uid}/> 
        ))}

        <div className="col-12 ">
          <div className="think-you-can-do-better">
            <h1>Think you can do better?</h1>
            <p>Submissions are open to everyone that follows the rules of submissions and is signed up with the site. Remember, winner gets thier design printed and sent to them as well as 50% of all the net-profit that it takes in on the store.</p>
          </div>
        </div>

      {/* {submissions.map(submission => (
          <div key={submission.uid} className="col-2">
            
            <div className="submission-item">
              <div className="submission-user-bar"></div>
              <div className="submission-user">Joey Giusto</div>
              <div className={"submission-photo " + submission.photo}></div>
              <div className="vote count">{submission.votes}</div>
      
              <button className="vote vote-up active" onClick={() => this.add(submission.uid, submission.votes)}>
                <i style={{width: 'auto'}} className="far fa-thumbs-up"></i>
              </button>
      
              <button className="vote vote-down" onClick={() => this.subtract(submission.uid, submission.votes)}>
                <i style={{width: 'auto'}} className="far fa-thumbs-down"></i>
              </button>
            </div>
  
            <button className="vote vote-up" onClick={() => this.netural(submission.uid, submission.votes)}>
              <i style={{width: 'auto'}} className="far fa-phone"></i>
            </button>
  
          </div>


        // <li className="submission-item-test" key={submission.uid}>
        //   <button className="vote vote-up" onClick={() => this.subtract(submission.uid, submission.votes)}>- ({submission.uid})</button>
        //     {submission.votes}
        //   <button className="vote vote-up" onClick={() => this.add(submission.uid, submission.votes)}>+ ({submission.uid})</button>
        // </li>

      ))} */}

      </div>
    </div>
    );
  }
}

class FirebaseVoteItemBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      vote: false
    };

    // TODO Search records before page load to see if user already liked this rendered submission
    // this.props.firebase.submission(0).child('likes/1kgzHcDlDJbBVppJlVXqpsgvhAa2').orderByChild('like').equalTo('true').on("value", function(snapshot) {
    //   console.log(snapshot.val());
    //   snapshot.forEach(function(data) {
    //       console.log(data.key);
    //   });
    // });

  }

  componentDidMount() {

    this.setState({ 
      vote: null
    });

    this.props.firebase.submission(0).child('likes/1kgzHcDlDJbBVppJlVXqpsgvhAa2').orderByChild('like').equalTo(true).on("value", function(snapshot) {

      console.log(snapshot.val());

      snapshot.forEach(function(data) {
          console.log(data.key);
      });

    });

  }

  tryAdd(uid, amount) {

    if (this.state.vote === true) {
      this.setState({vote: null});
      this.props.firebase.submission(uid).update({votes: amount - 1});
      this.props.firebase.submission(uid + '/likes').child('1kgzHcDlDJbBVppJlVXqpsgvhAa2').set({like: null});
    } else {
      if (this.state.vote === false) {
        this.props.firebase.submission(uid).update({votes: amount + 2});
      } else {
        this.props.firebase.submission(uid).update({votes: amount + 1});
      }
      this.props.firebase.submission(uid + '/likes').child('1kgzHcDlDJbBVppJlVXqpsgvhAa2').set({like: true});
    }    

  }

  trySubtract(uid, amount) {
    if (this.state.vote === false) {
      this.setState({vote: null});
      this.props.firebase.submission(uid).update({votes: amount + 1});
      this.props.firebase.submission(uid + '/likes').child('1kgzHcDlDJbBVppJlVXqpsgvhAa2').set({like: null});
    } else {
      if (this.state.vote === true) {
        this.props.firebase.submission(uid).update({votes: amount - 2});
      } else {
        this.props.firebase.submission(uid).update({votes: amount - 1});
      }
      this.props.firebase.submission(uid + '/likes').child('1kgzHcDlDJbBVppJlVXqpsgvhAa2').set({like: false});
    }
  }
  
  render() {

    return (
      <div  className="col-12 col-sm-4 col-md-3 col-xl-3 col-dt-1 mt-4">
          
        <div className="submission-item submission-item-override">
          
          {/* <div className="submission-user-bar"></div> */}
          <div className="submission-user">{this.props.submission.name}</div>
          <div className="submission-state">{this.props.submission.state}</div>
          <div className={"submission-photo " + this.props.submission.photo}></div>
          <div className="vote count">{this.props.submission.votes}</div>
  
          <button className={"vote vote-up " + (this.state.vote && this.state.vote != null ? 'active' : '')} onClick={() => {
            this.setState({vote: true}); 
            this.tryAdd(this.props.submission.uid, this.props.submission.votes);
          }}>
            <i style={{width: 'auto'}} className="far fa-thumbs-up"></i>
          </button>
  
          <button className={"vote vote-down " + (!this.state.vote && this.state.vote != null ? 'active' : '')} onClick={() => {
            this.setState({vote: false});
            this.trySubtract(this.props.submission.uid, this.props.submission.votes);
          }}>
            <i style={{width: 'auto'}} className="far fa-thumbs-down"></i>
          </button>

        </div>

      </div>
    )
  }

}

class SubmitBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      loading: false,
      submissions: [],
    };

  }

  render() {
    return(
      <div>
        
        <input type="text" placeholder="Title of work"/>
      </div>
    )
  }
  
}

const FirebaseVoteList = withFirebase(FirebaseVoteListBase);
const FirebaseVoteItem = withFirebase(FirebaseVoteItemBase);

export default Submissions;