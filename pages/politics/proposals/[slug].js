import React, { Component, useEffect, useState } from 'react'
// import { Helmet } from "react-helmet";
// import { Route } from 'react-router-dom'
// import NotFound from '../../../Navigation/NotFoundPage';
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import ROUTES from '../../../components/constants/routes'

class LoadingBlock extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="loading-block">
                <div>
                    <i className="fas fa-spinner fa-spin"></i>
                    Loading
                </div>
            </div>
        )
    }
}

function Proposal() {
    const router = useRouter()
    const { slug } = router.query

    const [proposalLoading, setProposalLoading] = useState(false)
    const [proposalNotFound, setProposalNotFound] = useState(false)
    const [proposal, setProposal] = useState({})

    useEffect(() => {
        if (!router.isReady) return;

        // codes using router.query
        console.log("First load and visit page")

        axios
            .post(`/api/proposals/${slug}`)
            .then(res => {
                console.log(res);
                setProposal(res.data)
                setProposalLoading(false)
            })
            .catch(err => {
                console.log(err)
                setProposalLoading(false)
                setProposalNotFound(true)
            }
            );

    }, [router.isReady]);

    useEffect(() => {

        // console.log(slug)
        // console.log(router.query)
        setProposalLoading(true)

    }, []);

    return (
        <section className="proposals-page single">

            <Head>
                <title>Proposal - Articles</title>
            </Head>

            <div className="container py-3 py-lg-5">

                <div className="card">

                    <div className="card-header text-center">

                        <h5 className="proposal-tag card">Proposal</h5>
    
                        {
                            proposalLoading ?
                                <div className="title-fake"></div>
                                :
                                <h1 className="mt-3 mb-0">
                                    {proposalNotFound ? "Not Found" : null}
                                    {proposal.title}
                                </h1>
                        }
    
                        {
                            proposalLoading ? '' : <div className="mb-3">Type: <span style={{ textTransform: 'capitalize' }}>{proposal.type}</span></div>
                        }
    
                        {
                            proposalLoading || proposalNotFound ?
                                <div className="description-fake"></div>
                                :
                                <p>{proposal.description}</p>
                        }
                    </div>

                    <div className="card-body">
                        {
                            proposalNotFound ?
    
                                <div>
                                    <p>We could not find that proposal, in the event of a deletion we would redirect you to a reason. Please check the URL to make sure you are being sent to the right place.</p>
                                </div>
    
                                :
    
                                <div className="proposal-body bg-white py-4 px-3 mt-3 mb-5">
    
                                    {proposalLoading ? <LoadingBlock></LoadingBlock> :
    
                                        // <p>{proposal.content}</p>
                                        <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: proposal.content }}></div>
                                    }
    
                                    {/* {this.props.match.params.id === "revise-the-pledge-of-alligence" ?  */}
                                    {false === "revise-the-pledge-of-alligence" ?
                                        <>
    
                                            <h5 className="title">
                                                August 1892
                                            </h5>
    
                                            <p className="text">
                                                Socialist minister Francis Bellamy (1855-1931) wrote the The Pledge of Allegiance. It was originally published in The Youth's Companion on September 8, 1892. Bellamy had hoped that the pledge would be used by citizens in any country.
                                            </p>
    
                                            <p>In its original form it read:</p>
    
                                            <div className="quote-wrap">
                                                <div className="icon">
                                                    {/* <i className="fas fa-quote-right"></i> */}
                                                </div>
                                                <div className="quote">
                                                    "I pledge allegiance to my Flag and the Republic for which it stands, one nation, indivisible, with liberty and justice for all."
                                                </div>
                                            </div>
    
                                            <h5 className="title">
                                                1923
                                            </h5>
    
                                            <p>The words, "the Flag of the United States of America" were added. At this time it read:</p>
    
                                            <div className="quote-wrap">
                                                <div className="icon">
                                                    {/* <i className="fas fa-quote-right"></i> */}
                                                </div>
                                                <div className="quote">
                                                    "I pledge allegiance to the Flag of the United States of America and to the Republic for which it stands, one nation, indivisible, with liberty and justice for all."
                                                </div>
                                            </div>
    
                                            <h5 className="title">
                                                1954
                                            </h5>
    
                                            <p>
                                                In response to the Communist threat of the times, President Eisenhower encouraged Congress to add the words "under God," creating the 31-word pledge we say today. Bellamy's daughter objected to this alteration. Today it reads:
                                            </p>
    
                                            <div className="quote-wrap">
                                                <div className="icon">
                                                    {/* <i className="fas fa-quote-right"></i> */}
                                                </div>
                                                <div className="quote">
                                                    "I pledge allegiance to the flag of the United States of America, and to the republic for which it stands, one nation under God, indivisible, with liberty and justice for all."
                                                </div>
                                            </div>
    
                                            <h5 className="title">
                                                Today
                                            </h5>
    
                                            <p>
                                                People raise concerns for the removal of the 1954 "under God," addition.
                                            </p>
    
                                            <small><a href="https://www.ushistory.org/documents/pledge.htm" target="_blank" rel="noopener noreferrer">https://www.ushistory.org/documents/pledge.htm</a></small>
    
                                        </>
                                        :
                                        null
                                    }
                                </div>
                        }
                    </div>

                </div>

            </div>

        </section>
    )
}

