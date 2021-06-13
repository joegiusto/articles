import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios';
import moment from 'moment';

import Chart from 'chart.js';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import ROUTES from 'components/constants/routes';

const abuseItems = [
    {
        title: 'Operation Northwoods',
        description: 'Operation Northwoods was a proposed false flag operation against the Cuban government that originated within the U.S. Department of Defense (DoD) and the Joint Chiefs of Staff (JCS) of the United States government in 1962. The proposals called for the Central Intelligence Agency (CIA) or other U.S. government operatives to both stage and actually commit acts of terrorism against American military and civilian targets,[2] blaming them on the Cuban government, and using it to justify a war against Cuba.'
    },
    {
        title: 'Project MKUltra',
        description: 'Project MKUltra (or MK-Ultra) is the code name given to a program of experiments on human subjects that were designed and undertaken by the U.S. Central Intelligence Agency (CIA), some of which were illegal.[1][2][3] Experiments on humans were intended to develop procedures and identify drugs such as LSD to be used in interrogations in order to weaken the individual and force confessions through brainwashing and psychological torture.'
    },
    {
        title: 'Project MKUltra',
        description: 'Project MKUltra (or MK-Ultra) is the code name given to a program of experiments on human subjects that were designed and undertaken by the U.S. Central Intelligence Agency (CIA), some of which were illegal.[1][2][3] Experiments on humans were intended to develop procedures and identify drugs such as LSD to be used in interrogations in order to weaken the individual and force confessions through brainwashing and psychological torture.'
    }
]

export default function AbuseOfPowerResource(props) {
    const [massShootings, setMassShootings] = useState([]);
    const [massShootingsLoading, setMassShootingsLoading] = useState(true);

    const [filterFocus, setFilterFocus] = useState('USA');

    useEffect(() => {

        axios.get('/api/news/resources/mass-shootings', {

        })
        .then((response) => {
            console.log(response)

            setMassShootings(response.data);
            setMassShootingsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setMassShootingsLoading(false);
        });

    }, []);

    function sum(key) {
        return massShootings.reduce((a, b) => a + (b[key] || 0), 0);
    }

    return (
        <section className="mass-shootings-page resource-item-page">

            <Head>
                <title>Mass Shootings - Articles</title>
            </Head>

            <div className="page-header shadow-sm">

                <div className="container py-3">

                    <h1 className="mt-3">Mass Shootings</h1>
                    <p>Information on the shootings that have devastated our communities.</p>

                </div>

                <div className="filter-bar w-100">

                    <div className="container d-flex flex-column flex-lg-row">

                        <div className="d-flex flex-column flex-lg-row">

                            <div className="filter-section">
                                <div className="label">Sort:</div>
                                <div>
                                    <button className={"btn btn-articles-light btn-sm " + (filterFocus === 'USA' ? 'active' : '')}>Date</button>
                                    <button className={"btn btn-articles-light btn-sm " + (filterFocus === 'Global' ? 'active' : '')}>Deaths</button>
                                    <button className={"btn btn-articles-light btn-sm " + (filterFocus === 'Global' ? 'active' : '')}>Injured</button>
                                </div>
                            </div>

                            <div className="filter-section ml-4">
                                <div className="label">Display:</div>
                                <div>
                                    <button className={"btn btn-articles-light btn-sm " + (filterFocus === 'USA' ? 'active' : '')}>Card</button>
                                    <button className={"btn btn-articles-light btn-sm " + (filterFocus === 'Global' ? 'active' : '')}>Table</button>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="container py-4">

                <div className="stats mt-3 mb-5">

                    <h5 className="stat">
                        <div>Lives lost to Mass Shootings:</div>
                        <div className="total">{sum('deaths')}</div>
                    </h5>

                    <h5 className="stat">
                        <div>Injuries attributed to Mass Shootings:</div>
                        <div className="total">{sum('injured')}</div>
                    </h5>

                </div>

                <div className="mass-shootings-wrap">
                    {massShootings.map( item => ( 
                        <div className="mass-shooting-item card mb-3">

                            <div className="date badge badge-light border">{ moment(item.date).format("LL") }</div>

                            <div className="types">{ item.types.map( item => (
                                <span className="badge badge-light border mr-1">{item}</span>
                            ))}</div>

                            <div className="card-header p-3">
                                <h5 className="">{item.name}</h5>
                                <p className="mb-0">{item.location}</p>
                            </div>

                            <div className="card-body">

                                <div><b>Deaths:</b></div>
                                <p>{item.deaths} - <span className="text-muted">{item.deaths_note}</span> </p>

                                <div><b>Injured:</b></div>
                                <p>{item.injured} - <span className="text-muted">{item.injured_note}</span> </p>

                                <div><b>Perpetrators:</b></div>
                                {item.perpetrators.map( (item) => (
                                    <div className="badge badge-articles mr-2">
                                        {item.first_name} {item.last_name} ({item.gender})
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}