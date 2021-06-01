import React, { Component, useState, useEffect } from 'react';

import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import { withRouter } from 'next/router'
import { providers, signIn, getSession, csrfToken, useSession } from "next-auth/client";

function NewSignIn({ providers, csrfToken }) {
    const [ session, loading ] = useSession()
    const [ error, setError ] = useState('')
    const [ pendingVerifyRequest, setPendingVerifyRequest ] = useState(false)
    const router = useRouter()
    const pid = router.query

    useEffect(() => {

        if (pid.verifyRequest == 'true') {
            setPendingVerifyRequest(true)
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

                <h1>Sign In { session && "(Already Signed In)" }</h1>

                <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>

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

const SignInPage = () => (
    <div className="SignInPage">

        {/* <div className="spacer spacer-1"></div> */}
        {/* <div className="spacer spacer-2"></div> */}
        {/* <div className="spacer spacer-3"></div> */}
        {/* <div className="spacer-credit">"Concord Bridge" by Don Troiani</div> */}

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
            
            {<SignInWithRouter/>}

        </div>
    </div>
);

const INITIAL_STATE = {
    email: 'test@gmail.com',
    password: 'test',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    componentDidMount() {
        const self = this
        
        console.log(self.props.router.query.email)

        self.setState({
            email: self.props.router.query.email
        })
  
        //   if (this.props.auth.isAuthenticated) {
        //     this.props.history.push("/home");
        //   }
  
        // axios.get('/api/ping')
        // .then(function (response) {
        //     console.log("The server is up!");
        //     self.setState({serverUp: true});
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    }
  
    componentWillReceiveProps(nextProps) {
  
    //   if (nextProps.auth.isAuthenticated) {
    //     this.props.setUserDetails(nextProps.auth.user.id);
    //     this.props.history.push("/home"); // push user to dashboard when they login
    //   }
  
      if (nextProps.errors) {
        this.setState({
          errors: nextProps.errors
        });
      }
    }
  
    onSubmit = async event => {
        // event.preventDefault();
    
        const { email, password } = this.state;
    
        const userData = {
            email: email,
            password: password
        };

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        })

        if (res.status === 200) {
            const userObj = await res.json()
            // set user to useSWR state
            // mutate(userObj)
            console.log(userObj);
        } else {
            setErrorMsg('Incorrect username or password. Try better!')
        }
    
        // console.log(userData);
        // this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    handleLogin = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        signIn('credentials',
          {
            email,
            password,
            // The page where you want to redirect to after a 
            // successful login
            callbackUrl: `${window.location.origin}/home` 
          }
        )
      }
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {
      const { email, password, error } = this.state;
  
      const isInvalid = password === '' || email === '';
  
      return (
        <form onSubmit={this.handleLogin}>
    
            {this.state.serverUp ? 
            null
            :
            <div className="alert alert-danger mt-3">Login Down! Signing in will not work in mean time.</div>
            }
    
            <h1>Sign In</h1>
    
            <div className="form-label-group">
                <input 
                name="email"
                type="email" 
                value={email}
                onChange={this.onChange}
                className="form-control" 
                // id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="you@email.com"
                autocorrect="off"
                spellcheck="false"
                // TODO - autofocus is not working, gonna guess side menu is causing this
                // autofocus
                />
                <label className="heading-font" for="inputEmail">Email address:</label>
            </div>
    
            <div className="form-label-group">
                <input 
                name="password"
                type="password" 
                value={password}
                onChange={this.onChange}
                className="form-control" 
                // id="exampleInputEmail" 
                aria-describedby="passwordHelp" 
                placeholder="Password"
                />
                <label className="heading-font" for="inputEmail">Password:</label>
            </div>
    
            <div className="d-flex flex-column flex-lg-row justify-content-lg-between">
                <button disabled={isInvalid} type="submit" className="btn btn-articles-light">
                    Sign In
                </button>

                <button type="submit" className="btn btn-link">
                    Email me a sign in link
                </button>
            </div>
    
            {error && <p className="errorMessage">{error.message}</p>}
    
            <div className="connections mt-4">
    
                <div className="text-muted">Or sign in with:</div>
    
                <div className="connection mt-2">
                    <i className="fab fa-2x fa-google"></i>
                    <i className="fab fa-2x fa-apple ml-2"></i>
                    <i className="fab fa-2x fa-linkedin ml-2"></i>
                    <i className="fab fa-2x fa-twitter ml-2"></i>
                </div>
    
            </div>
    
            <div className="dual-header mt-4">
                {/* <PasswordForgetLink /> */}
                {/* <SignUpLink /> */}
            </div>
  
        </form>
      );
    }
}

const SignInWithRouter = withRouter(SignInFormBase)
// export default SignInPage

NewSignIn.getInitialProps = async(context) => {
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

export default NewSignIn