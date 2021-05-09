import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Head from 'next/head'

import axios from 'axios'

import TransparencyLayout from 'components/layouts/transparency';

import ExpenseTable from 'components/transparency/reports/ExpenseTable';
import RevenueTable from 'components/transparency/reports/RevenueTable';

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

    const isConnected = props.isConnected;

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

                        <div className="d-flex">
                            <div className="btn btn-articles-light btn-sm"><i className="fas fa-filter"></i>Filter</div>
                        </div>

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
                    />
                }

                {
                    tableSelector == 'revenues' && 
                    <RevenueTable 
                        subtableSelector={subtableSelector}
                        reportsData={reportsData} 
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