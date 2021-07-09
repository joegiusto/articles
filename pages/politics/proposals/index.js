import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'
import axios from 'axios'

import { connectToDatabase } from '../../../util/mongodb'
import ROUTES from '../../../components/constants/routes'

class Proposals extends Component {
    constructor(props) {
        super(props)

        this.state = {
            filter: 'All',
            proposals: JSON.parse(props.proposals),

            senateSeats: 100,
            ourSenateSeats: 0,

            houseSeats: 435,
            ourHouseSeats: 0,

            stateGovernorsips: 50,
            ourStateGovernorships: 0,

            territorialGovernorships: 6,
            ourTerritorialGovernorships: 0,
        }
    }

    componentDidMount() {
        // const self = this;

        // axios.get('/api/proposals')
        // .then(function (response) {
        //     console.log(response);

        //     self.setState({
        //     proposals: response.data
        //     })
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }

    render(props) {

        const { ...state } = this.state

        return (
            <section className="proposals-page">

                <Head>
                    <title>Proposals - Articles</title>
                </Head>

                <div className="container">

                    {/* <h1>Proposals</h1>
                    <p>A look into our solutions to some of the issues going on in the nation.</p> */}

                    {/* <div className="party-stats">

                        <div className="party-stat card">
                            <div>Seats in the the Senate</div>
                            <div>{`${state.ourSenateSeats} / ${state.senateSeats}`}</div>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '2px', backgroundColor: '#ffc8c8' }}></div>
                            </div>
                        </div>

                        <div className="party-stat card">
                            <div>Seats in the the House</div>
                            <div>{`${state.ourHouseSeats} / ${state.houseSeats}`}</div>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '2px', backgroundColor: '#ffc8c8' }}></div>
                            </div>
                        </div>

                        <div className="party-stat card">
                            <div>State Governorships</div>
                            <div>{`${state.ourStateGovernorships} / ${state.stateGovernorsips}`}</div>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '2px', backgroundColor: '#ffc8c8' }}></div>
                            </div>
                        </div>

                        <div className="party-stat card">
                            <div>Territorial Governorships</div>
                            <div>{`${state.ourTerritorialGovernorships} / ${state.territorialGovernorships}`}</div>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: '2px', backgroundColor: '#ffc8c8' }}></div>
                            </div>
                        </div>

                    </div> */}

                    <div className="badges noselect d-flex justify-content-center">
                        <button onClick={() => this.setState({ filter: 'All' })} className={"btn btn-articles-light btn-lg " + ( this.state.filter === "All" ? 'active' : '' )}>All</button>
                        <button onClick={() => this.setState({ filter: 'Fundamental' })} className={"btn btn-articles-light btn-lg " + ( this.state.filter === "Fundamental" ? 'active' : '' )}>Fundamental</button>
                        <button onClick={() => this.setState({ filter: 'Social' })} className={"btn btn-articles-light btn-lg " + ( this.state.filter === "Social" ? 'active' : '' )}>Social</button>
                        <button onClick={() => this.setState({ filter: 'Financial' })} className={"btn btn-articles-light btn-lg " + ( this.state.filter === "Financial" ? 'active' : '' )}>Financial</button>
                        <button onClick={() => this.setState({ filter: 'Education' })} className={"btn btn-articles-light btn-lg " + ( this.state.filter === "Education" ? 'active' : '' )}>Education</button>
                    </div>

                    {/* Fundamental */}
                    <div className={"proposals " + (this.state.filter === "All" || this.state.filter === "Fundamental" ? '' : 'd-none')}>

                        <div className="after-text noselect">
                            Fundamental
                        </div>

                        {
                            this.state.proposals.filter(proposal => proposal.type === 'fundamental').map(proposal =>
                                <Proposal key={proposal._id}
                                    proposal={proposal}
                                />
                            )
                        }

                    </div>

                    {/* Social */}
                    <div className={"proposals " + (this.state.filter === "All" || this.state.filter === "Social" ? '' : 'd-none')}>

                        <div className="after-text noselect">
                            Social
                        </div>

                        {
                            this.state.proposals.filter(proposal => proposal.type === 'social').map(proposal =>
                                <Proposal key={proposal._id}
                                    proposal={proposal}
                                />
                            )
                        }

                    </div>

                    {/* Financial */}
                    <div className={"proposals " + (this.state.filter === "All" || this.state.filter === "Financial" ? '' : 'd-none')}>

                        <div className="after-text noselect">
                            Financial
                        </div>

                        {
                            this.state.proposals.filter(proposal => proposal.type === 'financial').map(proposal =>
                                <Proposal key={proposal._id}
                                    proposal={proposal}
                                />
                            )
                        }

                    </div>

                    {/* Education */}
                    <div className={"proposals " + (this.state.filter === "All" || this.state.filter === "Education" ? '' : 'd-none')}>

                        <div className="after-text noselect">
                            Education
                        </div>

                        {
                            this.state.proposals.filter(proposal => proposal.type === 'education').map(proposal =>
                                <Proposal key={proposal._id}
                                    proposal={proposal}
                                />
                            )
                        }

                    </div>

                </div>
            </section>
        )
    }
}

const Proposal = (props) => {
    const { proposal } = props

    return (
        <Link href={ROUTES.PROPOSALS + '/' + proposal.url}>
            <a>
                <div className="proposal card">
                    <div className="title">{proposal.title}</div>
                    <div className="the-short">
                        <div className="label">Summary:</div>
                        <div className="description">{proposal.description}</div>
                    </div>
                </div>
            </a>
        </Link>
    )
}

// This gets called on every request
// export async function getServerSideProps() {
export async function getStaticProps() {
    const { db } = await connectToDatabase()

    // Fetch data from external API
    // const res = await fetch(`REQUEST_URL`)
    // const proposals = await res.json()

    const result = await db
        .collection("articles_proposals")
        .find({})
        .toArray();
    const proposals = JSON.stringify(result)

    // Pass data to the page via props - revalidate every 10 minutes
    return { props: { proposals }, revalidate: (60 * 10) }
}

export default Proposals