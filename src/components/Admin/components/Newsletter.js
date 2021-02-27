import React, {Component, useState} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';

class Newsletter extends Component {
	constructor(props) {
	super(props);
	
		this.state = {
			newsletter_results: [],
			show_draft_modal: false
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

	handleClose = () => {
		this.setState({show_draft_modal: false})
	}

	handleShow = () => {
		this.setState({show_draft_modal: true})
	}

  render() {

    return (
      <div className="admin-page admin-newsletter">
		  
		<Modal show={this.state.show_draft_modal} className="draft-modal articles-modal" centered onHide={this.handleClose}>

			<Modal.Header closeButton>
				<Modal.Title>Drafts</Modal.Title>
			</Modal.Header>

			<Modal.Body>

				<h5>General - Week of 1/31</h5>
				<h5>General - Week of 2/07</h5>
				<h5>General - Week of 2/14</h5>
				<h5>General - Week of 2/21</h5>

			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={this.handleClose}>
					Close
				</Button>
			</Modal.Footer>

		</Modal>

        <div className="side-panel">

          <div className="card">
            <div className="card-header">Metrics</div>
            <div className="card-body">
              <div><b>General Newsletter: 0</b></div>
              <div><b>Dev Newsletter: 0</b></div>
            </div>
          </div>

        </div>

        <div className="main-panel p-0">

          <div className="panel list">

            <h1 className="">General List</h1>

            <div className="list-wrap">
              {
                this.state.newsletter_results.map( (result) => (
                <div className="mb-2">
                  <div><b>{result.email}</b></div>
                  {/* <div>{result.first_name}</div>
                  <button className="btn btn-danger btn-sm">Delete</button> */}
                </div>
              ))}
            </div>

            <h1 className="">Dev List</h1>

            <div className="list-wrap">
              {
                this.state.newsletter_results.map( (result) => (
                <div className="mb-2">
                  <div><b>{result.email}</b></div>
                  {/* <div>{result.first_name}</div>
                  <button className="btn btn-danger btn-sm">Delete</button> */}
                </div>
              ))}
            </div>

          </div> 

          <div className="panel compose">

            <h1 className="">Compose</h1>

			<div className="d-flex justify-content-center py-5">
				<button onClick={this.handleShow} className="btn btn-lg btn-articles-light mb-3">
					<i className="fas fa-file-download mr-2"></i>
					Load Draft
				</button>
			</div>

			{/* Subject and Sender */}
			<div className="d-flex">

				<div className="form-group articles flex-grow-1">
				<label for="address">Subject</label>
				<input className="form-control with-label" name="address" id="address" type="text" value=""/>
				</div>
	
				<div className="form-group articles flex-grow-1">
				<label for="address">Sender</label>
				<input className="form-control with-label" disabled name="address" id="address" type="text" value="Joey Giusto"/>
				</div>

          	</div>

			<div className="form-group articles flex-grow-1">
				<label for="address">Content</label>
				<textarea className="form-control with-label" name="address" id="address" type="text" value=""></textarea>
			</div>

            <div className="d-flex justify-content-center pt-5">
            	<button className="btn btn-lg btn-articles-light"><i className="fas fa-paper-plane mr-2"></i>Send</button>
				<button className="btn btn-lg btn-success"><i className="fas fa-file-upload mr-2"></i> Save</button>
            </div>

          </div>

          <div className="panel preview">
            <h1 className="">Preview</h1>

			<div className="email-wrap">

				<div className="card shadow-articles">
	
					<div className="card-header">
						<h3 className="text-center mb-0">Email Subject</h3>
						<div className="text-muted text-center">Sent by: joey@articles.media</div>
					</div>
	
					<div className="card-body">
	
						<img height="150px" width="150px" className="d-block mx-auto" src="https://cdn.articles.media/email/logo.jpg" alt=""/>
	
						<h4 className="text-center mt-3"><b>Hello {`{user}`}</b></h4>
	
						<p>It has been a busy week at Articles! This week I would like to share with you our new Real ID comment system.</p>
	
						<div className="ongoing-details-wrapper mt-3">
	
							<div className="ongoing-details-section">
								<h5 className="text-center mt-3">Transparency</h5>
								<p>Not much going on here this week!</p>
							  	<p>Ongoing Data</p>
								<div className="row">
									<div className="col-6">
										<ul>
											<li>10 New Revenues</li>
											<li>$80.00 in Revenue</li>
										</ul>
									</div>
									<div className="col-6">
										<ul>
											<li>10 New Revenues</li>
											<li>$80.00 in Revenue</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div className="ongoing-details-section">
								<h5 className="text-center mt-3">Clothing</h5>
								<p>Not much going on here this week!</p>
							  	<p>Ongoing Data</p>
								<div className="row">
									<div className="col-6">
										<ul>
											<li>0 New Orders</li>
										</ul>
									</div>
									<div className="col-6">
										<ul>
											<li>0 New Items</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div className="ongoing-details-section">
								<h5 className="text-center mt-3">News</h5>
								<p>Not much going on here this week!</p>
							  	<p>Ongoing Data</p>
								<div className="row">
									<div className="col-6">
										<ul>
											<li>10 New Revenues</li>
											<li>$80.00 in Revenue</li>
										</ul>
									</div>
									<div className="col-6">
										<ul>
											<li>10 New Revenues</li>
											<li>$80.00 in Revenue</li>
										</ul>
									</div>
								</div>
							</div>
		
							<div className="ongoing-details-section">
								<h5 className="text-center mt-3">Politics</h5>
								<p>Not much going on here this week!</p>
								<p>Ongoing Data</p>
								<ul>
									<li>0 new proposals added</li>
								</ul>
							</div>
	
						</div>
	
					</div>
	
				</div>
	
				<div className="bottom-details">
					<div>© 2021 Articles Media, Inc. All rights reserved.</div>
					<a>Click here to unsubscribe</a>
				</div>

			</div>

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
)(Newsletter);