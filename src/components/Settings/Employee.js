import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'
import TextareaAutosize from 'react-textarea-autosize';
import { Switch, Route, Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

class Employee extends Component {
  constructor(props) {
  super(props);
  
    this.state = {

    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);
  }

  render() {

    return (
      <div className="settings-employee mb-3">

        {/* Employee */}

        <div className={"card settings-card mt-3 employee-section"}>

            <div className="card-header">
              <h5>Employee Info</h5>
              <p>Info you wish to share with others on your employee page located at:</p>
              <Link to={ROUTES.EMPLOYEES + `/${this.props.user_id}`}> {`articles.media${ROUTES.EMPLOYEES}/${this.props.user_id}`} </Link>
            </div>

            <div className="card-body m-3">

              <div className="mb-3">
                <button className="btn btn-articles-light alt">Visible</button>
                <button className="btn btn-articles-light">Hidden</button>
              </div>

              <div className="form-group articles">
                <label htmlFor="">Quote</label>
                <TextareaAutosize className="form-control with-label" name="content" id="content" type="text" value={this.props.user_details.employee?.quote} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
              </div>

              <div className="form-group articles">
                <label htmlFor="">Movies</label>

                {/* <input className="form-control with-label" name="content" id="content" type="text" value={""} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/> */}

                <TextareaAutosize 
                  className="form-control with-label" 
                  name="content" 
                  id="content" 
                  type="text" 
                  value={this.props.user_details.employee?.movies} 
                  onChange={(e) => {this.handleNewProposalChange(e)}}
                />

              </div>

              <div className="form-group articles">
                <label htmlFor="">Music</label>
                <input className="form-control with-label" name="content" id="content" type="text" value={""} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
              </div>

              <div className="form-group articles">
                <label htmlFor="">Hobbies</label>
                <input className="form-control with-label" name="content" id="content" type="text" value={""} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
              </div>

              <div className="form-group articles">
                <label htmlFor="">Role Models</label>
                <input className="form-control with-label" name="content" id="content" type="text" value={""} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
              </div>

              <div className="form-group articles">
                <label htmlFor="">Favorite Foods</label>
                <input className="form-control with-label" name="content" id="content" type="text" value={""} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
              </div>

            </div>

          </div>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   user_id: state.auth.user.id
// });

// export default connect(
//   mapStateToProps,
// )(Employee);

const mapStateToProps = state => ({
  auth: state.auth,
  user_id: state.auth.user.id,
  user_details: state.auth.user_details,
  orders: state.auth.user_details.ordersFetched,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  // { logoutUser, setUserDetails }
)(Employee);