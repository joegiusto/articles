import React, { Component, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'

import axios from 'axios'

import ROUTES from 'components/constants/routes';

export default function PollsPage() {

    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    const [pollsLoading, setPollsLoading] = useState(true);
    const [polls, setPolls] = useState([]);

    useEffect(() => {
		
		axios.get('/api/community/polls', {

		})
		.then( (response) => {
            console.log(response)
            setPollsLoading(false)
            setPolls(response.data);
		})
		.catch( (error) => {
            setPollsLoading(false)
		    console.log(error);
		});

	}, []);
  
    return(
        <section className="polls-page">

            <Head>
                <title>Polls - Articles</title>
            </Head>

            <div className="container py-3 py-lg-5">

                <div className="text-center mb-3 mb-lg-5">
                    <Link href={ROUTES.COMMUNITY}><button className="btn btn-articles-light btn-lg mb-3"><i class="fad fa-hand-point-left"></i>Community Home</button></Link>
                    <h1>Polls Page</h1>
                    <p>Vote on ideas and proposals to shape the future of Articles!</p>
                </div>

                <div className="polls row">

                    {pollsLoading && 
                        <div className="col-lg-12 text-center">
                            <h2><i className="fas fa-spinner fa-spin"></i>Loading...</h2>
                        </div>
                    }

                    {polls.map((poll) => {
                        
                        let totalVotes = poll.yes.length + poll.no.length

                        let yesPercent = poll.yes.length / totalVotes
                        let noPercent = poll.no.length / totalVotes                

                        return (

                        <div className="col-lg-6">
                            <div className="card poll shadow-sm">

                                <div className="card-header">
                                    <h5 className="mb-0">{poll.title}</h5>
                                </div>

                                <div className="card-body">
                                    {poll.description}
                                </div>

                                <div className="card-footer">
                                    <div className="text-center">

                                        <div style={{maxWidth: '300px'}} className="progress mx-auto border">
                                            <div className="progress-bar bg-danger" role="progressbar" style={{width: `${(noPercent*100).toFixed(2)}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{(noPercent*100).toFixed(2)}%</div>
                                            <div className="progress-bar bg-success" role="progressbar" style={{width: `${(yesPercent*100).toFixed(2)}%`}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{(yesPercent*100).toFixed(2)}%</div>
                                        </div>

                                        <div className="text-muted mb-3">{poll.no.length + poll.yes.length} Votes</div>

                                        <button disabled={ (poll.yes || poll.no).includes(userReduxState._id) && true } className="vote-button btn btn-articles-light btn-lg">
                                            <div>No</div>
                                            <div className="vote-count card">{poll.no.length} Votes</div>
                                        </button>

                                        <button disabled={ (poll.yes || poll.no).includes(userReduxState._id) && true } className="vote-button btn btn-articles-light btn-lg">
                                            <div>Yes</div>
                                            <div className="vote-count card">{poll.yes.length} Votes</div>
                                        </button>

                                    </div>
                                </div>

                            </div>
                        </div>

                    )})}

                </div>

            </div>

        </section>
    )
}