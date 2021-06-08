import React, { useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import ROUTES from 'components/constants/routes';

const DATA_COUNT = 5;
const NUMBER_CFG = { count: DATA_COUNT, min: 0, max: 100 };

const data = {
    datasets: [
        {
            label: 'General',
            labels: ['Revenues', 'Expenses'],
            data: [50, 50],
            backgroundColor: [
                'rgba(75, 186, 110, 0.6)',
                'rgba(255, 99, 132, 0.6)'
            ],
        },
        {
            label: 'Specific',
            labels: ['Donations', 'Store', 'Ads', 'Memberships', 'Payroll', 'Inventory', 'Recurring', 'Utilities', 'Other'],
            data: [90/2, 5/2 , 5/2, 0, 0, 5/2, 95/2, 0, 0, 0],
            backgroundColor: [
                'rgba(75, 186, 110, 0.4)',
                'rgba(75, 186, 110, 0.4)',
                'rgba(75, 186, 110, 0.4)',
                'rgba(75, 186, 110, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
                'rgba(255, 99, 132, 0.4)',
            ],
        }
    ]
};

const chartConfig = {
    type: 'doughnut',
    data: data,
    plugins: [ChartDataLabels],
    options: {
        responsive: true,
        aspectRatio: 1,
        maintainAspectRatio: true,
        legend: {
            // position: 'bottom',
            align: 'top',
            offset: 100
        },
        layout: {
            padding: {
                left: 100,
                right: 100,
                top: 100,
                bottom: 100
            }
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var index = tooltipItem.index;
                    return dataset.labels[index] + ": " + dataset.data[index] + '%';
                }
            }
        },
        plugins: {

            datalabels: {
                // anchor: 'end',
                color: '#fff',

                backgroundColor: function(context){
                    // console.log("Chart Data")
                    // console.log(context)
                    return '#000';
                },

                align: 'end',
                clamp: true,
                offset: 20,
                // display: 'auto',

                formatter: function (value, context) {

                    // console.log("Chart Data")
                    // console.log(value)
                    // console.log(context)
                    let label = context.dataset.labels[context.dataIndex];
                    let dataPercent = context.dataset.data[context.dataIndex];

                    return label + ": " + dataPercent + '%';
                },
            },

        },
        // plugins: {
        //     legend: {
        //         position: 'bottom',
        //     },
        //     title: {
        //         display: true,
        //         text: 'Chart.js Doughnut Chart'
        //     }
        // }
    },
};

