import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import TransparencyLayout from '../../../components/layouts/transparency';

function TransparencyChartsPage({ isConnected }) {

    return (
        <div className="transparency-charts-page">
                
            <Head>
                <title>Charts - Articles</title>
            </Head>
    
            <h2 className="title">
                Transparency Charts
            </h2>

        </div>
    )
}

TransparencyChartsPage.Layout = TransparencyLayout;
export default TransparencyChartsPage;