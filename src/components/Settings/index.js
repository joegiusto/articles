import React, {Component} from 'react';
import { Helmet } from "react-helmet";
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import axios from 'axios';
import moment from 'moment';
// import { compose } from 'recompose';
// import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import { setUserDetails } from "../../actions/authActions";
class SubscribeListBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newsAll: [],
      newsAllLoading: false,
      updatingUserDetails: false,

      newsUser: [],
      newsUserMySQL: [],

      nameExpanded: false,
      genderExpanded: false,

      mongoDBuser: {
        first_name: this.props.user_details?.first_name || '',
        last_name: this.props.user_details?.last_name || '',

        birth_date: this.props.user_details?.birth_date || '',
        sign_up_date: this.props.user_details?.sign_up_date || '',
        last_online_date: this.props.user_details?.last_online_date || '',

        photo_url: this.props.user_details?.photo_url || '',

        address: {
          zip: this.props.user_details?.address?.zip || '',
          city: this.props.user_details?.address?.city || '',
          state: this.props.user_details?.address?.state || '',
        },

        submissions: this.props.user_details?.submissions || [],
        submissionsFetched: this.props.user_details?.submissionsFetched || [],
        orders: this.props.user_details?.orders || [],
        ordersFetched: this.props.user_details?.ordersFetched || [],
        subscriptions: this.props.user_details?.subscriptions || [],
        subscriptionsFetched: this.props.user_details?.subscriptionsFetched || []
      },
      
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.onChangeProfile = this.onChangeProfile.bind(this);

    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    console.log("Subscribe Mounted");

    let self = this;
    console.log('Making changes to subscriptions');
    // this.setState({ newsAllLoading: true });

    // Refresh for the newest info!
    this.props.setUserDetails(self.props.auth.user.id);

    axios.get('/api/getIssues')
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

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleUserChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      mongoDBuser: {
        ...prevState.mongoDBuser,
        [name]: value
      }
    }));
  }

  handleAddressChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      mongoDBuser: {
        ...prevState.mongoDBuser,
        address: {
          ...prevState.mongoDBuser.address,
          [name]: value
        }
      }
    }));
  }

  addSubscriptionNew(issue) {

    this.setState(prevState => ({

      // mongoDBsubscriptionsBulk: [
      //   ...prevState.mongoDBsubscriptionsBulk,
      //   issue
      // ],
      mongoDBuser: {
        ...prevState.mongoDBuser,

        subscriptions: [
          ...prevState.mongoDBuser.subscriptions,
          {
            news_id: issue._id
          }
        ],

        subscriptionsFetched: [
          ...prevState.mongoDBuser.subscriptionsFetched,
          issue
        ]

      }

    }))

  }

  removeSubscriptionNew(id) {
    console.log(id);

    this.setState(prevState => ({
      // mongoDBsubscriptionsBulk: this.state.mongoDBsubscriptionsBulk.filter(function( obj ) {
      //   return obj._id !== id;
      // }),
      mongoDBuser: {
        ...prevState.mongoDBuser,
        
        subscriptions: this.state.mongoDBuser.subscriptions.filter(function( obj ) {
          return obj.news_id !== id;
        }),

        subscriptionsFetched: this.state.mongoDBuser.subscriptionsFetched.filter(function( obj ) {
          return obj._id !== id;
        })
      }
    }))

    // this.setState({
    //   mongoDBsubscriptionsBulk: this.state.mongoDBsubscriptionsBulk.concat(id)
    // })
  }

  updateUser() {
    const self = this;
    console.log("UPDATE!");

    this.setState({
      updatingUserDetails: true
    })

    axios.post('/api/secure/updateUserDetails', {
      user: self.props.auth.user.id,
      user_details: {
        first_name: this.state.mongoDBuser.first_name,
        last_name: this.state.mongoDBuser.last_name,
        photo_url: this.state.mongoDBuser.photo_url,
        address: {
          zip: this.state.mongoDBuser.address.zip,
        },
        subscriptions: this.state.mongoDBuser.subscriptions,
      }
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        updatingUserDetails: false,
      }, () => {
        // self.mergeStuff()
      })

      self.props.setUserDetails(self.props.auth.user.id);

    })
    .catch(function (error) {
      console.log(error);
    });
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

      console.log("This should have a .news_id for every item");
      console.log(this.state.mongoDBuser.subscriptions)

      let mergedArray = [];

      this.state.mongoDBuser.subscriptions.map( ( item, i ) => {

        console.log(i)
        console.log(item)

        var toSearch = item.news_id;

        for(var i=0; i<this.state.allIssues.length; i++) {
          for(this.state.allIssues._id in this.state.allIssues[i]) {
            if(this.state.allIssues[i][this.state.allIssues._id].indexOf(toSearch)!=-1) {
              mergedArray.push(this.state.allIssues[i]);
            }
          }
        }

      })

      this.setState({
        merge: mergedArray
      })

    } else {
      console.log("Not Ready Yet!")
    }

  }

  onChangeProfile(e) {
    console.log(e.target.files);
    const data = new FormData();

    this.setState({
      file: e.target.files[0],
      newProfilePhotoLoading: true,
    }, 
      () => {
        data.append('file', this.state.file);
        data.append('user', this.props.user_id);
        
        axios.post("/api/addProfilePhoto", data, { // receive two parameter endpoint url ,form data 
        
        })
        .then(res => { // then print response status
          console.log(res.statusText)
          this.setState({
            newProfilePhotoLoading: false,
            // photos: [...this.state.photos, 'profile_photos/' + this.props.user_id + '.' + this.state.file.name.split('.')[1]],
            fakeImageHash: this.state.fakeImageHash + 1
          })
        })
      }
    )

  }

  render() {
    const {mongoDBuser, mongoDBsubmissions, mongoDBorders, allIssues, mongoDBsubscriptionsBulk, merge} = this.state;

    return(
      <div className="subscriptions-page">

        <Helmet>
          <title>Settings - Articles</title>
        </Helmet>

        {/* <div className="background-image">
          <img src="https://cdn.cheapism.com/images/Where_You_Live_or_Work.2e16d0ba.fill-1440x605.png" alt=""/>
        </div> */}

        <div className="container">

          <div className="top">
            <div className="title">Personal Info</div>
            <div className="text">Basic info, like your name and photo, that you use on Articles</div>
          </div>

          <div className="card settings-card mt-5">

            <div className="card-header">
              <h5>Profile</h5>
              <p>Some info may be visible to others</p>
            </div>

            <div className="card-body">

              <div className="info-snippet">
                <div className="label">EMAIL</div>
                <div className="info">
                  {this.props.user_details.email}
                  <div className="email-note">
                    Submit a request to get your email changed
                  </div>
                </div>
                <div className="arrow"><i class="far fa-hand-point-right"></i></div>
              </div>

              <div className="info-snippet">

                <div className="label">PHOTO</div>

                <div className="info">
                  <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props.auth.user.id}.jpg`} alt=""/>
                </div>

                <div className="arrow"><i class="far fa-hand-point-right"></i></div>

                <input className="profile-photo" onChange={this.onChangeProfile} accept=".jpg" type="file" name="myfile" />

              </div>

              <div className="info-snippet noselect" onClick={() => 
                this.state.nameExpanded ?
                null
                :
                this.setState({
                  nameExpanded: !this.state.nameExpanded
                })
              }>
                <div className="label">NAME</div>

                <div className={"info"}>

                  <div className={"detail-view " + (this.state.nameExpanded ? 'd-none' : '')}>
                    {this.props.user_details.first_name} {this.props.user_details.last_name}
                  </div>

                  <div className={"expand-view " + (this.state.nameExpanded ? '' : 'd-none')}>
  

                    <div>CHANGE NAME</div>
                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <input className="d-block" value={mongoDBuser.first_name} type="text"/>

                    <input className="d-block mt-2" value={mongoDBuser.last_name} type="text"/>

                    <div className="actions mt-2">
                      <div onClick={() => this.setState({
                        nameExpanded: false
                      })} className="btn btn-articles-light">Cancel</div>
                      <div onClick={() => this.setState({
                        nameExpanded: false
                      })} className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>

                </div>

                <div className="arrow"><i className={"far fa-hand-point-right " + (this.state.nameExpanded? 'fa-rotate-90' : '')}></i></div>

              </div>

              <div className="info-snippet">
                <div className="label">BIRTHDAY</div>
                <div className="info">
                {moment(this.props.user_details.birth_date).format("LL")}
                </div>
                <div className="arrow"><i class="far fa-hand-point-right"></i></div>
              </div>

              <div className="info-snippet">
                <div className="label">ADDRESS</div>
                <div className="info">{`
                ${this.props.user_details.address.city},  
                ${this.props.user_details.address.state} | 
                ${this.props.user_details.address.zip}
                `}
                </div>
                <div className="arrow"><i class="far fa-hand-point-right"></i></div>
              </div>

              <div className="info-snippet" onClick={() => 
                this.state.genderExpanded ?
                null
                :
                this.setState({
                  genderExpanded: !this.state.genderExpanded
                })
              }>
                <div className="label">GENDER</div>

                <div className="info">

                  <div className={"detail-view " + (this.state.genderExpanded ? 'd-none' : '')}>
                    {this.props.user_details.gender}
                  </div>

                  <div className={"expand-view " + (this.state.genderExpanded ? '' : 'd-none')}>

                    <div>CHANGE GENDER</div>
                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <input className="d-block" value={mongoDBuser.gender} type="text"/>
                    <div className="badge badge-lg badge-articles mr-2">Male</div>
                    <div className="badge badge-lg badge-light border mr-2">Female</div>
                    <div className="badge badge-lg badge-light border mr-2">Non</div>

                    <div className="actions mt-2">
                      <div onClick={() => this.setState({
                        genderExpanded: false
                      })} className="btn btn-articles-light">Cancel</div>
                      <div onClick={() => this.setState({
                        genderExpanded: false
                      })} className="btn btn-articles-light ml-2">Save</div>
                    </div>

                  </div>

                </div>

                

                <div className="arrow"><i class="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet" onClick={() => 
                this.state.passwordExpanded ?
                null
                :
                this.setState({
                  passwordExpanded: !this.state.passwordExpanded
                })
              }>

                <div className="label">PASSWORD</div>

                <div className="info">
                  

                  <div className={"detail-view " + (this.state.passwordExpanded ? 'd-none' : '')}>
                    ***********
                    <div className="last-changed">Last Changed {moment(this.props.user_details.password_last_change).format("LLL") || 'Never'}</div>
                  </div>

                  <div className={"expand-view " + (this.state.passwordExpanded ? '' : 'd-none')}>
  
                    <div>CHANGE PASSWORD</div>
                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <input className="d-block" value={mongoDBuser.passwordExpanded} type="text"/>

                    <div className="actions mt-2">
                      <div onClick={() => this.setState({
                    passwordExpanded: false
                      })} className="btn btn-articles-light">Cancel</div>
                      <div onClick={() => this.setState({
                    passwordExpanded: false
                      })} className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>

                </div>

                <div className="arrow"><i class="far fa-hand-point-right"></i></div>

              </div>

            </div>

          </div>

          <div className="card settings-card mt-4">

            <div className="card-header">
              <h5>Subscriptions</h5>
              <p>Some info may be visible to others</p>
            </div>

            <div className="card-body">

              <div className="info-snippet">

                <div className="label">ISSUES</div>

                <div className="info">
                  {this.props.user_details.subscriptionsFetched.length} Subscriptions
                </div>

                <div className="arrow"><i class="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet">

                <div className="label">TAGS</div>

                <div className="info">
                  0 Followed
                </div>

                <div className="arrow"><i class="far fa-hand-point-right"></i></div>

              </div>

            </div>

          </div>

          <div className="card settings-card mt-4">

            <div className="card-header">
              <h5>Experimental Features</h5>
              <p>Try out and help us test features that are not released to the public yet.</p>
            </div>

            <div className="card-body">

              <div className="info-snippet">

                <div className="label">NIGHT MODE</div>

                <div className="info">
                  <div className="enabled-dot"></div>Enabled
                </div>

                <div className="arrow"><i class="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet">

                <div className="label">MESSAGES / MAIL</div>

                <div className="info">
                  <div className="enabled-dot"></div>Enabled
                </div>

                <div className="arrow"><i class="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet">

                <div className="label">MESH</div>

                <div className="info">
                  <div className="disabled-dot"></div>Disabled
                </div>

                <div className="arrow"><i class="far fa-hand-point-right"></i></div>

              </div>

            </div>

          </div>

          <div className="links">
            <Link to={ROUTES.SETTINGS}><div className="btn btn-articles-light">Request Data</div></Link>
            <Link to={ROUTES.SETTINGS}><div className="btn btn-danger">Delete Account</div></Link>
          </div>

          <div className="row">

            <div className="col-12 col-md-8">

              <div className="d-flex justify-content-between border-bottom align-items-md-center mb-2 pb-1 flex-column flex-md-row">

                <h1 className="mb-0">Personal Info</h1>

                <div>

                  <div onClick={this.props.logoutUser} className="btn btn-articles-light">
                    Sign Out
                  </div>

                  <div onClick={this.updateUser} style={{height: 'fit-content'}} className="btn btn-articles-light mt-md-0 ml-2">Update</div>

                </div>

              </div>

              <div className="name-tag">

                <div className="photo-history">

                  <div className="photo">
                    <img src={mongoDBuser?.photo_url} alt=""/>
                  </div>

                  <div className="history">
                      <div>Member Since: {mongoDBuser?.sign_up_date ? moment.unix(mongoDBuser?.sign_up_date).format('LL') : "Loading"}</div>
                      <div>Last Online: {mongoDBuser?.last_online_date ? moment.unix(mongoDBuser?.last_online_date).format('LL') : "Loading"}</div>
                  </div>

                </div>

                <div className="name">
                  <div className="row">

                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="exampleInputEmail1">First Name:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="first_name" 
                          name="first_name" 
                          aria-describedby=""
                          value={mongoDBuser?.first_name || ""}
                          onChange={this.handleUserChange}
                          placeholder="Loading..."
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">Visible to everyone.</small> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Last Name:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="last_name"
                          name="last_name" 
                          aria-describedby=""
                          value={mongoDBuser?.last_name || ""}
                          onChange={this.handleUserChange}
                          placeholder="Loading..."
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">Visible to just you.</small> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Birth Date:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="birth_date"
                          name="birth_date" 
                          aria-describedby=""
                          value={ mongoDBuser?.birth_date ? moment.unix(mongoDBuser?.birth_date).format('LL') : ""}
                          onChange={this.handleUserChange}
                          placeholder="Loading..."
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">Visible to just you.</small> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-12">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Photo URL:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="photo_url" 
                          name="photo_url"
                          aria-describedby=""
                          value={ mongoDBuser?.photo_url ? mongoDBuser?.photo_url : ''}
                          onChange={this.handleUserChange}
                          placeholder="Uploads coming soon!"
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">Visible to just you.</small> */}
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              <div className="card mt-3">
                <div className="card-header">Address</div>

                <div className="card-body">

                  <div className="form-group">
                    <label for="exampleInputEmail1">Zip:</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="zip"
                      name="zip"
                      aria-describedby=""
                      value={ mongoDBuser?.address?.zip || "" }
                      onChange={this.handleAddressChange}
                      placeholder="Loading..."
                    />
                    {/* <small id="emailHelp" className="form-text text-muted">Visible to just you.</small> */}
                  </div>

                  <div className="row">

                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="exampleInputEmail1">City:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="" 
                          disabled="true"
                          aria-describedby=""
                          value={ mongoDBuser?.address?.city || "" }
                          placeholder=""
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">Visible to just you.</small> */}
                      </div>
                    </div>

                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label for="exampleInputEmail1">State:</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          id="" 
                          disabled="true"
                          aria-describedby=""
                          value={ mongoDBuser?.address?.state || "" }
                          placeholder=""
                        />
                        {/* <small id="emailHelp" className="form-text text-muted">Visible to just you.</small> */}
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              <div className="card mt-3">
                <div className="card-header">
                  <div>Issue Subscriptions</div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-md-6">

                      <small>Yours</small>
                      {mongoDBuser?.subscriptionsFetched ? 
                      mongoDBuser?.subscriptionsFetched.map((issue) => (
                        <div className="sub-item unsubscribe" onClick={() => this.removeSubscriptionNew(issue._id)}>{issue.news_title}</div>
                      ))
                      :
                      null
                      }

                    </div>
                    <div className="col-12 col-md-6">

                      <small>All</small>
                      {allIssues && mongoDBuser?.subscriptionsFetched ? 

                      allIssues.map((issue) => {
                        return (
                        <div>

                        {(mongoDBuser?.subscriptionsFetched.filter(sub => sub._id === issue._id.toString() )).length > 0
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
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" checked type="radio" name="terms" id="inlineRadio1" value="option1"/>
                        <label className="form-check-label" for="inlineRadio1">True</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="terms" id="inlineRadio2" value="option2"/>
                        <label className="form-check-label" for="inlineRadio2">False</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div>Cookies:</div>
                      <div className="version">Version: 1.0</div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" checked type="radio" name="cookies" id="inlineRadio1" value="option1"/>
                        <label className="form-check-label" for="inlineRadio1">True</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="cookies" id="inlineRadio2" value="option2"/>
                        <label className="form-check-label" for="inlineRadio2">False</label>
                      </div>
                    </div>

                    <div className="col-12 col-md-4">
                      <div>Privacy:</div>
                      <div className="version">Version: 1.0</div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" checked type="radio" name="privacy" id="inlineRadio1" value="option1"/>
                        <label className="form-check-label" for="inlineRadio1">True</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="privacy" id="inlineRadio2" value="option2"/>
                        <label className="form-check-label" for="inlineRadio2">False</label>
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

                  {mongoDBuser?.submissionsFetched ? 

                  mongoDBuser?.submissionsFetched.map((submission) => (
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

                {mongoDBuser?.ordersFetched ? 

                  mongoDBuser?.ordersFetched.map((order) => (
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
                  
                {mongoDBuser?.subscriptionsFetched ? 

                  mongoDBuser?.subscriptionsFetched.map((subscription) => (
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
  user_id: state.auth.user.id,
  user_details: state.auth.user_details,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, setUserDetails }
)(SubscribeList);