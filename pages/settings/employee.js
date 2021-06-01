import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import SettingsLayout from 'components/layouts/settings.js';

import ROUTES from 'components/constants/routes'

SettingsEmployeePage.Layout = SettingsLayout;

export default function SettingsEmployeePage(props) {
    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    // console.log(router.pathname)
    // console.log(param);
  
    return(
        <section className="settings-employee-page">

            <Head>
                <title>Settings - Articles</title>
            </Head> 

            <div className={"card settings-card employee-section"}>

                <div className="card-header text-center">
                    <h4>Employee Info</h4>
                    <p className="mb-3">Info you wish to share with others on your employee page located at:</p>

                    <Link href={ROUTES.TRANSPARENCY_EMPLOYEES + `/${userReduxState?.employee?.friendly_url}`}> 
                        <button className="btn btn-articles-light btn-sm">{`https://articles.media${ROUTES.TRANSPARENCY_EMPLOYEES}/${userReduxState?.employee?.friendly_url}`}</button> 
                    </Link>
                </div>

                <div className="card-body m-3">
                    
                    {/* 
                    <div className="form-group articles">
                        <label htmlFor="">Quote</label>
                        <TextareaAutosize className="form-control with-label" name="content" id="content" type="text" value={this.props.user_details.employee?.quote} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
                    </div>

                    <div className="form-group articles">
                        <label htmlFor="">Movies</label>

                        <TextareaAutosize 
                        className="form-control with-label" 
                        name="content" 
                        id="content" 
                        type="text" 
                        value={this.props.user_details.employee?.movies} 
                        onChange={(e) => {this.handleNewProposalChange(e)}}
                        />

                    </div>

                    <div className="form-group articles">
                        <label htmlFor="">Music</label>
                        <input className="form-control with-label" name="content" id="content" type="text" value={""} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
                    </div>

                    <div className="form-group articles">
                        <label htmlFor="">Hobbies</label>
                        <input className="form-control with-label" name="content" id="content" type="text" value={""} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
                    </div>

                    <div className="form-group articles">
                        <label htmlFor="">Role Models</label>
                        <input className="form-control with-label" name="content" id="content" type="text" value={""} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
                    </div> */}

                </div>

            </div>

        </section>
    )
}