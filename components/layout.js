import Link from 'next/link'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import SideMenu from './SideMenu/'
import Footer from './layouts/footer'

const useCounter = () => {
    const colorModeDark = useSelector((state) => state.site.colorModeDark)
    const sideMenuFixed = useSelector((state) => state.site.sideMenuFixed)
    return { colorModeDark, sideMenuFixed }
}

export default function Layout(
    {
        children,
        title = 'Articles Media',
    }
) {
    const { colorModeDark, sideMenuFixed } = useCounter();

    if (process.browser) {
        if ( colorModeDark === true ) {
            document.body.classList.add('dark')
        } else {
            document.body.classList.remove('dark')
        }
    }

    return (
        <div style={{minHeight: '100vh'}} className={`d-flex flex-column ${colorModeDark ? 'dark-mode' : ''} ${sideMenuFixed ? 'side-menu-fixed' : ''}`}>

            <Head>

                <title>{title}</title>
                <meta charSet="utf-8" />
                {/* <meta name="description" content="Description" /> */}
                <meta name="description" content="A political organization and platform working to make America a better place for the people through avenues of transparency, clothing, news, and politics."/>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                {/* <script src="https://kit.fontawesome.com/d1a2586c98.js" crossorigin="anonymous"></script> */}

                {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link rel="stylesheet" href="https://use.typekit.net/wvo0uze.css"/> */}

                <link rel="manifest" href="/manifest.json" />
                <link
                    href="/icons/favicon-16x16.png"
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                />
                <link
                    href="/icons/favicon-32x32.png"
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                />
                <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                <meta name="theme-color" content="#000000" />

                {/* <script src="https://kit.fontawesome.com/d1a2586c98.js" crossOrigin="anonymous"></script> */}
            </Head>

            <SideMenu
                site={{
                    
                }}
            />

            <div className="content-wrap">
                {children}
            </div>

            <Footer/>

        </div>
    )
}