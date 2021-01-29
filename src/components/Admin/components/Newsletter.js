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
      newsletter_results: []
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

    axios.post('/api/secure/getNewsletterList', {

    })
    .then( (response) => {
      this.setState({newsletter_results: response.data})
      console.log(response.data)
    })
    .catch( (error) => {
      console.log(error);
    });
    
  }

  render() {

    return (
      <div className="admin-page admin-projects">

        <div className="side-panel">

          <div className="card">
            <div className="card-header">Metrics</div>
            <div className="card-body">
              <div><b>General Newsletter: 0</b></div>
              <div><b>Dev Newsletter: 0</b></div>
            </div>
          </div>

        </div>

        <div className="main-panel">

          <h1 className="mt-3">List</h1>

          <div>
            {
              this.state.newsletter_results.map( (result) => (
              <div className="mb-3">
                <div><b>{result.email}</b></div>
                <div>{result.first_name}</div>
                <button className="btn btn-danger btn-sm">Delete</button>
              </div>
            ))}
          </div>

          <h1 className="mt-3">Compose</h1>

          <input className="mb-3" type="text" placeholder="Subject"/>

          <textarea className="d-block mb-3" placeholder="Content">

          </textarea>
          
          <button className="btn btn-articles-light">Schedule</button>

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