import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react';
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import ConfirmDelete from './ConfirmDelete'

class Ads extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      loading: false,
      lat: '',
      lng: '',

      users: [],

      userAreas:[],

      zipsArray: [],
      zips: {
        // Is capital for display purposes, changing this to lowercase will show in reports
        None: 0
        // The rest of the zips get populated once data loads
      },

      ads: [],
      results: [],

      business: '',
      contact: '',
      // age: false,
      ageFilters: {
        range: {
          active: false,
          start: 0,
          end: 0,
        },
        above: {
          active: false,
          age: 0
        },
        below: {
          active: false,
          age: 0
        }
      },
      // zip: false,
      zipFilters: {
        list: {
          active: false,
          list: []
        },
        nearby: {
          active: false,
          zip: ''
        },
        around: {
          active: false,
          zip: ''
        }
      }
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLoaction(this.props.tabLocation);

    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
        self.setState({
          lat : position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      function(error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );

    axios.post('/api/secure/getAdPopulation')
    .then(function (response) {

      console.log(response)

      self.setState({
        userAreas: response.data.data
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        // users: []
      })

    });
  }

  compileZips() {
    
  }

  changeAgeFilterOption(key, option, e) {

    console.log(e.target.value)
    
    this.setState({
      ageFilters: {
        ...this.state.ageFilters,
        [key]: {
          ...this.state.ageFilters[key],
          [option]: e.target.value
        }
      }
    })

  };

  changeZipFilterOption(key, option, e) {

    console.log(e.target.value)
    
    this.setState({
      zipFilters: {
        ...this.state.zipFilters,
        [key]: {
          ...this.state.zipFilters[key],
          [option]: e.target.value
        }
      }
    })

  };

  changeFilterOption(filter, option) {
    console.log(`Called ${filter}`)

    if (filter === 'ageFilters') {
      this.setState(prevState => ({

        [filter]: {
          ...this.state.ageFilters,
          range: {
            ...this.state.ageFilters.range,
            active: false
          },
          above: {
            ...this.state.ageFilters.above,
            active: false
          },
          below: {
            ...this.state.ageFilters.below,
            active: false
          },
          [option]: {
            ...this.state.ageFilters[option],
            active: !prevState.ageFilters[option].active
          },
        }
  
      }))
    } else if (filter === 'zipFilters') {
      this.setState(prevState => ({

        zipFilters: {
          ...this.state.zipFilters,
          list: {
            ...this.state.zipFilters.list,
            active: false
          },
          nearby: {
            ...this.state.zipFilters.nearby,
            active: false
          },
          around: {
            ...this.state.zipFilters.around,
            active: false
          },
          [option]: {
            ...this.state.zipFilters[option],
            active: !prevState.zipFilters[option].active
          },
        }
  
      }))
    }
    
  }

  retrieveReach() {
    const self = this;
    console.log("Reach")

    axios.post('/api/getReach', {
      ageFilters: this.state.ageFilters,
      zipFilters: this.state.zipFilters
    })
    .then( (obj) => {
      console.log(obj)
      self.setState({
        results: obj.data
      })
    })
    .catch(function (error) {
      console.log(error.response);
    });

  }

  render() {

    return (
      <div className="admin-ads">

        <div className="side-panel">

          <div className="card">
            <div className="card-header">Status</div>
            <div className="card-body">
              <div>Pending Ads: 0</div>
              <div>Active Ads: 1</div>
              <div>Expired Ads: 0</div>
            </div>
          </div>

        </div>

        <div className="creator">

          <div className="card">
            <h5 className="card-header">Ad Builder</h5>
            <div className="card-body">
              {/* <h5 className="card-title">Available Sorts</h5> */}
              <p className="card-text">Use any of the following tools to select who to target your ads to. We suggest sticking with the stable filters to reach a bigger audience.</p>

              <div>
                <h5>Stable Filters</h5>

                <Accordion>

                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <div>Age</div>
                      {
                        this.state.ageFilters.range.active  || this.state.ageFilters.above.active || this.state.ageFilters.below.active ?
                        <i className="fas fa-circle mr-0 d-flex align-items-center"></i>
                        :
                        <i className="far fa-circle mr-0 d-flex align-items-center"></i>
                      }
                      
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>

                        <button onClick={() => this.changeFilterOption('ageFilters','range')} className={"btn btn-articles-light " + (this.state.ageFilters.range.active ? 'alt' : '')}>
                          <div>Range</div>
                        </button>

                        <button onClick={() => this.changeFilterOption('ageFilters','above')} className={"btn btn-articles-light " + (this.state.ageFilters.above.active ? 'alt' : '')}>
                          Above
                        </button>

                        <button onClick={() => this.changeFilterOption('ageFilters','below')} className={"btn btn-articles-light " + (this.state.ageFilters.below.active ? 'alt' : '')}>
                          Below
                        </button>

                        <div className={"filter-option-dropdown " + (this.state.ageFilters.range.active ? '' : 'd-none')}>

                          <div className="d-flex">
                            <div className="form-group">
                              <label for="address">Start Age</label>
                              <input className="form-control with-label" onChange={(e) => {this.changeAgeFilterOption('range', 'start', e)}} name="age_range_start" id="age_range_start" type="text" value={this.state.age_range_start}/>
                            </div>
  
                            <div className="form-group">
                              <label for="address">End Age</label>
                              <input className="form-control with-label" onChange={(e) => {this.changeAgeFilterOption('range', 'end', e)}}  name="age-range-end" id="age-range-end" type="text" value={this.state.age_range_end}/>
                            </div>
                          </div>

                        </div>

                        <div className={"filter-option-dropdown " + (this.state.ageFilters.above.active ? '' : 'd-none')}>

                          <div className="form-group">
                            <label for="address">Above Age</label>
                            <input className="form-control with-label" onChange={(e) => {this.changeAgeFilterOption('above', 'age', e)}}  name="address" id="address" type="text" value={this.state.age_above}/>
                          </div>

                        </div>

                        <div className={"filter-option-dropdown " + (this.state.ageFilters.below.active ? '' : 'd-none')}>

                          <div className="form-group">
                            <label for="address">Below Age</label>
                            <input className="form-control with-label" onChange={(e) => {this.changeAgeFilterOption('below', 'age', e)}}  name="address" id="address" type="text" value={this.state.age_below}/>
                          </div>

                        </div>

                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                </Accordion>

                <Accordion>

                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <div>Zip</div>
                      {
                        this.state.zipFilters.list.active  || this.state.zipFilters.nearby.active || this.state.zipFilters.around.active ?
                        <i className="fas fa-circle mr-0 d-flex align-items-center"></i>
                        :
                        <i className="far fa-circle mr-0 d-flex align-items-center"></i>
                      }
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>

                        <button 
                        onClick={() => this.changeFilterOption('zipFilters','list')} 
                        className={"btn btn-articles-light " + (this.state.zipFilters.list.active ? 'alt' : '')}
                        >
                          List
                        </button>
                        <button 
                        onClick={() => this.changeFilterOption('zipFilters','nearby')}
                        className={"btn btn-articles-light " + (this.state.zipFilters.nearby.active ? 'alt' : '')}
                        >
                          Nearby
                        </button>
                        <button
                        onClick={() => this.changeFilterOption('zipFilters','around')}
                        className={"btn btn-articles-light " + (this.state.zipFilters.around.active ? 'alt' : '')}
                        >
                          Around
                        </button>

                        {this.state.zipFilters.list.active ?
                          <div className="filter-option-dropdown d-flex">

                            <small className="w-100">Comma Separated List</small>

                            <div className="form-group">
                              <label className="d-flex justify-content-between" for="address">Zips</label>
                              <input className="form-control with-label" onChange={(e) => {this.changeZipFilterOption('list', 'zip', e)}} name="address" id="address" type="text" value={this.state.zipFilters.list.zip}/>
                            </div>

                          </div>
                          :
                          ''
                        }

                        {this.state.zipFilters.nearby.active ?
                          <div className="filter-option-dropdown">

                            <small className="w-100">Specified Distance Around Zip Code (including zip code)</small>

                            <div className="form-group">
                              <label for="address">Zip Code</label>
                              <input className="form-control with-label" name="address" id="address" type="text" value=""/>
                            </div>

                            <div className="form-group">
                              <label for="exampleFormControlSelect1">Miles</label>
                              <select className="form-control" id="exampleFormControlSelect1">
                                <option>1</option>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>30</option>
                                <option>50</option>
                              </select>
                            </div>

                          </div>
                          :
                          ''
                        }

                        {this.state.zipFilters.around.active ?
                          <div className="filter-option-dropdown">

                            <small className="w-100">Specified Distance Around Zip Code (not including zip code)</small>

                            <div className="form-group">
                              <label for="address">Zip</label>
                              <input className="form-control with-label" name="address" id="address" type="text" value=""/>
                            </div>

                            <div className="form-group">
                              <label for="exampleFormControlSelect1">Miles</label>
                              <select className="form-control" id="exampleFormControlSelect1">
                                <option>1</option>
                                <option>5</option>
                                <option>10</option>
                                <option>15</option>
                                <option>30</option>
                                <option>50</option>
                              </select>
                            </div>

                          </div>
                          :
                          ''
                        }

                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                </Accordion>

              </div>

              <div className="">
                <h5>Unstable Filters</h5>

                {/* Occupation */}
                <Accordion>

                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Occupation
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <button className="btn btn-articles-light">
                          Blue Collar
                        </button>
                        <button className="btn btn-articles-light">
                          White Collar
                        </button>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                </Accordion>

                {/* Hobbies */}
                <Accordion>

                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    Hobbies
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>

                        <div className="form-group">
                          <label for="hobbies-search">Hobbies Search</label>
                          <input className="form-control with-label" name="hobbies-search" id="hobbies-search" type="text" value=""/>
                        </div>

                        <button className="btn btn-articles-light">Snowboarding</button>
                        <button className="btn btn-articles-light">Fishing</button>
                        <button className="btn btn-articles-light">Skiing</button>
                        <button className="btn btn-articles-light">Woodworking</button>
                        <button className="btn btn-articles-light">Painting</button>
                        <button className="btn btn-articles-light">Sculpting</button>
                        <button className="btn btn-articles-light">Rock Climbing</button>
                        <button className="btn btn-articles-light">Reading</button>
                        <button className="btn btn-articles-light">Hiking</button>
                        <button className="btn btn-articles-light">Yoga</button>
                        <button className="btn btn-articles-light">Bicycling</button>
                        <button className="btn btn-articles-light">Gaming</button>
                        <button className="btn btn-articles-light">Cooking</button>
                        <button className="btn btn-articles-light">Sewing</button>
                        <button className="btn btn-articles-light">Camping</button>
                        <button className="btn btn-articles-light">Gardening</button>
                        <button className="btn btn-articles-light">Photography</button>
                        <button className="btn btn-articles-light">Dance</button>
                        <button className="btn btn-articles-light">Golfing</button>
                        <button className="btn btn-articles-light">Scrapbooking</button>
                        <button className="btn btn-articles-light">Baseball</button>
                        <button className="btn btn-articles-light">Basketball</button>
                        <button className="btn btn-articles-light">Soccer</button>
                        <button className="btn btn-articles-light">Brewing</button>
                        <button className="btn btn-articles-light">Programming</button>

                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                </Accordion>

                {/* Residence Type */}
                <Accordion>

                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Residence Type
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <button className="btn btn-articles-light">
                          Owns
                        </button>
                        <button className="btn btn-articles-light">
                          Rents
                        </button>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                </Accordion>

                {/* Children */}
                <Accordion>

                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    Children
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <button className="btn btn-articles-light">
                          No
                        </button>
                        <button className="btn btn-articles-light">
                          Yes
                        </button>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>

                </Accordion>

              </div>

              <button onClick={() => this.retrieveReach()} className="btn btn-articles-light mt-3">Retrieve Reach</button>
            </div>
          </div>

          <div className="card mt-2">
            <h5 className="card-header">Reach Report</h5>
            <div className="card-body">
              <h5 className="card-title">{this.state.results.length} Users</h5>
              <p className="card-text">The amount of users that will potentially see your ad.</p>

              <div className="alert alert-danger">
                {this.state.results.map(result => 
                  <div className="result">
                    {result.first_name} {result.last_name}
                  </div>
                )}
              </div>

              <button className="btn btn-articles-light mt-3">Reset</button>
            </div>
          </div>

        </div>

        <div className="map-container">

          <div className="map" style={{width: '100%', height: '400px'}}>
            <Map userAreas={this.state.userAreas} lat={this.state.lat} lng={this.state.lng}/>
          </div>

          <div className="table-responsive">
          <table className='table articles-table table-sm table-hover table-bordered'>
            <thead>
              <tr className="table-articles-head">
                {/* <th scope="col">Order #</th> */}
                <th scope="col">Dates</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">Sorts</th>
                <th scope="col">Reach</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>

              {this.state.ads.map(order => 
                <tr key={order._id}>
                  <td colSpan="1" className="border-right-0 ">{moment(order.date).format("LLL")}</td>
                  <td colSpan="1" className="border-right-0 ">{order.user_id}</td>
                  <td colSpan="1" className="border-right-0 ">{order.items.length} Item{order.items.length > 1 ? 's' : ''}</td>
                  <td colSpan="1" className="border-right-0 ">${(order.payment.trueTotal / 100).toFixed(2)}</td>
                  <td colSpan="1" width={'150px'} className="border-right-0 "><ConfirmDelete afterConfirm={() => this.removeOrder(order._id)}></ConfirmDelete></td>
                </tr>
              )}

              <tr>
                <td colSpan="1" className="border-right-0 ">{moment().format("LL")} - {moment().add(30, 'days').format("LL")}</td>

                <td colSpan="1" className="border-right-0 ">Bank Square</td>

                <td colSpan="1" className="border-right-0 ">Behney</td>

                <td colSpan="1" className="border-right-0 "><span className="badge badge-articles">Age</span> <span className="badge badge-articles">Zip</span></td>

                <td colSpan="1" className="border-right-0 ">0</td>

                <td colSpan="1" width={'150px'} className="border-right-0 ">
                  <span className="badge badge-success">Report</span>
                  <ConfirmDelete className="ml-1" afterConfirm={() => console.log('Remove')}>t</ConfirmDelete>
                </td>

              </tr>

              <tr>
                <td colSpan="2" className="border-right-0 table-articles-head">
  
                </td>
  
                <td colSpan="1" className="border-right-0 text-right table-articles-head"></td>
                <td colSpan="1" className="border-left-0 table-articles-head"></td>
                <td colSpan="1" className="border-left-0 table-articles-head"></td>
                <td colSpan="1" className="border-left-0 table-articles-head"></td>
              </tr>
  
            </tbody>
          </table>
        </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id
});

export default connect(
  mapStateToProps,
)(Ads);

class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  static defaultProps = {
    center: {lat: 37.09, lng: -95.71},
    zoom: 5,
    userAreas: []
  };

  render() {
    return (
      <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAKmyGIU1IJo_54kahuds7huxuoEyZF-68' }}
      center={{lat: this.props.lat, lng: this.props.lng}}
      zoom={11}
      >

      {this.props.userAreas.map(area => 

        <Area 
          lat={area.lat} 
          lng={area.lng} 
          zip={area.zip}
          amount={area.amount}
          name={area.name}
        />
      )}

    </GoogleMapReact>
    );
  }
}

const Area = ({ zip, amount, name }) => (
  <div>
    
    <div style={{
      color: 'red', 
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25rem',
      marginRight: '0rem',
      fontSize: '1rem',
      transform: 'translate(-50%, -50%)',
    }}>
      <i className="fas fa-map-marker-alt mr-0"></i>
    </div>

    <div style={{
      color: 'black',
      backgroundColor: 'white', 
      display: 'block',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.1rem 0.25rem',
      borderRadius: '5px',
      margin: '0px',
      width: '70px',
      marginTop: '5px',
      marginRight: '0rem',
      fontSize: '0.8rem',
      transform: 'translate(-50%, -50%)',
      fontFamily: 'brandon-grotesque, sans-serif',
      fontWeight: 900
    }}>
      <div>{zip} - {amount}</div>
      <div style={{
        fontSize: '0.5rem',
        textTransform: 'uppercase'
      }}>{name}</div>
    </div>

  </div>
);