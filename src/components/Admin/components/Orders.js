import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

class Reports extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      loading: false,
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLoaction(this.props.tabLocation);

    // this.setState({
    //   loading: true
    // })

  }

  componentWillUnmount() {

  }

  render() {

    return (
      <div className="admin-orders mt-5">

        <div className="orders">
          <h5>Orders</h5>

          <div>Preorders - 0</div>
          <div>Needs Shipping - 0</div>
          <div>In Transit - 0</div>
          
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