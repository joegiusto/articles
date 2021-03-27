import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import axios from 'axios';
// import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import ROUTES from '../../components/constants/routes';
import { useRouter } from 'next/router'
// import { Switch, Route, Link} from 'react-router-dom';

// import StoreItemAlpha from './StoreItemAlpha';
// import StoreItemBeta from './Items/Beta.js';

// import OrdersPage from './Orders/index';
// import CheckoutPage from './Checkout/index'
// import SavedPage from './Saved/index';
// import CollectionsPage from './Collections/index';

import StoreLayout from '../../components/layouts/store.js';

// import Products from './products';
// import Collections from './collections';
// import Orders from './Orders';
// import Saved from './Saved';
// import Submissions from './Submissions';

// import hero from 'assets/img/Store/head.jpg';
// import heroDark from 'assets/img/Store/head-dark.jpg';

function StorePage() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="store-page">

            <div className="extra-nav-bar noselect">

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
                        <a className={'btn btn-articles-light align-items-center ' + (router.asPath === ROUTES.CHECKOUT ? 'active' : '')}><i className="fas fa-shopping-basket mr-2"></i>Checkout ({0})</a>
                    </Link>
                </div>

            </div>

            {router.asPath === ROUTES.STORE && <h2>Home</h2>}
            {router.asPath === ROUTES.STORE_PRODUCTS && <Products/>}
            {router.asPath === ROUTES.STORE_COLLECTIONS && <Collections/>}
            {router.asPath === ROUTES.STORE_ORDERS && <Orders/>}
            {router.asPath === ROUTES.STORE_SAVED && <Saved/>}
            {router.asPath === ROUTES.STORE_SUBMISSIONS && <Submissions/>}

        </section>
    )
}

class StorePageOld extends Component {
  constructor(props) {
  super(props);

    this.state = {
		loadingProducts: false,
		products: [],
		userSavedProducts: [],
		popOutVisible: false,
		currentPopOut: "",
		currentPopOutPhoto: ""
	};
		
	this.setPopOut = this.setPopOut.bind(this);
    const router = useRouter()

	}

	setPopOut(state, product) {
		this.setState({
			popOutVisible: state,
			currentPopOut: product || this.state.currentPopOut,
		}, () => {
			this.setState({
				currentPopOutPhoto: this.state.currentPopOut.photos?.one
			})
		})
	}

	componentDidMount() {

		const self = this;
		this.setState({ loadingProducts: true });

		axios.get('/api/getProducts')
		.then(function (response) {
			console.log(response.data.news);
			self.setState({
				products: response.data,
				loadingProducts: false
			});
		})
		.catch(function (error) {
			console.log(error);
			self.setState({ loadingProducts: true });
			self.setState({ resultsLoadingError: error });
		});

	}
	
	render() {
		
		return(
			<section className="store-page">

                <Head>
                    <title>Store - Articles</title>
                </Head>

                {/* <PopOutViewContainer/> */}

				<div className="extra-nav-bar-placeholder"></div>

				{/* <div className="extra-nav-bar">

					<div className="left"></div>
					
					<div className="center">
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE} className={this.props.match.path === ROUTES.STORE ? 'active' : ''}>Home</Link>
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_PRODUCTS} className={this.props.match.path === ROUTES.STORE_PRODUCTS ? 'active' : ''}>Products</Link>
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_COLLECTIONS} className={this.props.match.path === ROUTES.STORE_COLLECTIONS ? 'active' : ''}>Collections</Link>
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_ORDERS} className={this.props.match.path === ROUTES.STORE_ORDERS ? 'active' : ''}>Orders</Link>
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_SAVED} className={this.props.match.path === ROUTES.STORE_SAVED ? 'active' : ''}>Saved</Link>
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_SUBMISSIONS} className={this.props.match.path === ROUTES.STORE_SUBMISSIONS ? 'active' : ''}>Submissions</Link>
					</div>

					<div className="right">
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.CHECKOUT} className={'btn btn-articles-light align-items-center ' + (this.props.match.path === ROUTES.CHECKOUT ? 'active' : '')}><i className="fas fa-shopping-basket mr-2"></i>Checkout ({this.props.cart.length})</Link>
					</div>
				</div> */}

                <div className="extra-nav-bar">

					<div className="left"></div>
					
					<div className="center">
						<Link href={ROUTES.STORE}><a className={router.pathname === ROUTES.STORE ? 'active' : ''}>Home</a></Link>
						<Link href={ROUTES.STORE_PRODUCTS}><a className={this.props.match.path === ROUTES.STORE_PRODUCTS ? 'active' : ''}>Products</a></Link>
						<Link href={ROUTES.STORE_COLLECTIONS}><a className={this.props.match.path === ROUTES.STORE_COLLECTIONS ? 'active' : ''}>Collections</a></Link>
						<Link href={ROUTES.STORE_ORDERS}><a className={this.props.match.path === ROUTES.STORE_ORDERS ? 'active' : ''}>Orders</a></Link>
						<Link href={ROUTES.STORE_SAVED}><a className={this.props.match.path === ROUTES.STORE_SAVED ? 'active' : ''}>Saved</a></Link>
						<Link href={ROUTES.STORE_SUBMISSIONS}><a className={this.props.match.path === ROUTES.STORE_SUBMISSIONS ? 'active' : ''}>Submissions</a></Link>
					</div>

					<div className="right">
						<Link href={ROUTES.CHECKOUT}>
                            <a className={'btn btn-articles-light align-items-center ' + (this.props.match.path === ROUTES.CHECKOUT ? 'active' : '')}><i className="fas fa-shopping-basket mr-2"></i>Checkout ({this.props.cart.length})</a>
                        </Link>
					</div>
				</div>

                {/* Switch was here */}

			</section>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth.isAuthenticated,
	user_details: state.auth.user_details,
	cart: state.expenses,
	colorModeDark: state.site.colorModeDark
});

// export default connect(
//   mapStateToProps,
//   {  } 
// )(StorePage);

StorePage.Layout = StoreLayout;

export default StorePage

// export default StorePage;

// const Page = (props) => (
//   <div className="updates-page">

//     <Head>
//         <title>Store - Articles</title>
//     </Head>

//     <div className="container">
//       <h1>Store</h1>
//     </div>

//   </div>
// );

// export default Page