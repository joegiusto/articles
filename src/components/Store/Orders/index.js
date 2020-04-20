import React, {Component} from 'react'
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
        <div className="container d-flex flex-column align-items-center">

          <div>

            {orderLoading ? 

            <div className="card">
              <div className="card-body">
                <div className="loading">
                  <i class="fas fa-pencil-alt"></i>
                  <div>Loading... ALL</div>
                </div>
              </div>
            </div>
            :
            this.props.orders.map((order) => (
              <Link to={ROUTES.STORE_ORDERS + '/' + order._id}>

              <OrderCard order={order} />
              {/* <div className="card">
                <div className="card-body">

                  <div className="details">

                    <div className="item">
                      <div className="left">Order Date:</div>
                      <div className="right">{moment.unix(order.order_date).format('LLL')}</div>
                    </div>

                    <div className="item">
                      <div className="left">Order Product:</div>
                      <div className="right">{order.order_title}</div>
                    </div>

                    <div className="item">
                      <div className="left">Order Date:</div>
                      <div className="right">{moment.unix(order.order_date).format('LLL')}</div>
                    </div>

                    <div className="item">
                      <div className="left">Order Total:</div>
                      <div className="right">${(order.order_total / 100).toFixed(2)}</div>
                    </div>

                  </div>

                </div>
              </div> */}

              </Link>
              
            ))}

          </div>

          <Link to={ROUTES.STORE}><div className="btn btn-articles-light mt-3">Back To Store</div></Link>

        </div>
      </div>
    )   
  }
}

const mapStateToProps = state => ({
  // auth: state.auth,
  orders: state.auth.user_details.orders,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(OrdersPage);