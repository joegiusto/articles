import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import ROUTES from 'components/constants/routes';

function StoreLayout({ children }) {
    const cartItems = useSelector((state) => state.cart)
    const router = useRouter()
    const { param } = router.query

    return (

    <div className="store-page">

        <div className="extra-nav-bar card noselect">

            <div className="left"></div>

            <div className="center">
                <Link href={ROUTES.STORE}><a className={router.asPath === ROUTES.STORE ? 'active' : ''}>Home</a></Link>
                <Link href={ROUTES.STORE_PRODUCTS}><a className={router.asPath === ROUTES.STORE_PRODUCTS ? 'active' : ''}>Products</a></Link>
                <Link href={ROUTES.STORE_COLLECTIONS}><a className={router.asPath === ROUTES.STORE_COLLECTIONS ? 'active' : ''}>Collections</a></Link>
                <Link href={ROUTES.STORE_ORDERS}><a className={router.asPath === ROUTES.STORE_ORDERS ? 'active' : ''}>Orders</a></Link>
                <Link href={ROUTES.STORE_SAVED}><a className={router.asPath === ROUTES.STORE_SAVED ? 'active' : ''}>Saved</a></Link>
                <Link href={ROUTES.STORE_SUBMISSIONS}><a className={router.asPath === ROUTES.STORE_SUBMISSIONS ? 'active' : ''}>Submissions</a></Link>
            </div>

            <div className="right">
                <Link href={ROUTES.CHECKOUT}>
                    <a className={'btn align-items-center ' + (router.asPath === ROUTES.CHECKOUT ? 'btn-articles-light alt' : 'btn-articles-light')}><i className="fas fa-shopping-basket mr-2"></i>Checkout ({cartItems.length})</a>
                </Link>
            </div>

        </div>

        <div className="page">{children}</div>

    </div>

    )

};
  
export default StoreLayout;