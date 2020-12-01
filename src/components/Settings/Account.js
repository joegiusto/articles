import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'
import Cleave from 'cleave.js/react';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';

import { StepOneProfilePhoto } from '../Outset/StepOne'
import { logoutUser, setUserDetails } from "../../actions/authActions";

class Account extends Component {
  constructor(props) {
  super(props);
  
    this.state = {

      user: {
        first_name: this.props.user_details?.first_name || '',
        last_name: this.props.user_details?.last_name || '',

        password: '',
        newPassword: '',
        newPasswordConfirm: '',

        birth_date: this.props.user_details?.birth_date || '',
        age: moment(this.props.user_details?.birth_date).format('MM/DD/YYYY') || '',
        
        sign_up_date: this.props.user_details?.sign_up_date || '',
        last_online_date: this.props.user_details?.last_online_date || '',

        photo_url: this.props.user_details?.photo_url || '',

        address: {
          zip: this.props.user_details?.address?.zip || '',
          city: this.props.user_details?.address?.city || '',
          state: this.props.user_details?.address?.state || '',
          lat: this.props.user_details?.address?.lat || '',
          lng: this.props.user_details?.address?.lng || '',
        },

        gender: this.props.user_details?.gender || '',

        submissions: this.props.user_details?.submissions || [],
        submissionsFetched: this.props.user_details?.submissionsFetched || [],
        orders: this.props.user_details?.orders || [],
        ordersFetched: this.props.user_details?.ordersFetched || [],
        subscriptions: this.props.user_details?.subscriptions || [],
        subscriptionsFetched: this.props.user_details?.subscriptionsFetched || []
      },

      allIssues: [],

      updatingUserDetails: false,

      requestedUserData: '',

      nameExpanded: false,
      genderExpanded: false,
      birthDateExpanded: false,
      subscriptionsExpanded: false,
    };

    this.placesToAddress = this.placesToAddress.bind(this);
    this.latLng = this.latLng.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

    this.getIssues();
  }

