import React, { Component } from 'react';
import moment from 'moment';
import Link from 'next/link';

import ROUTES from '../../../components/constants/routes';

function PayrollTable () {
    return (
        <div>
            <table className='table articles-table table-sm table-bordered'>

                <thead>
                    <tr className="table-articles-head">
                    <th scope="col">Name</th>
                    <th scope="col">Role</th>
                    <th scope="col">Total</th>
                    {/* <th className='text-right' scope="col">Total</th> */}
                    </tr>
                </thead>

                <tbody>
        
                    {/* {sales.map((object, i) =>
        
                    <tr key={i} className="bg-light">
                        <td>{object.date || 'test'}</td>
                        <td>{object.name}</td>
                        <td>{object.note}</td>
                        <td className='text-right'>${object.total.toFixed(2)}</td>
                    </tr>
        
                    )} */}
        
                    <tr>
                    <th scope="row"><Link to={ROUTES.TRANSPARENCY_EMPLOYEES + '/5e90cc96579a17440c5d7d52'}>Joey Giusto</Link></th>
                    <td>Admin</td>
                    <td>$0.00</td>
                    </tr>
        
                    <tr>
                    <td colSpan="1" className="border-right-0 table-articles-head">
        
                        <div className="results-dual-header">
        
                            {/* <div className="page noselect">
                            <i className="fas fa-chevron-circle-left"></i>
                            Page 0/0
                            <i style={{marginLeft: '10px'}} className="fas fa-chevron-circle-right"></i>
                            </div> */}
                        
                            {/* <span className="results noselect">
                            <span>Results:</span>
                            <span className={"result result-active"}>10</span>
                            <span className={"result"}>50</span>
                            <span className={"result"}>100</span>
                            <span className={"result"}>250</span>
                            </span> */}
        
                        </div>
        
                    </td>
        
                    <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
                    <td colSpan="1" className="border-left-0 table-articles-head">$0.00</td>
                    </tr>
        
                </tbody>
    
            </table>
        </div>
    )
  }

class ExpenseTable extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            text: '',
            loading: false,
            donationsFirebase: [],
            expenses: [],
            limit: 10,
            page: 1,
            all: [
                ...props.reportsData.expenses.inventory.map(order => {
                    order.type = 'Inventory';
                    return order;
                }),
                ...props.reportsData.expenses.recurring.map(order => {
                    order.type = 'Recurring';
                    return order;
                }),
            ]
        };

        this.changeLimit = this.changeLimit.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    changeLimit(limit) {
        this.setState({
        limit: limit
        });
    }

    changePage(page) {
        this.setState({
        page: page
        });
    }
  
    renderTable() {
  
      switch(this.props.subtableSelector) {
  
          case 'expenses-payroll':
              return(<PayrollTable/>)
        //   case 'expenses-inventory':
        //       return(<div className="p-3">There is no inventory expenses yet.</div>)
        //   case 'expenses-recurring':
        //       return(<div className="p-3">There is no ad revenue yet.</div>)
        //   case 'expenses-utilities':
        //       return(<div className="p-3">There is no utility expenses yet.</div>)
        //   case 'expenses-other':
        //       return(<div className="p-3">There is no other expenses yet.</div>)
  
          // All Expenses
          default:
              return (
                    <table className="table articles-table table-sm table-hover table-bordered">

                        <thead>
                            <tr className="table-articles-head">
                                <th scope="col">File</th>
                                <th scope="col">DATE</th>
                                <th scope="col">TYPE</th>
                                <th scope="col">FOR</th>
                                <th scope="col">AMOUNT</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                            this.filterTableFromSubtableSelector(this.props.subtableSelector).length > 0 ?

                            this.filterTableFromSubtableSelector(this.props.subtableSelector)
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map(donation => (
                
                                <tr>
                                    <td><a rel="noopener noreferrer" target="_blank" href={donation.file}><i className="fas fa-file-invoice mr-0"></i></a></td>
                                    <td>{moment(donation.date).format('LL')}</td>
                                    <td>{donation.type}</td>
                                    <td>{donation.reason}</td>
                                    <td>${(donation.amount / 100).toFixed(2)}</td>
                                </tr>
                
                            ))

                            :

                            <tr>
                                <td className="p-2" colSpan="5">Nothing to display yet</td>
                            </tr>
                            
                            }

                            <tr>
                                <td colSpan='3' className="border-right-0 table-articles-head">
                
                                    <div className="results-dual-header">
                
                                    {/* <div className="page noselect">
                                        <i onClick={() => props.changePage(props.page - 1)} className="fas fa-chevron-circle-left"></i>
                                        Page {props.page}/1
                                        <i onClick={() => props.changePage(props.page + 1)} style={{marginLeft: '10px'}} className="fas fa-chevron-circle-right"></i>
                                    </div> */}
                                    
                                    {/* <span className="results noselect">
                                        <span>Results:</span>
                                        <span onClick={() => props.changeLimit(10)} className={"result" + (props.limit === 10 ? ' result-active' : '')}>10</span>
                                        <span onClick={() => props.changeLimit(50)} className={"result" + (props.limit === 50 ? ' result-active' : '')}>50</span>
                                        <span onClick={() => props.changeLimit(100)} className={"result" + (props.limit === 100 ? ' result-active' : '')}>100</span>
                                        <span onClick={() => props.changeLimit(250)} className={"result" + (props.limit === 250 ? ' result-active' : '')}>250</span>
                                    </span> */}
                
                                    </div>
                
                                </td>
                
                                <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
                                <td colSpan="1" className="border-left-0 table-articles-head">${(this.filterTableFromSubtableSelector(this.props.subtableSelector).reduce((a, b) => a + (parseInt(b['amount'] || 0)), 0) / 100).toFixed(2)}</td>
                            </tr>

                        </tbody>

                    </table>
              )
      };
  
    }

    filterTableFromSubtableSelector(selector) {
        switch(selector) {
            case 'expenses-inventory':
                return this.props.reportsData.expenses.inventory
            case 'expenses-recurring':
                return this.props.reportsData.expenses.recurring
            case 'expenses-utilities':
                return this.props.reportsData.expenses.utilities
            case 'expenses-other':
                // return this.props.reportsData.expenses.other
                return []
            default:
                return this.state.all
        }
    }
  
    render () {

        return (
        <div>
            
            {this.renderTable()}

        </div>
        )
    }
}

export default ExpenseTable