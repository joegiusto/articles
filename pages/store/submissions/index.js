import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'
import moment from 'moment';

import Countdown from 'react-countdown-now';

import StoreLayout from 'components/layouts/store.js';
import ROUTES from 'components/constants/routes';

// import SubmissionsList from 'components/store/submissions/SubmissionsList';

import SubmissionItem from 'components/store/submissions/SubmissionItem'

function Submissions() {
    const router = useRouter()
    const { param } = router.query

    const [ submissions, setSubmissions ] = useState([])
    const [ submissionsLoading, setSubmissionsLoading ] = useState([])

    console.log(router.pathname)
    console.log(param);

    useEffect(() => {
		
		axios.get('/api/store/submissions', {

		})
		.then( (response) => {
            console.log(response)
            setSubmissions(response.data);
		})
		.catch( (error) => {
		    console.log(error);
		});

	}, []);

    return (
        <section className="submission-page">

            <Head>
                <title>Submissions - Articles</title>
            </Head>

            <div className="side-menu-one">

                {/* <div className="background"></div> */}

                <div className="sticky-content">

                    <div className="background-container">
                        <div className="background"></div>
                    </div>

                    <div className="top">

                        <div className="logo">
                            <i className="fas fa-lightbulb"></i>
                        </div>

                        <div className="time">

                            <div className="label">Time Left</div>
                            <Countdown date={moment().startOf('month').add(3, 'months').format('YYYY-MM-DD')} />
                            <div className="date">{moment().startOf('month').add(3, 'months').subtract(1, 'days').format('LL')}</div>

                        </div>

                    </div>

                    <div className="title">Submissions</div>
                    <p>User submited content that gets voted on for a chance to win money and get sold on our store!</p>

                    <div className="grow"></div>

                    <div className="tiles">

                        <div className="info">Current Period Info</div>

                        <div className="tile">
                            <div className="label">Submitted</div>
                            {/* <div className="square">{this.state.submissions.length}</div> */}
                            <div className="square">{0}</div>
                        </div>

                        <div className="tile">
                            <div className="label">Voters</div>
                            <div className="square">0</div>
                        </div>

                        <div className="tile">
                            <div className="label">Votes Cast</div>
                            {/* <div className="square">{this.state.submissions.length}</div> */}
                            <div className="square">{0}</div>
                        </div>

                        <div className="tile">
                            <div className="label">Earned By Users</div>
                            <div className="square">$0.00</div>
                        </div>

                    </div>

                    <div className="grow"></div>

                    {/* <div className="btn btn-articles-light">Submit A Design</div> */}

                    <Link href={ROUTES.STORE_SUBMISSIONS_SUBMIT}>
                        <button className="submission-side-panel_submit btn btn-dark w-100 mt-3">Submit a Design <i className="fas fa-mouse-pointer ml-2"></i></button>
                    </Link>

                    {/* <Switch>
                        <Route exact path={ROUTES.STORE_SUBMISSIONS} render={() =>
                            
                        } />
                        <Route exact path={ROUTES.STORE_SUBMISSIONS_SUBMIT} render={() =>
                            <Link to={ROUTES.STORE_SUBMISSIONS}><button className="submission-side-panel_submit btn btn-dark w-100 mt-3">View Designs <i className="fas fa-mouse-pointer ml-2"></i></button></Link>
                        } />
                    </Switch> */}

                    {/* End of Sticky Content */}
                </div>

                {/* End of Side Menu */}
            </div>

            <div className="listings">

                {/* <h1 className="month text-center">
                {moment().format('MMMM')} - {moment().add(2, 'months').format('MMMM')} Submissions
                </h1> */}

                {/* <h5>Next Pick At End of Month <span className="badge badge-danger"><Countdown date={moment().startOf('month').add(1, 'months').format('YYYY-MM-DD')} /></span></h5> */}

                <div id="filters" className="filters d-flex justify-content-between">

                    <div className="sorts">
                        {/* <div onClick={() => this.showSortHelperText() + this.setState({filter: 'top'})} className={"badge " + (this.state.filter === 'top' ? 'badge-dark' : 'badge-light')}>Top</div>
                        <div onClick={() => this.showSortHelperText() + this.setState({filter: 'new'})} className={"badge " + (this.state.filter === 'new' ? 'badge-dark' : 'badge-light')}>New</div>
                        <div onClick={() => this.showSortHelperText() + this.setState({filter: 'controversial'})} className={"badge " + (this.state.filter === 'controversial' ? 'badge-dark' : 'badge-light')}>Controversial</div> */}
                    </div>

                    <div className="search">
                        <i className="fas fa-search"></i>
                        <input type="text"/>
                        <div className="btn btn-articles-light py-0">Search</div>
                    </div>


                    {/* <div className="other"> */}
                    {/* <span className="timer badge badge-danger"><Countdown date={moment().startOf('month').add(3, 'months').format('YYYY-MM-DD')} /></span> */}
                    {/* {this.props.isAuth ? null : <div className="login-notice badge badge-danger">Please login or sign up to vote</div>} */}
                    {/* </div> */}

                    {/* <div className="helper-text"> */}
                    {/* <div className={"sort-helper-text " + (this.state.showSortHelperText && this.state.filter === 'top' ? 'fade ' : '') + (this.state.filter !== 'top' ? '' : '')}>{this.state.filter === 'top' ? 'Viewing submissions with the most likes' : ''}</div>
                    <div className={"sort-helper-text " + (this.state.showSortHelperText && this.state.filter === 'new' ? 'fade ' : '') + (this.state.filter !== 'new' ? '' : '')}>{this.state.filter === 'new' ? 'Viewing submissions newest to oldest' : ''}</div>
                    <div className={"sort-helper-text " + (this.state.showSortHelperText && this.state.filter === 'controversial' ? 'fade ' : '') + (this.state.filter !== 'controversial' ? '' : '')}>{this.state.filter === 'controversial' ? 'Viewing submissions with similar like to dislike ratios' : ''}</div> */}
                    {/* </div> */}

                </div>

                {/* <SubmissionsList/> */}

                <div className="submissions-new">
                    {
                        submissions ?
                        submissions.map(submission => (
                            <SubmissionItem  submission={submission}/>
                        ))
                        :
                        null
                    }

                    {
                        submissions ?
                        submissions.map(submission => (
                            <SubmissionItem  submission={submission}/>
                        ))
                        :
                        null
                    }
                </div>
                
            </div>

            {/* <div className="container py-3">
                <h2>Submissions Page</h2>
                <p>This is the products page with the StoreLayout set.</p>
            </div> */}

        </section>
    )
}

Submissions.Layout = StoreLayout;
export default Submissions;