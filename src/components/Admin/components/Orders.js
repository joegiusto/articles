import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'
import { ConfirmDelete } from '../../Global'

class Reports extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      loading: false,
      orders: [],
      table_tab: 'Needs Shipping',

      // TODO - Holding off on this for now, 
      preorders: [],

      needs_shipping: [],
      pending_delivery: [],
      delivered: [],
      deleted: []
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
        needs_shipping: response.data
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
        needs_shipping: self.state.needs_shipping.filter(function( obj ) {
          return obj._id !== id;
        })
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    const needs_shipping = this.state.needs_shipping;

    return (
      <div className="admin-orders">

        <div className="side-panel">

          <div className="card">
            <div className="card-header">Status</div>
            <div className="card-body">
              {/* <div>Preorders - 0</div> */}
              <div>Needs Shipping - 0</div>
              <div>Pending Delivery - 0</div>
              <div>Delivered - 0</div>
              <hr/>
              <div>Deleted - 0</div>
            </div>
          </div>

        </div>

        <div className="orders w-75">

          <div className="table-filters mb-3">
            <button onClick={() => this.setState({table_tab: 'Needs Shipping'})} className={"btn btn-articles-light " + (this.state.table_tab === 'Needs Shipping' ? 'alt' : '')}>Needs Shipping</button>
            <button onClick={() => this.setState({table_tab: 'Pending Delivery'})} className={"btn btn-articles-light ml-1 " + (this.state.table_tab === 'Pending Delivery' ? 'alt' : '')}>Pending Delivery</button>
            <button onClick={() => this.setState({table_tab: 'Delivered'})} className={"btn btn-articles-light ml-1 " + (this.state.table_tab === 'Delivered' ? 'alt' : '')}>Delivered</button>
            <button onClick={() => this.setState({table_tab: 'Deleted'})} className={"btn btn-articles-light ml-1 " + (this.state.table_tab === 'Deleted' ? 'alt' : '')}>Deleted</button>
          </div>

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

              {this.state.table_tab === "Needs Shipping" ?
  
              needs_shipping.map(order => 
                <tr key={order._id}>
                  <td colSpan="1" className="border-right-0 ">{moment(order.date).format("LLL")}</td>
                  <td colSpan="1" className="border-right-0 ">{order.user_id}</td>
                  <td colSpan="1" className="border-right-0 ">{order.items.length} Item{order.items.length > 1 ? 's' : ''}</td>
                  <td colSpan="1" className="border-right-0 ">${(order.payment.trueTotal / 100).toFixed(2)}</td>
                  <td colSpan="1" width={'150px'} className="border-right-0 "><ConfirmDelete afterConfirm={() => this.removeOrder(order._id)}></ConfirmDelete></td>
                </tr>
              )

              :

              this.state.table_tab === 'Pending Delivery' ? 

              this.state.pending_delivery.map(order => 
                <tr key={order._id}>
                  <td colSpan="1" className="border-right-0 ">{moment(order.date).format("LLL")}</td>
                  <td colSpan="1" className="border-right-0 ">{order.user_id}</td>
                  <td colSpan="1" className="border-right-0 ">{order.items.length} Item{order.items.length > 1 ? 's' : ''}</td>
                  <td colSpan="1" className="border-right-0 ">${(order.payment.trueTotal / 100).toFixed(2)}</td>
                  <td colSpan="1" width={'150px'} className="border-right-0 "><ConfirmDelete afterConfirm={() => this.removeOrder(order._id)}></ConfirmDelete></td>
                </tr>
              )

              : 

              "no"

              }
  
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