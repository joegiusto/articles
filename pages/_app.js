import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { Provider as AuthProvider, useSession } from 'next-auth/client'

import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { io } from "socket.io-client";

import MainLayout from 'components/layout'
import DefaultLayout from 'components/layouts/default'

import 'assets/scss/index.scss';
// import 'assets/fontawesome/css/all.min.css';

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import { useStore } from '/redux/store'

import { setUserDetails, clearUserDetails } from "/redux/actions/authActions";
import { setStories } from "/redux/actions/storiesActions";
import { setMessages } from "/redux/actions/messagesActions";
import { setIssues } from "/redux/actions/issuesActions";
import { setMyths } from "/redux/actions/mythsActions";

import SocketContext from '/components/context/socket'

const secret = process.env.SECRET

let socket

// MEMORY - Many, many, many issues later
if (typeof window !== 'undefined') {
    socket = io("https://a14e52bc3e8f.ngrok.io");
}

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const { pathname, asPath } = router;

    const store = useStore(pageProps.initialReduxState)
    const persistor = persistStore(store, {}, function () {
        persistor.persist()
    })
    const [ session, loading ] = useSession()
    const Layout = Component.Layout || DefaultLayout;

    useEffect(() => {
             
        if ( typeof window !== 'undefined' && process.env.VERCEL_ENV == "production" ) {

            console.log("GA - EVENT")

            gtag('config', 'G-1FY263JYMM', {    // DON'T ADD THIS TO _document.tsx
                page_path: window.location.pathname,   // OTHERWISE YOU'LL GET DUPLICATE HITS
            });    

        } else {
            console.log("GA - EVENT IGNORED")
        }

    },[asPath]);

    useEffect( () => {

        { store.dispatch( setStories() ) }
        { store.dispatch( setIssues() ) }
        { store.dispatch( setMyths() ) }
        
	}, [] );

    // Fetch content from protected route
    useEffect( () => {

        // const fetchData = async () => {
        //     const res = await fetch('/api/getUserDetails')
        //     const json = await res.json()
        //     console.log(json)
        // }
        // fetchData()

        // console.log("Session Var")
        // console.log(loading)
        // console.log(session)

        // No session and not loading
        if ( !session ) {
            // {store.dispatch( clearUserDetails() )}
        }

        // Email set and not loading
        if ( session?.user.email ) {
            console.log("User has valid session")
            {store.dispatch( setUserDetails() )}
            {store.dispatch( setMessages() )}
        }

    }, [session] )

    useEffect( () => {

        console.log("Loading change")
        console.log(session)

    }, [ loading ] )

    return ( 
        <AuthProvider options={ {clientMaxAge: 0, keepAlive: 0} } session={ pageProps.session }>
            <SocketContext.Provider value={socket}>
                <Provider store={store}>
                    {/* <PersistGate loading={<div>loading</div>} persistor={persistor}> */}
                    <MainLayout>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </MainLayout>
                    {/* </PersistGate> */}
                </Provider>
            </SocketContext.Provider>
        </AuthProvider>
    )
}

export default MyApp