import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react';

import ROUTES from '../../components/constants/routes';

function TransparencyLayout({ children }) {
    const router = useRouter()
    const { param } = router.query
    const [totals, setTotals] = useState({})
    const [reportsData, setReportsData] = useState({})

    return (

    <div className="reports-page transparency-page">

        <div className="container">
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
                                    <h2>${( totals.revenue - totals.expenses ).toFixed(2)}</h2>

                                    <div className="time-container">
                                    <div className="progress">
                                        <div className="progress-bar bg-rev" role="progressbar" 
                                        style={{
                                        width: ( totals.revenue / ( ( totals.revenue + totals.expenses ) / 100 ) ).toFixed(0) + "%"
                                        }}
                                        aria-valuenow="15" 
                                        aria-valuemin="0" 
                                        aria-valuemax="100"
                                        >
                                        {( (totals.revenue) / ((totals.revenue + totals.expenses) / 100) ).toFixed(0)}%
                                        </div>

                                        <div className="progress-bar bg-danger" role="progressbar" style={{width: (totals.expenses / ((totals.revenue + totals.expenses) / 100) ).toFixed(0) + "%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">{( totals.expenses / ((totals.revenue + totals.expenses) / 100) ).toFixed(0)}%</div>
                                    </div>

                                    {/* <div className="text-muted">Revenue | Expenses</div> */}

                                    <div className="mt-4">

                                        <div className="row">

                                        <div className="col-12 col-xl-6 pr-xl-1">
                                            <div className="snippet positive">
                                            Revenue: ${ totals.revenue }
                                            </div>
                                        </div>

                                        <div className="col-12 col-xl-6 pl-xl-1">
                                            <div className="snippet negative">
                                            Expenses: -${ totals.expenses }
                                            </div>
                                        </div>

                                        </div>

                                    </div>
                                    </div>

                                </div>
                                </div>

                            </div>
                        
                        </div>

                        <div className="quick-links">

                            <div className="report-link mt-3">
                                <Link href={ROUTES.TRANSPARENCY}>
                                    <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (router.asPath === ROUTES.TRANSPARENCY_REPORTS ? 'active ' : null) + (router.asPath === ROUTES.TRANSPARENCY ? ' active' : null)}>
                                        <div>
                                        <i className="fas fa-paste" aria-hidden="true"></i>
                                        <span className="text">Reports</span>
                                        </div>
                                    </button>
                                </Link>
                            </div>

                            <div className="report-link mt-3">
                                <Link href={ROUTES.TRANSPARENCY_CHARTS}>
                                    <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (router.asPath === ROUTES.TRANSPARENCY_CHARTS ? 'active' : null)}>
                                        <div>
                                        <i className="fas fa-chart-line"></i>
                                        <span className="text">Charts</span>
                                        </div>
                                    </button>
                                </Link>
                            </div>
                            
                            <div className="report-link mt-3">
                                <Link href={ROUTES.TRANSPARENCY_EMPLOYEES}>
                                    {/* <button className={"btn btn-articles-light btn-lg w-100 report-quick-links" + (router.asPath === ROUTES.TRANSPARENCY_EMPLOYEES ? ' active' : '') + (router.asPath, ROUTES.TRANSPARENCY_EMPLOYEES_DETAILS  ? ' active' : '')}> */}
                                    <button className={"btn btn-articles-light btn-lg w-100 report-quick-links" + (router.asPath === ROUTES.TRANSPARENCY_EMPLOYEES ? ' active' : '') }>
                                        <div>
                                        <i className="fas fa-paste" aria-hidden="true"></i>
                                        <span className="text">Employees</span>
                                        </div>
                                    </button>
                                </Link>
                            </div>

                            <div className="report-link mt-3">
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
    
                <div className="col-md-8 py-5">
                    {children}
                </div>
    
            </div>
        </div>

    </div>

    )

};
  
export default TransparencyLayout;