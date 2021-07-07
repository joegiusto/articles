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
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [

        {
            label: 'Revenue',
            data: [ 10, 13, 17, 10, 13, 10 ],
            backgroundColor: 'rgba(75, 186, 110, 0.6)',
            stack: 'Stack 0',
        },
        {
            label: 'Expense',
            data: [ 10, 13, 17, 10, 13, 10 ],
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            stack: 'Stack 0',
        },

        // {
        //     label: 'Revenue',
        //     data: [ 10, 5, 10, 15, 20, 30],
        //     backgroundColor: 'rgba(75, 186, 110, 0.6)',
        //     stack: 'Stack 1',
        // },
        // {
        //     label: 'Expense',
        //     data: [ 10, 5, 10, 15, 20, 30],
        //     backgroundColor: 'rgba(255, 99, 132, 0.6)',
        //     stack: 'Stack 1',
        // },

        // {
        //     label: 'General',
        //     labels: ['Revenues', 'Expenses'],
        //     data: [50, 50],
        //     backgroundColor: [
        //         'rgba(75, 186, 110, 0.6)',
        //         'rgba(255, 99, 132, 0.6)'
        //     ],
        // },
        // {
        //     label: 'Specific',
        //     labels: ['Donations', 'Store', 'Ads', 'Memberships', 'Payroll', 'Inventory', 'Recurring', 'Utilities', 'Other'],
        //     data: [90/2, 5/2 , 5/2, 0, 0, 5/2, 95/2, 0, 0, 0],
        //     backgroundColor: [
        //         'rgba(75, 186, 110, 0.4)',
        //         'rgba(75, 186, 110, 0.4)',
        //         'rgba(75, 186, 110, 0.4)',
        //         'rgba(75, 186, 110, 0.4)',
        //         'rgba(255, 99, 132, 0.4)',
        //         'rgba(255, 99, 132, 0.4)',
        //         'rgba(255, 99, 132, 0.4)',
        //         'rgba(255, 99, 132, 0.4)',
        //         'rgba(255, 99, 132, 0.4)',
        //     ],
        // }

    ]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        plugins: {
            title: {
                display: false,
                text: 'Chart.js Bar Chart - Stacked'
            },
        },
        responsive: true,
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            },
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value.toFixed(2);
                    }
                }
            }]
        }
    }
};

const chartConfig = {
    type: 'doughnut',
    data: data,
    plugins: [ChartDataLabels],
    options: {
        responsive: true,
        legend: {
            align: 'top',
        },
        layout: {
            padding: {
                // left: 100,
                // right: 100,
                // top: 100,
                // bottom: 100
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

    const [scrollPosition, setScrollPosition] = useState(0);
    const [pageWidth, setPageWidth] = useState(0);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    const handleResize = () => {
        const positionX = window.innerWidth;
        setPageWidth(positionX);
    };

    const [totalsLoading, setTotalsLoading] = useState(true)
    const [totals, setTotals] = useState({
        revenue: {
            ordersTotal: 1,
            donationsTotal: 1,
            adsTotal: 1
        },
        expenses: {
            recurringTotal: 2,
            inventoryTotal: 1
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
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        handleResize();

        axios.get('/api/transparency/reports/totals')
        .then(function (response) {

            // console.log(response.data)

            setTotals(response.data)
            setTotalsLoading(false)

            // console.log(
            //     Number(revenuesTotal()) / (Number(revenuesTotal()) + Number(expensesTotal()))
            // )

        })
        .catch(function (error) {
            console.log(error);
            setTotalsLoading(false)
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chart(chartContainer.current, config);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    return (

        <div className="reports-page transparency-page">

            <div className="container">

                <div className="page-content-wrap row">

                    <div className="transparency-side-menu">

                            <div className="static-wrapper">

                                {/* <div id='info' className={"info " + (this.state.menuExpanded ? 'expanded' : '') }> */}
                                <div id='info' className="info">

                                    <div className="live">
                                        <span className="recording-dot d-inline-block"></span>
                                        <span>Live</span>
                                    </div>

                                    <div className={`normal ${ ( scrollPosition > 400 && pageWidth < 992 ) && 'scrolled-down'}`}>
                                        <div className="px-2 pt-3 pb-1">

                                            <div className="side-menu-header d-flex flex-column align-items-center">

                                                {totalsLoading ? 

                                                    <div><i className="fas fa-spinner fa-spin"></i>Loading</div>

                                                    :

                                                    <>

                                                    <div className="left">
                                                        <div className="balance-label">Current Balance:</div>
                                                        <h2 className="">${(revenuesTotal() - expensesTotal()).toFixed(2)}</h2>
                                                    </div>
        
                                                    <div className="right d-flex">

                                                        <div className="snippet positive">
                                                            <i className="fad fa-chart-line me-0 d-none"></i> <span className="tag">Revenue:</span> <span className="price">${revenuesTotal()}</span>
                                                        </div>

                                                        <div className="snippet negative">
                                                            <i className="fad fa-chart-line-down me-0 d-none"></i> <span className="tag">Expenses:</span> <span className="price">-${expensesTotal()}</span>
                                                        </div>

                                                    </div>

                                                    </>

                                                }

                                            </div>

                                            <div className="progress mt-2">

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

                                            <div className="sidebar-chart">
                                                <canvas ref={chartContainer} />
                                            </div>

                                            <div className="time-container d-none">

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

                                                <div className="mt-2 d-none">

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

                                    <div className={`quick-links ${ ( scrollPosition > 400 && pageWidth < 992 ) && 'scrolled-down'}`}>

                                        <div className="report-link">
                                            <Link href={ROUTES.TRANSPARENCY}>
                                                <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (router.asPath === ROUTES.TRANSPARENCY_REPORTS ? 'active ' : null) + (router.asPath === ROUTES.TRANSPARENCY ? ' active' : null)}>
                                                    <div className="text-center">
                                                        <i className="fas fa-paste" aria-hidden="true"></i>
                                                        <span className="text">Reports</span>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="report-link">
                                            <Link href={ROUTES.TRANSPARENCY_CHARTS}>
                                                <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (router.asPath === ROUTES.TRANSPARENCY_CHARTS ? 'active' : null)}>
                                                    <div className="text-center">
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
                                                    <div className="text-center">
                                                        <i className="fas fa-paste" aria-hidden="true"></i>
                                                        <span className="text">Employees</span>
                                                    </div>
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="report-link">
                                            <Link href={ROUTES.TRANSPARENCY_FLAG}>
                                                <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (router.asPath === ROUTES.TRANSPARENCY_FLAG ? 'active' : null)}>
                                                    <div className="text-center">
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

                    <div className="transparency-sub-page-wrap">
                        {children}
                    </div>

                </div>

            </div>

        </div>

    )

};

export default TransparencyLayout;