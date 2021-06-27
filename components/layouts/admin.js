import React, { useState } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/client'

import AccessDenied from '../../components/access-denied'
import ROUTES from '../../components/constants/routes';

function AdminLayout({ children }) {
// const StoreLayout = ({ children }) => (
    const router = useRouter()
    const { param } = router.query
    const [ session, loading ] = useSession()

    const [ tab, setTab ] = useState('')
    const [ tabBarScrollPosition, setTabBarScrollPosition ] = useState(0)
    const [ tabBarScrollWidth, setTabBarScrollWidth ] = useState(0)
    const [ tabBarWidth, setTabBarWidth ] = useState(0)

    const tabBar = React.createRef();

    function scrollEvent(e) {
        const target = e.target;

        setTabBarScrollPosition(target.scrollLeft)
        setTabBarWidth(target.offsetWidth)
        setTabBarScrollWidth( target.scrollWidth)
    }

    if (!session) { return(
        <div className="container my-3">

            <Head>

            </Head>

            <AccessDenied/>
        </div>
    ) }

    return (

    <div className="admin-container">

        <Head>
            <meta name="robots" content="noindex"/>
        </Head>

        <div className="tab-bar-wrapper">

            <div ref={tabBar} onScroll={scrollEvent} className="tab-bar">

                <div className="container-fluid">

                    <Link href={ROUTES.ADMIN}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN && 'active')}>Dashboard</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_USERS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_USERS && 'active')}>Users</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_NEWS}>
                        <a><span className={"tab " + ( (router.asPath === ROUTES.ADMIN_NEWS || router.pathname === '/admin/news/[[...news_id]]') && 'active')}>News</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_PROPOSALS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_PROPOSALS && 'active')}>Proposals</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_PRODUCTS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_PRODUCTS && 'active')}>Products</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_SUBMISSIONS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_SUBMISSIONS && 'active')}>Submissions</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_DONATIONS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_DONATIONS && 'active')}>Donations</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_EXPENSES}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_EXPENSES && 'active')}>Expenses</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_SOCKET}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_SOCKET && 'active')}>Sockets</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_AWS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_AWS && 'active')}>AWS</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_COMMENTS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_COMMENTS && 'active')}>Comments</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_REPORTS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_REPORTS && 'active')}>Reports</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_ORDERS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_ORDERS && 'active')}>Orders</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_ADS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_ADS && 'active')}>Ads</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_MESSAGES}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_MESSAGES && 'active')}>Messages</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_PROJECTS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_PROJECTS && 'active')}>Projects</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_NEWSLETTER}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_NEWSLETTER && 'active')}>Newsletter</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_PRESIDENTS}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_PRESIDENTS && 'active')}>Presidents</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_EMAIL}>
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_EMAIL && 'active')}>Email</span></a>
                    </Link>
                    
                </div>

            </div>

            <div className={"scroll-alert scroll-left-alert " + (tabBarScrollPosition > 80 && 'active')}>
                <i className="fas fa-caret-left mr-0"></i>
            </div>

            <div className={"scroll-alert scroll-right-alert " + (tabBarScrollPosition < (tabBarScrollWidth - tabBarWidth - 80) && 'active')}>
                <i className="fas fa-caret-right mr-0"></i>
            </div>

        </div>

        {children}

    </div>

    )

};
  
export default AdminLayout;