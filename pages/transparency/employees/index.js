import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import TransparencyLayout from '../../../components/layouts/transparency';

function TransparencyEmployeesPage({ isConnected }) {

    return (
        <div className="transparency-page">
                
            <Head>
                <title>Employees - Articles</title>
            </Head>
    
            <h2 className="title">
                Transparency Employees
            </h2>

        </div>
    )
}

TransparencyEmployeesPage.Layout = TransparencyLayout;
export default TransparencyEmployeesPage;