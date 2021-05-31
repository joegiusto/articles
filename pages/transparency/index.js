import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Head from 'next/head'

import moment from 'moment';

import axios from 'axios'

import Dropdown from 'react-bootstrap/Dropdown';

import TransparencyLayout from 'components/layouts/transparency';

import ExpenseTable from 'components/transparency/reports/ExpenseTable';
import RevenueTable from 'components/transparency/reports/RevenueTable';

// Date Picker UI
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import articlesTheme from 'components/material_ui/articlesTheme'
import { Discovery } from 'aws-sdk';
function TransparencyHomePage(props) {

    const [reportsData, setReportsData] = useState({

        expenses: {
            other: [],
            payroll: [],
            recurring: [],
            utilities: [],
            inventory: []
        },

        revenue: {
            clothing: [],
            donations: [],
            orders: [],
            ads: [],
            memberships: []
        },

    });

    const [tableSelector, setTableSelectorValue] = useState('revenues');
    const [subtableSelector, setSubtableSelector] = useState('revenue-all');

    const [ showTransactionTime, setShowTransactionTime ] = useState(false);

    const [ filterDropdownOpen, setFilterDropdownOpen ] = useState(false);

    const [ filterStartDateTimeOpen, setFilterStartDateTimeOpen ] = useState(false);
    const [ filterEndDateTimeOpen, setFilterEndDateTimeOpen ] = useState(false);

    const [ filterStartDateTime, setFilterStartDateTime ] = useState(new Date( moment('06/25/2019') ));
    const [ filterEndDateTime, setFilterEndDateTime ] = useState(new Date());

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          className="btn btn-articles-light btn-sm d-flex align-items-center"
          onClick={(e) => {
            e.preventDefault();
            onClick(e)
          }}
        >
            { children}
        </a>
    ));

    useEffect(() => {

        axios.get('/api/transparency/reports/revenue')
        .then(function (response) {
            // console.log(response.data);

            setReportsData( (prevState) => {
                return({
                    ...prevState,
                    revenue: {
                        ...prevState.revenue,
                        ...response.data
                    }
                })
            } )

        })
        .catch(function (error) {
            console.log(error);
        });

        axios.get('/api/transparency/reports/expense')
        .then(function (response) {

            setReportsData( (prevState) => {
                // prevState.expenses.recurring = response.data.recurring;
                // prevState.expenses.inventory = response.data.inventory;
                // return(prevState)
                return({
                    ...prevState,
                    expenses: {
                        ...prevState.expenses,
                        inventory: response.data.inventory,
                        recurring: response.data.recurring
                    }
                })
            } )

        })
        .catch(function (error) {
            console.log(error);
        });

	}, []);

    function setTableSelector(newSelector) {

        setTableSelectorValue(newSelector)
        setSubtableSelector('');
    
        switch(newSelector) {
          case 'clothing':
            setSubtableSelector('clothing-all')
            break;
          case 'expenses':
            setSubtableSelector('expenses-all')
            break;
          case 'revenues':
            setSubtableSelector('revenue-all')
            break;
          default:
            // code block
        };
    }

    function tableSelectorChoice(dataValue) {
        return(
          <div onClick={() => setTableSelector(dataValue)} className={"selection d-inline-block " + (tableSelector === dataValue ? 'selection-active' : '')}>{dataValue}</div>
        )
    }
    
    function subTableSelectorChoice(dataValue, printValue, redirect, location) {

        return(
            <span onClick={() => setSubtableSelector(dataValue) } className={"selection " + (subtableSelector === dataValue ? 'selection-active' : '')}>{redirect ? <i style={{marginRight: '2.5px'}} className="fas fa-link"></i> : ''}{printValue}</span>
        )
    }

    function getTableComponent() {
        // return(<div>Test</div>)
        // switch(`${tableSelector}`) {
        switch(tableSelector) {
    
            case 'expenses':
                return(
                    <ExpenseTable 
                        subtableSelector={subtableSelector}
                        reportsData={reportsData} 
                    />)
            case 'revenue':
                return(
                    <RevenueTable 
                        subtableSelector={subtableSelector}
                        reportsData={reportsData} 
                    />
                )
        
            default:
                // Useless because tableSelector state always starts at something
        };
    }

    return (
        <div className="transparency-reports-page">
                
            <Head>
                <title>Transparency - Articles</title>
                <meta name="description" content="Full transparency, a look into our reports, stats, analytics, and our employee directory."/>
            </Head>

            <div className="reports-table reports-shadow">

                <div className="table-selector">
        
                    <div className="main d-flex flex-row justify-content-between align-items-center">

                        <div className="d-flex">
                            {tableSelectorChoice('revenues')}
                            {tableSelectorChoice('expenses')}
                        </div>

                        <Dropdown style={{zIndex: '1', position: 'relative'}} className="d-flex">

                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-1">
                                <i className="fas fa-filter"></i>Filter
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="p-3">
                                
                                <div className="d-flex justify-content-lg-between mb-3" >

                                    <button onClick={() => setFilterStartDateTimeOpen(true)} className="w-50 btn btn-articles-light btn-sm">
                                        <div>Start Date</div>
                                        <div className="text-muted">{moment(filterStartDateTime).format('LL')}</div>
                                    </button>

                                    <ThemeProvider theme={articlesTheme}>
                                        <MuiPickersUtilsProvider utils={MomentUtils}>
                                            {/* <DateTimePicker
                                                label="Date"
                                                inputVariant="outlined"
                                                value={selectedDate}
                                                onChange={handleDateChange}
                                                className="form-group articles mb-3 w-100"
                                            /> */}
                                            <DateTimePicker 
                                                onChange={setFilterStartDateTime} 
                                                className=""
                                                open={filterStartDateTimeOpen}
                                                value={filterStartDateTime}
                                                onOpen={() => setFilterStartDateTimeOpen(true)}
                                                onClose={() => setFilterStartDateTimeOpen(false)}
                                                TextFieldComponent={ (props) =>
                                                    <></>
                                                }
                                            >
                                            </DateTimePicker>
                                        </MuiPickersUtilsProvider>
                                    </ThemeProvider>

                                    <button className="w-50 btn btn-articles-light btn-sm">
                                        <div>End Date</div>
                                        <div className="text-muted">{moment().format('LL')}</div>
                                    </button>

                                </div>

                                <div className="d-flex align-items-center">
                                    {showTransactionTime ? 'Enabled' : 'Disabled'} 
                                    <button onClick={() => setShowTransactionTime(!showTransactionTime)} className="btn btn-articles-light btn-sm mx-auto d-block">Transaction Time</button>
                                </div>

                                {/* <div className="text-muted text-center" style={{fontSize: '0.8rem'}}>0 Notifications</div>

                                <Dropdown.Divider />

                                <div className="w-100 px-2">
                                <Link href={ROUTES.MESSAGES}>
                                    <div style={{cursor: 'pointer'}} className="badge badge-success w-100">0 Messages</div>
                                </Link>
                                </div> */}

                                {/* <Dropdown.Item eventKey="4">Manage</Dropdown.Item> */}

                            </Dropdown.Menu>

                        </Dropdown>

                    </div>
        
                    {/* Expenses Sub Nav */}
                    <div className={"sub sub-expenses " + (tableSelector === 'expenses' ? '' : 'd-none')}>
                        {subTableSelectorChoice('expenses-all', 'all')}
                        {subTableSelectorChoice('expenses-payroll', 'payroll')}
                        {subTableSelectorChoice('expenses-inventory', 'inventory')}
                        {subTableSelectorChoice('expenses-recurring', 'recurring')}
                        {subTableSelectorChoice('expenses-utilities', 'utilities')}
                        {subTableSelectorChoice('expenses-other', 'other')}
                    </div>
                        
                    {/* Revenue Sub Nav */}
                    <div className={"sub sub-revenue " + (tableSelector === 'revenues' ? '' : 'd-none')}>
                        {subTableSelectorChoice('revenue-all', 'all')}
                        {subTableSelectorChoice('revenue-donations', 'donations')}
                        {subTableSelectorChoice('revenue-store', 'store')}
                        {subTableSelectorChoice('revenue-ads', 'ads')}
                        {subTableSelectorChoice('revenue-memberships', 'memberships')}
                        {/* {this.subTableSelectorChoice('revenue-grants', 'grants')} */}
                        {/* {this.subTableSelectorChoice('revenue-sponsorships', 'sponsorships')} */}
                    </div>

                    {/* Donations Overview Stats */}
                    {subtableSelector === 'revenue-donations' &&
                        <div className="sub-table-overview d-flex mx-2 my-2 justify-content-center">

                            <div className="detail-card card">

                                <div className="py-1 px-2">

                                    <div className="">Top Donor: </div>
                                    <hr className="my-1"/>

                                    <span className="badge badge-articles border border-dark mr-2">$400.00</span>
                                    Joey Giusto

                                </div>

                            </div>

                            <div className="detail-card card ml-2">

                                <div className="py-1 px-2">

                                    <div className="">Largest Donation: </div>
                                    <hr className="my-1"/>

                                    <span className="badge badge-articles border border-dark mr-2">$100.00</span>
                                    Joey Giusto

                                </div>

                            </div>

                            <div className="detail-card card ml-2">

                                <div className="py-1 px-2">

                                    <div className="">Recent Donation: </div>
                                    <hr className="my-1"/>

                                    <span className="badge badge-articles border border-dark mr-2">$100.00</span>
                                    Joey Giusto

                                </div>

                            </div>

                        </div>
                    }

                    {/* Clothing Sub Nav */}
                    {/* <div className={"sub sub-clothing dual-header " + (subtableSelector === 'revenue-clothing' ? '' : 'd-none')}>
                        <div>
                            {this.subClothingTableSelectorChoice('clothing-all', 'all')}
                            {this.subClothingTableSelectorChoice('clothing-originals', 'originals')}
                            {this.subClothingTableSelectorChoice('clothing-partnerships', 'partnerships')}
                            {this.subClothingTableSelectorChoice('clothing-submissions', 'submissions')}
                            {this.subClothingTableSelectorChoice('clothing-sponsored', 'sponsored')}
                        </div>
                    </div> */}
        
                    {/* Future Payroll Sub Nav */}
                    <div className={"sub sub-payroll " + (tableSelector === 'payroll' ? '' : 'd-none')}>
                        {/* For the future */}
                    </div>

                </div>

                {/* {getTableComponent()} */}

                {
                    tableSelector == 'expenses' && 
                    <ExpenseTable 
                        subtableSelector={subtableSelector}
                        reportsData={reportsData} 
                        showTransactionTime={showTransactionTime}
                    />
                }

                {
                    tableSelector == 'revenues' && 
                    <RevenueTable 
                        subtableSelector={subtableSelector}
                        reportsData={reportsData} 
                        showTransactionTime={showTransactionTime}
                    />
                }
        
                {/* <RevenueTable 
                    subtableSelector={subtableSelector}
                    reportsData={reportsData} 
                />
                <ExpenseTable 
                    subtableSelector={subtableSelector}
                    reportsData={reportsData} 
                /> */}

            </div>
            
        </div>
    )
}

TransparencyHomePage.Layout = TransparencyLayout;
export default TransparencyHomePage;