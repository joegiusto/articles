import React, {Component} from 'react';
import { withFirebase } from '../Firebase';
import axios from 'axios';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

class SubscribeListBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsAll: [],
      newsAllLoading: false,

      newsUser: [],
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

    this.props.firebase.user_subscriptions(this.props.firebase.auth.currentUser.uid).once('value').then(snapshot => {
      const issuesObject = snapshot.val();
				let issuesList = [];

        function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) };

        const filtered = Object.keys(issuesObject)
        // .filter(key => parseInt(key) == 1 )
        .filter(key =>  isNumber(parseInt(key)))
        .reduce((obj, key) => {
          obj[key] = issuesObject[key];
          return obj;
        }, {});

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

    return(
      <div className="subscriptions-page">
        <div className="container">
          <div className="row">

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
                        <span className="d-flex align-items-center pl-3">{news.title}: {news.issue_id}</span>
                        <div>

                            {
                            (this.state.donationList.filter(sub => sub.uid === news.issue_id.toString() )).length > 0
                            ? 
                            <button onClick={() => this.removeSubscription(news.issue_id)} className="btn btn-articles-light un">Unsubscribe</button>
                            : 
                            <button onClick={() => this.addSubscription(news.issue_id)} className="btn btn-articles-light">Subscribe</button>
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