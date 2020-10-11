import React, {Component} from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes';
import axios from 'axios';
import moment from 'moment';
// import OrderCard from './OrderCard';

class SingleOrderPage extends Component {
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
    this.setState({orderLoading:true});

    const storedOrders = this.props.auth.user_details.ordersFetched.find(x => x._id === this.props.match.params.id)

    if (storedOrders !== undefined) {
      // Try to pull from local storage and if not there then do server call
      self.setState({
        order: storedOrders,
        orderLoading: false
      });
    } else {
      // Was not local, we make a server call!
      axios.post('/api/secure/getOrderDetails', {
        order_id: self.state.order_id
      })
      .then(function (response) {
  
        console.log(response);
  
        self.setState({
          order: response.data.order,
          orderLoading: false
        });
  
      })
      .catch(function (error) {
        self.setState({
          orderLoading: false
        });
        console.log("Post to /api/secure/getOrderDetails has failed, reason below.");
        console.log(error);
      });
    }

    

  }

  render(props) {

    const {order_id, order, orderLoading} = this.state;

    return (
      <div className="order-details">
        <div className="container d-flex flex-column align-items-center">

          <div>
            <div className="card">

              <div className="card-header">
                Order {order_id}
              </div>

              <div className="card-body">
    
                {orderLoading ? 
    
                <div className="loading">
                  <i className="fas fa-pencil-alt"></i>
                  <div>Loading... </div>
                </div>
                  
                :
    
                <div className="details">
  
                  <div className="item">
                    <div className="title">Order Date:</div>
                    <div className="right">{moment(order.date).format('LLL')}</div>
                  </div>
  
                  <div className="item">
                    <div className="title">Products:</div>
                    <div className="right">
                      {order.items?.map(item => 
                        <div>{item.description}</div>
                      )}
                    </div>
                  </div>
  
                  <div className="item">
                    <div className="title">Order Date:</div>
                    <div className="right">{moment(order.date).format('LLL')}</div>
                  </div>
  
                  <div className="item">
                    <div className="title">Order Total:</div>
                    <div className="right">${(order.payment?.amount / 100).toFixed(2)}</div>
                  </div>

                  <div className="item">
                    <div className="title">Tracking Code:</div>
                    <div className="right">
                      <a href={order.tracking_code}>{order.tracking_code}</a>
                    </div>
                  </div>
  
                </div>
    
                }
    
              </div>

            </div>

            {orderLoading ? 
            null
            :
            <div className="buttons-below">
              <div className="row mt-2">
  
                <div className="col-12 col-sm-6">
                  <div className="btn btn-articles-light">Get Order Help</div>
                </div>
  
                <div className="col-12 col-sm-6">
                  <Link to={ROUTES.STORE_ORDERS}><div className="btn btn-articles-light">View All Orders</div></Link>
                </div>
  
              </div>
            </div>
            }
            </div>

          

        </div>
      </div>
    )   
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(SingleOrderPage);