function TransparencyLayout({ children }) {
    const router = useRouter()
    const { param } = router.query
    const [totals, setTotals] = useState({
        revenue: {
            ordersTotal: 0,
            donationsTotal: 0,
            adsTotal: 0
        },
        expenses: {
            recurringTotal: 0,
            inventoryTotal: 0
        }
    })
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    function revenuesTotal() {
        return ((totals.revenue.ordersTotal + totals.revenue.donationsTotal + totals.revenue.adsTotal) / 100).toFixed(2);
    }

    function expensesTotal() {
        return ((totals.expenses.recurringTotal + totals.expenses.inventoryTotal) / 100).toFixed(2);
    }

    const [reportsData, setReportsData] = useState({})

    useEffect(() => {

        axios.get('/api/transparency/reports/totals')
            .then(function (response) {

                console.log(response.data)

                setTotals(response.data)

                console.log(
                    Number(revenuesTotal()) / (Number(revenuesTotal()) + Number(expensesTotal()))
                )

                // setReportsData( (prevState) => {
                //     return({
                //         ...prevState,
                //         revenue: {
                //             donations: response.data.donations,
                //             orders: response.data.orders
                //         }
                //     })
                // } )

            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    return (

        <div className="reports-page transparency-page">

            <div className="container-lg">
                <div className="row">

                    <div className="col-md-4">

                        <div className="reports-side-menu">

                            <div className="static-wrapper">

                                <div className="live">
                                    <span className="recording-dot d-inline-block"></span>
                                    <span>Live</span>
                                </div>

                                {/* <div id='info' className={"info " + (this.state.menuExpanded ? 'expanded' : '') }> */}
                                <div id='info' className="info">

                                    <div className="normal">
                                        <div className="px-2 pt-4">

                                            <div className="balance-label">Current Balance:</div>
                                            <h2 className="">${(revenuesTotal() - expensesTotal()).toFixed(2)}</h2>

                                            <div className="sidebar-chart mb-3 mt-0">
                                                <canvas ref={chartContainer} />
                                            </div>

                                            <div className="time-container">

                                                <div className="progress">

                                                    <div className="progress-bar bg-rev" role="progressbar"
                                                        style={{
                                                            width: ((Number(revenuesTotal()) / (Number(revenuesTotal()) + Number(expensesTotal()))) * 100).toFixed(0) + "%"
                                                        }}
                                                    // aria-valuenow="15" 
                                                    // aria-valuemin="0" 
                                                    // aria-valuemax="100"
                                                    >
                                                        {((Number(revenuesTotal()) / (Number(revenuesTotal()) + Number(expensesTotal()))) * 100).toFixed(0)}%
                                                </div>

                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        style={{
                                                            width: ((Number(expensesTotal()) / (Number(revenuesTotal()) + Number(expensesTotal()))) * 100).toFixed(0) + "%"
                                                        }}
                                                        aria-valuenow="30"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                    >
                                                        {((Number(expensesTotal()) / (Number(revenuesTotal()) + Number(expensesTotal()))) * 100).toFixed(0)}%
                                                </div>

                                                </div>

                                                {/* <div className="text-muted">Revenue | Expenses</div> */}

                                                <div className="mt-2">

                                                    <div className="snippets">

                                                        <div className="snippet positive">
                                                            <i className="fad fa-chart-line me-0"></i>Revenue: ${revenuesTotal()}
                                                        </div>

                                                        <div className="snippet negative">
                                                            <i className="fad fa-chart-line-down me-0"></i>Expenses: -${expensesTotal()}
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="quick-links">

                                        <div className="report-link">
                                            <Link href={ROUTES.TRANSPARENCY}>
                                                <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (router.asPath === ROUTES.TRANSPARENCY_REPORTS ? 'active ' : null) + (router.asPath === ROUTES.TRANSPARENCY ? ' active' : null)}>
                                                    <div>
                                                        <i className="fas fa-paste" aria-hidden="true"></i>
                                                        <span className="text">Reports</span>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="report-link">
                                            <Link href={ROUTES.TRANSPARENCY_CHARTS}>
                                                <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (router.asPath === ROUTES.TRANSPARENCY_CHARTS ? 'active' : null)}>
                                                    <div>
                                                        <i className="fas fa-chart-line"></i>
                                                        <span className="text">Charts</span>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="report-link">
                                            <Link href={ROUTES.TRANSPARENCY_EMPLOYEES}>
                                                {/* <button className={"btn btn-articles-light btn-lg w-100 report-quick-links" + (router.asPath === ROUTES.TRANSPARENCY_EMPLOYEES ? ' active' : '') + (router.asPath, ROUTES.TRANSPARENCY_EMPLOYEES_DETAILS  ? ' active' : '')}> */}
                                                <button className={"btn btn-articles-light btn-lg w-100 report-quick-links" + (router.asPath === ROUTES.TRANSPARENCY_EMPLOYEES ? ' active' : '') + (router.pathname === '/transparency/employees/[id]' ? ' active' : '')}>
                                                    <div>
                                                        <i className="fas fa-paste" aria-hidden="true"></i>
                                                        <span className="text">Employees</span>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="report-link">
                                            <Link href={ROUTES.TRANSPARENCY_FLAG}>
                                                <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (router.asPath === ROUTES.TRANSPARENCY_FLAG ? 'active' : null)}>
                                                    <div>
                                                        <i className="fas fa-flag"></i>
                                                        <span className="text">Flag</span>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* <div className="bg-primary text-center py-5">
                        <h2 className="bg-primary text-center mb-5">Transparency Nav</h2>
                        <div className="links d-flex flex-column">
                            <Link href={ROUTES.TRANSPARENCY}>Reports</Link>
                            <Link href={ROUTES.TRANSPARENCY_CHARTS}>Charts</Link>
                            <Link href={ROUTES.TRANSPARENCY_EMPLOYEES}>Employees</Link>
                            <Link href={ROUTES.TRANSPARENCY_FLAG}>Flag</Link>
                        </div>
                    </div> */}

                    </div>

                    <div className="col-md-8 transparency-sub-page-wrap pl-md-0">
                        {children}
                    </div>

                </div>
            </div>

        </div>

    )

};

export default TransparencyLayout;