class ProposalOld extends Component {
    constructor(props) {
        super(props)

        this.state = {
            proposalLoading: false,
            proposal: {},
            notFound: {
                bool: false,
                // str: this.props.match.params.id
            }
        }
    }

    componentDidMount() {
        const self = this;

        this.setState({
            proposalLoading: true
        })

        axios
            // .post("/api/getProposal", {proposal_url: this.props.match.params.id})
            .post("/api/getProposal", {})
            .then(res => {

                console.log(res);
                self.setState({
                    proposal: res.data,
                    proposalLoading: false
                })

                if (res.data === "") {
                    this.setState({
                        notFound: {
                            ...this.state.notFound,
                            bool: true
                        }
                    })
                }

            })
            .catch(err => {

                console.log(err)
                self.setState({
                    proposalLoading: false
                })

                //   this.props.history.push("/notfound");

            }
            );
    }

    render(props) {

        const { proposal, proposalLoading } = this.state;

        return (
            <section className="proposals-page single">

                <Head>
                    <title>Proposal - Articles</title>
                </Head>

                <div className="container">

                    <h5>Proposal:</h5>

                    {
                        proposalLoading ?
                            <div className="title-fake"></div>
                            :
                            <h1>
                                {this.state.notFound.bool ? "Not Found" : null}
                                {proposal.title}
                            </h1>
                    }

                    {
                        proposalLoading ? '' : <div className="mb-3">Type: <span style={{ textTransform: 'capitalize' }}>{proposal.type}</span></div>
                    }

                    {
                        proposalLoading || this.state.notFound.bool ?
                            <div className="description-fake"></div>
                            :
                            <p>{proposal.description}</p>
                    }

                    <hr />

                    {
                        this.state.notFound.bool ?

                            <div>
                                <p>We could not find that proposal, in the event of a deletion we would redirect you to a reason. Please check the URL to make sure you are being sent to the right place.</p>
                            </div>

                            :

                            <div className="proposal-body bg-white py-4 px-3 mt-3 mb-5">

                                {proposalLoading ? <LoadingBlock></LoadingBlock> :

                                    // <p>{proposal.content}</p>
                                    <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: proposal.content }}></div>
                                }

                                {/* {this.props.match.params.id === "revise-the-pledge-of-alligence" ?  */}
                                {"revise-the-pledge-of-alligence" === "revise-the-pledge-of-alligence" ?
                                    <>

                                        <h5 className="title">
                                            August 1892
                                        </h5>

                                        <p className="text">
                                            Socialist minister Francis Bellamy (1855-1931) wrote the The Pledge of Allegiance. It was originally published in The Youth's Companion on September 8, 1892. Bellamy had hoped that the pledge would be used by citizens in any country.
                                        </p>

                                        <p>In its original form it read:</p>

                                        <div className="quote-wrap">
                                            <div className="icon">
                                                {/* <i className="fas fa-quote-right"></i> */}
                                            </div>
                                            <div className="quote">
                                                "I pledge allegiance to my Flag and the Republic for which it stands, one nation, indivisible, with liberty and justice for all."
                                            </div>
                                        </div>

                                        <h5 className="title">
                                            1923
                                        </h5>

                                        <p>The words, "the Flag of the United States of America" were added. At this time it read:</p>

                                        <div className="quote-wrap">
                                            <div className="icon">
                                                {/* <i className="fas fa-quote-right"></i> */}
                                            </div>
                                            <div className="quote">
                                                "I pledge allegiance to the Flag of the United States of America and to the Republic for which it stands, one nation, indivisible, with liberty and justice for all."
                                            </div>
                                        </div>

                                        <h5 className="title">
                                            1954
                                        </h5>

                                        <p>
                                            In response to the Communist threat of the times, President Eisenhower encouraged Congress to add the words "under God," creating the 31-word pledge we say today. Bellamy's daughter objected to this alteration. Today it reads:
                                        </p>

                                        <div className="quote-wrap">
                                            <div className="icon">
                                                {/* <i className="fas fa-quote-right"></i> */}
                                            </div>
                                            <div className="quote">
                                                "I pledge allegiance to the flag of the United States of America, and to the republic for which it stands, one nation under God, indivisible, with liberty and justice for all."
                                            </div>
                                        </div>

                                        <h5 className="title">
                                            Today
                                        </h5>

                                        <p>
                                            People raise concerns for the removal of the 1954 "under God," addition.
                                        </p>

                                        <small><a href="https://www.ushistory.org/documents/pledge.htm" target="_blank" rel="noopener noreferrer">https://www.ushistory.org/documents/pledge.htm</a></small>

                                    </>
                                    :
                                    null
                                }
                            </div>
                    }
                </div>
            </section>
        )
    }
}

export default Proposal;