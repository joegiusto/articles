import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { compose } from 'recompose';
// import { withAuthorizationHide } from '../Session';
import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';
import { Switch, Route, Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import moment from 'moment';
// import SubmissionItem from './SubmissionItem';

class Submissions extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      filter: 'top',
      scrollHeightPERCENT: 0,
      scrollHeightPX: 0,
      filterBarLocation: 0
    };
  }

  componentDidMount() {
    // window.addEventListener('scroll', this.listenToScroll);
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.listenToScroll);
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  
    const scrolled = winScroll / height
  
    this.setState({
      scrollHeightPERCENT: scrolled,
      scrollHeightPX: winScroll,
      filterBarLocation: document.getElementById("filters").offsetTop || 0
    })

  }

  render() {
    return (
      <div className='container-fluid'>

        <div className="row my-auto justify-content-between">

          <div className="col-12 col-md-3 pl-md-0 col-side-panel">

            <div className="submission-side-panel">

              <div className="top">
                <h1 className="submission-side-panel_title">Submission Area</h1>
                <p className="submission-side-panel_slogan">Here artist and individuals can submit clothing ideas of thier own to have a chance to be voted on and picked to go in our shop. Artist will recieve 50% of net profit for the sales of their design.</p>
              </div>
      
              <div className="steps">
                <div className="step one">
                  <i className="fas fa-pencil-ruler"></i>
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
                  <i className="fas fa-trophy"></i>
                  <div>
                    <h5>Step Three</h5>
                    <p>Users will vote on designs, top design gets thier item added to the store for a month, thier submission mailed to them, and recieve a percent of the profit from thier items sales.</p>
                  </div>
                </div>
              </div>

              <div className="fill"></div>
              
              <Switch>
                <Route exact path={ROUTES.STORE_SUBMISSIONS} render={() =>
                  <Link to={ROUTES.STORE_SUBMISSIONS_SUBMIT}><button className="submission-side-panel_submit btn btn-dark w-100 mt-3">Submit a Design <i className="fas fa-mouse-pointer ml-2"></i></button></Link>
                } />
                <Route exact path={ROUTES.STORE_SUBMISSIONS_SUBMIT} render={() =>
                  <Link to={ROUTES.STORE_SUBMISSIONS}><button className="submission-side-panel_submit btn btn-dark w-100 mt-3">View Designs <i className="fas fa-mouse-pointer ml-2"></i></button></Link>
                } />
              </Switch>
              
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
      
                  {/* <p>Sort by <a href="#">Top</a> <a href="#">New</a> <a href="#">Controversial</a></p> */}

                  <div className={this.state.filterBarLocation > 117 ? 'filter-blur' : ''}></div>

                  <div id="filters" className="filters d-flex justify-content-between">

                    <div className="badges">

                      <div className="top">
                        <div className={"badge " + (this.state.filter === 'new' ? 'badge-dark' : 'badge-light')}>New</div>
                        {/* TODO Hold off on this one for now! */}
                        {/* <div className="badge badge-light">Controversial</div> */}
                        <div className={"badge " + (this.state.filter === 'top' ? 'badge-dark' : 'badge-light')}>Top (Month)</div>
                      </div>

                    </div>

                    <div>
                      <div className="badge badge-danger login-warning">Please login or sign up to vote</div>
                    </div>

                  </div>

                  {/* <div className="login-alert alert alert-danger w-100">
                    <div className="d-flex align-items-center justify-content-between">
                      <span>Please login or create an account with us to vote.</span>
                      <button className="btn btn-articles-light">Log In</button>
                    </div>
                  </div> */}

                  <SubmissionsList/>
                </div>
              } />
              <Route path={ROUTES.STORE_SUBMISSIONS_SUBMIT} component={SubmitBase} />
              </Switch>

            </div>
            
          </div>

        </div>

      </div>
    )
  }
}

class SubmissionsListBase extends Component {
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
  }

  componentWillUnmount() {
    // this.props.firebase.submissions().off();
  }

  render() {
    const { submissions, loading } = this.state;
    
    return (
    <div>
      {loading && <div>Loading ...</div>}
      <div className="row">

        {
          this.props.submissions?.submissions ?
          this.props.submissions?.submissions.map(submission => (
            // <div className="submission">{submission.title}</div>
            <SubmissionsItem function={this.add} name={submission.title} state={submission.state} photo={submission.preview} submission={submission} key={'extra-' + submission.uid}/> 
          ))
          :
          null
        }

        {submissions.map(submission => (
          <SubmissionsItem function={this.add} name={submission.name} state={submission.state} submission={submission} key={'extra-' + submission.uid}/> 
        ))}

        {submissions.map(submission => (
          <SubmissionsItem function={this.add} name={submission.name} state={submission.state} submission={submission} key={'extra-' + submission.uid}/> 
        ))}

        {submissions.map(submission => (
          <SubmissionsItem function={this.add} name={submission.name} state={submission.state} submission={submission} key={'extra-' + submission.uid}/> 
        ))}

        <div className="col-12 ">
          <div className="think-you-can-do-better">
            <h1>Think you can do better?</h1>
            <p>Submissions are open to everyone that follows the rules of submissions and is signed up with the site. Remember, winner gets thier design printed and sent to them as well as 50% of all the net-profit that it takes in on the store.</p>
          </div>
        </div>

      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.auth.user_details?.user?.first_name)
  return {
    submissions: state.submissions
  };
};

const SubmissionsList = connect(mapStateToProps)(SubmissionsListBase);

class SubmissionsItemBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      vote: false
    };

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
      <div  className="col-12 col-sm-4 col-md-3 col-xl-2 mt-4">
          
        <div className="submission-item">

          <div className="submission-user">{this.props.submission.title}</div>

          {/* Take this out for now */}
          {/* <div className="submission-state">{this.props.submission.state}</div> */}

          <div className={"submission-photo"}>
            <img src={this.props.submission.preview} alt=""/>
          </div>

          <div className="voting-bar">
            <div className="vote count">{this.props.submission.votes || 0}</div>
    
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
        <div className="submit">
          <h1>Submit a Design</h1>
          
          <div className="card">

            <div className="">Design Resources availbe to assist you with creating your mock ups</div>

            <div>
              <div className="btn btn-articles-light">
                Download
              </div>
            </div>

          </div>

          <div className="builder">

            <div className="preview">
              <div className="box"></div>
              <div className="thumbnails">
                <div className="thumbnail">
                  <div className="main badge badge-light border">Main</div>
                </div>
                <div className="thumbnail">

                </div>
                <div className="thumbnail">

                </div>
                <div className="thumbnail">

                </div>
                <div className="thumbnail">

                </div>
                <div className="thumbnail">

                </div>
              </div>
            </div>

            <div className="form">

              <div className="form-group">
                <input className="mb-1" type="text" placeholder="Title of Work"/>
              </div>
              
              <textarea name="" id="" cols="30" rows="10" placeholder="Inspiration or description of design..."></textarea>
              

              <h5 className="mt-2">Card Style</h5>
              <div className="style">
                <div className="badge badge-dark">Style One</div>
                <div className="badge badge-light border ml-1">Style Two</div>
                <div className="badge badge-light border ml-1">Style Three</div>
                <div className="badge badge-light border">Style Four</div>
              </div>

              <h5 className="mt-2">Card Color</h5>
              <div className="style">
                <div className="badge badge-light border">Color One</div>
                <div className="badge badge-light border ml-1">Color Two</div>
              </div>

            </div>

          </div>

        </div>

        

        

      </div>
    )
  }
  
}

const SubmissionsItem = withFirebase(SubmissionsItemBase);

export default Submissions;