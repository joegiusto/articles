import React, {Component} from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';
import moment from 'moment';
import Cleave from 'cleave.js/react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

import * as ROUTES from '../../constants/routes';
import { logoutUser } from "../../actions/authActions";
import { setUserDetails } from "../../actions/authActions";

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

class Settings extends Component {
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
      birthDateExpanded: false,
      subscriptionsExpanded: false,

      mongoDBuser: {
        first_name: this.props.user_details?.first_name || '',
        last_name: this.props.user_details?.last_name || '',

        birth_date: this.props.user_details?.birth_date || '',
        age: moment(this.props.user_details?.birth_date).format('MM/DD/YYYY') || '',
        
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

    this.placesToAddress = this.placesToAddress.bind(this);
    this.latLng = this.latLng.bind(this);
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

  changeGender(gender) {
    this.setState(prevState => ({
      mongoDBuser: {
        ...prevState.mongoDBuser,
        gender: gender
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

  placesToAddress(geocodeResults) {

    const place = geocodeResults[0]

    var componentForm = {
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      postal_code: 'short_name'
    };

    this.setState({
      mongoDBuser: {
        ...this.state.mongoDBuser,
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
              mongoDBuser: {
                ...this.state.mongoDBuser,
                address: {
                  ...this.state.mongoDBuser.address,
                  city: val 
                }
              }
            })
          break;
          case 'administrative_area_level_1':
            this.setState({
              mongoDBuser: {
                ...this.state.mongoDBuser,
                address: {
                  ...this.state.mongoDBuser.address,
                  state: val
                }
              }
            })
          break;
          case 'postal_code':
            this.setState({
              mongoDBuser: {
                ...this.state.mongoDBuser,
                address: {
                  ...this.state.mongoDBuser.address,
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

  latLng(latLng) {
    this.setState({
      mongoDBuser: {
        ...this.state.mongoDBuser,
        address: {
          ...this.state.mongoDBuser.address,
          lat: latLng.lat,
          lng: latLng.lng
        }
      }
    })
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
  // mergeStuff() {

  //   if (this.state.mongoDBuser.subscriptions && this.state.allIssues) {

  //     console.log("This should have a .news_id for every item");
  //     console.log(this.state.mongoDBuser.subscriptions)

  //     let mergedArray = [];

  //     this.state.mongoDBuser.subscriptions.map( ( item, i ) => {

  //       console.log(i)
  //       console.log(item)

  //       var toSearch = item.news_id;

  //       for(var i=0; i<this.state.allIssues.length; i++) {
  //         for(this.state.allIssues._id in this.state.allIssues[i]) {
  //           if(this.state.allIssues[i][this.state.allIssues._id].indexOf(toSearch)!=-1) {
  //             mergedArray.push(this.state.allIssues[i]);
  //           }
  //         }
  //       }

  //     })

  //     this.setState({
  //       merge: mergedArray
  //     })

  //   } else {
  //     console.log("Not Ready Yet!")
  //   }

  // }

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

  updateDetail(detail) {
    const self = this;

    console.log(detail)
  }

  render() {
    const {mongoDBuser, mongoDBsubmissions, mongoDBorders, allIssues, mongoDBsubscriptionsBulk, merge} = this.state;

    return(
      <div className="settings-page">

        <Helmet>
          <title>Settings - Articles</title>
        </Helmet>

        {/* <div className="background-image">
          <img src="https://cdn.cheapism.com/images/Where_You_Live_or_Work.2e16d0ba.fill-1440x605.png" alt=""/>
        </div> */}

        <div className="container">

          <div className="top">
            <div className="title">Account Settings</div>
            <div className="text"></div>
          </div>

          <div className="text-center">
            <div onClick={this.props.logoutUser} className="btn btn-articles-light">
              Sign Out
            </div>
          </div>

          <div className="card settings-card mt-4">

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
                      Email can not be changed at this time.
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

                <div className="info">
                  <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props.auth.user.id}.jpg`} alt=""/>
                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

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
  
                    {/* <div>CHANGE NAME</div> */}
                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <input className="d-block" name="first_name" onChange={this.handleUserChange} value={mongoDBuser.first_name} type="text"/>
                    <span className="badge badge-dark">Visible To All</span>

                    <input className="d-block mt-2" name="last_name" onChange={this.handleUserChange} value={mongoDBuser.last_name} type="text"/>
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

                <div className="info">
                  
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
                      value={mongoDBuser.age}
                      name="age"
                    />
                    <small className="pl-2" style={{fontSize: '10px'}}>DD/MM/YYYY</small>

                    <div className="actions mt-2">
                      <div onClick={ () => this.setState( { birthDateExpanded: false } ) } className="btn btn-articles-light">Cancel</div>
                      <div onClick={ () => null } className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>

                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>
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
                    <input className="d-block" value={mongoDBuser.address.city} type="text"/>
                    <div className="last-changed">State</div>
                    <input className="d-block" value={mongoDBuser.address.state} type="text"/>
                    <div className="last-changed">Zip</div>
                    <input className="d-block" value={mongoDBuser.address.zip} type="text"/>

                    <div className="py-2">&nbsp;</div>

                    <div className="last-changed">Lat</div>
                    <input className="d-block" value={mongoDBuser.address?.lat} type="text"/>
                    <div className="last-changed">Lng</div>
                    <input className="d-block" value={mongoDBuser.address?.lng} type="text"/>

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

                    <div onClick={() => this.changeGender('male')} className={"badge badge-lg mr-2 " + (mongoDBuser.gender === 'male' ? 'badge-articles' : 'badge-light border')}>Male</div>
                    <div onClick={() => this.changeGender('female')} className={"badge badge-lg mr-2 " + (mongoDBuser.gender === 'female' ? 'badge-articles' : 'badge-light border')}>Female</div>
                    <div onClick={() => this.changeGender('')} className={"badge badge-lg mr-2 " + (mongoDBuser.gender === '' ? 'badge-articles' : 'badge-light border')}>Other</div>

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
                    <input className="d-block" value={mongoDBuser.passwordExpanded} type="text"/>

                    <hr style={{maxWidth: '200px', marginLeft: '0'}}/>

                    <div className="last-changed">New Password</div>
                    <input className="d-block" value={mongoDBuser.passwordExpanded} type="text"/>
                    <div className="last-changed">Retype Password</div>
                    <input className="d-block" value={mongoDBuser.passwordExpanded} type="text"/>

                    <div className="actions mt-2">
                      <div onClick={ () => this.setState( { passwordExpanded: false } ) } className="btn btn-articles-light">Cancel</div>
                      <div className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>

                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

            </div>

          </div>

          <div className="card settings-card mt-4">

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
                        {mongoDBuser?.subscriptionsFetched ? 
                        mongoDBuser?.subscriptionsFetched.map((issue) => (
                          <div key={issue._id} className="sub-item unsubscribe" onClick={() => this.removeSubscriptionNew(issue._id)}>{issue.news_title}</div>
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

                    <div className="actions mt-2">
                      <div onClick={ () => this.setState( { subscriptionsExpanded: false } ) } className="btn btn-articles-light">Cancel</div>
                      <div onClick={ () => this.setState( { subscriptionsExpanded: false } ) } className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>
                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet">

                <div className="label">TAGS</div>

                <div className="info">
                  <div>0 Followed</div>
                  <div className="last-changed">Feature coming soon</div>
                </div>

                {/* <div className="arrow"><i className="far fa-hand-point-right"></i></div> */}

              </div>

            </div>

          </div>

          <div className="card settings-card mt-4 d-none">

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

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet">

                <div className="label">MESSAGES / MAIL</div>

                <div className="info">
                  <div className="enabled-dot"></div>Enabled
                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet">

                <div className="label">MESH</div>

                <div className="info">
                  <div className="disabled-dot"></div>Disabled
                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

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

              </div>

            </div>

            <div className="col-12 col-md-4 border-left">

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

            </div>

          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user_id: state.auth.user.id,
  user_details: state.auth.user_details,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, setUserDetails }
)(Settings);