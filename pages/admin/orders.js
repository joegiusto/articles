import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'
import moment from 'moment'

import AdminLayout from '../../components/layouts/admin.js';

function AdminHomePage() {
    const router = useRouter()
    const { param } = router.query
  
    return(
        <section className="submissions-page">

            <Head>
                <title>Admin - Articles</title>
            </Head> 

            <div className="container py-3">
                <h2>Orders Page</h2>
                <p>Admin stuff here.</p>
            </div>

        </section>
    )
}

class Orders extends Component {
    constructor(props) {
    super(props);
    
      this.state = {
        loading: false,
        orders: [],
        table_tab: 'Awaiting Shipment',
  
        order: {},
        tracking_code: '',
        tracking_code_popup: false,
  
        // TODO - Holding off on this for now, 
        // preorders: [],
  
        awaiting_shipment: [],
        shipped: [],
        delivered: [],
  
        deleted: []
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleOrderEdit = this.handleOrderEdit.bind(this);
    }
  
    componentDidMount() {
      const self = this;
    //   this.props.setLocation(this.props.tabLocation);
  
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
          // awaiting_shipment: response.data.filter(order => order.status === 'Awaiting Shipment'),
          // shipped: response.data.filter(order => order.status === 'Shipped'),
          // delivered: response.data.filter(order => order.status === 'Delivered'),
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
  
    handleChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        ...this.state,
        [name]: value
      });
    }
  
    handleOrderEdit(id, status) {
  
      this.setState({
        orders: this.state.orders.map(el => (el._id === id ? Object.assign({}, el, { status }) : el))
      });
  
    }
  
    progressOrder(order) {
      const self = this
  
      if (order.status === 'Awaiting Shipment') {
        this.setState({
          tracking_code_popup: true,
          currentOrder: order
        })
      } else if (order.status === 'Shipped') {
  
        axios.post('/api/progressShipped', {
          order: order,
        })
        .then(function (response) {
    
          console.log(response);
    
          self.setState({ 
            order: {},
            tracking_code: '',
            tracking_code_popup: false,
            orders: [
  
            ]
          });
    
        })
        .catch(function (error) {
          console.log(error);
    
          // self.setState({
          //   products: [],
          // })
  
        });
  
      }
  
    }
  
    progressNeedsShipping() {
      const self = this;
  
      axios.post('/api/progressNeedsShipping', {
        order: this.state.currentOrder,
        tracking_code: this.state.tracking_code
      })
      .then(function (response) {
  
        console.log(response);
  
        self.handleOrderEdit(self.state.currentOrder._id, 'Shipped')
  
        self.setState({ 
          order: {},
          tracking_code: '',
          tracking_code_popup: false,
        });
  
      })
      .catch(function (error) {
        console.log(error);
  
        // self.setState({
        //   products: [],
        // })
  
      });
  
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
  
      // const needs_shipping = this.state.needs_shipping;
  
      return (
        <div className="admin-page admin-orders">
  
          <div className={"tracking-code-popup " + (this.state.tracking_code_popup ? 'active' : '')}>
  
            <div className="background" onClick={() => this.setState({
              tracking_code_popup: false,
              currentOrder: {}
            })}></div>
  
            <div className="window">
  
              <div className="mb-3">
                <button className="btn btn-articles-light alt">USPS</button>
                <button className="btn btn-articles-light ml-1">UPS</button>
                <button className="btn btn-articles-light ml-1">FedEx</button>
              </div>
  
              <div className="form-group articles">
                <label for="title">Tracking Code</label>
                <input 
                  type="text"
                  className="form-control with-label"
                  value={this.state.tracking_code}
                  onChange={this.handleChange}
                  id="tracking_code"
                  name="tracking_code"
                />
              </div>
  
              <div>
  
                <div className="font-weight-bold">Link:</div>
                <a className="d-block mb-3" rel="noopener noreferrer" target="_blank" href={`https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${this.state.tracking_code}`}>
                  {`https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${this.state.tracking_code}`}
                </a>
  
                <div className="mb-3">PLEASE CHECK THE LINK!</div>
  
              </div>
  
              <button onClick={() => this.setState({ 
                order: {},
                tracking_code: '',
                tracking_code_popup: false,
              })} className="btn btn-danger">Cancel</button>
  
              <button disabled={this.state.tracking_code === '' ? true : false} onClick={() => this.progressNeedsShipping()} className="btn btn-articles-light ml-1">Progress</button>
  
            </div>
  
          </div>
  
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
  
          <div className="main-panel orders w-75">
  
            <div className="table-filters mb-3">
              <button onClick={() => this.setState({table_tab: 'Awaiting Shipment'})} className={"btn btn-articles-light " + (this.state.table_tab === 'Awaiting Shipment' ? 'alt' : '')}>Awaiting Shipment</button>
              <button onClick={() => this.setState({table_tab: 'Shipped'})} className={"btn btn-articles-light ml-1 " + (this.state.table_tab === 'Shipped' ? 'alt' : '')}>Shipped</button>
              <button onClick={() => this.setState({table_tab: 'Delivered'})} className={"btn btn-articles-light ml-1 " + (this.state.table_tab === 'Delivered' ? 'alt' : '')}>Delivered</button>
              {/* <button onClick={() => this.setState({table_tab: 'Deleted'})} className={"btn btn-articles-light ml-1 " + (this.state.table_tab === 'Deleted' ? 'alt' : '')}>Deleted</button> */}
            </div>
  
            <div className="table-responsive">
              <table className='table articles-table table-sm table-hover table-bordered'>
                <thead>
                  <tr className="table-articles-head">
                    {/* <th scope="col">Order #</th> */}
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Order Summary</th>
                    <th scope="col">Order Status</th>
                    <th className='' scope="col">Total</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
  
                  {this.state.table_tab === "Awaiting Shipment" ?
      
                    this.state.orders.filter(order => order.status === 'Awaiting Shipment').map(order => 
                    <tr key={order._id}>
                      <td colSpan="1" className="border-right-0 ">{moment(order.date).format("LLL")}</td>
                      <td colSpan="1" className="border-right-0 ">{order.user_id}</td>
                      <td colSpan="1" className="border-right-0 ">{order.items.length} Item{order.items.length > 1 ? 's' : ''}</td>
                      <td colSpan="1" className="border-right-0 ">{order.status}</td>
                      <td colSpan="1" className="border-right-0 ">${(order.payment.trueTotal / 100).toFixed(2)}</td>
  
                      <td colSpan="1" width={'150px'} className="border-right-0 ">
                        <button onClick={() => this.progressOrder(order)} className="badge badge-success">Progress</button>
                        <ConfirmDelete className="ml-1" afterConfirm={() => this.removeOrder(order._id)}></ConfirmDelete>
                      </td>
                    </tr>
                  )
  
                  :
  
                  this.state.table_tab === 'Shipped' ? 
  
                  this.state.orders.filter(order => order.status === 'Shipped').map(order => 
                    <tr key={order._id}>
                      <td colSpan="1" className="border-right-0 ">{moment(order.date).format("LLL")}</td>
                      <td colSpan="1" className="border-right-0 ">{order.user_id}</td>
                      <td colSpan="1" className="border-right-0 ">{order.items.length} Item{order.items.length > 1 ? 's' : ''}</td>
                      <td colSpan="1" className="border-right-0 ">{order.status}</td>
                      <td colSpan="1" className="border-right-0 ">${(order.payment.trueTotal / 100).toFixed(2)}</td>
                      
                      <td colSpan="1" width={'150px'} className="border-right-0 ">
                        <button onClick={() => this.progressOrder(order)} className="badge badge-success">Progress</button>
                        <ConfirmDelete className="ml-1" afterConfirm={() => this.removeOrder(order._id)}></ConfirmDelete>
                      </td>
                    </tr>
                  )
  
                  : 
  
                  this.state.table_tab === 'Delivered' ? 
  
                  this.state.orders.filter(order => order.status === 'Delivered').map(order => 
                    <tr key={order._id}>
                      <td colSpan="1" className="border-right-0 ">{moment(order.date).format("LLL")}</td>
                      <td colSpan="1" className="border-right-0 ">{order.user_id}</td>
                      <td colSpan="1" className="border-right-0 ">{order.items.length} Item{order.items.length > 1 ? 's' : ''}</td>
                      <td colSpan="1" className="border-right-0 ">{order.status}</td>
                      <td colSpan="1" className="border-right-0 ">${(order.payment.trueTotal / 100).toFixed(2)}</td>
  
                      <td colSpan="1" width={'150px'} className="border-right-0 ">
                        {/* <button className="badge badge-success">Progress</button> */}
                        <ConfirmDelete afterConfirm={() => this.removeOrder(order._id)}></ConfirmDelete>
                        <button className="badge badge-warning">Archive</button>
                      </td>
                    </tr>
                  )
  
                  :
  
                  ''
  
                  }
      
                  <tr>
                    <td colSpan="3" className="border-right-0 table-articles-head"></td>
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

Orders.Layout = AdminLayout;
export default Orders;