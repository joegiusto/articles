import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import axios from 'axios';
import moment from 'moment';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { setUserDetails } from "../../actions/authActions";

function loadingFiller(size) {
  return(
    <div style={{width: size}} className="loading-filler">

    </div>
  )
}
class SubscribeListBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsAll: [],
      newsAllLoading: false,

      newsUser: [],
      newsUserMySQL: [],

      mongoDBuser: {},
      mongoDBsubmissions: []
    }
  }

  componentDidMount() {
    console.log("Subscribe Mounted");

    let self = this;
    console.log('Making changes to subscriptions');
    this.setState({ newsAllLoading: true });

    // Refresh for the newest info!
    this.props.setUserDetails(self.props.auth.user.id);

    axios.get('/getNews')
    .then(function (response) {

      // handle success
      console.log(response.data);

      self.setState({
        newsAll: response.data,
      });

      this.setState({ newsAllLoading: false });

    })
    .catch(function (error) {
      // handle error
      console.log(error);

      self.setState({ resultsLoading: true });
      self.setState({ resultsLoadingError: error });
    });

    // TODO - This needs to get taken out and replaced with the details of the global Redux state that gets set when user loads in.
    axios.post('/api/secure/getUserDetails', {
      user: self.props.auth.user.id
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        mongoDBuser: response.data.user,
        mongoDBsubmissions: response.data.submissions,
        mongoDBorders: response.data.orders,
        mongoDBsubscriptionsBulk: response.data.subscriptionsBulk,
      }, () => {
        // self.mergeStuff()
      })

    })
    .catch(function (error) {
      console.log("Get User Details Secure Failed");
      console.log(axios.defaults.headers.common["Authorization"])
      console.log(error);
    });

    axios.get('/getAllIssues')
    .then(function (response) {

      // handle success
      console.log(response.data);

      self.setState({
        allIssues: response.data,
      }, () => {
        // self.mergeStuff()
      });

      // this.setState({ newsAllLoading: false });

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  addSubscription(id) {
    // console.log("I should be adding this ID to the subscriptions:" + id);

    this.setState( prevState => ({
      donationList: [...prevState.donationList, {
        uid: id.toString(),
        subscribedDate: this.props.firebase.serverValue.TIMESTAMP,
        lastUserView: this.props.firebase.serverValue.TIMESTAMP
      }]
    }))

    this.props.firebase.user_subscriptions(this.props.firebase.auth.currentUser.uid).child(id).set({
      subscribedDate: this.props.firebase.serverValue.TIMESTAMP,
      lastUserView: this.props.firebase.serverValue.TIMESTAMP
    })
    
  }

  removeSubscription(id) {
    // console.log("I should be removing this ID to the subscriptions:" + id);

    this.props.firebase.user_subscription(this.props.firebase.auth.currentUser.uid, id).remove();

    this.setState({
      donationList: this.state.donationList.filter(function( obj ) {
        return obj.uid !== id.toString();
      })
    })
    
  }

  addSubscriptionNew(id) {

    this.setState(prevState => ({
      mongoDBsubscriptionsBulk: [
        ...prevState.mongoDBsubscriptionsBulk,
        id
      ]
    }))

  }

  removeSubscriptionNew(id) {

    this.setState({
      mongoDBsubscriptionsBulk: this.state.mongoDBsubscriptionsBulk.filter(function( obj ) {
        return obj._id !== id;
      })
    })

    // this.setState({
    //   mongoDBsubscriptionsBulk: this.state.mongoDBsubscriptionsBulk.concat(id)
    // })
  }

  getKeyByValue(object, value) { 
    console.log(object);
    console.log(value);
    for (var prop in object) { 
        if (object.hasOwnProperty(prop)) { 
            if (object[prop] === value) 
            return prop; 
        } 
    } 
  } 

  // Not sure why I made this, leaving it here for a little bit...
  mergeStuff() {

    if (this.state.mongoDBuser.subscriptions && this.state.allIssues) {

      // console.log( this.state.mongoDBuser.subscriptions.map((item, i) => Object.assign({}, item, this.state.allIssues[i])) );

      // let mergedArray = this.state.mongoDBuser.subscriptions.map( ( item, i ) => {

      //   if( item.news_id === this.state.allIssues[i]._id ) {
      //     // Merging two objects
      //     return Object.assign( 
      //       {}, 
      //       item,
      //       this.state.allIssues[i]
      //     )
      //   }

      // })

      console.log("This should have a .news_id for every item");
      console.log(this.state.mongoDBuser.subscriptions)

      let mergedArray = [];
      // var results = []

      this.state.mongoDBuser.subscriptions.map( ( item, i ) => {

        console.log(i)
        console.log(item)
        // console.log(this.state.allIssues[i])
        var toSearch = item.news_id;

        for(var i=0; i<this.state.allIssues.length; i++) {
          for(this.state.allIssues._id in this.state.allIssues[i]) {
            if(this.state.allIssues[i][this.state.allIssues._id].indexOf(toSearch)!=-1) {
              mergedArray.push(this.state.allIssues[i]);
            }
          }
        }


        // console.log( this.state.allIssues.filter(function (entry) { return entry._id === item.news_id; }) )
        // this.state.allIssues.filter(function (entry) { return entry._id === item.news_id; });

        // if( item.news_id === this.state.allIssues[i]._id ) {
        //   // Merging two objects
        //   return Object.assign( 
        //     {}, 
        //     item,
        //     this.state.allIssues[i]
        //   )
        // }

      })

      this.setState({
        merge: mergedArray
      })

    } else {
      console.log("Not Ready Yet!")
    }

  }

  render() {
    const {mongoDBuser, mongoDBsubmissions, mongoDBorders, allIssues, mongoDBsubscriptionsBulk, merge} = this.state;

    return(
      <div className="subscriptions-page">

        <div className="container">

          <div className="row">

            <div className="col-12 col-md-8">

              <div className="d-flex justify-content-between border-bottom align-items-center mb-2 pb-1 flex-column flex-md-row">
                <h1 className="store-heading mb-0">User Data</h1>

                <div>
                  <div onClick={this.props.logoutUser} className="btn btn-articles-light">
                    Sign Out ({this.props.auth.user.id})
                  </div>
                  <div style={{height: 'fit-content'}} className="btn btn-articles-light mt-2 mt-md-0 ml-md-2">Update</div>
                </div>
              </div>

              <div className="name-tag">

                <div className="photo-history">
                  <div className="photo">

                  </div>
                  <div className="history">
                      <div>Member Since: {mongoDBuser?.sign_up_date ? moment.unix(mongoDBuser?.sign_up_date).format('LL') : "Loading"}</div>
                      <div>Last Online: {mongoDBuser?.last_online_date ? moment.unix(mongoDBuser?.last_online_date).format('LL') : "Loading"}</div>
                  </div>
                </div>

                <div className="name">
                  <div className="row">

                    <div className="col-12 col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">First Name:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="" 
                          aria-describedby=""
                          value={mongoDBuser?.first_name || ""}
                          placeholder="Loading..."
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">Visible to everyone.</small> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Last Name:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="" 
                          aria-describedby=""
                          value={mongoDBuser?.last_name || ""}
                          placeholder="Loading..."
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">Visible to just you.</small> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">Birth Date:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="" 
                          aria-describedby=""
                          value={ mongoDBuser?.birth_date ? moment.unix(mongoDBuser?.birth_date).format('LL') : ""}
                          placeholder="Loading..."
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">Visible to just you.</small> */}
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              <div className="card mt-3">
                <div className="card-header">Address</div>

                <div className="card-body">

                  <div class="form-group">
                    <label for="exampleInputEmail1">Zip:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id=""
                      aria-describedby=""
                      value={ mongoDBuser?.address?.zip || "" }
                      placeholder="Loading..."
                    />
                    {/* <small id="emailHelp" class="form-text text-muted">Visible to just you.</small> */}
                  </div>

                  <div className="row">

                    <div className="col-12 col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">City:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="" 
                          disabled="true"
                          aria-describedby=""
                          value={ mongoDBuser?.address?.city || "" }
                          placeholder="Loading..."
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">Visible to just you.</small> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div class="form-group">
                        <label for="exampleInputEmail1">State:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="" 
                          disabled="true"
                          aria-describedby=""
                          value={ mongoDBuser?.address?.state || "" }
                          placeholder="Loading..."
                        />
                        {/* <small id="emailHelp" class="form-text text-muted">Visible to just you.</small> */}
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              <div className="card mt-3">
                <div className="card-header">Issue Subscriptions</div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-md-6">

                      <small>Yours</small>
                      {mongoDBsubscriptionsBulk ? 
                      mongoDBsubscriptionsBulk.map((issue) => (
                        <div className="sub-item unsubscribe" onClick={() => this.removeSubscriptionNew(issue._id)}>{issue.news_title}</div>
                      ))
                      :
                      null
                      }

                    </div>
                    <div className="col-12 col-md-6">

                      <small>All</small>
                      {allIssues && mongoDBsubscriptionsBulk ? 

                      allIssues.map((issue) => {
                        return (
                        <div>

                        {(this.state.mongoDBsubscriptionsBulk.filter(sub => sub._id === issue._id.toString() )).length > 0
                        ? 
                        // <button onClick={() => this.removeSubscription(issue._id)} className="btn btn-articles-light un">Unsubscribe</button>
                        <div className={"sub-item unsubscribe"} onClick={() => this.removeSubscriptionNew(issue._id)}>{issue.news_title}</div>
                        : 
                        // <button onClick={() => this.addSubscription(issue._id)} className="btn btn-articles-light">Subscribe</button>
                        <div className={"sub-item subscribe"} onClick={() => this.addSubscriptionNew(issue)}>{issue.news_title}</div>
                        }

                        </div>
                        )
                      })

                      // allIssues.map((issue) => (
                      //   console.log("Debuug shit") +
                      //   console.log(issue._id) +
                      //   <div className={"sub-item " + this.state.mongoDBsubscriptionsBulk?.filter(sub => sub._id === issue._id ).length > 0 ? 'sub-item subscribe' : 'sub-item unsubscribe' } onClick={() => this.addSubscription(issue)}>{issue.news_title}</div>
                      // ))
                      :
                      null
                      }

                    </div>
                  </div>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-header">Legal</div>

                <div className="card-body">

                  <div className="row">

                    <div className="col-12 col-md-4">
                      <div>Terms:</div>
                      <div className="version">Version: 1.0</div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" checked type="radio" name="terms" id="inlineRadio1" value="option1"/>
                        <label class="form-check-label" for="inlineRadio1">True</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="terms" id="inlineRadio2" value="option2"/>
                        <label class="form-check-label" for="inlineRadio2">False</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div>Cookies:</div>
                      <div className="version">Version: 1.0</div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" checked type="radio" name="cookies" id="inlineRadio1" value="option1"/>
                        <label class="form-check-label" for="inlineRadio1">True</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="cookies" id="inlineRadio2" value="option2"/>
                        <label class="form-check-label" for="inlineRadio2">False</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div>Privacy:</div>
                      <div className="version">Version: 1.0</div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" checked type="radio" name="privacy" id="inlineRadio1" value="option1"/>
                        <label class="form-check-label" for="inlineRadio1">True</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="privacy" id="inlineRadio2" value="option2"/>
                        <label class="form-check-label" for="inlineRadio2">False</label>
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              <div className="d-none">
                <div><b>Legal</b></div>

                <div className="ml-3">
                  <span><b>Terms</b> (legal.terms)</span>
                  <div className="ml-3">{mongoDBuser?.legal?.terms ? "True" : "False"}</div>
                </div>
                <div className="ml-3">
                  <span><b>Cookies</b> (legal.cookies)</span>
                  <div className="ml-3">{mongoDBuser?.legal?.cookies ? "True" : "False"}</div>
                </div>
                <div className="ml-3">
                  <span><b>Privacy</b> (legal.privacy)</span>
                  <div className="ml-3">{mongoDBuser?.legal?.privacy ? "True" : "False"}</div>
                </div>

              </div>

            </div>

            <div className="col-12 col-md-4 border-left">

              <div>
                <span><b>Submissions</b></span>
                <div className="subscription-list ml-3">

                  {mongoDBuser?.submissions ? 

                  mongoDBsubmissions?.map((submission) => (
                    <Link className="submission-item" to={ROUTES.STORE_SUBMISSIONS + "/" + submission._id}>
                      {submission.title}
                    </Link>
                  ))
                  :
                  'Loading'

                  }
                
                </div>
              </div>

              <div>
                <span><b>Orders</b></span>
                <div className="subscription-list ml-3">

                {mongoDBuser?.orders ? 

                  mongoDBorders?.map((order) => (
                    <Link className="submission-item" to={ROUTES.STORE_ORDERS + "/" + order._id}>
                      {moment.unix(order.order_date).format('LL')} - {order.order_title}
                    </Link>
                  ))
                  :
                  'Loading'

                }

                </div>
              </div>

              <div>
                <span><b>Subscriptions</b></span>
                <div className="subscription-list ml-3">
                  
                {mongoDBuser?.subscriptions ? 

                  mongoDBsubscriptionsBulk?.map((subscription) => (
                    <Link className="submission-item" to={ROUTES.NEWS + "/" + subscription._id}>
                      {subscription.news_type} - {subscription.news_title}
                    </Link>
                  ))
                  :
                  'Loading'

                }

                </div>
              </div>

            </div>

          </div>

          <div className="row mt-5">

            {/* <div className="col-12 text-center">
              Manage Subscriptions
            </div> */}

            <div className="col-12 col-md-6">
              <h1>Your Subscriptions:</h1>
              <div className="list">

              {this.state.donationListLoaded === true ? 
              this.state.donationList.map((news) => {
                return (
                  <div className="list-item">
                    <div className="card d-flex flex-row justify-content-between">
                      <span className="d-flex align-items-center pl-3"> 

                        {/* { console.log( this.state.newsAll.filter(obj => { return obj.issue_id === news.id }) ) } */}
                        {/* { console.log( this.getKeyByValue(this.state.newsAll, news.uid ) ) } */}
                        {/* Need a way to get the name of the news piece based on id but this needs to be done above when compoonent mounts */}

                        {news.uid}
                      </span>
                      <div>
                        <button onClick={() => this.removeSubscription(news.uid)} className="btn btn-articles-light un">Unsubscribe</button>
                      </div>
                    </div>
                  </div>
                )
              })
              : 
              'loading'
            }

              </div>
            </div>

            <div className="col-12 col-md-6">
              <h1>All News:</h1>
              <div className="list">
                
              {this.state.donationListLoaded === true ?

                this.state.newsAll.map((news) => {
                  return (
                    <div className="list-item">
                      <div className="card d-flex flex-row justify-content-between">
                        <span className="d-flex align-items-center pl-3">{news.title}: {news.news_id}</span>
                        <div>

                            {
                            (this.state.donationList.filter(sub => sub.uid === news.news_id.toString() )).length > 0
                            ? 
                            <button onClick={() => this.removeSubscription(news.news_id)} className="btn btn-articles-light un">Unsubscribe</button>
                            : 
                            <button onClick={() => this.addSubscription(news.news_id)} className="btn btn-articles-light">Subscribe</button>
                            }
                            
                     
                          {/* <button onClick={() => this.addSubscription(news.issue_id)} className="btn btn-articles-light">Subscribe</button> */}

                        </div>
                      </div>
                    </div>
                  )
                })

                :

                'Loading'
              }

              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

const SubscribeList = withFirebase(SubscribeListBase);
const condition = authUser => !!authUser;
// export default SubscribeList;

// export default compose(
//   withEmailVerification,
//   withAuthorization(condition),
// )(SubscribeList);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, setUserDetails }
)(SubscribeList);