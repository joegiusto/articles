import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'
import moment from 'moment'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import articlesTheme from 'components/material_ui/articlesTheme'

import ROUTES from 'components/constants/routes'

import AdminLayout from 'components/layouts/admin.js';
import ConfirmDelete from 'components/ConfirmDelete';

function AdminOrders() {
    const router = useRouter()
    const { param } = router.query

    const [itemName, setItemName] = useState('Order');

    const [modalShow, setModalShow] = useState(false);

    const [ orders, setOrders ] = useState([]);
    const [ loading , setLoading ] = useState(false);
    const [ table_tab , set_table_tab ] = useState('Awaiting Shipment');

    const [ order, setOrder ] = useState({});
    const [ selectedDate, handleDateChange ] = useState(new Date());

    const [ tracking_code, set_tracking_code ] = useState('');
    const [ tracking_code_popup, set_tracking_code_popup ] = useState(false);

    const [ deleted, setDeleted ] = useState([]);

    useEffect(() => {
		
		axios.get('/api/admin/orders', {
            params: {
                fromDate: '',
                toDate: '',
                limit: '100',
                page: '1',
                // user_id: self.props.user_id || ''
            }
        })
        .then(function (response) {
            console.log(response);

            setOrders(response.data)

            // self.setState({
            //     orders: response.data
            //     // awaiting_shipment: response.data.filter(order => order.status === 'Awaiting Shipment'),
            //     // shipped: response.data.filter(order => order.status === 'Shipped'),
            //     // delivered: response.data.filter(order => order.status === 'Delivered'),
            // }, () => {
            //     console.log("Done")

            //     let total = 0

            //     var val = self.state.orders.map(function (item) {
            //         return total += item.payment.trueTotal
            //     });

            //     // console.log(val);

            //     self.setState({

            //         totals: {
            //             ...self.state.totals,
            //             // clothing: self.state.revenues_clothing.reduce(function(previousValue, currentValue) {
            //             //   return previousValue.payment.trueTotal + currentValue.payment.trueTotal
            //             // })
            //             clothing: total
            //         }

            //     })

            // })

        })
        .catch(function (error) {
            console.log(error);
        });

	}, []);

    useEffect(async () => {
        
    });

    const handleClose = () => {
		setModalShow(false); 
		// setActiveDonationID(''); 
	}

    const handleFieldChange = e => {
		const { name, value } = e.target;
		setOrder(prevState => ({
			...prevState,
			[name]: value
		}));
	};

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const addItem = () => {

		if (donation.user_id == '') {
			delete donation.user_id;
		}

		// axios.post('/api/admin/donations/add', {
		// 	donation,
		// 	selectedDate
		// })
		// .then( (response) => {
		// 	console.log(response)
		// 	// setDonations(donations.filter(item => item._id !== response.data.removed_id));
		// 	setDonations(prevState => ([
		// 		...prevState,
		// 		response.data.populatedDonation
		// 	]));
		// })
		// .catch( (error) => {
		// 	console.log(error);
		// });
	}

    function deleteItem(item_id) {
        console.log("Delete Item called")
    }

    return (
        <section className="admin-page admin-orders">

            <Head>
                <title>Admin Orders - Articles</title>
            </Head>

            {/* Add Order Modal */}
            <Modal show={modalShow} className="donations-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>{itemName} Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="donate-form">

                        <div className="row">

                            <div className="col-lg-6">
                                <ThemeProvider theme={articlesTheme}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            label="Date"
                                            inputVariant="outlined"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            className="form-group articles mb-3 w-100"
                                        />
                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group articles">
                                    <label for="address">Created By</label>
                                    <input 
                                        className="form-control with-label" 
                                        onChange={handleFieldChange}
                                        name="createdBy" 
                                        id="createdBy" 
                                        type="text" 
                                        disabled
                                        value={order.createdBy}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">

                                <div className="form-group articles">
                                    <label className="d-flex justify-content-between" for="address">
                                        <span>Amount</span>
                                        <span>${ numberWithCommas( (order.amount / 100).toFixed(2) ) }</span>
                                    </label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleFieldChange}
                                        name="amount"
                                        id="amount" 
                                        type="text" 
                                        value={order.amount}
                                    />
                                </div>

                            </div>

                            <div className="col-lg-6">
                                <div className="form-group articles">
                                    <label for="address">User</label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleFieldChange}
                                        name="user_id" 
                                        id="user_id" 
                                        type="text" 
                                        value={order.user_id}
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                            <   div className="mb-3 d-flex justify-content-center">
                                    <button onClick={() => handleDonationAmountChange(100)} className="flex-grow-1 btn btn-articles-light btn-sm">$1.00</button>
                                    <button onClick={() => handleDonationAmountChange(500)} className="flex-grow-1 btn btn-articles-light btn-sm">$5.00</button>
                                    <button onClick={() => handleDonationAmountChange(1000)} className="flex-grow-1 btn btn-articles-light btn-sm">$10.00</button>
                                    <button onClick={() => handleDonationAmountChange(1000)} className="flex-grow-1 btn btn-articles-light btn-sm">$15.00</button>
                                    <button onClick={() => handleDonationAmountChange(2000)} className="flex-grow-1 btn btn-articles-light btn-sm">$20.00</button>
                                    <button onClick={() => handleDonationAmountChange(2000)} className="flex-grow-1 btn btn-articles-light btn-sm">$30.00</button>
                                    <button onClick={() => handleDonationAmountChange(5000)} className="flex-grow-1 btn btn-articles-light btn-sm">$50.00</button>
                                    <button onClick={() => handleDonationAmountChange(10000)} className="flex-grow-1 btn btn-articles-light btn-sm">$100.00</button>
                                </div>
                            </div>

                            {/* <div className="col-12">
                                <hr className="mt-0 mb-3"/>
                            </div> */}

                            <div className="col-lg-12">
                                <div className="form-group articles">
                                    <label for="address">Message</label>
                                    <textarea className="form-control with-label" onChange={handleFieldChange} name="message" id="message" type="text">
                                        {order.message}
                                    </textarea>
                                </div>
                            </div>

                        </div>

                    </div>

                </Modal.Body>
                
                <Modal.Footer className="d-flex justify-content-between">

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="articles-light" onClick={addItem}>
                        Add {itemName}
                    </Button>

                </Modal.Footer>
            
            </Modal>

            <div className="side-panel">

                <div className="card">
                    <div className="card-header">Status</div>
                    <div className="card-body">
                        {/* <div>Preorders - 0</div> */}
                        <div>Needs Shipping - 0</div>
                        <div>Pending Delivery - 0</div>
                        <div>Delivered - 0</div>
                        <hr />
                        <div>Deleted - 0</div>
                    </div>
                </div>

            </div>

            <div className="main-panel orders">

                <div className="card manage-card mb-3">

                    <div className="card-header flex-column flex-lg-row">

                        <div className="d-flex flex-column flex-lg-row align-items-center">

                            <div className="d-flex align-items-center mb-1 mb-lg-0">
                                <i className="fas fa-edit fa-2x"></i>
                                <h3 className="mb-0">Manage {itemName}s</h3>
                                <div className="total">({orders.length})</div>
                            </div>

                            <div className="table-filters d-flex mt-3 ml-lg-3 mt-lg-0 mb-3 mb-lg-0">
                                <button onClick={() => set_table_tab('Awaiting Shipment') } className={"btn btn-articles-light btn-sm " + (table_tab === 'Awaiting Shipment' ? 'alt' : '')}>Awaiting Shipment ({orders.filter(order => order.status === 'Awaiting Shipment').length})</button>
                                <button onClick={() => set_table_tab('Shipped') } className={"btn btn-articles-light btn-sm ml-1 " + (table_tab === 'Shipped' ? 'alt' : '')}>Shipped ({orders.filter(order => order.status === 'Shipped').length})</button>
                                <button onClick={() => set_table_tab('Delivered') } className={"btn btn-articles-light btn-sm ml-1 " + (table_tab === 'Delivered' ? 'alt' : '')}>Delivered ({orders.filter(order => order.status === 'Delivered').length})</button>
                                {/* <button onClick={() => this.setState({table_tab: 'Deleted'})} className={"btn btn-articles-light ml-1 " + (table_tab === 'Deleted' ? 'alt' : '')}>Deleted</button> */}
                            </div>

                        </div>

                        <button onClick={() => setModalShow(true)} className="btn btn-articles-light btn-sm">Add {itemName}</button>

                    </div>

                    <div className="card-body p-0">

                        <div className="table-responsive">
                            <table className="table table-sm mb-0">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">User</th>
                                        <th scope="col">Items</th>
                                        <th scope="col">Type</th>
                                        {/* <th scope="col">Message</th> */}
                                        {/* <th scope="col">Created By</th> */}
                                        <th scope="col">Total</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    { orders.filter(order => order.status === table_tab).length > 0 &&
                                    orders.filter(order => order.status === table_tab).sort((a, b) => new Date(b.date) - new Date(a.date)).map(donation => (

                                        <tr key={donation._id}>

                                            <th scope="row">{moment(donation?.date).format('LL')}</th>

                                            <td>
                                                {donation?.user_id?._id ? <AdminViewUserModal user_id={donation?.user_id._id} name={`${donation.user_id.first_name} ${donation.user_id.last_name}`} buttonType={'badge'} /> : 'No User'}
                                            </td>

                                            <td>{donation?.products?.length}</td>

                                            <td>
                                                {donation?.payment.type == 'cash' && <i className="fas fa-money-bill mr-0"></i>}
                                                {donation?.payment.type == 'card' && <i className="far fa-credit-card mr-0"></i>}
                                            </td>

                                            <td>${(donation?.payment.total / 100).toFixed(2)}</td>

                                            {/* <td></td> */}

                                            {/* <td>{donation.matched ? 'True' : 'False'}</td> */}

                                            <td>
                                                <ConfirmDelete afterConfirm={ () => deleteItem(donation._id) }/>
                                                <div style={{ cursor: 'pointer' }} onClick={() => editDonation(donation._id)} className="badge badge-dark noselect ml-1">Edit</div>
                                            </td>

                                        </tr>

                                    ))}

                                    { orders.filter(order => order.status === table_tab).length == 0 &&
                                        <tr><div className="px-3 py-2">No orders to display</div></tr>
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div className="card-footer text-center">
                        <div className="text-muted">{orders.length} / {orders.length} {itemName}s being shown</div>
                    </div>

                </div>

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
            orders: orders.map(el => (el._id === id ? Object.assign({}, el, { status }) : el))
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
            order: currentOrder,
            tracking_code: tracking_code
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
                    orders: self.state.orders.filter(function (obj) {
                        return obj._id !== id;
                    })
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

        // const needs_shipping = needs_shipping;

        return (
            <div className="admin-page admin-orders">

                <div className={"tracking-code-popup " + (tracking_code_popup ? 'active' : '')}>

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
                                value={tracking_code}
                                onChange={this.handleChange}
                                id="tracking_code"
                                name="tracking_code"
                            />
                        </div>

                        <div>

                            <div className="font-weight-bold">Link:</div>
                            <a className="d-block mb-3" rel="noopener noreferrer" target="_blank" href={`https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${tracking_code}`}>
                                {`https://tools.usps.com/go/TrackConfirmAction?qtc_tLabels1=${tracking_code}`}
                            </a>

                            <div className="mb-3">PLEASE CHECK THE LINK!</div>

                        </div>

                        <button onClick={() => this.setState({
                            order: {},
                            tracking_code: '',
                            tracking_code_popup: false,
                        })} className="btn btn-danger">Cancel</button>

                        <button disabled={tracking_code === '' ? true : false} onClick={() => this.progressNeedsShipping()} className="btn btn-articles-light ml-1">Progress</button>

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
                            <hr />
                            <div>Deleted - 0</div>
                        </div>
                    </div>

                </div>

                <div className="main-panel orders">

                    <div className="card manage-card">

                        <div className="card-header">

                            <div className="d-flex align-items-center">
                                <i className="fas fa-edit fa-2x"></i>
                                <h3 className="mb-0">Manage Donations</h3>
                                <div className="total">({orders.length})</div>
                            </div>

                            <button onClick={() => setModalShow(true)} className="btn btn-articles-light btn-sm">Add Donation</button>

                        </div>

                        <div className="card-body p-0">

                            <div className="table-responsive">
                                <table className="table table-sm mb-0">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">User</th>
                                            <th scope="col">Amount</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Message</th>
                                            <th scope="col">Created By</th>
                                            <th scope="col">Was Matched</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {orders.sort((a, b) => new Date(b.date) - new Date(a.date)).map(donation => (

                                            <tr key={donation._id}>
                                                <th scope="row">{moment(donation.date).format('LL')}</th>
                                                <td>
                                                    {donation.user_id?._id ? <AdminViewUserModal user_id={donation.user_id._id} name={`${donation.user_id.first_name} ${donation.user_id.last_name}`} buttonType={'badge'} /> : 'No User'}
                                                </td>
                                                <td>${(donation.amount / 100).toFixed(2)}</td>

                                                <td>
                                                    {donation.type == 'cash' && <i className="fas fa-money-bill mr-0"></i>}
                                                    {donation.type == 'card' && <i className="far fa-credit-card mr-0"></i>}
                                                </td>

                                                <td>{donation.message}</td>
                                                <td>
                                                    <Link href={ROUTES.TRANSPARENCY_EMPLOYEES + `/${donation.createdBy._id}`}>
                                                        <a className="badge badge-articles">{donation.createdBy.first_name} {donation.createdBy.last_name}</a>
                                                    </Link>
                                                </td>
                                                <td>{donation.matched ? 'True' : 'False'}</td>
                                                <td>
                                                    <ConfirmDelete afterConfirm={() => deleteDonation(donation._id)}></ConfirmDelete>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => editDonation(donation._id)} className="badge badge-dark noselect ml-1">Edit</div>
                                                </td>
                                            </tr>

                                        ))}

                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div className="card-footer text-center">
                            <div className="text-muted">{orders.length} / {orders.length} Donations being shown</div>
                        </div>

                    </div>

                    <div className="table-filters mb-3">
                        <button onClick={() => this.setState({ table_tab: 'Awaiting Shipment' })} className={"btn btn-articles-light " + (table_tab === 'Awaiting Shipment' ? 'alt' : '')}>Awaiting Shipment</button>
                        <button onClick={() => this.setState({ table_tab: 'Shipped' })} className={"btn btn-articles-light ml-1 " + (table_tab === 'Shipped' ? 'alt' : '')}>Shipped</button>
                        <button onClick={() => this.setState({ table_tab: 'Delivered' })} className={"btn btn-articles-light ml-1 " + (table_tab === 'Delivered' ? 'alt' : '')}>Delivered</button>
                        {/* <button onClick={() => this.setState({table_tab: 'Deleted'})} className={"btn btn-articles-light ml-1 " + (table_tab === 'Deleted' ? 'alt' : '')}>Deleted</button> */}
                    </div>

                    <div style={{ maxWidth: '800px' }} className="table-responsive">
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

                                {table_tab === "Awaiting Shipment" ?

                                    orders.filter(order => order.status === 'Awaiting Shipment').map(order =>

                                        <tr key={order._id}>
                                            <td colSpan="1" className="border-right-0 ">{moment(order.date).format("LLL")}</td>
                                            <td colSpan="1" className="border-right-0 ">{order.user_id}</td>
                                            <td colSpan="1" className="border-right-0 ">{order.items?.length} Item{order.items?.length > 1 ? 's' : ''}</td>
                                            <td colSpan="1" className="border-right-0 ">{order.status}</td>
                                            <td colSpan="1" className="border-right-0 ">${(order.payment.trueTotal / 100).toFixed(2)}</td>

                                            {/* <td colSpan="1" width={'150px'} className="border-right-0 ">
                                <button onClick={() => this.progressOrder(order)} className="badge badge-success">Progress</button>
                                <ConfirmDelete className="ml-1" afterConfirm={() => this.removeOrder(order._id)}></ConfirmDelete>
                            </td> */}
                                        </tr>

                                    )

                                    :

                                    table_tab === 'Shipped' ?

                                        orders.filter(order => order.status === 'Shipped').map(order =>
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

                                        table_tab === 'Delivered' ?

                                            orders.filter(order => order.status === 'Delivered').map(order =>
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

AdminOrders.Layout = AdminLayout;
export default AdminOrders;