import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'

import { useSelector, useDispatch } from 'react-redux'

import TransparencyLayout from 'components/layouts/transparency';

import BalanceHistoryChart from 'components/transparency/charts/BalanceHistory';
import RevenueVsExpensesChart from 'components/transparency/charts/RevenueVsExpensesChart'
import PayrollComparison from 'components/transparency/charts/PayrollComparison'

function TransparencyChartsPage({ isConnected }) {

    const [ expandSource, setExpandSource ] = useState(false);

    return (
        <div className="transparency-charts-page">

            <Head>
                <title>Charts - Articles</title>
            </Head>

            {/* <h2 className="title">
                Transparency Charts
            </h2> */}

            <div className="chart-block">
                <h5>Balance History</h5>
                <p>How much we are spending a month compared to how much we are making.</p>
                <BalanceHistoryChart />
            </div>

            <div className="chart-block">
                <h5>Revenue vs Expenses</h5>
                <p>How much we are spending a month compared to how much we are making.</p>
                {/* <canvas className='chart mb-3 bg-white' id={this.state.chartRevenueExpense} width="100%" height="45px"></canvas> */}
                <RevenueVsExpensesChart />
            </div>

            <div className="chart-block">
                <h5>Payroll Comparison</h5>
                <p>The amount of money being spent on payroll compared to expenses.</p>
                <PayrollComparison />
            </div>

            <div className="row">

                <div className="col-lg-4">
                    <div className="chart-block">
                        <h5>Employee Average Pay</h5>
                        <h3 className="mb-0">$0</h3>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="chart-block">
                        <h5>CEO Pay</h5>
                        <h3 className="mb-0">$0</h3>
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="chart-block">
                        <h5>Percent Difference</h5>
                        <h3 className="mb-0">0.00%</h3>
                    </div>
                </div>

            </div>

            <div className="chart-block">
                <h5>Median USA Income vs Our Employees</h5>
                <p>The amount of money being spent on payrole compared to revenues and expenses.</p>

                {/* <ChartBlockTimeFrame setChartPeriodSelector={this.props.setChartPeriodSelector} chartPeriodSelector={this.props.chartPeriodSelector} /> */}
                <span className="badge badge-dark">10 Years</span>

                {/* <BalanceHistoryChart /> */}

                <div onClick={() => setExpandSource(!expandSource)} className="btn btn-articles-light mb-2">
                    {expandSource ?
                        <i className="fas fa-caret-square-up"></i>
                        :
                        <i className="fas fa-caret-square-down"></i>
                    }

                    Expand Source Info
                </div>

                <div className={"source-info " + (expandSource ? "show" : null)}>
                    <hr />
                    <div>Information sourced from the following:</div>
                    <div className="sources">
                        <ul className="mb-0">

                            <li>
                                <a target="_blank" rel="noopener noreferrer" href="https://www.census.gov/quickfacts/fact/table/NY,US/PST045219">https://www.census.gov/quickfacts/fact/table/NY,US/PST045219</a>
                            </li>

                            <li>Link</li>

                            <li>Static Image</li>

                            <li>Static Image</li>

                        </ul>
                    </div>
                </div>

            </div>

            <div className="chart-block">
                <h5>Employee to CEO Pay Diffrence</h5>
                <p>The % of employee worth to CEO pay. (Lowest Paid Employee, Median Employee Pay, Top Employee pay)</p>

                {/* <BalanceHistoryChart /> */}
            </div>


        </div>
    )
}

TransparencyChartsPage.Layout = TransparencyLayout;
export default TransparencyChartsPage;