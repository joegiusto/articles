import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

import Card from 'react-bootstrap/Card';

import ROUTES from 'components/constants/routes';

export default function FAQPage() {

    const router = useRouter()
    const { param } = router.query

    // const userReduxState = useSelector((state) => state.auth.user_details)

    const [items, setItems] = useState([
        {
            question: 'What is Articles?',
            answer: <span>Questions like this are better answered in our mission statement which can be read on our <Link href={ROUTES.MISSION}><a style={{ textDecoration: 'underline' }}>Mission</a></Link> page.</span>,
            focus: 'General'
        },
        {
            question: 'How do we plan to use the platform to fix issues in America?',
            answer: '',
            focus: 'General'
        },
        {
            question: 'Which political party does Articles align with?',
            answer: '',
            focus: 'General'
        },
        {
            question: 'Where is your clothing sourced from?',
            answer: '',
            focus: 'Clothing'
        },
        {
            question: 'Do you ship worldwide?',
            answer: 'Yes, but we do charge extra for shipments outside the United States.',
            focus: 'Clothing'
        },
        {
            question: 'Does Articles have a code of ethics for your journalists to follow?',
            answer: '',
            focus: 'News'
        },
        {
            question: 'Which political party does Articles align with?',
            answer: '',
            focus: 'Party'
        }
    ]);
    const [itemsFilter, setItemsFilter] = useState('All');

    useEffect(() => {

    }, []);

    return (
        <div className="faq-page">

            <Head>
                <title>FAQ - Articles</title>
            </Head>

            <div className="container py-3 py-lg-5">

                <div className="text-center mb-3 mb-lg-5">
                    <Link href={ROUTES.COMMUNITY}><button className="btn btn-articles-light btn-lg mb-3"><i className="fad fa-hand-point-left"></i>Community Home</button></Link>
                    <h1 className="">Frequently Asked Questions</h1>
                    <p className="">Our most asked questions, answered.</p>
                </div>

                <div className="filter-section d-flex align-items-center">

                    <h5 className="label mb-0">Filter:</h5>

                    <div className="ml-lg-2">
                        <button className="btn btn-articles-light">General ({items.filter(item => item.focus == "General").length})</button>
                        <button className="btn btn-articles-light">Clothing ({items.filter(item => item.focus == "Clothing").length})</button>
                        <button className="btn btn-articles-light">News ({items.filter(item => item.focus == "News").length})</button>
                        <button className="btn btn-articles-light">Party ({items.filter(item => item.focus == "Party").length})</button>
                    </div>

                </div>

                <hr className="my-3" />

                <div className="row align-items-start">

                    <div className="col-lg-9">
                        <Accordion defaultActiveKey={1}>

                            {items.map((item, i) => (
                                <Card className="faq-item">
                                    <Accordion.Toggle className="d-flex justify-content-between align-items-center" as={Card.Header} variant="link" eventKey={i + 1}>
                                        <h5 className="mb-0">{item.question}</h5>
                                        <div className="badge badge-articles-light">{item.focus}</div>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={i + 1}>
                                        <Card.Body>
                                            {item.answer}
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            ))}

                        </Accordion>
                    </div>

                    <div className="col-lg-3">
                        <button className="btn btn-articles-light w-100">Have a question?</button>
                    </div>

                </div>

            </div>
        </div>
    )
}