import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import AdminViewUserModal from './Shared/AdminViewUserModal'
import materialTheme from './Shared/Material-UI-Theme'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

import TextareaAutosize from 'react-textarea-autosize';

import ConfirmDelete from './ConfirmDelete';

function ExpensesAdmin(props) {
    const [expenses, setExpenses] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const [expense, setExpense] = useState({
		// createdBy: '5e90cc96579a17440c5d7d52',
		// amount: 100,
		// user_id: '',
		// message: '',
        // _id: ''
	});

    const [selectedDate, handleDateChange] = useState(new Date());

    useEffect(() => {
        props.setLocation(props.tabLocation);
    
        axios.get('/api/getExpenses')
        .then(function (response) {
            console.log(response);
            setExpenses(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    
    }, []);

    const handleClose = () => {
        setModalShow(false); 
        setExpense(prevState => ({}));
        handleDateChange(new Date())
        // setActiveDonationID(''); 
        // setActivePresident({}); 
        // props.history.push(ROUTES.ADMIN_DONATIONS);
    }

    const handleExpenseChange = e => {
		const { name, value } = e.target;
		setExpense(prevState => ({
			...prevState,
			[name]: value
		}));
	};

    const handleExpenseAmountChange = e => {
		const { name, value } = e.target;
		setExpense(prevState => ({
			...prevState,
			[name]: value
		}));
	};

    const addExpense = () => {

		// if (donation.user_id == '') {
		// 	delete donation.user_id;
		// }

		// axios.post('/api/secure/addDonation', {
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

	const deleteExpense = (id) => {
		console.log(id)

		axios.post('/api/secure/deleteExpense', {
			id
		})
		.then( (response) => {
			console.log(response)
			setExpenses(expenses.filter(item => item._id !== response.data.removed_id));
		})
		.catch( (error) => {
			console.log(error);
		});
	}

    const editExpense = (id) => {
		console.log(id);

        setModalShow(true);

        const expenseToSet = expenses.find(item => item._id == id);
        handleDateChange(expenseToSet.date)
        console.log(expenseToSet)

        setExpense( prevState => ( {
            ...prevState,
            ...expenseToSet
        } ) );

        // setExpense(prevState => ({
		// 	...prevState,
		// 	_id: id
		// }));

	}

    const upsertExpense = (id) => {
        console.log('upsertExpense called')

        const expenseToSend = {
            ...expense,
            date: selectedDate,
        }

        console.log(expenseToSend)

        axios.post('/api/secure/upsertExpense', expenseToSend)
		.then( (response) => {

			console.log(response.data.result._id)
            console.log(response)

            // setExpenses();

            // filter out newResponsesOldResults
            const expensesToSet = [
                ...expenses.filter(item => item._id != response.data.result._id),
                response.data.result
            ]

            console.log(expensesToSet)

            setExpenses( prevState => ( expensesToSet ) );

            handleClose()
			// setDonations(donations.filter(item => item._id !== response.data.removed_id));
			// setDonations(prevState => ([
			// 	...prevState,
			// 	response.data.populatedDonation
			// ]));
		})
		.catch( (error) => {
			console.log(error);
		});
    }

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return(
        <div className="admin-page admin-expenses">

            {/* Add Donation Modal */}
            <Modal show={modalShow} className="donations-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Expense Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="donate-form">

                        <div className="row">

                            <div className="col-lg-6">
                                <ThemeProvider theme={materialTheme}>
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
                                    <label className="d-flex justify-content-between" for="address">
                                        <span>Amount</span>
                                        <span>${ numberWithCommas( (expense.amount / 100).toFixed(2) ) }</span>
                                    </label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleExpenseAmountChange}
                                        name="amount"
                                        id="amount" 
                                        type="text" 
                                        value={ expense.amount }
                                    />
                                </div>
                            </div>

                            {/* <div className="col-lg-12">

                                <div className="form-group articles mx-auto" style={{maxWidth: "200px"}}>
                                    <label for="address">Amount</label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleDonationChange}
                                        name="amount"
                                        id="amount" 
                                        type="text" 
                                        value={donation.amount}
                                    />
                                </div>

                                <div className="mb-3 d-flex justify-content-center">
                                    <button onClick={() => handleDonationAmountChange(100)} className="btn btn-articles-light btn-sm">$1.00</button>
                                    <button onClick={() => handleDonationAmountChange(500)} className="btn btn-articles-light btn-sm">$5.00</button>
                                    <button onClick={() => handleDonationAmountChange(1000)} className="btn btn-articles-light btn-sm">$10.00</button>
                                    <button onClick={() => handleDonationAmountChange(2000)} className="btn btn-articles-light btn-sm">$20.00</button>
                                    <button onClick={() => handleDonationAmountChange(5000)} className="btn btn-articles-light btn-sm">$50.00</button>
                                    <button onClick={() => handleDonationAmountChange(10000)} className="btn btn-articles-light btn-sm">$100.00</button>
                                </div>

                            </div>

                            <div className="col-12">
                                <hr className="mt-0 mb-3"/>
                            </div>
                            */}

                            <div className="col-lg-12 mx-auto">
                                <div className="form-group articles">
                                    <label for="address">Reason</label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleExpenseChange}
                                        name="reason" 
                                        id="reason" 
                                        type="text" 
                                        value={expense.reason}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12 mx-auto">
                                <div className="form-group articles">
                                    <label for="file">File</label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleExpenseChange}
                                        name="file" 
                                        id="file" 
                                        type="text" 
                                        value={expense.file}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12">
                                <div className="form-group articles">
                                    <label for="note">Note</label>
                                    {/* <textarea className="form-control with-label" rows="" onChange={handleExpenseChange} name="note" id="note" type="text">
                                        {expense.note}
                                    </textarea> */}
                                    <TextareaAutosize 
                                        className="form-control with-label" 
                                        name="note" 
                                        id="note" 
                                        type="text"
                                        minRows='4'
                                        value={expense.note}
                                        onChange={handleExpenseChange} 
                                    />
                                </div>
                            </div>

                            

                        </div>

                    </div>

                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between">

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="articles-light" onClick={upsertExpense}>
                        {expense._id === '' ? 'Add' : 'Save'} Expense
                    </Button>

                </Modal.Footer>

            </Modal>

            <div className="side-panel">
                <div className="card">
                    <div className="card-header">Details</div>
                    <div className="card-body">
                        <div>Payroll: $0.00</div>
                        <div>Inventory: $0.00</div>
                        <div>Reoccurring: <b>${(expenses.reduce((a, b) => a + (parseInt(b['amount'] || 0)), 0) / 100).toFixed(2)}</b></div>
                        <div>Utilities: $0.00</div>
                        <div>Other: $0.00</div>
                    </div>
                </div>
            </div>

            <div className="main-panel">
                
                <div className="card manage-card">

                    <div className="card-header">

                    <div className="d-flex align-items-center">
                        <i className="fas fa-edit fa-2x"></i>
                        <h3 className="mb-0">Manage Expenses</h3>
                        <div className="total">({expenses.length})</div>
                    </div>

                    <button onClick={() => setModalShow(true)} className="btn btn-articles-light btn-sm">Add Expense</button>

                </div>

                    <div className="card-body p-0">

                    <div className="table-responsive">
                        <table className="table table-sm mb-0">
                        <thead className="thead-dark">

                            {/* <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Name</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Type</th>
                                <th scope="col">Message</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Was Matched</th>
                                <th scope="col">Action</th>
                            </tr> */}

                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Reason</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Note</th>
                                <th scope="col">File</th>
                                <th scope="col">Actions</th>
                            </tr>

                        </thead>
                        <tbody>

                            {expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (

                                <tr key={expense._id}>
                                    <th scope="row">{moment(expense.date).format('LL')}</th>
                                    <td>{expense.reason}</td>
                                    <td>${(expense.amount / 100).toFixed(2)}</td>
                                    <td>{expense.note}</td>
                                    <td><a target="_blank" rel="noopener noreferrer" href={expense.file}><i className="far fa-file-pdf"></i></a></td>
                                    <td className="actions-cell">
                                        <ConfirmDelete afterConfirm={() => deleteExpense(expense._id)}></ConfirmDelete>
                                        <div style={{cursor: 'pointer'}} onClick={() =>editExpense(expense._id)} className="badge badge-dark noselect ml-1">Edit</div>
                                    </td>
                                </tr>

                                // <tr key={expense._id}>
                                //     <th scope="row">{expense.reason}</th>
                                //     <td>${expense.amount / 100}</td>
                                //     <td>{moment(expense.date).format("LL")}</td>
                                //     <td>{expense.note}</td>
                                //     <td><a target="_blank" rel="noopener noreferrer" href={expense.file}><i className="far fa-file-pdf"></i></a></td>
                                //     <td>
                                //         <div className="btn btn-sm btn-articles-light alt" onClick={() => this.loadExpense(expense._id)}>Edit</div>
                                //         <ConfirmDelete afterConfirm={() => this.removeExpense(expense._id)} />
                                //     </td>
                                // </tr>
                            
                            ))}

                        </tbody>
                        </table>
                    </div>

                </div>

                    <div className="card-footer text-center">
                        <div className="text-muted">{expenses.length} / {expenses.length} Expenses being shown</div>
                    </div>

                </div>

            </div>

        </div>
    )
}

