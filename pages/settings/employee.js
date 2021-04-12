import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

import SettingsLayout from '../../components/layouts/settings.js';

import ROUTES from '../../components/constants/routes'

function SettingsEmployeePage(props) {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="settings-employee-page">

            <Head>
                <title>Settings - Articles</title>
            </Head> 

            <div className={"card settings-card employee-section"}>

                <div className="card-header">
                    <h5>Employee Info</h5>
                    <p>Info you wish to share with others on your employee page located at:</p>

                    <Link href={ROUTES.TRANSPARENCY_EMPLOYEES + `/${props?.user_id}`}> 
                        <div className="mt-2 badge badge-light hover">{`https://articles.media${ROUTES.TRANSPARENCY_EMPLOYEES}/${props?.user_id}`}</div> 
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

SettingsEmployeePage.Layout = SettingsLayout;
export default SettingsEmployeePage;