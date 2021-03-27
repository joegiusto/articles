import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import { connectToDatabase } from '../../util/mongodb'
import TransparencyLayout from '../../components/layouts/transparency';

function TransparencyHomePage({ isConnected }) {

    return (
        <div className="transparency-page">
                
            <Head>
                <title>Transparency - Articles</title>
            </Head>

            {/* <div className={`container py-3`}> */}
    
                <h2 className="title">
                    Transparency
                </h2>

                {isConnected ? (
                <div className="text-muted subtitle">You are connected to MongoDB</div>
                ) : (
                <div className="text-muted subtitle">
                    You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
                    for instructions.
                </div>
                )}
    
            {/* </div> */}
            
        </div>
    )
}

TransparencyHomePage.Layout = TransparencyLayout;
export default TransparencyHomePage;

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
