import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class FunctionalityCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmUnsubscribe: false,
      notifications: Math.floor((Math.random() * 10) + 1)
    }
  }

  callRemoveUserSub(uid) {
    this.setState( {confirmUnsubscribe: false} );
    this.props.removeUserSub(uid)
  }

  render() {

    // const {object, removeUserSub} = this.props;

    return (
      <div className="functionality-card"  key={this.props.object.uid}>

        <div className={"confirm-unsubscribe " + (this.state.confirmUnsubscribe === true ? '' : 'd-none')}>
          <div className="meesage">Are you sure you want to unsubscribe from updates on {this.props.object.title}</div>
          <div>
            <button onClick={() => {this.setState( {confirmUnsubscribe: false} )}} className="btn btn-sm btn-articles-light ml-1">Cancel</button>
            <button onClick={() => {this.callRemoveUserSub(this.props.object.uid)}} className="btn btn-sm btn-articles-light ml-1">Unsubscribe</button>
          </div>
        </div>

        <div className="count-container d-flex">
          <div className="count">{this.state.notifications}</div>
          <h1>{this.props.object.title}</h1>
          <p>{this.props.object.slogan}</p>
        </div>

        <div className="content-container">
          <Link to={`./news/issues/${this.props.object.uid}`}><button onClick={() => null} className="btn btn-sm btn-articles-light">View</button></Link>
          <button onClick={() => {this.setState( {confirmUnsubscribe: true} )}} className="btn btn-sm btn-articles-light ml-1">Unsubscribe</button>
        </div>
      </div>
    )
  }
};

export default FunctionalityCard;
