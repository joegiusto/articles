import React, {Component, useState} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

class Newsletter extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      projects: []
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

    // axios.post('/api/secure/getProjects', {

    // })
    // .then( (response) => {
    //   console.log(response)
    //   this.setState({projects: response.data})
    // })
    // .catch( (error) => {
    //   console.log(error);
		// });
  }

  render() {

    return (
      <div className="admin-page admin-projects">

        <div className="side-panel">

          <div className="card">
            <div className="card-header">Metrics</div>
            <div className="card-body">
              <div><b>General Subscribers: 0</b></div>
              <div><b>Dev Subscribers: 0</b></div>
              <div><b>Money Subscribers: 0</b></div>
              {/* <hr/> */}
              {/* <div><b>Encrypted Chats: 0</b></div> */}
            </div>
          </div>

        </div>

        <div className="main-panel">

          <h1 className="text-center mt-4"></h1>

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
)(Newsletter);