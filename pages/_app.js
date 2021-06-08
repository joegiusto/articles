import { useEffect } from 'react';

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

import { setUserDetails } from "/redux/actions/authActions";
import { setStories } from "/redux/actions/storiesActions";
import { setMessages } from "/redux/actions/messagesActions";
import { setIssues } from "/redux/actions/issuesActions";
import { setMyths } from "/redux/actions/mythsActions";

import SocketContext from '/components/context/socket'

const secret = process.env.SECRET

let socket

// MEMORY - Many, many, many issues later
if (typeof window !== 'undefined') {
    socket = io("https://60f746d5c43f.ngrok.io");
}

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)
    const persistor = persistStore(store, {}, function () {
        persistor.persist()
    })
    const [ session, loading ] = useSession()
    const Layout = Component.Layout || DefaultLayout;

    useEffect(() => {

        {store.dispatch(setStories())}
        {store.dispatch(setIssues())}
        {store.dispatch(setMyths())}
        
	}, []);

    // Fetch content from protected route
    useEffect(()=>{

        // const fetchData = async () => {
        //     const res = await fetch('/api/getUserDetails')
        //     const json = await res.json()
        //     console.log(json)
        // }
        // fetchData()

        if (session?.email) {
            {store.dispatch( setUserDetails() )}
            {store.dispatch( setMessages() )}
        }

    },[session])

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