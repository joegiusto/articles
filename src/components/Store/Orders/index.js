import React, {Component} from 'react'
import { Helmet } from "react-helmet";
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes';
import axios from 'axios';
import moment from 'moment';
import OrderCard from './OrderCard';

class OrdersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      order_id: props.match?.params?.id || '',
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
          <title>Orders - Articles</title>
        </Helmet>

        <div className="container d-flex flex-column align-items-center">

          <div className="orders-card card">

            <div className="card-header">
              Orders
            </div>

            <div className="card-body">

              <div className="mb-3">
                <button className="btn btn-articles-light alt">Active - {this.props.orders.length}</button>
                <button className="btn btn-articles-light">Archived</button>
              </div>

              {this.props.auth ? 

              orderLoading ?
                null
              :
              this.props.orders?.map((order) => (
                <Link to={ROUTES.STORE_ORDERS + '/' + order._id}>
                  <OrderCard order={order} />
                </Link>
              ))

              :

              <div className="sign-in-required-global-tag">
                <div>Please Sign In to see recent orders</div>
                <Link to={ROUTES.SIGN_IN}><button className="btn btn-articles-light mt-3">Sign In</button></Link>
              </div>
              }

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
  auth: state.auth.isAuthenticated,
  orders: state.auth.user_details.ordersFetched,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(OrdersPage);