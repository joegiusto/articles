import React from 'react';
import { providers, signIn, getSession, csrfToken, useSession } from "next-auth/client";

export default function SignIn({ providers, csrfToken }) {
    const [ session, loading ] = useSession()

    return (
        <div className="container my-3 my-lg-5">

            { session && <h1>Already Signed In</h1> }

            <div className="row">

                <div className="col-lg-6">
                    {/* Email and Password */}
                    <div style={{maxWidth: '600px'}} className="card mb-3">

                        <h5 className="card-header">Sign In With Email and Password</h5>

                        <div className="card-body">
                            <form method="post" action="/api/auth/signin/credentials">

                                <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>

                                <div className="form-group articles">
                                    <label htmlFor="email">Email</label>
                                    <input className="form-control with-label" name="email" id="email" type="text"/>
                                </div>

                                <div className="form-group articles">
                                    <label htmlFor="email">Password</label>
                                    <input className="form-control with-label" name="password" id="password" type="text"/>
                                </div>

                                {/* <label htmlFor="email"></label>
                                <input type="text" id="email" name="email"/> */}

                                <button className="btn btn-articles-light" type="submit">Use Email and Password</button>
                            </form>
                        </div>

                    </div>
                </div>

                <div className="col-lg-6">
                    {/* Email */}
                    <div style={{maxWidth: '600px'}} className="card mb-3">

                        <h5 className="card-header">Sign In With Email</h5>

                        <div className="card-body">

                            <p>Sign in using a one click link sent to your email account</p>

                            <form method="post" action="/api/auth/signin/email">

                                <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>

                                <div className="form-group articles">
                                    <label htmlFor="email">Email</label>
                                    <input className="form-control with-label" name="email" id="email" type="text"/>
                                </div>

                                {/* <label htmlFor="email"></label>
                                <input type="text" id="email" name="email"/> */}

                                <button className="btn btn-articles-light" type="submit">Use Email</button>
                                
                            </form>
                        </div>

                    </div>
                </div>

            </div>

            {/* Providers Card*/}
            <div className="card">
                    <div className="card-header">Providers</div>
                    <div className="card-body">
                        {Object.values(providers).map((provider) => {
                            if (provider.name === "Email" || provider.name === "Email and Password") {
                                return;
                            }
                            return(
                                <div key={provider.name}>
                                    <button onClick={ ()=> signIn(provider.id) } className="btn btn-articles-light btn-sm mb-3">Sign In with {provider.name}</button>
                                </div>
                            )
                        })}
                    </div>
            </div>

        </div>
    )
}

SignIn.getInitialProps = async(context) => {
    const {req, res} = context;
    const session = await (getSession({req}));

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