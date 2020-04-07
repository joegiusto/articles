import React, { Component, useState } from 'react';
import StoreItem from './StoreItemAlpha';
import {One, Two, Three, Four} from './SponseredItems';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import hero from 'assets/img/bg_home_banner.png';

function TypeSelect(props) {

	// const [productSelect, changeProductSelect] = useState('Symbolic Adoptions');

	return (
	<div className={"type-select-container w-100 " + (isNaN(props.modificationType) ? ' mt-3 pt-3': ' ')}>

		{(props.modificationType === 1 ? <h4>Continue To...</h4> : null )}

		<div className="dual-header">

			<div className="selections">
				<span className="selection home">
					<i className="fas fa-home mr-0"></i>
				</span>
				<span className="selection all">All</span>
				<span className="selection originals">Originals</span>
				<span className="selection partnerships">Partnerships</span>
				<span className="selection submissions">Submissions</span>
				<span className="selection sponsered">Sponsered</span>
			</div>

			<div className="cart-container">
				
				<Link to={ROUTES.CHECKOUT}><div className="cart">0 Items In Cart</div></Link>
			</div>

		</div>

	</div> )
}

class StorePageBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      loadingCloting: false,
			firebaseClothing: [],
			popOutVisible: false,
			currentPopOut: ""
		};
		
		this.setPopOut = this.setPopOut.bind(this);

	}

	setPopOut(state, product) {
		this.setState({
			popOutVisible: state,
			currentPopOut: product || this.state.currentPopOut
		})
	}

	componentDidMount() {
		// console.log(this.props.match.params.id);
		this.setState({ loadingCloting: true });

    this.props.firebase.store().once('value').then(snapshot => {

      const issuesObject = snapshot.val();

      // console.log(snapshot.val().color);

      const clothingList = Object.keys(issuesObject).map(key => (
        {
          ...issuesObject[key],
          uid: key,
        }
      ));

      this.setState({
       	firebaseClothing: clothingList,
				loadingCloting: false,
      });

    });

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

	test() {
		return "Howdy!"
	}
	
	render() {
		
		return(
			<section className="store-page">
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
								<div className="col-6">
									<div className="row">
										<div className="col-8">
											<div className="selected-photo"></div>
										</div>
										<div className="col-4">
											<h5>Showcase Photos</h5>
											<div className="thumbnails">
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
											</div>
											<h5>Artwork Photos</h5>
											<div className="thumbnails">
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
												<div className="thumbnail-photo"></div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-4 border-left">
									<div className="detail-container">
										<h1>{this.state.currentPopOut.title}</h1>
										<div>Realesed | 00/00/0000</div>
										<div>Made In | United States</div>
										<div>Material | </div>
										{/* <div>Manufacture Cost | $20</div> */}
										<div>Sale Price | ${this.state.currentPopOut.price / 100}</div>
										<button className="btn btn-articles-light">Add to Cart</button>
									</div>
								</div>
							</div>
						</div>
						<div className="viewer-footer">
							<img src={this.state.currentPopOut.backing} alt=""/>
						</div>
					</div>
				</div>

				<div className="is-admin">
					<Link to={ROUTES.STORE_MANAGE}><button className="btn btn-articles-light">Admin: Manage</button></Link>
				</div>

				<div className="container-fluid d-none">
					<div className="row feature-top mt-5">

						<div className="col-6">
							<div className="card">
								<div className="card-header">Originals</div>
								<div className="card-body"></div>
							</div>
						</div>

						<div className="col-3 d-none d-lg-block">
							<div className="card">
								<div className="card-header">Partnerships</div>
								<div className="card-body"></div>
							</div>
						</div>

						<div className="col-3 d-none d-lg-block">
							<div className="card">
								<div className="card-header">Submissions</div>
								<div className="card-body">Submit a design today!</div>
							</div>
						</div>

					</div>
				</div>

				<div className="hero">
					<img src={hero} alt=""/>
					<div className="hero-content d-none">
						<div className="bottom">Testing</div>
					</div>
				</div>

				<div className='container'>

					<div className="row d-none">

						<div className="sale-section">

							<div className="image-container">
								<img className="noselect" src="https://cdn.britannica.com/64/152164-050-BDE65ADA/Paul-Revere-Boston-British-residents-April-18-1775.jpg" alt=""/>
							</div>

							<div className="text-container">
								<h6>LAUNCH EVENT SALE</h6>
								<h1>Take 40% Off</h1>
								<div>
									<span className="badge badge-dark">LAUNCH</span>
									<span>Valid until Jan. 15th</span>
								</div>
							</div>

						</div>

						<TypeSelect />
					</div>

					<div className='row justify-content-center'>

					    <div className="featured-items d-none">

                            <h1 className="mt-2 mt-md-4 store-heading">Featured</h1>

                            <div className="dual-header">

                                {this.state.loadingCloting && <div>Loading ...</div>}
                                <div>
                                    {this.state.firebaseClothing.map((product, index) => (
            
                                        <StoreItem setPopOutVisible={this.setPopOut} product={product} catalogId={product.uid} price={product.price} title={product.title} sale="%15" banner="Original" color="articles" />
            
                                    ))}
                                    
                                </div>

                                <div>{this.getIndexByUid("really-a-wolf") > -1 ? this.state.firebaseClothing[this.getIndexByUid("really-a-wolf")].title : <div>Loading...</div>} </div>

                            </div>

						</div>

						<div className="featured-items">

							<h1 className="mt-2 mt-md-4 store-heading">Featured</h1>

							<div className="products-wrap">
							    <StoreItem setPopOutVisible={this.setPopOut} catalogId='1' price={3000} title="Wolf Hoodie" sale="%15" banner="Original" color="articles" />
    				
    							<StoreItem setPopOutVisible={this.setPopOut} catalogId='2' price={3000} title="Sheep Hoodie" sale="%15" banner="Original" color="articles"/>
    				
    							<StoreItem setPopOutVisible={this.setPopOut} catalogId='3' price={2500} title="Partner Item" sale="%15" banner="Partner" color="info"/>
    				
    							<StoreItem setPopOutVisible={this.setPopOut} catalogId='4' price={2000} title="Sponsered Item" sale="%15" banner="Sponsered" color="danger"/>
    				
    							<StoreItem setPopOutVisible={this.setPopOut} catalogId='5' price={2000} title="Sponsered Item" sale="%15" banner="Sponsered" color="primary"/>
							</div>

						</div>

						<div className="grid">

						</div>
						
						<div className="col-12 overflow-hidden">
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
														<div className="mr-5 d-inline"><StoreItem catalogId='1' price={3000} title="Wolf Sweatshirt" banner="Original" color="articles" /></div>
														<StoreItem catalogId='2' price={3000} title="Sheep Sweatshirt" banner="Original" color="articles"/>
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
												<div className="mr-5 d-inline"><StoreItem catalogId='3' price={2500} title="Partner Item" banner="Partner" color="info"/></div>
												<StoreItem catalogId='3' price={2500} title="Partner Item" banner="Partner" color="info"/>
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

						<div className="d-none">
							<h3 className="text-center mt-5 mb-4 w-100">Top Right Badge Key</h3>
							<div className="col-12 col-md-4">
								
								<div className="shadow-sm mx-4 mb-4 px-4 py-2 rounded bg-white">
									<h5>Original Item</h5>
									<p>Items that are designed and sold by us</p>
									<p className="text-muted">Income: Highest profit margin, with aim of being 60% of clothing sales</p>
								</div>
							</div>
	
							<div className="col-12 col-md-4">
								<div className="shadow-sm mx-4 mb-4 px-4 py-2 rounded bg-white">
									<h5>Partner Item</h5>
									<p>Items that we partnered up to sell and split a part of the profit with the company/creators</p>
									<p className="text-muted">Income: Split Profit (Give or take 5%-30%) with partner, expected to be 30% of clothing sales</p>
								</div>
							</div>
	
							<div className="col-12 col-md-4">
								<div className="shadow-sm mx-4 mb-4 px-4 py-2 rounded bg-white">
									<h5>Sponsered Item</h5>
									<p>Items that we promote for a company/creator that we feel have a reasonable means to be on the platform. A small referral fee will be charged for the item.</p>
									<p className="text-muted">Income: Lowest Profit, here we really just want to promote people that are also doing good and sending a message out. should not exceed 5%-10% of all clothing sales</p>
								</div>
							</div>
						</div>

					</div>
				
				</div>
			</section>
		)
	}
}

const StorePage = withFirebase(StorePageBase);

export default StorePage;