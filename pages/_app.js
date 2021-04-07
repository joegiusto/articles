import { useEffect } from 'react';
import { Provider as AuthProvider } from 'next-auth/client'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import { io } from "socket.io-client";

import MainLayout from '../components/layout'
import DefaultLayout from '../components/layouts/default'

import '../assets/scss/index.scss';
import '../assets/fontawsome/css/all.min.css';

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import { useStore } from '../redux/store'

import SocketContext from '../components/context/socket'

const socket = io("localhost:3000");

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)
    const persistor = persistStore(store, {}, function () {
        persistor.persist()
    })
    const Layout = Component.Layout || DefaultLayout;

    useEffect(() => {

        // socket.on("connect", () => {
        //     console.log(socket.id); // "G5p5..."
        // });
        
	}, []);

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