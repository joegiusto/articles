import React, { Component } from 'react';
import { Helmet } from "react-helmet";
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
      <div className="submission-page">
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
                    <i className="fas fa-pencil-ruler icon"></i>
                    <div className="snippet">
                      <h5>Step One</h5>
                      <p>Create a design</p>
                    </div>
                  </div>
          
                  <div className="step two">
                    <i className="far fa-thumbs-up icon"></i>
                    <div className="snippet">
                      <h5>Step Two</h5>
                      <p>Submit design and wait for approval</p>
                      {/* <a href="">Terms</a> */}
                    </div>
                  </div>
          
                  <div className="step three">
                    <i className="fas fa-trophy icon"></i>
                    <div className="snippet">
                      <h5>Step Three</h5>
                      <p>Top voted designs creator will recieve their printed design as well as profit from sales of thier item</p>
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

                      <h1 className="month">
                        {moment().format('MMMM')} Submissions
                      </h1>
    
                      {/* <h5>Next Pick At End of Month <span className="badge badge-danger"><Countdown date={moment().startOf('month').add(1, 'months').format('YYYY-MM-DD')} /></span></h5> */}
          
    
                      <div id="filters" className="filters d-flex justify-content-between">
  
                          <div className="sorts">
                            <div className={"badge " + (this.state.filter === 'top' ? 'badge-dark' : 'badge-light')}>Top</div>
                            <div className={"badge " + (this.state.filter === 'new' ? 'badge-dark' : 'badge-light')}>New</div>
                            <div className={"badge " + (this.state.filter === 'controversial' ? 'badge-dark' : 'badge-light')}>Controversial</div>
                          </div>

                          <div className="other">
                            <span className="timer badge badge-danger"><Countdown date={moment().startOf('month').add(1, 'months').format('YYYY-MM-DD')} /></span>
                            <div className="login-notice badge badge-danger">Please login or sign up to vote</div>
                          </div>
    
                      </div>
    
                      <SubmissionsList/>
                      
                    </div>
                  } />

                  <Route path={ROUTES.STORE_SUBMISSIONS_SUBMIT} component={SubmitBase} />
                  
                </Switch>
  
              </div>
              
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
    const { loading } = this.state;
    
    return (
    <div>

      <Helmet>
        <title>Submissions - Articles</title>
      </Helmet>

      {/* {loading && <div>Loading ...</div>} */}

      <div className="submissions">

        {
          this.props.submissions?.submissions ?
          this.props.submissions?.submissions.map(submission => (
            // <div className="submission">{submission.title}</div>
            <SubmissionsItem function={this.add} name={submission.title} state={submission.state} photo={submission.preview} submission={submission} key={'extra-' + submission.uid}/> 
          ))
          :
          null
        }

        <div className="col-12 px-0">
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
      <div className="submission">

        <div className="submission-user">
          {this.props.submission.title}
        </div>
          
        <div className="submission-card">

          <div className={"submission-photo"}>
            <img src={this.props.submission.preview} alt=""/>
          </div>

          <div className="voting-bar">
            <div className="count">{ this.props.submission.votes || 0 }</div>
    
            <div className="voting-buttons">
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

          <h1 className="month">Submit a Design</h1>
          
          <div className="btn btn-articles-light">
            Download Resources
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