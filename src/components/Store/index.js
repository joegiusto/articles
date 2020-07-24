import React, { Component, useState } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";

import StoreItemAlpha from './StoreItemAlpha';
import StoreItemBeta from './Items/Beta.js';

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

// import { withFirebase } from '../Firebase';
// import {One, Two, Three, Four} from './SponseredItems';

import hero from 'assets/img/Store/head.jpg';
import block from 'assets/img/Store/block.jpg';

class StorePage extends Component {
  constructor(props) {
  super(props);

    this.state = {
      loadingProducts: false,
			products: [],
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
		
    // this.props.firebase.store().once('value').then(snapshot => {

    //   const issuesObject = snapshot.val();

    //   const clothingList = Object.keys(issuesObject).map(key => (
    //     {
    //       ...issuesObject[key],
    //       uid: key,
    //     }
    //   ));

    //   this.setState({
    //    	firebaseClothing: clothingList,
		// 		loadingCloting: false,
    //   });

    // });

	}
	
	getIndexByUid(uid) {
			var matchIndex = -1;

			this.state.firebaseClothing.some((element, index) => {
				console.log(element.uid);
				if (element.uid === uid) {
					// console.log("Match! at " + index)
					matchIndex = index;
				}
			})

			return matchIndex 
	}

	// test() {
	// 	return "Howdy!"
	// }
	
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

				<div className="extra-nav-bar">
					<Link>Featured</Link>
					<Link>All Products</Link>
					<Link to={ROUTES.STORE_ORDERS}>Previous Orders</Link>
					<Link>Favorite Products</Link>
				</div>

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

				<div className='container'>

					<div className='row justify-content-center'>

					  <div className="featured-items">

							<div className="my-2 d-inline-flex my-md-4 store-heading">
								<img src={block} alt=""/>
								<div className="text px-3">Featured</div>
							</div>

							{/* <h1 className="mt-2 mt-md-4 store-heading">Featured</h1> */}

							<div className="store-item-beta-grid mb-4">

								{this.state.loadingProducts && <div>Loading ...</div>}

								<StoreItemBeta
									setPopOutVisible={this.setPopOut}
									product={this.state.products.find(element => element._id === "5eabc1e99b0beb3e04599717")}
									color="articles"
								/>

								<StoreItemBeta
									setPopOutVisible={this.setPopOut}
									product={this.state.products.find(element => element._id === "5eabc20a38584110a044f93e")}
									color="articles"
								/>

								<StoreItemBeta
									setPopOutVisible={this.setPopOut}
									product={this.state.products.find(element => element._id === "5eb3aaaba316c3077c598cc4")}
									color="articles"
								/>

								<StoreItemBeta
									setPopOutVisible={this.setPopOut}
									product={this.state.products.find(element => element._id === "5eb50fdde094562238f5b910")}
									color="articles"
								/>

								<StoreItemBeta
									setPopOutVisible={this.setPopOut}
									product={this.state.products.find(element => element._id === "5eec730342888643d8f5e2ce")}
									color="articles"
								/>

							</div>

						</div>
						
						<div className="collection d-none col-12 overflow-hidden">
							<div className="row">

								<div className="col-12">
									<div className="panel">
										<h1 className="store-heading w-100">First Launch</h1>
		
										<div className="row">
											<div className="col-6 p-0">
												<div className="store-panel store-panel-image-1">
			
												</div>
											</div>
		
											<div className="col-6 p-0">
												<div className="store-panel store-panel-1">
													<div className="slick-container text-center">
														<div className="mr-5 d-inline"><StoreItemAlpha catalogId='1' price={3000} title="Wolf Sweatshirt" banner="Original" color="articles" /></div>
														<StoreItemAlpha catalogId='2' price={3000} title="Sheep Sweatshirt" banner="Original" color="articles"/>
													</div>
												</div>
											</div>
										</div>
	
									</div>
								</div>

								<div className="panel d-none">
									<h1 className="store-heading mt-5 w-100">YesTheory Partnership</h1>
	
									<div className="col-6 p-0">
										<div className="store-panel store-panel-image-2">
	
										</div>
									</div>
									<div className="col-6 p-0">
										<div className="store-panel store-panel-2">
											<div className="slick-container text-center">
												<div className="mr-5 d-inline"><StoreItemAlpha catalogId='3' price={2500} title="Partner Item" banner="Partner" color="info"/></div>
												<StoreItemAlpha catalogId='3' price={2500} title="Partner Item" banner="Partner" color="info"/>
											</div>
										</div>
									</div>
								</div>

								<div className="panel d-none">
									<h1 className="store-heading mt-5 w-100">WWF Sponsered Products</h1>
	
									<div className="col-12 p-0">
										<div className="store-panel store-panel-image-3">
	
											<div className="logo-banner">
												<img src="https://thirdsector.com.au/wp-content/uploads/2018/12/unnamed.jpg" width="120px" alt=""/>
											</div>
	
											<div className="product-select">
												{/* <div className="btn-group-vertical">
													<button onClick={() => changeProductSelect("Symbolic Adoptions")} className={"btn " + (productSelect === "Symbolic Adoptions" ? ' btn-black' : ' btn-light')}>Symbolic Adoptions</button>
													<button onClick={() => changeProductSelect("Apparel")} className={"btn " + (productSelect === "Apparel" ? ' btn-black' : ' btn-light')}>Apparel</button>
													<button onClick={() => changeProductSelect("Memberships")} className={"btn " + (productSelect === "Memberships" ? ' btn-black' : ' btn-light')}>Memberships</button>
													<button onClick={() => changeProductSelect("More Gifts")} className={"btn " + (productSelect === "More Gifts" ? ' btn-black' : ' btn-light')}>More Gifts</button>
												</div> */}
												{/* <ul className="list-group">
													<li className="list-group-item list-group-item-dark">Symbolic Adoptions</li>
													<li className="list-group-item list-group-item-light">Apparel</li>
													<li className="list-group-item list-group-item-light">Memberships</li>
													<li className="list-group-item list-group-item-light">More Gifts</li>
												</ul> */}
											</div>
											
												<div className="row">
													<div className="col-6">
						
													</div>
													
													<div className="col-6">
	
														{/* {productSelect === "Symbolic Adoptions" ? <One/> : ''}
														{productSelect === "Apparel" ? <Two/> : ''}
														{productSelect === "Memberships" ? <Three/> : ''}
														{productSelect === "More Gifts" ? <Four/> : ''}		 */}
	
														{/* <div className="slick-container text-center">
															<div className="mr-5 d-inline"><StoreItem catalogId='4' price={2000} title="Sponsered Item" banner="Sponsered" color="danger"/></div>
															<StoreItem catalogId='5' price={2000} title="Sponsered Item" banner="Sponsered" color="primary"/>
														</div> */}
	
													</div>
												</div>
											
	
										</div>
									</div>
								</div>

							</div>
						</div>

						<div className="link-panels">

							<Link>
								<div className="panel">
									<img src="https://cdn.articles.media/store/old_sheep_mockup_back.jpg" alt="" className="background view-all"/>
									<div className="icon">
										<i class="fas fa-tshirt"></i>
									</div>
									<div className="title">View All</div>
								</div>
							</Link>

							<Link>
								<div className="panel">
									<img src="https://preview.free3d.com/img/2019/04/2154877840292579114/xqztcxft-900.jpg" alt="" className="background collections"/>
									<div className="icon">
										<i class="fas fa-grip-horizontal"></i>
									</div>
									<div className="title">Collections</div>
								</div>
							</Link>

							<Link to={ROUTES.STORE_SUBMISSIONS}>
								<div className="panel">

									<div className="background submission"/>

									<div className="voting-board">
										<div className="board">
											{/* <i class="fas fa-ruler-combined"></i> */}
										</div>
										<div className="votes">
											<i class="fas fa-thumbs-down"></i>
											<i class="fas fa-thumbs-up mr-0"></i>
										</div>
									</div>

									<div className="icon">
										<i class="fas fa-lightbulb" aria-hidden="true"></i>
									</div>

									<div className="title">Submissions</div>

								</div>
							</Link>
							
						</div>

					</div>
				
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
								<div class="progress-bar progress-bar-striped progress-bar-animated partner" role="progressbar" style={{width: "40%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
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

			</section>
		)
	}
}

export default StorePage;