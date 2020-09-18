import React, { Component, useState } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import * as ROUTES from '../../constants/routes';
import { Switch, Route, Link} from 'react-router-dom';

import StoreItemAlpha from './StoreItemAlpha';
import StoreItemBeta from './Items/Beta.js';

import OrdersPage from './Orders/index';
import CheckoutPage from './Checkout/index'

import hero from 'assets/img/Store/head.jpg';


class StorePage extends Component {
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

			// handle success
			console.log('Got Products')
      console.log(response.data.news);

      self.setState({
				products: response.data,
				loadingProducts: false
      });

      // self.setState({ resultsLoading: false });

    })
    .catch(function (error) {
      // handle error
      console.log(error);

      self.setState({ loadingProducts: true });
      self.setState({ resultsLoadingError: error });
		});

		// axios.get('/api/getUserSavedProducts')
    // .then(function (response) {

		// 	// handle success
		// 	console.log('Got Saved Products')

    //   self.setState({
		// 		products: response.data,
		// 		loadingProducts: false
    //   });

    //   // self.setState({ resultsLoading: false });

    // })
    // .catch(function (error) {
    //   // handle error
    //   console.log(error);

    //   self.setState({ loadingProducts: true });
    //   self.setState({ resultsLoadingError: error });
		// });

	}
	
	render() {
		
		return(
			<section className="store-page">

			<Helmet>
        <title>Store - Articles</title>
      </Helmet>
				
				<div className={"pop-out-viewer-container " + (this.props.match.params.id ? ' active' : '')}>

					<Link to={ROUTES.STORE} onClick={() => this.setPopOut(false)}>
						<div className="background"></div>
					</Link>

					<div className="pop-out-viewer">
						<div className={"viewer-nav "} style={{backgroundColor: this.state.currentPopOut.tabColor || "ffb7b7"}}>
							<Link to={ROUTES.STORE}><div onClick={() => this.setPopOut(false)} className="close-button"></div></Link>
						</div>
						<div className="viewer-body">
							<div className="row justify-content-between">

								<div className="col-12 col-md-8">
									<div className="row">
										<div className="col-12 col-md-6">
											<div className="selected-photo">
												<img src={this.state.currentPopOutPhoto} alt=""/>
											</div>
										</div>
										<div className="col-12 col-md-6">
											<h5>Showcase Photos</h5>
											<div className="thumbnails">
												<div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.one})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
													<img src={this.state.currentPopOut.photos?.one} alt=""/>
												</div>
												<div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.two})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
													<img src={this.state.currentPopOut.photos?.two} alt=""/>
												</div>
												<div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.three})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
													<img src={this.state.currentPopOut.photos?.three} alt=""/>
												</div>
												<div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.four})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
													<img src={this.state.currentPopOut.photos?.four} alt=""/>
												</div>
												<div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.five})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
													<img src={this.state.currentPopOut.photos?.five} alt=""/>
												</div>
												<div onClick={() => this.setState({currentPopOutPhoto: this.state.currentPopOut.photos?.six})} className={"thumbnail-photo " + (this.state === "" ? null : null)}>
													<img src={this.state.currentPopOut.photos?.six} alt=""/>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="col-4 border-left">

									<div className="detail-container">			
															
										<h1>{this.state.currentPopOut.title}</h1>
										<div>Realesed | {this.state.currentPopOut.realese || <div className="badge badge-dark">?</div>}</div>
										<div>Material | {this.state.currentPopOut.material}</div>
										<div>Price | ${(this.state.currentPopOut.price / 100).toFixed(2)}</div>

										<button className="btn btn-articles-light mt-2">Add to Cart</button>	
									</div>

								</div>

							</div>
						</div>

						<div className="viewer-footer">
							<img src={this.state.currentPopOut.backing} alt=""/>
						</div>

					</div>

				</div>

				<div className="extra-nav-bar-placeholder"></div>

				<div className="extra-nav-bar">

					<div className="left"></div>
					
					<div className="center">
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE} className={this.props.match.path === ROUTES.STORE ? 'active' : ''}>Home</Link>
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_PRODUCTS} className={this.props.match.path === ROUTES.STORE_PRODUCTS ? 'active' : ''}>Products</Link>
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_COLLECTIONS} className={this.props.match.path === ROUTES.STORE_COLLECTIONS ? 'active' : ''}>Collections</Link>
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_ORDERS} className={this.props.match.path === ROUTES.STORE_ORDERS ? 'active' : ''}>Orders</Link>
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_SAVED} className={this.props.match.path === ROUTES.STORE_SAVED ? 'active' : ''}>Saved</Link>
					</div>

					<div className="right">
						<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.CHECKOUT} className={'btn btn-articles-light ' + (this.props.match.path === ROUTES.CHECKOUT ? 'active' : '')}>Checkout ({this.props.cart.length})</Link>
					</div>
				</div>

				<Switch>
					<Route exact path={[ROUTES.STORE, ROUTES.STORE_VIEW]} render={() => (
						<div>
							<div className="hero">
	
								<img src={hero} alt=""/>
			
								<div className="notice">
								
								</div>
			
			
								{/* <div className="showcase">
			
								</div> */}
			
			
								<div className="hero-content">
									<div className="title">Founders Collection</div>
									<div className="text">Our first clothing drop</div>
									<div className="btn btn-articles-light mt-2">Shop</div>
									<div className="bottom"></div>
								</div>
			
							</div>
		
							<div className="container">
								<div className="store-section-wrap">
				
									<div className="store-section">
										<h3>Hoodies</h3>

										{/* <div className="background">
											<img src="https://mymodernmet.com/wp/wp-content/uploads/archive/w-leZAxreDXSpoMROe6G_1082098865.jpeg" alt=""/>
										</div> */}
					
										<div className="items">
											<StoreItemBeta
												setPopOutVisible={this.setPopOut}
												product={this.state.products.find(element => element._id === "5eabc1e99b0beb3e04599717")}
												color="articles"
												// userSavedProducts={this.props.user_details.saved_products}
												isSaved={this.props.user_details?.saved_products?.find(o => o.product_id === '5eabc1e99b0beb3e04599717')}
											/>
					
											<StoreItemBeta
												setPopOutVisible={this.setPopOut}
												product={this.state.products.find(element => element._id === "5eabc20a38584110a044f93e")}
												color="articles"
												// userSavedProducts={this.props.user_details.saved_products}
												isSaved={this.props.user_details?.saved_products?.find(o => o.product_id === '5eabc20a38584110a044f93e')}
											/>
										</div>
					
									</div>
				
									<div className="store-section">
										<h3>Tees</h3>
					
										<div className="items">
											<StoreItemBeta
												setPopOutVisible={this.setPopOut}
												product={this.state.products.find(element => element._id === "5eec730342888643d8f5e2ce")}
												color="articles"
											/>
					
											<StoreItemBeta
												setPopOutVisible={this.setPopOut}
												product={this.state.products.find(element => element._id === "5f40753ab683383a945f7f7b")}
												color="articles"
											/>
										</div>
					
									</div>
			
									<div className="store-section">
										<h3>Accessories</h3>
					
										<div className="items">
											<StoreItemBeta
												setPopOutVisible={this.setPopOut}
												product={this.state.products.find(element => element._id === "5eb50fdde094562238f5b910")}
												color="articles"
											/>
					
											<StoreItemBeta
												setPopOutVisible={this.setPopOut}
												product={this.state.products.find(element => element._id === "5f4c7014537b221bc419408d")}
												color="articles"
											/>
										</div>
					
									</div>
			
									<div className="store-section">
										<h3>Pins</h3>
					
										<div className="items">
											<StoreItemBeta
												setPopOutVisible={this.setPopOut}
												product={this.state.products.find(element => element._id === "5eb3aaaba316c3077c598cc4")}
												color="articles"
											/>
					
											<StoreItemBeta
												setPopOutVisible={this.setPopOut}
												product={this.state.products.find(element => element._id === "5f4b146d537b221bc419408c")}
												color="articles"
											/>
										</div>
					
									</div>
			
								</div>
							</div>
			
							<div className='container'>
			
								{/* <div className='row justify-content-center'> */}
			
								<div className="link-panels">
									<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_PRODUCTS}>
										<div className="panel">
											<img src="https://cdn.articles.media/store/old_sheep_mockup_back.jpg" alt="" className="background view-all"/>
											<div className="icon">
												<i className="fas fa-tshirt"></i>
											</div>
											<div className="title">View All</div>
										</div>
									</Link>
		
									<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_COLLECTIONS}>
										<div className="panel">
											<img src="https://preview.free3d.com/img/2019/04/2154877840292579114/xqztcxft-900.jpg" alt="" className="background collections"/>
											<div className="icon">
												<i className="fas fa-grip-horizontal"></i>
											</div>
											<div className="title">Collections</div>
										</div>
									</Link>
		
									<Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORE_SUBMISSIONS}>
										<div className="panel">
		
											<div className="background submission"/>
		
											<div className="voting-board">
												<div className="board">
													{/* <i className="fas fa-ruler-combined"></i> */}
												</div>
												<div className="votes">
													<i className="fas fa-thumbs-down"></i>
													<i className="fas fa-thumbs-up mr-0"></i>
												</div>
											</div>
		
											<div className="icon">
												<i className="fas fa-lightbulb" aria-hidden="true"></i>
											</div>
		
											<div className="title">Submissions</div>
		
										</div>
									</Link>
									
								</div>
			
								{/* </div> */}
							
							</div>
			
							<div className="type-guide">
			
								<div className="extras-panels">
			
									<div className="panel">
										<div className="type">Originals</div>
										<div className="description">Designed and sold by us!</div>
										<div className="progress">
											<div className="progress-bar original" role="progressbar" style={{width: "100%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
										<div className="profit">Net Profit: 100%</div>
									</div>
			
									<div className="panel">
										<div className="type partner">Partner</div>
										<div className="description">In collabaration with another creator or company.</div>
										<div className="progress">
											<div className="progress-bar partner" role="progressbar" style={{width: "30%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
											<div className="progress-bar progress-bar-striped progress-bar-animated partner" role="progressbar" style={{width: "40%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
										<div className="profit">Net Profit: ~30%-70%</div>
									</div>
			
									<div className="panel">
										<div className="type sponsor">Sponsor</div>
										<div className="description">Promoted company/creator with a great cause.</div>
										<div className="progress">
											<div className="progress-bar sponsor" role="progressbar" style={{width: "2%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
											<div className="progress-bar progress-bar-striped progress-bar-animated sponsor" role="progressbar" style={{width: "5%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
										<div className="profit">Net Profit: ~1-5%</div>
									</div>
			
									<div className="panel">
										<div className="type submission">Submission</div>
										<div className="description">User design that won the Submissions event.</div>
										<div className="progress">
											<div className="progress-bar submission" role="progressbar" style={{width: "50%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
										</div>
										<div className="profit">Net Profit: 50%</div>
									</div>
			
								</div>
								
							</div>
						</div>
					)}/>
					<Route exact path={ROUTES.STORE_PRODUCTS} render={() => (
						<div className="container">
							<div className="store-products-page">
	
								{this.state.products.filter((o) => o.type === 'Original').map((product) => (
									product.visible === true ?
									<StoreItemBeta
										setPopOutVisible={this.setPopOut}
										product={product}
										color="articles"
									/>
									:
									null
								))}

								{this.state.products.filter((o) => o.type === 'Partnership').map((product) => (
									product.visible === true ?
									<StoreItemBeta
										setPopOutVisible={this.setPopOut}
										product={product}
										color="articles"
									/>
									:
									null
								))}

								{this.state.products.filter((o) => o.type === 'Sponsored').map((product) => (
									product.visible === true ?
									<StoreItemBeta
										setPopOutVisible={this.setPopOut}
										product={product}
										color="articles"
									/>
									:
									null
								))}
								
							</div>
						</div>
					)}/>
					<Route exact path={ROUTES.STORE_COLLECTIONS} render={() => (
						<div className="store-collections-page">
							<div className="collections">
								<div>September 2020</div>
								<div className="collection shadow">
									<h5>Founders Collection</h5>
									<div>Our first release ever</div>
									<div className="mt-2">Includes</div>
									<div className="items">
										<div className="item">Wolf Hoodie</div>
										<div className="item">Sheep Hoodie</div>
										<div className="item">Black Tee</div>
										<div className="item">White Tee</div>
										<div className="item">Logo Pin</div>
										<div className="item">Scroll Pin</div>
										<div className="item">Rain Jacket</div>
									</div>
								</div>
							</div>
						</div>
					)}/>
					<Route exact path={ROUTES.STORE_ORDERS} render={() => <OrdersPage/>}/>
					<Route exact path={ROUTES.STORE_SAVED} render={() => 
						<div className="store-saved-page">
							<div className="container">

								<h3>Saved</h3>
								<p>Any products you save will be displayed here.</p>

								<div className="items">

									{this.props.auth ? 

									this.props.user_details?.saved_products?.map((item) => (
										// <div>{item.product_id}</div>
										<StoreItemBeta
											setPopOutVisible={this.setPopOut}
											product={this.state.products?.find(element => element._id === item.product_id)}
											color="articles"
											isSaved={this.props.user_details?.saved_products.find(o => o.product_id === item.product_id)}
										/>
									))

									:

									<div className="sign-in-required-global-tag">
										<div>Please Sign In to see saved products</div>
										<Link to={ROUTES.SIGN_IN + `?directTo=${ROUTES.STORE_SAVED}`}><button className="btn btn-articles-light mt-3">Sign In</button></Link>
									</div>
									}

								</div>

							</div>
						</div>
					}/>
					<Route exact path={ROUTES.CHECKOUT} render={() => <CheckoutPage/>}/>
				</Switch>

			</section>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth.isAuthenticated,
	user_details: state.auth.user_details,
	cart: state.expenses
});

export default connect(
  mapStateToProps,
  { } 
)(StorePage);

// export default StorePage;