  placesToAddress(geocodeResults) {

    const place = geocodeResults[0]

    var componentForm = {
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      postal_code: 'short_name'
    };

    this.setState({
      user: {
        ...this.state.user,
        address: {
          city: '',
          state: '',
          zip: ''
        }
      }
    })

    for (var i = 0; i < place.address_components.length; i++) {

      var addressType = place.address_components[i].types[0];
      
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];

        this.setState({
          [addressType]: val 
        })

        switch(addressType) {
          case 'locality':
            this.setState({
              user: {
                ...this.state.user,
                address: {
                  ...this.state.user.address,
                  city: val 
                }
              }
            })
          break;
          case 'administrative_area_level_1':
            this.setState({
              user: {
                ...this.state.user,
                address: {
                  ...this.state.user.address,
                  state: val
                }
              }
            })
          break;
          case 'postal_code':
            this.setState({
              user: {
                ...this.state.user,
                address: {
                  ...this.state.user.address,
                  zip: val
                }
              }
            })
          break;
          default: 
            console.log(`Error - Check geocodeResults`);
        }

      }
    }

  }

  getIssues() {
    const self = this;

    axios.get('/api/getIssues')
    .then(function (response) {

      self.setState({
        allIssues: response.data,
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleUserChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [name]: value
      }
    }));
  }

  updateUser() {
    const self = this;
    console.log("UPDATE!");

    this.setState({
      updatingUserDetails: true
    })

    axios.post('/api/secure/updateUserDetails', {
      user_details: {
        first_name: this.state.user.first_name,
        last_name: this.state.user.last_name,
        photo_url: this.state.user.photo_url,
        birth_date: new Date(this.state.user.age),
        address: {
          city: this.state.user.address.city,
          state: this.state.user.address.state,
          zip: this.state.user.address.zip,
          lat: this.state.user.address.lat,
          lng: this.state.user.address.lng,
        },
        gender: this.state.user.gender,
        subscriptions: this.state.user.subscriptions,
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

  requestUserData() {
    axios.post('/api/secure/requestUserData', {

    })
    .then( (response) => {
      console.log(response);
      this.setState({
        requestedUserData: JSON.stringify(response.data, undefined, 2)
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updateDetail(detail) {
    const self = this;

    console.log(detail)
  }

  updatePassword() {
    const self = this;
    console.log("PASSWORD UPDATE!");

    this.setState({
      updatingUserDetails: true
    })

    axios.post('/api/secure/updateUserPassword', {
      user: self.props.auth.user.id,
      user_details: {
        password: self.state.user.password,
        newPassword: self.state.user.newPassword
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

  latLng(latLng) {
    this.setState({
      user: {
        ...this.state.user,
        address: {
          ...this.state.user.address,
          lat: latLng.lat,
          lng: latLng.lng
        }
      }
    })
  }

  addSubscriptionNew(issue) {

    this.setState(prevState => ({

      user: {
        ...prevState.user,

        subscriptions: [
          ...prevState.user.subscriptions,
          {
            news_id: issue._id
          }
        ],

        subscriptionsFetched: [
          ...prevState.user.subscriptionsFetched,
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
      user: {
        ...prevState.user,
        
        subscriptions: this.state.user.subscriptions.filter(function( obj ) {
          return obj.news_id !== id;
        }),

        subscriptionsFetched: this.state.user.subscriptionsFetched.filter(function( obj ) {
          return obj._id !== id;
        })
      }
    }))

    // this.setState({
    //   mongoDBsubscriptionsBulk: this.state.mongoDBsubscriptionsBulk.concat(id)
    // })
  }
  
  changeGender(gender) {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        gender: gender
      }
    }));
  }

  render() {

    return (
      <div className="settings-account mb-3">

        {/* Account */}

        <div className={"card settings-card mt-3"}>

          <div className="card-header">
            <h5>Profile Info</h5>
            <p>Basic info, like your name and photo, that you use on Articles</p>
          </div>

          <div className="card-body">

            <div className="info-snippet">
              <div className="label">EMAIL</div>

              <div className="info">
                
                <div className={"detail-view " + (this.state.emailExpanded ? 'd-none' : '')}>
                  {this.props.user_details.email}
                  <div className="email-note">
                    Email can not be changed at this time. Coming Soon.
                  </div>
                </div>

                <div className={"expand-view " + (this.state.emailExpanded ? '' : 'd-none')}>

                  <div className="actions mt-2">
                    <div onClick={() => this.setState({
                      emailExpanded: false
                    })} className="btn btn-articles-light">Cancel</div>
                    <div onClick={() => this.updateDetail('email')} className="btn btn-articles-light ml-2">Save</div>
                  </div>

                </div>
                
              </div>

              {/* <div className="arrow"><i className="far fa-hand-point-right"></i></div> */}

            </div>

            <div className="info-snippet">

              <div className="label">PHOTO</div>

              <div className="info profile-photo">
                {/* <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props.auth.user.id}.jpg`} alt=""/>
                <div className="upload-notification">Uploading</div> */}
                <StepOneProfilePhoto changeFocus={() => console.log("Prevent Crash")} user_id={this.props.user_id}/>
              </div>

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

                  {/* <div>CHANGE NAME</div> */}
                  <p>Anyone can see this info when they communicate with you or view content you create</p>

                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input className="d-block" name="first_name" onChange={this.handleUserChange} value={this.state.user.first_name} type="text"/>
                  </div>

                  <span className="badge badge-dark">Visible To All</span>

                  <input className="d-block mt-2" name="last_name" onChange={this.handleUserChange} value={this.state.user.last_name} type="text"/>
                  <span className="badge badge-dark">First Lettter Visible</span>

                  <div className="actions mt-2">
                    <div onClick={() => this.setState({
                      nameExpanded: false
                    })} className="btn btn-articles-light">Cancel</div>
                    <div onClick={() => this.updateDetail('first_name')} className="btn btn-articles-light ml-2">Save</div>
                  </div>

                </div>

              </div>

              <div className="arrow"><i className={"far fa-hand-point-right " + (this.state.nameExpanded? 'fa-rotate-90' : '')}></i></div>

            </div>

            <div className="info-snippet" onClick={() => 
              this.state.birthDateExpanded ?
              null
              :
              this.setState({
                birthDateExpanded: !this.state.birthDateExpanded
              })
            }>
              <div className="label">BIRTHDAY</div>

              <div className="info mr-5">
                
                <div className={"detail-view " + (this.state.birthDateExpanded ? 'd-none' : '')}>
                  {moment(this.props.user_details.birth_date).format("LL")}
                </div>

                <div className={"expand-view " + (this.state.birthDateExpanded ? '' : 'd-none')}>

                  <p>Anyone can see this info when they communicate with you or view content you create</p>

                  <Cleave
                    placeholder=""
                    options={{date: true, delimiter: '/', datePattern: ['m','d','Y']}}
                    className={"form-control"}
                    onChange={(e) => this.handleUserChange(e)}
                    value={this.state.user.age}
                    name="age"
                  />
                  
                  <small className="pl-2" style={{fontSize: '10px'}}>DD/MM/YYYY</small>

                  <div className="actions mt-2">
                    <div onClick={ () => this.setState( { birthDateExpanded: false } ) } className="btn btn-articles-light">Cancel</div>
                    <div onClick={ () => null } className="btn btn-articles-light ml-2">Save</div>
                  </div>

                </div>

              </div>

              <div className="arrow"><i className={"far fa-hand-point-right " + (this.state.birthDateExpanded? 'fa-rotate-90' : '')}></i></div>
            </div>

            <div className="info-snippet" onClick={() => 
              this.state.addressExpanded ?
              null
              :
              this.setState({
                addressExpanded: !this.state.addressExpanded
              })
            }>
              <div className="label">ADDRESS</div>
              <div className="info">

                <div style={{textTransform: 'capitalize'}} className={"detail-view " + (this.state.addressExpanded ? 'd-none' : '')}>
                  {this.props.user_details.address.city + ', '}
                  {this.props.user_details.address.state + ' | '} 
                  {this.props.user_details.address.zip}
                </div>

                <div className={"expand-view " + (this.state.addressExpanded ? '' : 'd-none')}>

                  <p>Anyone can see this info when they communicate with you or view content you create</p>

                  <div className="last-changed">Begin typing your address</div>
                  <LocationSearchInput 
                    placesToAddress={this.placesToAddress}
                    latLng={this.latLng}
                  />

                  <div className="py-2">Or</div>

                  <div className="last-changed">Town / City</div>
                  <input className="d-block" value={this.state.user.address.city} type="text"/>
                  <div className="last-changed">State</div>
                  <input className="d-block" value={this.state.user.address.state} type="text"/>
                  <div className="last-changed">Zip</div>
                  <input className="d-block" value={this.state.user.address.zip} type="text"/>

                  <div className="py-2">&nbsp;</div>

                  <div className="last-changed">Lat</div>
                  <input className="d-block" value={this.state.user.address?.lat} type="text"/>
                  <div className="last-changed">Lng</div>
                  <input className="d-block" value={this.state.user.address?.lng} type="text"/>

                  <div className="actions mt-2">
                    <div onClick={() => this.setState({
                      addressExpanded: false
                    })} className="btn btn-articles-light">Cancel</div>
                    <div onClick={() => this.updateDetail('address')} className="btn btn-articles-light ml-2">Save</div>
                  </div>

                </div>

              </div>
              <div className="arrow"><i className="far fa-hand-point-right"></i></div>
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

                <div style={{textTransform: 'capitalize'}} className={"detail-view " + (this.state.genderExpanded ? 'd-none' : '')}>
                  {this.props.user_details.gender}
                </div>

                <div className={"expand-view " + (this.state.genderExpanded ? '' : 'd-none')}>

                  <p>Anyone can see this info when they communicate with you or view content you create</p>

                  <div onClick={() => this.changeGender('male')} className={"badge badge-lg mr-2 " + (this.state.user.gender === 'male' ? 'badge-articles' : 'badge-light border')}>Male</div>
                  <div onClick={() => this.changeGender('female')} className={"badge badge-lg mr-2 " + (this.state.user.gender === 'female' ? 'badge-articles' : 'badge-light border')}>Female</div>
                  <div onClick={() => this.changeGender('')} className={"badge badge-lg mr-2 " + (this.state.user.gender === '' ? 'badge-articles' : 'badge-light border')}>Other</div>

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

              <div className="arrow"><i className="far fa-hand-point-right"></i></div>

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

                  <p>Anyone can see this info when they communicate with you or view content you create</p>

                  <div className="last-changed">Current Password</div>
                  <input className="d-block" name="password" value={this.state.user.password} onChange={this.handleUserChange} type="text"/>

                  <hr style={{maxWidth: '200px', marginLeft: '0'}}/>

                  <div className="last-changed">New Password</div>
                  <input className="d-block" name="newPassword" value={this.state.user.newPassword} onChange={this.handleUserChange} type="text"/>
                  <div className="last-changed">Retype Password</div>
                  <input className="d-block" name="newPasswordConfirm" value={this.state.user.newPasswordConfirm} onChange={this.handleUserChange} type="text"/>

                  <div className="actions mt-2">
                    <div onClick={ () => this.setState( { passwordExpanded: false } ) } className="btn btn-articles-light">Cancel</div>
                    <div onClick={ () => this.updatePassword } className="btn btn-articles-light ml-2">Save</div>
                  </div>

                </div>

              </div>

              <div className="arrow"><i className="far fa-hand-point-right"></i></div>

            </div>

          </div>

        </div>

        <div className={"card settings-card mt-3"}>

          <div className="card-header">
            <h5>Subscriptions</h5>
            <p>Some info may be visible to others</p>
          </div>

          <div className="card-body">

            <div className="info-snippet" onClick={() => 
              this.state.subscriptionsExpanded ?
              null
              :
              this.setState({
                subscriptionsExpanded: !this.state.subscriptionsExpanded
              })
            }>

              <div className="label">ISSUES</div>

              <div className="info">
                
                <div className={"detail-view " + (this.state.subscriptionsExpanded ? 'd-none' : '')}>
                  {this.props.user_details.subscriptionsFetched.length} Subscriptions
                </div>

                <div className={"expand-view " + (this.state.subscriptionsExpanded ? '' : 'd-none')}>

                  <p>Anyone can see this info when they communicate with you or view content you create</p>

                  <div className="row">
                    <div className="col-12 col-md-6">

                      <small>Yours</small>
                      {this.state.user?.subscriptionsFetched ? 
                      this.state.user?.subscriptionsFetched.map((issue) => (
                        <div key={issue._id} className="sub-item unsubscribe" onClick={() => this.removeSubscriptionNew(issue._id)}>{issue.news_title}</div>
                      ))
                      :
                      null
                      }

                    </div>
                    <div className="col-12 col-md-6">

                      <small>All</small>
                      {this.state.allIssues && this.state.user?.subscriptionsFetched ? 

                      this.state.allIssues.map((issue) => {
                        return (
                        <div>

                        {(this.state.user?.subscriptionsFetched.filter(sub => sub._id === issue._id.toString() )).length > 0
                        ? 
                        // <button onClick={() => this.removeSubscription(issue._id)} className="btn btn-articles-light un">Unsubscribe</button>
                        <div className={"sub-item unsubscribe d-none"} onClick={() => this.removeSubscriptionNew(issue._id)}>{issue.news_title}</div>
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

                  <div className="actions mt-2">
                    <div onClick={ () => this.setState( { subscriptionsExpanded: false } ) } className="btn btn-articles-light">Cancel</div>
                    <div onClick={ () => this.setState( { subscriptionsExpanded: false } ) } className="btn btn-articles-light ml-2">Save</div>
                  </div>

                </div>
              </div>

              <div className="arrow"><i className="far fa-hand-point-right"></i></div>

            </div>

            <div className="info-snippet d-none">

              <div className="label">TAGS</div>

              <div className="info">
                <div>0 Followed</div>
                <div className="last-changed">Feature coming soon</div>
              </div>

              {/* <div className="arrow"><i className="far fa-hand-point-right"></i></div> */}

            </div>

          </div>

        </div>

        <div className="links d-flex justify-content-between mb-3 " style={{maxWidth: '800px', marginRight: 'auto', marginLeft: 'auto'}}>

          <div>
            <div className="btn btn-danger">Delete Account</div>
            {!this.state.requestedUserData && <div className="btn btn-articles-light" onClick={() => this.requestUserData()}>Request Data</div>}
          </div>

          <div onClick={this.updateUser} className="btn btn-articles-light">Update</div>

        </div>

        {this.state.requestedUserData && 
          <div className={"card settings-card mt-3"}>

          <div className="card-header">
            <h5>Requested Account Info</h5>
            <p>See all the data related to you</p>
          </div>

          <div className="card-body"></div>
            <h5>User Account Data</h5>
            <pre id="json">{this.state.requestedUserData}</pre>
            <h5>User Message Data</h5>
            <div><span className="badge badge-warning">In Development</span></div>
          </div>
        }

      </div>
    );
  }
}

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {

    geocodeByAddress(address)
      .then(results => {
        this.props.placesToAddress(results);
        return( getLatLng(results[0]) )
      })
      .then(latLng => {
        console.log('Success', latLng)
        this.props.latLng(latLng)
      })
      .catch(error => console.error('Error', error));
  };
 
  render() {

    const searchOptions = {
      types: ['geocode']
    }

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>

            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />

            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                      key: i
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>

          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id,
  user_details: state.auth.user_details,
});

export default connect(
  mapStateToProps,
  { logoutUser, setUserDetails }
)(Account);