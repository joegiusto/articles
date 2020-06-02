import React, {Component} from 'react'
import { Helmet } from "react-helmet";
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';

class OrdersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: props.match.params.id,
      order: {},
      orderLoading: false
    }
  }

  componentDidMount() {
    const self = this;
    this.setState({orderLoading:false});
  }

  render(props) {

    const {order_id, order, orderLoading} = this.state;

    return (
      <div className="order-details">

        <Helmet>
          <title>Updates - Articles</title>
        </Helmet>

        <div className="container d-flex flex-column align-items-center">

          <div className="orders-card card">
            <div className="card-header">Updates</div>
            <div className="card-body">

            </div>
            <div className="card-footer"></div>
          </div>

          {/* <Link to={ROUTES.STORE}><div className="btn btn-articles-light">Back To Store</div></Link> */}

        </div>
      </div>
    )   
  }
}

const mapStateToProps = state => ({
  // auth: state.auth,
  orders: state.auth.user_details.ordersFetched,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(OrdersPage);