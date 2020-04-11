import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import axios from 'axios';
import moment from 'moment';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

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
    let self = this;
    console.log('Making changes to subscriptions');
    this.setState({ newsAllLoading: true });

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

    axios.post('/getUserSubscriptions', {
      user: this.props.firebase.auth.currentUser.uid
    })
    .then(function (response) {
      console.log(response);

      self.setState(prevState => ({
        newsUserMySQL: response.data,
      }))
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.post('/getUserDetails', {
      user: "5e90cc96579a17440c5d7d52"
    })
    .then(function (response) {
      console.log(response);

      self.setState(prevState => ({
        mongoDBuser: response.data.user,
        mongoDBsubmissions: response.data.submissions,
        mongoDBorders: response.data.orders,
        mongoDBsubscriptions: response.data.subscriptions,
        mongoDBsubscriptionsBulk: response.data.subscriptionsBulk,
      }))
    })
    .catch(function (error) {
      console.log(error);
    });

    // axios.post('/getUserSubmissions', {
    //   user: "5e90cc96579a17440c5d7d52"
    // })
    // .then(function (response) {
    //   console.log(response);
    //   console.log("Here?");

    //   self.setState(prevState => ({
    //     mongoDBsubmissions: response.data,
    //   }))
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });

    this.props.firebase.user_subscriptions(this.props.firebase.auth.currentUser.uid).once('value').then(snapshot => {
      const issuesObject = snapshot.val();
				let issuesList = [];

        function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };

        let filtered = [];

        try {
          filtered = Object.keys(issuesObject)
          // .filter(key => parseInt(key) == 1 )
          .filter(key =>  isNumber(parseInt(key)))
          .reduce((obj, key) => {
            obj[key] = issuesObject[key];
            return obj;
          }, {});
        } catch {
          console.log("User has no subscriptions!")
        }
        

        const donationList = Object.keys(filtered).map(key => ({
          ...issuesObject[key],
          uid: key,
        }
        ));

				this.setState({
          userSubs: issuesList,
          donationList,
          donationListLoaded: true
					// loading: false
        });
        
        // console.log( this.state.donationList.filter(sub => sub.uid === "2") )
    })

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

  render() {
    const {mongoDBuser, mongoDBsubmissions, mongoDBorders, mongoDBsubscriptions, mongoDBsubscriptionsBulk} = this.state;

    return(
      <div className="subscriptions-page">
        <div className="container">

          <div className="row">

            <div className="col-12 col-md-8">

              <div className="d-flex justify-content-between">
                <h1>MongoDB User Data</h1>
                <div style={{height: 'fit-content'}} className="btn btn-articles-light">Update</div>
              </div>

              <div>
                <span><b>First Name</b> (first_name)</span>
                <input 
                  className="form-control"
                  type="text"
                  value={mongoDBuser?.first_name || "No First Name"}
                />
                {/* <div className="ml-3">{mongoDBuser?.first_name || "No First Name"}</div> */}
              </div>

              <div>
                <span><b>Last Name</b> (last_name)</span>
                <input 
                  className="form-control"
                  type="text"
                  value={mongoDBuser?.last_name || "No First Name"}
                />
                {/* <div className="ml-3">{mongoDBuser?.last_name || "No Last Name"}</div> */}
              </div>

              <div>
                <div><b>Address</b></div>

                <div className="ml-3">
                  <span><b>Zip</b> (address.zip)</span>
                  <input 
                    className="form-control"
                    type="text"
                    value={mongoDBuser?.address?.zip || "No Zip"}
                  />
                  {/* <div className="ml-3">{mongoDBuser?.address?.zip || "No Zip"}</div> */}
                </div>

                <div className="ml-3 py-3">Equals</div>

                <div className="ml-3">
                  <span><b>State</b> (address.state)</span>
                  <div className="ml-3">{mongoDBuser?.address?.state || "No State"}</div>
                </div>

                <div className="ml-3">
                  <span><b>City</b> (address.city)</span>
                  <div className="ml-3">{mongoDBuser?.address?.city || "No City"}</div>
                </div>

              </div>

              <div>
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

              <div>
                <span><b>Sign Up Date</b> (sign_up_date)</span>
                <div className="ml-3">{moment.unix(mongoDBuser?.sign_up_date).format('LL') || "Loading"}</div>
              </div>

              <div>
                <span><b>Birth Date</b> (birth_date)</span>
                <div className="ml-3">{moment.unix(mongoDBuser?.birth_date).format('LL') || "Loading"}</div>
              </div>

              <div>
                <span><b>Last Online Date</b> (last_online_date)</span>
                <div className="ml-3">{moment.unix(mongoDBuser?.last_online_date).format('LL') || "Loading"}</div>
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
                      {subscription.news_category} - {subscription.news_title}
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
              <h1>All Subscriptions:</h1>
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

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(SubscribeList);

// export default SubscribeList;