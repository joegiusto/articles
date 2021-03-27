import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import { connectToDatabase } from '../../util/mongodb'

export default function Home({ isConnected }) {

    return (
        <div className="home-page">
                
            <Head>
                <title>Home - Articles</title>
            </Head>

            <div className={`container py-3`}>
    

                <h2 className="title">
                    Home
                </h2>

                <p>
                    This is your home!
                </p>
            
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
