import Head from 'next/head'
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

                {/* {isConnected ? (
                <h2 className="subtitle">You are connected to MongoDB</h2>
                ) : (
                <h2 className="subtitle">
                    You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
                    for instructions.
                </h2>
                )} */}

                {/* <p className="description">
                    Get started by editing <code>pages/index.js</code>
                </p> */}

                {/* <button onClick={() => dispatch({type: 'TOGGLE_COLOR_MODE'})} className="btn btn-articles-light">Test</button> */}

                <div className="grid">
                    <a href="https://nextjs.org/docs" className="card">
                        <h3>Documentation &rarr;</h3>
                        <p>Find in-depth information about Next.js features and API.</p>
                    </a>

                    <a href="https://nextjs.org/learn" className="card">
                        <h3>Learn &rarr;</h3>
                        <p>Learn about Next.js in an interactive course with quizzes!</p>
                    </a>

                    <a
                        href="https://github.com/vercel/next.js/tree/master/examples"
                        className="card"
                    >
                        <h3>Examples &rarr;</h3>
                        <p>Discover and deploy boilerplate example Next.js projects.</p>
                    </a>

                    <a
                        href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        className="card"
                    >
                        <h3>Deploy &rarr;</h3>
                        <p>
                        Instantly deploy your Next.js site to a public URL with Vercel.
                        </p>
                    </a>
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

                max-width: 800px;
                margin-top: 3rem;
                }

                .card {
                margin: 1rem;
                flex-basis: 45%;
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
