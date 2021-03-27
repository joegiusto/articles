import { Provider } from 'react-redux'
import { useStore } from '../redux/store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import Layout from '../components/layout'

import '../assets/scss/index.scss';

function MyApp({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)
    const persistor = persistStore(store, {}, function () {
        persistor.persist()
    })

    return ( 
        <Provider store={store}>
            <PersistGate loading={<div>loading</div>} persistor={persistor}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </PersistGate>
        </Provider>
    )
}

export default MyApp