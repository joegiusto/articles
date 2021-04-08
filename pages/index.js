import Head from 'next/head'
import Link from 'next/link'
import ROUTES from '../components/constants/routes'
import { useSelector, useDispatch } from 'react-redux'

import { connectToDatabase } from '../util/mongodb'

const useCounter = () => {
    const colorModeDark = useSelector((state) => state.colorModeDark)
    return { colorModeDark }
}

export default function Home({ isConnected }) {
    const dispatch = useDispatch()
    const { colorModeDark } = useCounter()

    return (
        <div className={`container`}>

            <Head>
                {/* <title>Create Next App</title> */}
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <main>

                <h1 className="title">
                    Welcome to Articles Media
                </h1>

                <div className="grid">

                    <Link href={ROUTES.NEWS}>
                        <a className="card">
                            <h3>News &rarr;</h3>
                            <p>Explore what's going on in the country.</p>
                        </a>
                    </Link>

                    <Link href={ROUTES.STORE}>
                        <a className="card">
                            <h3>Store &rarr;</h3>
                            <p>Help support Articles by making a purchase.</p>
                        </a>
                    </Link>

                    <Link href={ROUTES.PROPOSALS}>
                        <a className="card">
                            <h3>Proposals &rarr;</h3>
                            <p>Discover some of the ideas we have in mind.</p>
                        </a>
                    </Link>

                </div>
            </main>

            <style jsx>{`

                main {
                padding: 5rem 0;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                }

                .title a {
                color: #0070f3;
                text-decoration: none;
                }

                .title a:hover,
                .title a:focus,
                .title a:active {
                text-decoration: underline;
                }

                .title {
                margin: 0;
                line-height: 1.15;
                font-size: 4rem;
                }

                .title,
                .description {
                text-align: center;
                }

                .subtitle {
                font-size: 2rem;
                }


                .grid {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;

                max-width: 1000px;
                margin-top: 3rem;
                }

                .card {
                margin: 1rem;
                flex-basis: 30%;
                padding: 1.5rem;
                text-align: left;
                color: inherit;
                text-decoration: none;
                border: 1px solid #eaeaea;
                border-radius: 10px;
                transition: color 0.15s ease, border-color 0.15s ease;
                }

                .card:hover,
                .card:focus,
                .card:active {
                color: #0070f3;
                border-color: #0070f3;
                }

                .card h3 {
                margin: 0 0 1rem 0;
                font-size: 1.5rem;
                }

                .card p {
                margin: 0;
                font-size: 1.25rem;
                line-height: 1.5;
                }

                .logo {
                height: 1em;
                }

                @media (max-width: 600px) {
                .grid {
                    width: 100%;
                    flex-direction: column;
                }
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                    sans-serif;
                }

                * {
                box-sizing: border-box;
                }
            `}</style>
        
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
