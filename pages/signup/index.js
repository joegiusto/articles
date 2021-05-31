import React, { Component, useState, useEffect } from 'react';

import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import axios from 'axios'

import { providers, signIn, getSession, csrfToken, useSession } from "next-auth/client";

function SignUpPage({ providers, csrfToken }) {
    const [session, loading] = useSession()

    const [error, setError] = useState('')
    const [referralLookup, setReferralLookup] = useState()
    const [pendingVerifyRequest, setPendingVerifyRequest] = useState(false)

    const router = useRouter()
    const params = router.query

    console.log(params.referral)

    useEffect(() => {

        if (params.verifyRequest == 'true') {
            setPendingVerifyRequest(true)
        }

        if (params.referral) {
            console.log("Detected referral")
            console.log(params.referral)

            axios.get('/api/user/getReferral', {
                params: {
                    user_id: params.referral
                }
            })
            .then(function (response) {
                console.log(response)
                setReferralLookup(`${response.data.first_name} ${response.data.last_name}`);
            })
            .catch(function (error) {
                console.log(error);
                // self.setState({ referral: null })
            });
            // setPendingVerifyRequest(true)
        }

    }, []);

    return (
        <div className="SignInPage">
            <div className="SignInContainer">

                <div className="border-decal"></div>

                <div className="border-decal border-decal_top">
                    <span className="one"></span>
                    <span className="two"></span>
                    <span className="three"></span>
                </div>

                <div className="border-decal border-decal_side">
                    <span className="one"></span>
                    <span className="two"></span>
                    <span className="three"></span>
                </div>

                <form method="post" action="/api/auth/signin/email">

                    {pendingVerifyRequest &&
                        <div className="alert alert-warning mt-4">
                            A link has been sent to your email, use it to login.
                    </div>
                    }

                    {!pendingVerifyRequest &&

                        <>

                            {referralLookup === null || referralLookup === undefined ? 
                                null
                                :
                                <div className="referral">
                                    You are signing up through {referralLookup}
                                </div>
                            }

                            <h1>Sign Up {session && "(Already Signed In)"}</h1>

                            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

                            <div className="form-group articles">
                                <label htmlFor="email"><b>Email</b></label>
                                <input
                                    className="form-control with-label"
                                    name="email"
                                    id="email"
                                    type="text"
                                    autoFocus
                                    disabled={pendingVerifyRequest}
                                />
                            </div>

                            <button disabled={pendingVerifyRequest} className="btn btn-articles-light" type="submit">Sign In</button>

                        </>

                    }

                    {error && <p className="errorMessage">{error.message}</p>}

                    <div className="connections mt-3 mb-3">

                        <div className="text-muted">Or sign in with:</div>

                        <div className="connection mt-2">
                            <i className="fab fa-2x fa-google"></i>
                            <i className="fab fa-2x fa-apple ml-2"></i>
                            <i className="fab fa-2x fa-linkedin ml-2"></i>
                            <i className="fab fa-2x fa-twitter ml-2"></i>
                        </div>

                    </div>

                </form>

            </div>
        </div>
    )
}

SignUpPage.getInitialProps = async (context) => {
    const { req, res } = context;
    const session = await (getSession({ req }));

    if (session & res && session.accessToken) {
        res.writeHead(302, {
            Location: "/"
        });
        res.end();
        return;
    }

    return {
        session: undefined,
        providers: await providers(context),
        csrfToken: await csrfToken(context),
    }
}

export default SignUpPage