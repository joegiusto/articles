import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

class Account extends Component {
  constructor(props) {
  super(props);
  
    this.state = {

    };

  }

  componentDidMount() {
    const self = this;
    // this.props.setLoaction(this.props.tabLocation);
  }

  render() {

    return (
      <div className="settings-account mt-5">
        Account
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id
});

export default connect(
  mapStateToProps,
)(Account);