class Donations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expenses: [],
            form: {
                _id: '',
                amount: 0,
                reason: '',
                file: '',
                note: '',
                date: new Date()
            }
        };

        this.handleFormChange = this.handleFormChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    cancelExpense() {
        this.setState({
            form: {
                _id: '',
                amount: 0,
                reason: '',
                file: '',
                note: '',
                date: new Date()
            }
        });
    }

    loadExpense(id) {
        this.setState({
            form: this.state.expenses.find(function (obj) {
                return obj._id === id;
            })
        });
    }

    componentDidUpdate(prevProps, prevState) {

        if ((prevState.form._id !== this.state.form._id && this.state.form._id !== '')) {
            console.log("Update occurred");
        }

    }

    componentDidMount() {
        this.props.setLocation(this.props.tabLocation);
        const self = this;

        axios.get('/api/getExpenses')
            .then(function (response) {

                console.log(response);

                self.setState({
                    expenses: response.data,
                });

            })
            .catch(function (error) {
                console.log(error);

                // self.setState({
                //   expenses: [],
                //   form: {
                //     amount: 0,
                //     reason: '',
                //     file: '',
                //     note: '',
                //     date: new Date()
                //   }
                // })

            });
    }

    handleDateChange(day) {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                date: day,
            }
        });
    }

    handleFormChange(event) {
        const self = this;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: value
            }
        })
    }

    removeExpense(id) {
        const self = this;

        console.log(id);

        axios.post('/api/deleteExpense', {
            _id: id
        })
            .then(function (response) {

                // socket.emit('deleteExpense', id);

                self.setState({
                    expenses: self.state.expenses.filter(function (obj) {
                        return obj._id !== id;
                    })
                });

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentWillUnmount() {
        this.props.setLocation('');
    }

    upsertExpense() {
        console.log("Ran")
        const self = this;
        const form = self.state.form;

        axios.post('/api/upsertExpense', {
            form
        })
            .then(function (response) {

                console.log(response.data)

                // console.log(`Should be: ${response.data.upsertedId._id}`);

                if (response.data.upsertedId == null) {

                    // self.setState({
                    //   expenses: self.state.expenses.filter(function( obj ) {
                    //     return obj._id !== form._id;
                    //   })
                    // });

                    self.setState({
                        expenses: self.state.expenses.filter(function (obj) {
                            return obj._id !== form._id;
                        })
                    }, () => self.setState({
                        expenses: [
                            ...self.state.expenses,
                            self.state.form
                        ]
                    }));

                    // console.log(self.state.expenses.filter(function( obj ) {
                    //   return obj._id !== form._id;
                    // }))

                } else {

                    self.setState({
                        expenses: [
                            ...self.state.expenses,
                            {
                                ...self.state.form,
                                _id: response.data.upsertedId._id
                            }
                        ]
                    });

                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {

        // TODO - I want to be able to do this but then the state does not update in the form, could have swore I used it this way before?
        let { amount, reason, file, note, date } = this.state;

        return (
            <div className="admin-page admin-expenses">

                <div className="side-panel">
                    <div className="card">
                        <div className="card-header">Details</div>
                        <div className="card-body">
                            <div>Payroll: 0</div>
                            <div>Inventory: 0</div>
                            <div>Reoccurring: 0</div>
                            <div>Utilities: 0</div>
                            <div>Other: 0</div>
                        </div>
                    </div>
                </div>

                <div className="main-panel">

                    <div className="admin-side-by-side-form">

                        <div className="form-group">
                            <input className="form-control" type="text" name="reason" onChange={this.handleFormChange} value={this.state.form.reason} placeholder="Reason" />
                        </div>

                        <div className="form-group">
                            <input className="form-control" type="number" name="amount" onChange={this.handleFormChange} value={this.state.form.amount} placeholder="Amount" />
                        </div>

                        <DayPickerInput
                            style={{ display: 'block' }}
                            onDayChange={this.handleDateChange}
                            inputProps={{ className: 'form-control mb-3' }}
                            value={`${formatDate(this.state.form.date)}`}
                            formatDate={formatDate}
                            parseDate={parseDate}
                            dayPickerProps={{
                                showWeekNumbers: true,
                                todayButton: 'Today',
                            }}
                        />

                        <div className="form-group">
                            <textarea className="form-control" type="text" rows="5" name="note" onChange={this.handleFormChange} value={this.state.form.note} placeholder="Note" />
                        </div>

                        <div className="form-group">
                            <input className="form-control" type="text" name="file" onChange={this.handleFormChange} value={this.state.form.file} placeholder="File" />
                        </div>

                        <div className="submit">
                            <div onClick={() => this.upsertExpense()} className="btn btn-articles-light w-100">Submit</div>
                        </div>

                        {this.state.form._id === '' ?
                            null
                            :
                            <div className="submit">
                                <div onClick={() => this.cancelExpense()} className="btn btn-danger w-100">Cancel</div>
                            </div>
                        }


                    </div>

                    <div className="table-responsive mt-4">
                        <table className="table table-sm table-bordered bg-white">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Reason</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Note</th>
                                    <th scope="col">File</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.expenses.sort((a, b) => new Date(b.date) - new Date(a.date)).map(expense => (

                                    <tr key={expense._id}>
                                        <th scope="row">{expense.reason}</th>
                                        <td>${expense.amount / 100}</td>
                                        <td>{moment(expense.date).format("LL")}</td>
                                        <td>{expense.note}</td>
                                        <td><a target="_blank" rel="noopener noreferrer" href={expense.file}><i className="far fa-file-pdf"></i></a></td>
                                        <td>
                                            <div className="btn btn-sm btn-articles-light alt" onClick={() => this.loadExpense(expense._id)}>Edit</div>
                                            <ConfirmDelete afterConfirm={() => this.removeExpense(expense._id)} />
                                        </td>
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        );
    }
}

// export default Donations
export default ExpensesAdmin