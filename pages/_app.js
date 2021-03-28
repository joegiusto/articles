import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import MainLayout from '../components/layout'
import DefaultLayout from '../components/layouts/default'

import '../assets/scss/index.scss';
import '../assets/fontawsome/css/all.min.css';

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)
    const persistor = persistStore(store, {}, function () {
        persistor.persist()
    })
    const Layout = Component.Layout || DefaultLayout;

    return ( 
        <Provider store={store}>
            {/* <PersistGate loading={<div>loading</div>} persistor={persistor}> */}
            <MainLayout>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </MainLayout>
            {/* </PersistGate> */}
        </Provider>
    )
}

export default MyApp