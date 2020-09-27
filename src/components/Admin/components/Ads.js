import React, {Component} from 'react'
import GoogleMapReact from 'google-map-react';
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

import ConfirmDelete from './ConfirmDelete'

class Reports extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      loading: false,
      lat: '',
      lng: '',
      ads: [],

      age: false,
      zip: false,
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
  }

  componentWillUnmount() {

  }

  retrieveReach() {
    console.log("Reach")
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

          <div class="card">
            <h5 class="card-header">Ad Builder</h5>
            <div class="card-body">
              <h5 class="card-title">Avalible Sorts</h5>
              <p class="card-text">Use any of the following tools to select who to target your ads to.</p>

              <div>
                <h5>Great Filters</h5>

                <div onClick={() => this.setState({age: !this.state.age})} className={"sort " + (this.state.age ? 'active' : '')}>

                  <div className="selected badge badge-dark">
                    Active
                  </div>

                  <div className="title">Age</div>
                  <div>
                    <span className="badge badge-articles">Range</span>
                    <span className="badge badge-articles">Above</span>
                    <span className="badge badge-articles">Below</span>
                  </div>
                </div>

                <div onClick={() => this.setState({zip: !this.state.zip})} className={"sort " + (this.state.zip ? 'active' : '')}>

                  <div className="selected badge badge-dark">
                    Active
                  </div>

                  <div className="title">Zip</div>
                  <div>
                    <span className="badge badge-articles">Near Zip</span>
                    <span className="badge badge-articles">Exact</span>
                    <span className="badge badge-articles">Around</span>
                  </div>
                </div>
              </div>

              <div className="d-none">
                <h5>Okay Filters</h5>

                <div className="sort">
                  <div className="title">Occupation</div>
                  <div>
                    <span className="badge badge-articles">White Collar</span>
                    <span className="badge badge-articles">Blue Collar</span>
                  </div>
                </div>

                <div className="sort d-none">
                  <div className="title">Hobbys</div>
                  <div>
                    <span className="badge badge-articles">Near Zip</span>
                    <span className="badge badge-articles">Exact</span>
                    <span className="badge badge-articles">Around</span>
                  </div>
                </div>

                <div className="sort">
                  <div className="title">Owns House</div>
                  <div>
                    <span className="badge badge-articles">Yes</span>
                    <span className="badge badge-articles">No</span>
                    <span className="badge badge-articles">Rents</span>
                  </div>
                </div>
                <div className="sort">
                  <div className="title">Has Kids</div>
                  <div>
                    <span className="badge badge-articles">Yes</span>
                    <span className="badge badge-articles">No</span>
                  </div>
                </div>

              </div>

              <button onClick={() => this.retrieveReach()} className="btn btn-articles-light mt-3">Retrieve Reach</button>
            </div>
          </div>

          <div class="card mt-2">
            <h5 class="card-header">Reach Report</h5>
            <div class="card-body">
              <h5 class="card-title">0 Users</h5>
              <p class="card-text">The amount of users that will potentially see your ad.</p>

              <button class="btn btn-articles-light mt-3">Reset</button>
            </div>
          </div>

        </div>

        <div className="map" style={{width: '100%', height: '400px'}}>
          <Map lat={this.state.lat} lng={this.state.lng}/>
          <div className="table-responsive">
          <table className='table articles-table table-sm table-hover table-bordered'>
            <thead>
              <tr className="table-articles-head">
                {/* <th scope="col">Order #</th> */}
                <th scope="col">Dates</th>
                <th scope="col">Name</th>
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
)(Reports);

class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 0,
      
      places: [
        {
          text: 'Tesla',
          lat: 37.090240, 
          lng: -95.712891 
        },
        {
          text: 'Protest',
          lat: 37.090240, 
          lng: -95.712891 
        }
      ]
    }
  }

  static defaultProps = {
    center: {lat: 37.09, lng: -95.71},
    zoom: 5
    ,
    // bootstrapURLKeys: { key: '565403139080-i42ucf0miotmvqobitbsd35f92pek539.apps.googleusercontent.com' }
  };

  render() {
    return (
      <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAKmyGIU1IJo_54kahuds7huxuoEyZF-68' }}
      center={{lat: this.props.lat, lng: this.props.lng}}
      zoom={11}
    >
      {/* <AnyReactComponent 
        lat={37.090240} 
        lng={-95.712891} 
        text={'Tesla'} 
      />

      <AnyReactComponent 
        lat={this.props.lat} 
        lng={this.props.lng} 
        text={'Tesla'} 
      /> */}

    </GoogleMapReact>
    );
  }
}