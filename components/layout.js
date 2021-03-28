import Link from 'next/link'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import SideMenu from './SideMenu/'
import Footer from './Footer'

const useCounter = () => {
    const colorModeDark = useSelector((state) => state.colorModeDark)
    return { colorModeDark }
}

export default function Layout(
    {
        children,
        title = 'Articles Media',
    }
) {
    const { colorModeDark } = useCounter();

    return (
        <div style={{minHeight: '100vh'}} className={`d-flex flex-column ${colorModeDark ? 'dark-mode' : ''} `}>

            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* <script src="https://kit.fontawesome.com/d1a2586c98.js" crossorigin="anonymous"></script> */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link rel="stylesheet" href="https://use.typekit.net/wvo0uze.css"/>
                <script src="https://kit.fontawesome.com/d1a2586c98.js" crossOrigin="anonymous"></script>
            </Head>

            <SideMenu
                site={{
                    
                }}
            />

            {children}

            <Footer/>

        </div>
    )
}