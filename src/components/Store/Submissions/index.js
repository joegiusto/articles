import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import axios from 'axios'
// import { connect } from 'react-redux';
// import { compose } from 'recompose';
import * as ROUTES from '../../../constants/routes';
import { Switch, Route, Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import moment from 'moment';

import SubmissionItemNew from './SubmissionItemNew'
// import SubmissionItem from './SubmissionItem';

class Submissions extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      canSubmit: false,
      filter: 'top',
      scrollHeightPERCENT: 0,
      scrollHeightPX: 0,
      filterBarLocation: 0,
      submission: {},
      showSortHelperText: false
    };

    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    const self = this;
    // window.addEventListener('scroll', this.listenToScroll);
    axios
    .post("/api/getCanSubmit", {
      user_id: this.props.user_id
    })
    .then( res => {

      console.log(res)
      self.setState({
        submission: { ...res.data[0] }
      })

      if ( res.data.length === 1 || res.data.length > 1) {

        // console.log('wtf')

        self.setState({
          canSubmit: false
        })
      } else {
        self.setState({
          canSubmit: true
        })
      }
      
    }
    ) 
    .catch(err =>
      console.log(err.response.data)
    );
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.listenToScroll);
  }

  showSortHelperText() {
    const self = this;

    console.log("This ran");

    this.setState({
      showSortHelperText: true
    })

    setTimeout(function(){ 
      self.setState({
        showSortHelperText: false
      }) 
    }, 1500);
  }

  validate() {
    this.setState({
      canSubmit: true
    })
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

        <div className="side-menu-one">

          {/* <div className="background"></div> */}

          <div className="sticky-content">

            <div className="background-container">
              <div className="background"></div>
            </div>

            <div className="top">

              <div className="logo">
                <i className="fas fa-lightbulb"></i>
              </div>

              <div className="time">

                <div className="label">Time Left</div>
                <Countdown date={moment().startOf('month').add(3, 'months').format('YYYY-MM-DD')} />
                <div className="date">{moment().startOf('month').add(3, 'months').subtract(1, 'days').format('LL')}</div>

              </div>

            </div>

            <div className="title">Submissions</div>
            <p>User submited content that gets voted on for a chance to win money and get sold on our store!</p>

            <div className="grow"></div>

            <div className="tiles">

            <div className="info">Current Period Info</div>

            <div className="tile">
              <div className="label">Submited</div>
              <div className="square">{this.props.submissions?.submissions.length}</div>
            </div>

            <div className="tile">
              <div className="label">Voters</div>
              <div className="square">1</div>
            </div>

            <div className="tile">
              <div className="label">Votes Cast</div>
              <div className="square">1</div>
            </div>

            <div className="tile">
              <div className="label">Earned By Users</div>
              <div className="square">$0.00</div>
            </div>

            </div>

            <div className="grow"></div>

            {/* <div className="btn btn-articles-light">Submit A Design</div> */}

            <Switch>
            <Route exact path={ROUTES.STORE_SUBMISSIONS} render={() =>
              <Link to={ROUTES.STORE_SUBMISSIONS_SUBMIT}><button className="submission-side-panel_submit btn btn-dark w-100 mt-3">Submit a Design <i className="fas fa-mouse-pointer ml-2"></i></button></Link>
            } />
            <Route exact path={ROUTES.STORE_SUBMISSIONS_SUBMIT} render={() =>
              <Link to={ROUTES.STORE_SUBMISSIONS}><button className="submission-side-panel_submit btn btn-dark w-100 mt-3">View Designs <i className="fas fa-mouse-pointer ml-2"></i></button></Link>
            } />
            </Switch>

          {/* End of Sticky Content */}
          </div> 

        {/* End of Side Menu */}
        </div>

        <div className='container-fluid'>
  
          <div className="row my-auto justify-content-between">

            <div className="d-none col-12 col-md-3 pl-md-0 col-side-panel">
  
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
  
            <div className="col-12 col-md-12">
  
              <div>
                
                <Switch>

                  <Route exact path={ROUTES.STORE_SUBMISSIONS} render={() =>
                    <div className="listings">

                      <h1 className="month text-center">
                        {moment().format('MMMM')} - {moment().add(2, 'months').format('MMMM')} Submissions
                      </h1>
    
                      {/* <h5>Next Pick At End of Month <span className="badge badge-danger"><Countdown date={moment().startOf('month').add(1, 'months').format('YYYY-MM-DD')} /></span></h5> */}
    
                      <div id="filters" className="filters d-flex justify-content-between">
  
                          <div className="sorts">
                            <div onClick={() => this.showSortHelperText() + this.setState({filter: 'top'})} className={"badge " + (this.state.filter === 'top' ? 'badge-dark' : 'badge-light')}>Top</div>
                            <div onClick={() => this.showSortHelperText() + this.setState({filter: 'new'})} className={"badge " + (this.state.filter === 'new' ? 'badge-dark' : 'badge-light')}>New</div>
                            <div onClick={() => this.showSortHelperText() + this.setState({filter: 'controversial'})} className={"badge " + (this.state.filter === 'controversial' ? 'badge-dark' : 'badge-light')}>Controversial</div>
                          </div>

                          <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text"/>
                            <div className="btn btn-articles-light py-0">Search</div>
                          </div>


                          {/* <div className="other"> */}
                            <span className="timer badge badge-danger"><Countdown date={moment().startOf('month').add(3, 'months').format('YYYY-MM-DD')} /></span>
                            {this.props.isAuth ? null : <div className="login-notice badge badge-danger">Please login or sign up to vote</div>}
                          {/* </div> */}

                          {/* <div className="helper-text"> */}
                            <div className={"sort-helper-text " + (this.state.showSortHelperText && this.state.filter === 'top' ? 'fade ' : '') + (this.state.filter !== 'top' ? '' : '')}>{this.state.filter === 'top' ? 'Viewing submissions with the most likes' : ''}</div>
                            <div className={"sort-helper-text " + (this.state.showSortHelperText && this.state.filter === 'new' ? 'fade ' : '') + (this.state.filter !== 'new' ? '' : '')}>{this.state.filter === 'new' ? 'Viewing submissions newest to oldest' : ''}</div>
                            <div className={"sort-helper-text " + (this.state.showSortHelperText && this.state.filter === 'controversial' ? 'fade ' : '') + (this.state.filter !== 'controversial' ? '' : '')}>{this.state.filter === 'controversial' ? 'Viewing submissions with similar like to dislike ratios' : ''}</div>
                          {/* </div> */}
    
                      </div>
    
                      <SubmissionsList/>
                      
                    </div>
                  } />

                  <Route path={ROUTES.STORE_SUBMISSIONS_SUBMIT} render={() => 
                    <SubmitBase canSubmit={this.state.canSubmit} validate={this.validate} submission={this.state.submission}/>
                  }/>
                  
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

  }

  render() {
    const { loading } = this.state;
    
    return (
    <div>

      <Helmet>
        <title>Submissions - Articles</title>
      </Helmet>

      {/* {loading && <div>Loading ...</div>} */}

      <div className="submissions-new">

        <SubmissionItemNew/>

        {[1,2,3,4,5,6,7,8].map((obj, i) => <SubmissionItemNew/>)}

      </div>

      <div className="submissions">

        {
          this.props.submissions?.submissions ?
          this.props.submissions?.submissions.map(submission => (
            // <div className="submission">{submission.title}</div>
            <SubmissionsItem user_id={this.props.user_id} submission={submission} key={'extra-' + submission._id}/> 
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
    submissions: state.submissions,
    user: state.auth?.user_details,
    user_id: state.auth?.user?.id,
    isAuth: state.auth.isAuthenticated
  };
};

const SubmissionsList = connect(mapStateToProps)(SubmissionsListBase);

// const src = 'https://images.unsplash.com/photo-1444065381814-865dc9da92c0'

class SubmissionsItemBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      localCountDown: props.submission.down.length || 0,
      localCountUp: props.submission.up.length || 0,
      vote: null,
      backgroundImage: `url(${this.props.submission.preview})`,
      backgroundPosition: '0% 0%',
      src: this.props.submission.preview
    };

  }

  componentDidMount() {
    console.log(`This is the up array ${this.props.submission.up.length}`)
    const self = this;

    if (this.props.submission["up"] !== undefined) {

      if (this.props.submission.up.indexOf(this.props.user_id) > -1) {
        self.setState({
          vote: true,
          localCountUp: this.state.localCountUp + 1
        }) 
      }

    } 

    if (this.props.submission["down"] !== undefined) {

      if (this.props.submission.down.indexOf(this.props.user_id) > -1) {
        self.setState({
          vote: false,
          localCountDown: this.state.localCountDown + 1
        }) 
      }

    }

  }

  tryAdd(uid, amount) {
    const self = this;

    if (this.state.vote === true) {
      
      axios
      .post("/api/tryVote", {
        user_id: this.props.user_id,
        submission_id: this.props.submission._id,
        type: 'null'
      })
      .then( res => {

        self.setState({
          vote: null
        })
        
      }) 
      .catch(err =>
        console.log(err.response.data)
      );
      
    } else {
      // this.setState({vote: true});

      axios
      .post("/api/tryVote", {
        user_id: this.props.user_id,
        submission_id: this.props.submission._id,
        type: 'up'
      })
      .then( res => {

        self.setState({
          vote: true
        })
        
      }) 
      .catch(err =>
        console.log(err.response.data)
      );

    }   
    
  }

  trySubtract(uid, amount) {
    const self = this;

    if (this.state.vote === false) {
      // this.setState({vote: null});

      axios
      .post("/api/tryVote", {
        user_id: this.props.user_id,
        submission_id: this.props.submission._id,
        type: 'null'
      })
      .then( res => {

        self.setState({
          vote: null
        })
        
      }) 
      .catch(err =>
        console.log(err.response.data)
      );

    } else {
      // this.setState({vote: false});

      axios
      .post("/api/tryVote", {
        user_id: this.props.user_id,
        submission_id: this.props.submission._id,
        type: 'down'
      })
      .then( res => {

        self.setState({
          vote: false
        })
        
      }) 
      .catch(err =>
        console.log(err.response.data)
      );

    } 
  }

  handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()

    console.log( e )

    console.log( e.pageY )
    console.log( top )
    console.log(window.pageYOffset || document.documentElement.scrollTop)

    const x = (e.pageX - left) / width * 100
    const y = (e.pageY - top - (window.pageYOffset || document.documentElement.scrollTop) ) / height * 100

    this.setState({ backgroundPosition: `${x}% ${y}%` })
  }
  
  render() {

    return (
      <div className="submission">

        <div className="submission-title">
          {this.props.submission.title}
        </div>
          
        <div className="submission-card">

          {/* <div className={"submission-photo"}>
            <img src={this.props.submission.preview} alt=""/>
          </div> */}

          <div className="submission-photo-zoom">
            <figure onMouseMove={this.handleMouseMove} style={this.state}>
              <img src={this.state.src} alt=""/>
            </figure>
          </div>

          <div className="voting-bar">
            <div className="count">{ this.state.localCountDown - (this.state.vote === false ? 1 : 0) } / { this.state.localCountUp - (this.state.vote === true ? 1 : 0)} </div>
    
            <div className="voting-buttons">
              
              <button className={"vote vote-down " + (!this.state.vote && this.state.vote != null ? 'active' : '')} onClick={() => {
                this.setState({vote: false});
                this.trySubtract(this.props.submission.uid, this.props.submission.votes);
              }}>
                <i style={{width: 'auto'}} className="far fa-thumbs-down"></i>
              </button>
              
              <button className={"vote vote-up " + (this.state.vote && this.state.vote != null ? 'active' : '')} onClick={() => {
                this.setState({vote: true}); 
                this.tryAdd(this.props.submission.uid, this.props.submission.votes);
              }}>
                <i style={{width: 'auto'}} className="far fa-thumbs-up"></i>
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
      canSubmit: props.canSubmit,
      loading: false,
      submission: {},
    };

  }

  render(props) {

    const {submission} = this.props

    return(
      <div className="submissions-submit-page">

        {/* {this.props.canSubmit ?  */}

        <div className="submit submit-page">

          <h1 className="month">Submit a Design</h1>
          <p>To get started download our template to work with when making your design</p>
          
          <div className="btn btn-articles-light">
            Download Resources
          </div>

          <div className="builder">

            <div className="preview">

              <div className="box"></div>

              <div className="thumbnails">

                <div className="thumbnail">
                  <div className="main badge badge-light border">Main</div>
                  <i className="fas fa-upload"></i>
                </div>

                <div className="thumbnail">
                  <i className="fas fa-upload"></i>
                </div>

                <div className="thumbnail">
                  <i className="fas fa-upload"></i>
                </div>

                <div className="thumbnail">
                  <i className="fas fa-upload"></i>
                </div>

                <div className="thumbnail">
                  <i className="fas fa-upload"></i>
                </div>

                <div className="thumbnail">
                  <i className="fas fa-upload"></i>
                </div>

              </div>

            </div>

            <div className="form">

              <div className="input-group">
                <input className="mb-1" type="text" placeholder="Title of Work"/>
              </div>

              <div className="form-group">
                <label for="exampleInputEmail1">Title Of Work</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
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

        {/* : */}

        <div className="view-submit">
          <h1>You have already submitted a design</h1>
          <div className="badge badge-articles">Submitted On: {moment().format("LL")}</div>
          <div className="badge badge-articles mt-2">Period Ends:<Countdown date={moment().startOf('month').add(1, 'months').format('YYYY-MM-DD')} /></div>

          <div className="details mt-2">
            <div className="label">Title:</div>
            <div className="title">{submission.title}</div>
            <div className="label">Description / Inspiraton:</div>
            <div className="description">{submission.description}</div>
          </div>

          <div className="label">Photos:</div>
          <div className="photos mt-2">
            <div className="photo">
              <div className="main">Main Photo</div>
              <img src={submission.photos?.one} alt=""/>
            </div>
            <div className="photo">
              <img src={submission.photos?.two} alt=""/>
            </div>
            <div className="photo">
             <img src={submission.photos?.three} alt=""/>
            </div>
            <div className="photo">
              <img src={submission.photos?.four} alt=""/>
            </div>
            <div className="photo">
              <img src={submission.photos?.five} alt=""/>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="label">Actions:</div>
            <div onClick={() => this.props.validate()} className="btn btn-danger delete">Delete</div>
            <button className="btn btn-articles-light ml-2">Request Edit</button>
          </div>

          <div className="mt-2 details">
            You may delete your design at any time but we limit you to two post per submisison period. By deleteing this post you will only have the chance to submit one more time. If there is a error in your post request an edit and we will assist you.
          </div>

        </div>

        {/* } */}

      </div>
    )
  }
  
}

const SubmissionsItem = SubmissionsItemBase;

// export default Submissions;


// const mapStateToProps = (state) => {
//   return {
//     user: state.auth?.user_details,
//     user_id: state.auth?.user?.id,
//   };
// };

export default connect(
  mapStateToProps,
)(Submissions);