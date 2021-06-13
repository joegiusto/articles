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
    const [presidents, setPresidents] = useState([]);
    const [filterFocus, setFilterFocus] = useState('USA');

    useEffect(() => {
        // renderChartExcessDeaths();
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <section className="abuse-of-power-page resource-item-page">

            <Head>
                <title>Abuse of Power - Articles</title>
            </Head>

            <div className="page-header shadow-sm">

                <div className="container py-3">

                    <h1 className="mt-3">Abuse of Power</h1>
                    <p>Information on the virus</p>

                </div>

                <div className="filter-bar w-100">

                    <div className="container d-flex flex-column flex-lg-row">

                        <div className="d-flex flex-column flex-lg-row">

                            <div className="filter-section">
                                <div className="label">Focus:</div>
                                <div>
                                    <button className={"btn btn-articles-light btn-sm " + (filterFocus === 'USA' ? 'active' : '')}>USA</button>
                                    <button className={"btn btn-articles-light btn-sm " + (filterFocus === 'Global' ? 'active' : '')}>Global</button>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="container mb-3">

                <div className="abuse-items-wrap">
                    {abuseItems.map( item => ( 
                        <div className="abuse-item card">

                            <div className="card-header p-3">
                                <h5 className="">{item.title}</h5>
                                <p className="mb-0">Test.</p>
                            </div>

                            <div className="card-body p-0">
                                Test
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}