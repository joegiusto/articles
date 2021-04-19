import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import axios from 'axios'

import { connectToDatabase } from "../../../util/mongodb";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
    // https://next-auth.js.org/configuration/providers
    providers: [
        // Providers.Apple({
        //   clientId: process.env.APPLE_ID,
        //   clientSecret: {
        //     appleId: process.env.APPLE_ID,
        //     teamId: process.env.APPLE_TEAM_ID,
        //     privateKey: process.env.APPLE_PRIVATE_KEY,
        //     keyId: process.env.APPLE_KEY_ID,
        //   },
        // }),
        // Providers.Auth0({
        //   clientId: process.env.AUTH0_ID,
        //   clientSecret: process.env.AUTH0_SECRET,
        //   domain: process.env.AUTH0_DOMAIN,
        // }),
        // Providers.Facebook({
        //   clientId: process.env.FACEBOOK_ID,
        //   clientSecret: process.env.FACEBOOK_SECRET,
        // }),
        Providers.Credentials({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // credentials: {
            //     username: { label: "Email", type: "text", },
            //     password: {  label: "Password", type: "password" }
            // },
            async authorize(credentials) {

                // const pingresponse = await axios.get('/api/hello')
                // .then( (response) => {
                //     console.log(response)
                // })

                // console.log("Made it to next-auth")
                // console.log(pingresponse)

                // // console.log(credentials)
                // console.log(credentials.email)
                // console.log(credentials.password)

                // axios.post('/api/auth/customLogIn', {
                //     test: 'test'
                // })
                // .then( (response) => {
                //     console.log(response)
                //     console.log('yes');
                //     return response;
                // })
                // .catch(function (error) {
                //     console.log(error);
                //     // const errorMessage = e.response
                //     const errorMessage = 'uh oh!'
                //     console.log('uh oh');
                //     // throw new Error(errorMessage + '&email=' + credentials.email)
                // });

                // try {

                //     console.log("Made it to try")
                    
                //     const user = await axios.post('http://localhost:3001/api/auth/customLogIn',
                //         {
                //             test: 'test' 
                //             // user: {
                //             //     password: credentials.password,
                //             //     email: credentials.email
                //             // }
                //         },
                //         // {
                //         //     headers: {
                //         //         accept: '*/*',
                //         //         'Content-Type': 'application/json'
                //         //     }
                //         // }
                //     )

                //     console.log("log user")
                //     console.log(user)
            
                //     if (user) {
                //       return {status: 'success', data: user}
                //     } else {
                //         console.log("NO USER")
                //     }

                // } catch (e) {
                //     console.log("Catching error")
                //     console.log(e.response)
                //     const errorMessage = e.response
                //     // Redirecting to the login page with error message          in the URL
                //     throw new Error(errorMessage + '&email=' + credentials.email)
                // }

            }
        }),
        Providers.Email({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        Providers.GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
        }),
        Providers.Google({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        }),
        Providers.LinkedIn({
            clientId: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET
        }),
        Providers.Twitter({
        clientId: process.env.TWITTER_ID,
        clientSecret: process.env.TWITTER_SECRET,
        })
    ],
    // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
    // https://next-auth.js.org/configuration/databases
    //
    // Notes:
    // * You must to install an appropriate node_module for your database
    // * The Email provider requires a database (OAuth providers do not)
    database: process.env.DATABASE_URL,

    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,

    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        // maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        // updateAge: 24 * 60 * 60, // 24 hours
    },

    // JSON Web tokens are only used for sessions if the `jwt: true` session
    // option is set - or by default if no database is specified.
    // https://next-auth.js.org/configuration/options#jwt
    jwt: {
        // A secret to use for key generation (you should set this explicitly)
        // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
        // Set to true to use encryption (default: false)
        // encryption: true,
        // You can define your own encode/decode functions for signing and encryption
        // if you want to override the default behaviour.
        // encode: async ({ secret, token, maxAge }) => {},
        // decode: async ({ secret, token, maxAge }) => {},
    },

    // You can define custom pages to override the built-in ones. These will be regular Next.js pages
    // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
    // The routes shown here are the default URLs that will be used when a custom
    // pages is not specified for that route.
    // https://next-auth.js.org/configuration/pages
    pages: {
        signIn: '/login',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
        error: '/login', // Error code passed in query string as ?error=
        verifyRequest: '/login?verifyRequest=true', // Used for check email page
        // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
        // async signIn(user, account, profile) { return true },
        // async redirect(url, baseUrl) { return baseUrl },
        async session(session, user) { 
            const { db } = await connectToDatabase();

            const projection = { '_id': 1 };
        
            const result = await db
            .collection("articles_users")
            .findOne(
                {email: session.user.email},
                {projection: projection}
            )

            user._id = result._id;
            session.user._id = result._id;
            return session 
        },
        // async jwt(token, user, account, profile, isNewUser) { return token }
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // Enable debug messages in the console if you are having problems
    debug: false,
})