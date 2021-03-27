import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import { connectToDatabase } from '../../util/mongodb'

// const useCounter = () => {
//     const colorModeDark = useSelector((state) => state.colorModeDark)
//     return { colorModeDark }
// }

export default function Home({ isConnected }) {
    const dispatch = useDispatch()
    // const { colorModeDark } = useCounter()

    return (
        <div className={`container`}>

            <Head>
                <title>Mission - Articles</title>
            </Head>

            <main>
                <h1 className="title">
                    Mission
                </h1>

                {isConnected ? (
                <h2 className="subtitle">You are connected to MongoDB</h2>
                ) : (
                <h2 className="subtitle">
                    You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
                    for instructions.
                </h2>
                )}

            </main>
        
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
