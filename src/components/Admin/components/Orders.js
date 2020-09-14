import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      confirm: false
    };

  }

  handleClick() {

    if (this.state.confirm) {
      this.props.afterConfirm()
    } else {
      this.setState({confirm: true})
    }

  }

  render() {
    return (
      this.state.confirm ? 
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className="badge badge-danger noselect">Confirm</div>
      :
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className="badge badge-danger noselect">Delete</div>
    )
  }
}

class Reports extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      loading: false,
      orders: []
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLoaction(this.props.tabLocation);

    // this.setState({
    //   loading: true
    // })

    axios.get('/api/getRevenuesClothing', {
      params: {
        fromDate: '',
        toDate: '',
        limit: '100',
        page: '1',
        user_id: self.props.user_id || ''
      }
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        orders: response.data
      }, () => {
        console.log("Done")

        let total = 0

        var val = self.state.orders.map(function(item) {
          return total += item.payment.trueTotal
        });

        // console.log(val);

        self.setState({

          totals: {
            ...self.state.totals,
            // clothing: self.state.revenues_clothing.reduce(function(previousValue, currentValue) {
            //   return previousValue.payment.trueTotal + currentValue.payment.trueTotal
            // })
            clothing: total
          } 

        })

      })

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  componentWillUnmount() {

  }

  removeOrder(id) {
    const self = this;

    console.log(id);

    console.log("Stopping deletes until confirm option added")

    axios.post('/api/deleteOrder', {
      _id: id 
    })
    .then(function (response) {

      // socket.emit('deleteOrder', id);

      self.setState({
        orders: self.state.orders.filter(function( obj ) {
          return obj._id !== id;
        })
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    const { orders } = this.state;

    return (
      <div className="admin-orders mt-5">

        <div className="order-overview">
          <h5>Orders</h5>

          <div>Preorders - 0</div>
          <div>Needs Shipping - 0</div>
          <div>In Transit - 0</div>
        </div>

        <div className="orders mt-4 w-50">

        <div className="table-responsive">
          <table className='table articles-table table-sm table-hover table-bordered'>
            <thead>
              <tr className="table-articles-head">
                {/* <th scope="col">Order #</th> */}
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">Order Summary</th>
                <th className='text-right' scope="col">Total</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
  
              {orders.map(order => 
                <tr key={order._id}>
                  <td colSpan="1" className="border-right-0 ">{moment(order.date).format("LLL")}</td>
                  <td colSpan="1" className="border-right-0 ">{order.user_id}</td>
                  <td colSpan="1" className="border-right-0 "></td>
                  <td colSpan="1" className="border-right-0 ">${(order.payment.trueTotal / 100).toFixed(2)}</td>
                  <td colSpan="1" className="border-right-0 "><ConfirmDelete afterConfirm={() => this.removeOrder(order._id)}></ConfirmDelete></td>
                </tr>
              )}
  
              <tr>
                <td colSpan="2" className="border-right-0 table-articles-head">
  
                </td>
  
                <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
                <td colSpan="1" className="border-left-0 table-articles-head">$00.00</td>
                <td colSpan="1" className="border-left-0 table-articles-head"></td>
              </tr>
  
            </tbody>
          </table>
        </div>

        {/* {orders.map(order => 
          <div className="order d-flex justify-content-between">
            <div>{ moment(order.date).format("LLL") }</div>
            <div>{ order.payment.trueTotal }</div>
          </div>  
        )} */}

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