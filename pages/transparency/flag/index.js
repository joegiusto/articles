import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import TransparencyLayout from '../../../components/layouts/transparency';

function TransparencyFlagPage({ isConnected }) {

    return (
        <div className="transparency-page">
                
            <Head>
                <title>Flag - Articles</title>
            </Head>
    
            <h2 className="title">
                Transparency Flag
            </h2>

        </div>
    )
}

TransparencyFlagPage.Layout = TransparencyLayout;
export default TransparencyFlagPage;