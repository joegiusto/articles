// import * as React from "react";
// import { useForm } from "react-hook-form";
// // import Headers from "./Header";

import React, { useEffect, useState } from 'react';

import Head from 'next/head'
import { useRouter } from 'next/router'

import Dropdown from 'react-bootstrap/Dropdown'

import { useForm, useWatch } from "react-hook-form";

import * as THREE from 'three';

export default function Epcot() {
    const router = useRouter()
    const { param } = router.query

    const [epcotFullscreen, setEpcotFullScreen] = useState(false)

    useEffect(() => {

        // Only Client
        if (typeof window !== 'undefined') {

        }

    });

    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <button
            href=""
            className="btn btn-articles-light"
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            <i className="fas fa-level-up-alt"></i>
        </button>
    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
            const [value, setValue] = useState('');

            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >

                    {/* <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                    /> */}

                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !value || child.props.children.toLowerCase().startsWith(value),
                        )}
                    </ul>

                </div>
            );
        },
    );

    return (

        <div className={`epcot-page ${epcotFullscreen && 'fullscreen'}`}>

            <Head>
                <title>Epcot Demo | Articles</title>
                {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/86/three.min.js"></script> */}
            </Head>

            <div className="container py-3 py-lg-5">

                <div className="text-center">
                    <h2>Internal Epcot Demo</h2>
                    <p>This a an example layout of where and how the Epcot demo will be accessed, the content you are viewing is just a placeholder which is a demo of this <a target="_blank" href="https://github.com/swift502/Sketchbook">open source project on Github</a> </p>
                </div>

                {/* <div className="my-3" id="TutContainer"></div> */}
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe className={`embed-responsive-item ${epcotFullscreen && 'fullscreen'}`} src="https://jblaha.art/sketchbook/0.4/"></iframe>
                </div>

                <div className="buttons d-flex justify-content-start align-items-center mb-0 mt-0 bg-dark">

                    <button 
                        onClick={() => { if (epcotFullscreen) { setEpcotFullScreen(false) } else { setEpcotFullScreen(true) } }}
                        className="btn btn-articles-light"
                    >
                        <i className="fad fa-expand-wide"></i>
                        <span>Fullscreen</span>
                    </button>

                    <Dropdown>
                        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                            <i className="fad fa-layer-group ml-0 mr-2"></i>Menu
                        </Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item eventKey="1">City center</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Green belt</Dropdown.Item>
                            <Dropdown.Item eventKey="3" >Residential Areas</Dropdown.Item>
                            <Dropdown.Item eventKey="1">Industrial Park</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <span className="mx-3 badge badge-light border border-dark badge-lg">Location: Unknown</span>
                </div>

            </div>
        </div>
    );
}