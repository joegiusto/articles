import { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'

import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import SideMenu from './SideMenu/'
import Footer from './layouts/footer'
import ROUTES from 'components/constants/routes'

// const useCounter = () => {
//     return { colorModeDark, sideMenuFixed }
// }

export default function Layout(
    {
        children,
        title = 'Articles Media',
    }
) {
    const userReduxState = useSelector((state) => state.auth.user_details)
    const colorModeDark = useSelector((state) => state.site.colorModeDark)
    const sideMenuFixed = useSelector((state) => state.site.sideMenuFixed)

    const [ menuTransparencyOpen, toggleTransparencyMenuOpen ] = useState(false);
    const [ menuClothingOpen, toggleClothingMenuOpen ] = useState(false);
    const [ menuNewsOpen, toggleNewsMenuOpen ] = useState(false);
    const [ menuPoliticsOpen, togglePoliticsMenuOpen ] = useState(false);
    const [ menuCustomLinksOpen, toggleCustomLinksMenuOpen ] = useState(false);

    // const { colorModeDark, sideMenuFixed } = useCounter();

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
                user={{
                    roles: {
                        isAdmin: true
                    }
                }}
            />

            <div className="nav-bar-centered-links">
                <div className="links">

                    <Dropdown 
                        onMouseEnter={() => {
                            toggleTransparencyMenuOpen(true);
                        }}
                        onMouseLeave={() => {
                            toggleTransparencyMenuOpen(false);
                        }}
                        className="" 
                        show={menuTransparencyOpen} 
                        as={ButtonGroup}
                    >

                        <Link href={ROUTES.TRANSPARENCY}>
                            <Button variant="articles-light btn-sm mr-0 align-items-center">
                            <i className="fad fa-file-chart-line fa-lg"></i>Transparency
                            </Button>
                        </Link>

                        <Dropdown.Toggle split variant="articles-light btn-sm" id="dropdown-custom-2" />

                        <Dropdown.Menu className="">

                            <Link passHref={true} href={ROUTES.TRANSPARENCY_CHARTS}>
                                <Dropdown.Item eventKey="1"><i className="fad fa-chart-pie fa-lg"></i>Charts</Dropdown.Item>
                            </Link>

                            <Link passHref={true} href={ROUTES.TRANSPARENCY_EMPLOYEES}>
                                <Dropdown.Item eventKey="2"><i className="fad fa-users fa-lg"></i>Employees</Dropdown.Item>
                            </Link>

                        </Dropdown.Menu>

                    </Dropdown>

                    <Dropdown 
                        onMouseEnter={() => {
                            toggleClothingMenuOpen(true);
                        }}
                        onMouseLeave={() => {
                            toggleClothingMenuOpen(false);
                        }}
                        className="" 
                        show={menuClothingOpen} 
                        as={ButtonGroup}
                    >

                        <Link href={ROUTES.STORE}>
                            <Button variant="articles-light btn-sm mr-0 align-items-center">
                            <i className="fad fa-shopping-cart fa-lg"></i>Clothing
                            </Button>
                        </Link>

                        <Dropdown.Toggle split variant="articles-light btn-sm" id="dropdown-custom-2" />

                        <Dropdown.Menu className="">

                            <Link passHref={true} href={ROUTES.STORE_PRODUCTS}>
                                <Dropdown.Item eventKey="1"><i className="fad fa-tags fa-lg"></i>Products</Dropdown.Item>
                            </Link>

                            <Link passHref={true} href={ROUTES.STORE_SUBMISSIONS}>
                                <Dropdown.Item eventKey="2"><i className="fad fa-tshirt fa-lg"></i>Submissions</Dropdown.Item>
                            </Link>

                        </Dropdown.Menu>

                    </Dropdown>

                    <Dropdown 
                        onMouseEnter={() => {
                            toggleNewsMenuOpen(true);
                        }}
                        onMouseLeave={() => {
                            toggleNewsMenuOpen(false);
                        }}
                        className="" 
                        show={menuNewsOpen} 
                        as={ButtonGroup}
                    >

                        <Link href={ROUTES.NEWS}>
                            <Button variant="articles-light btn-sm mr-0 align-items-center">
                            <i className="fad fa-newspaper fa-lg"></i>News
                            </Button>
                        </Link>

                        <Dropdown.Toggle split variant="articles-light btn-sm" id="dropdown-custom-2" />

                        <Dropdown.Menu className="">

                            <Link passHref={true} href={ROUTES.STORIES}>
                                <Dropdown.Item eventKey="1"><i className="fad fa-bullhorn fa-lg"></i>Stories</Dropdown.Item>
                            </Link>

                            <Link passHref={true} href={ROUTES.ISSUES}>
                                <Dropdown.Item eventKey="2"><i className="fad fa-balance-scale fa-lg"></i>Issues</Dropdown.Item>
                            </Link>

                            <Link passHref={true} href={ROUTES.MYTHS}>
                                <Dropdown.Item eventKey="3"><i className="fad fa-ghost fa-lg"></i>Myths</Dropdown.Item>
                            </Link>

                            <Link passHref={true} href={ROUTES.RESOURCES}>
                                <Dropdown.Item eventKey="4"><i className="fad fa-books fa-lg"></i>Resources</Dropdown.Item>
                            </Link>

                        </Dropdown.Menu>

                    </Dropdown>

                    <Dropdown 
                        onMouseEnter={() => {
                            togglePoliticsMenuOpen(true);
                        }}
                        onMouseLeave={() => {
                            togglePoliticsMenuOpen(false);
                        }}
                        className="" 
                        show={menuPoliticsOpen} 
                        as={ButtonGroup}
                    >

                        <Link href={ROUTES.PARTY}>
                            <Button variant="articles-light btn-sm mr-0 align-items-center">
                            <i className="fad fa-hands-helping fa-lg"></i>Politics
                            </Button>
                        </Link>

                        <Dropdown.Toggle split variant="articles-light btn-sm" id="dropdown-custom-2" />

                        <Dropdown.Menu className="">

                            <Link passHref={true} href={ROUTES.PROPOSALS}>
                                <Dropdown.Item eventKey="1"><i className="fad fa-scroll fa-lg"></i>Proposals</Dropdown.Item>
                            </Link>

                            <Link passHref={true} href={ROUTES.TOWN_HALL}>
                                <Dropdown.Item eventKey="2"><i className="fad fa-signal-stream fa-lg"></i>Town Hall</Dropdown.Item>
                            </Link>

                            {/* <Dropdown.Item eventKey="1">Proposals</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Town Hall</Dropdown.Item> */}
                            {/* <Dropdown.Item eventKey="3">Employees</Dropdown.Item> */}
                            {/* <Dropdown.Item eventKey="4">Flag</Dropdown.Item> */}
                            {/* <Dropdown.Divider /> */}

                        </Dropdown.Menu>

                    </Dropdown>

                    {userReduxState.custom_links?.enabled &&
                    <Dropdown 
                        onMouseEnter={() => {
                            toggleCustomLinksMenuOpen(true);
                        }}
                        onMouseLeave={() => {
                            toggleCustomLinksMenuOpen(false);
                        }}
                        className="" 
                        show={menuCustomLinksOpen} 
                        as={ButtonGroup}
                    >

                        <Dropdown.Toggle split variant="articles-light btn-sm" id="dropdown-custom-2">                          
                            <i className="fad fa-link fa-lg"></i><span className="mr-2">My Links</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="">

                            {userReduxState.custom_links?.links.map( item => 
                                <Dropdown.Item key={item.link} href={item.link} target="_blank" rel="noreferrer" eventKey="1"><i className="fad fa-link fa-lg"></i>{item.text}</Dropdown.Item>
                            )}

                        </Dropdown.Menu>

                    </Dropdown>
                    }

                    <Button variant="articles-light btn-sm mr-0 align-items-center rounded-pill">
                        <i className="fad fa-edit mr-0"></i>
                    </Button>

                </div>
            </div>

            <div className="content-wrap">
                {children}
            </div>

            <Footer/>

        </div>
    )
}