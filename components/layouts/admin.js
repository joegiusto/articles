import React, { useState } from 'react'

import Link from 'next/link'
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
            <AccessDenied/>
        </div>
    ) }

    return (

    <div className="admin-container">

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
                        <a><span className={"tab " + (router.asPath === ROUTES.ADMIN_NEWS && 'active')}>News</span></a>
                    </Link>

                    <Link href={ROUTES.ADMIN_PROPOSALS}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_PROPOSALS && 'active')}>Proposals</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_PRODUCTS}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_PRODUCTS && 'active')}>Products</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_SUBMISSIONS}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_SUBMISSIONS && 'active')}>Submissions</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_DONATIONS}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_DONATIONS && 'active')}>Donations</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_EXPENSES}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_EXPENSES && 'active')}>Expenses</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_SOCKET}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_SOCKET && 'active')}>Sockets</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_AWS}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_AWS && 'active')}>AWS</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_COMMENTS}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_COMMENTS && 'active')}>Comments</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_REPORTS}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_REPORTS && 'active')}>Reports</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_ORDERS}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_ORDERS && 'active')}>Orders</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_ADS}>
                        <span className={"tab " + (router.asPath === ROUTES.ADMIN_ADS && 'active')}>Ads</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_MESSAGES}>
                        <span className={"tab" + (router.asPath === ROUTES.ADMIN_MESSAGES && 'active')}>Messages</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_PROJECTS}>
                        <span className={"tab" + (router.asPath === ROUTES.ADMIN_PROJECTS && 'active')}>Projects</span>
                    </Link>

                    <Link href={ROUTES.ADMIN_NEWSLETTER}>
                        <span className={"tab" + (router.asPath === ROUTES.ADMIN_NEWSLETTER && 'active')}>Newsletter</span>
                    </Link>
{/* 
                    <Link href={ROUTES.ADMIN_PRESIDENTS}>
                        <span className={"tab" + (this.state.tab === 'presidents' ? ' active' : '')}>Presidents</span>
                    </Link> */}
                    
                </div>

            </div>

            <div className={"scroll-alert scroll-left-alert " + (tabBarScrollPosition > 80 && 'active')}>
                <i className="fas fa-caret-left mr-0"></i>
            </div>

            <div className={"scroll-alert scroll-right-alert " + (tabBarScrollPosition < (tabBarScrollWidth - tabBarWidth - 80) && 'active')}>
                <i className="fas fa-caret-right mr-0"></i>
            </div>

        </div>


        <div className="page">{children}</div>

    </div>

    )

};
  
export default AdminLayout;