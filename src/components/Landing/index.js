import React, { Component } from 'react';
import Slider from "react-slick";

import ShowcaseCard from './ShowcaseCard';

import slideHead from '../../assets/img/slide-head.png';

import StoreItem from '../Store/StoreItemAlpha';

import placeholder from '../../assets/img/placeholder.png'
// import ArticlesHomePageSlick from './ArticlesHomePageSlick';
import logo from '../../assets/img/logo.png'
import flag from '../../assets/img/flag.png'

class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
			infinite: false,
			arrows: true,
      speed: 500,
			slidesToShow: 1.20,
			centerPadding: '20px',
      slidesToScroll: 1
    };
    return (
      <div className="pb-4">
        <div className="content-title">Slide Example</div >
        <Slider {...settings}>

          <div className="slide-container pr-3">
            <div className="real-slide"><h3>1</h3></div>
          </div>

          <div className="slide-container pr-3">
						<div className="real-slide"><h3>1</h3></div>
          </div>

          <div className="slide-container pr-3">
						<div className="real-slide"><h3>1</h3></div>
          </div>

        </Slider>
      </div>
    );
  }
}

class LandingPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// Time Progress is used for keeping track of current slide time and showing visuals
			timeProgress: 0,
			// Time at which the time progress will be set t 0 and next slide will be displayed
			timeToNextTime: 100,

			avenueTab: 0,
			avenueScroll: true,
			// avenueControls
			avenueTabDetails: [
				{
					title: 'Transparency',
					description: 'All money that is handled by Articles such as clothign sales, donations, ad revenue or whatever else we find ourselves venturing into will be public live for the people to see and criticize.',
					component: 
					<div className="fake-sales">
						<div className="sale">
							<div className="amount revenue">$20</div>
							<div className="person">Casey Newton</div>

						</div>
						<div className="sale">
							<div className="amount revenue">$30</div>
							<div className="person">Frank Walker</div>

						</div>
						<div className="sale">
							<div className="amount expense">$10</div>
							<div className="person">User Memberships</div>

						</div>
						<div className="sale">
							<div className="amount revenue">$10</div>
							<div className="person">Athena A.A</div>

						</div>
						<div className="sale">
							<div className="amount expense">$50</div>
							<div className="person">Website Servers</div>

						</div>
						<div className="sale">
							<div className="amount expense">$10</div>
							<div className="person">Mileage Reimbursement</div>

						</div>
					</div>,
					avenueExpanded: false,
					avenueVisible: false
				},
				{
					title: 'Clothing',
					description: '',
					component: <div className="store-page pt-3"><StoreItem catalogId='1' price={3000} title="Wolf Hoodie" sale="%15" banner="Original" color="articles"/></div>,
					avenueExpanded: false,
					avenueVisible: false
				},
				{
					title: 'News',
					description: 'All money that is handled by Articles such as clothign sales, donations, ad revenue or whatever else we find ourselves venturing into will be public live for the people to see and criticize.',
					avenueExpanded: false,
					avenueVisible: false
				},
				{
					title: 'Politics',
					description: 'All money that is handled by Articles such as clothign sales, donations, ad revenue or whatever else we find ourselves venturing into will be public live for the people to see and criticize.',
					avenueExpanded: false,
					avenueVisible: false
				},
			]

		}
	}

	componentDidMount() {
		this.interval = setInterval(this.thingToDo, 100);

		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		const vh = window.innerHeight;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		const thisCopy = this;

		let avenues = [...this.state.avenueTabDetails];

		let visibleTrue = {
			...avenues[0],
			avenueVisible: true
		}

		avenues[0] = visibleTrue;

		let expandedTrue = {
			...avenues[0],
			avenueExpanded: true
		}

		setTimeout( function(){ 
			thisCopy.setState({
				avenueTabDetails: avenues
			}); 

			avenues[0] = expandedTrue;

			setTimeout( function(){ 
				thisCopy.setState({
					avenueTabDetails: avenues
				});
			}, 500);
	
			
		}, 500);

	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	thingToDo = () => {
		// console.log("Hello");

		if (this.state.timeProgress >= this.state.timeToNextTime) {
			this.setState({timeProgress: 0});

			this.state.avenueTab === 3 ? this.jumpTo(0) : this.jumpTo(this.state.avenueTab + 1);
			
		} else {
			this.setState({timeProgress: this.state.timeProgress + 1});
		}

	}

	jumpTo( avenueTab, interuptCycle ) {
		console.log(avenueTab);

		if (interuptCycle === true) {
			clearInterval(this.interval);
			this.setState({avenueScroll: false});
		}

		// Set copy of this to be used in nested functions
		const thisCopy = this;

		let avenues = [...this.state.avenueTabDetails];

		let expandedFalse = {
			...avenues[this.state.avenueTab],
			avenueExpanded: false
		}

		avenues[this.state.avenueTab] = expandedFalse;

		// Start collapse of current card right away
		thisCopy.setState({
			avenueTabDetails: avenues
		}); 

		// After 1 second begin hiding the visibility of the current card
		setTimeout( function(){ 

			let visibleFalse = {
				...avenues[thisCopy.state.avenueTab],
				avenueVisible: false
			}

			avenues[thisCopy.state.avenueTab] = visibleFalse;

			thisCopy.setState({
				avenueTabDetails: avenues
			});

			setTimeout( function() {
				// Move to the next avenue after .5 seconds
				// thisCopy.state.avenueTab === 3 ? 
				// thisCopy.setState( {avenueTab: 0} ) 
				// :
				thisCopy.setState( {avenueTab: avenueTab} );

				setTimeout( function() {
					let visibleTrue = {
						...avenues[thisCopy.state.avenueTab],
						avenueVisible: true
					}
			
					avenues[thisCopy.state.avenueTab] = visibleTrue;
			
					let expandedTrue = {
						...avenues[thisCopy.state.avenueTab],
						avenueExpanded: true
					}
			
					setTimeout( function(){ 
						thisCopy.setState({
							avenueTabDetails: avenues
						}); 
			
						avenues[thisCopy.state.avenueTab] = expandedTrue;
			
						setTimeout( function(){ 
							thisCopy.setState({
								avenueTabDetails: avenues
							});
						}, 500);
				
						
					}, 0);

				}, 0)

			}, 500)

		}, 500);

	}

	nextAvenue() {
		// Set copy of this to be used in nested functions
		const thisCopy = this;

		let avenues = [...this.state.avenueTabDetails];

		let expandedFalse = {
			...avenues[this.state.avenueTab],
			avenueExpanded: false
		}

		avenues[this.state.avenueTab] = expandedFalse;

		// Start collapse of current card right away
		thisCopy.setState({
			avenueTabDetails: avenues
		}); 

		// After 1 second begin hiding the visibility of the current card
		setTimeout( function(){ 

			let visibleFalse = {
				...avenues[thisCopy.state.avenueTab],
				avenueVisible: false
			}

			avenues[thisCopy.state.avenueTab] = visibleFalse;

			thisCopy.setState({
				avenueTabDetails: avenues
			});

			setTimeout( function() {
				// Move to the next avenue after .5 seconds
				thisCopy.state.avenueTab === 3 ? 
				thisCopy.setState( {avenueTab: 0} ) 
				:
				thisCopy.setState( {avenueTab: thisCopy.state.avenueTab + 1} );

				setTimeout( function() {
					let visibleTrue = {
						...avenues[thisCopy.state.avenueTab],
						avenueVisible: true
					}
			
					avenues[thisCopy.state.avenueTab] = visibleTrue;
			
					let expandedTrue = {
						...avenues[thisCopy.state.avenueTab],
						avenueExpanded: true
					}
			
					setTimeout( function(){ 
						thisCopy.setState({
							avenueTabDetails: avenues
						}); 
			
						avenues[thisCopy.state.avenueTab] = expandedTrue;
			
						setTimeout( function(){ 
							thisCopy.setState({
								avenueTabDetails: avenues
							});
						}, 500);
				
						
					}, 0);

				}, 0)

			}, 500)

		}, 500);

		// this.state.avenueTab === 3 ? 
		// this.setState( {avenueTab: 0} ) 
		// :
		// this.setState( {avenueTab: this.state.avenueTab + 1} );

	}

	prevAvenue() {

		this.state.avenueTab === 0 ? this.setState( {avenueTab: 3} ) : this.setState( {avenueTab: this.state.avenueTab - 1} );
	}

	toggleAvenueScroll() {
		console.log('toggleAvenueScroll called!');

		if (this.state.avenueScroll === true) {
			this.setState({avenueScroll: false});
			clearInterval(this.interval);
		} else {
			this.setState({avenueScroll: true});
			this.interval = setInterval(this.thingToDo, 100);
		}
	}

	render() {

		const {timeToNextTime, avenueTab, avenueScroll, avenueTabDetails, timeProgress} = this.state

		

		return (
			<div className="landing-page landing-new">

				{/* Think about it */}
				<section className="header-section">

					<div className="background">
						<div className="bg"></div>
						<div className="bg bg2"></div>
						<div className="bg bg3"></div>
					</div>

					<div className="content">

						<div className="panel-head">
							<div className="hero-side-by-side">

								<div className="left">
									<img className="logo" height="400px" src={logo} alt="" />
									{/* <img className="flag" width="100" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png" alt=""/> */}
								</div>

								<div className="right">
									<div className="content-title">Think about it,</div>
									<div className="content-badges">
										<div className="content-badge alt-1">School Shootings</div>
										<div className="content-badge alt-2">Inadequate Gun Laws</div>
										<div className="content-badge alt-3">Corporate Tax Evasion</div>
										<div className="content-badge alt-4">Child Lunch Debt</div>
										<div className="content-badge alt-5">Underfunded NASA Programs</div>
										<div className="content-badge alt-6">Disproportionate Military Spending</div>
										<div className="content-badge alt-7">Affordable Healthcare</div>
										<div className="content-badge alt-8">Decaying Infrastructure</div>
										<div className="content-badge alt-9">The List Goes On!</div>
									</div>
									<div className="content-footer">
										<span>Where does it end? </span>
										<span className="pl-md-2">Where do we begin?</span>
									</div>
								</div>

							</div>
						</div>

					</div>

				</section>

				{/* articles.media */}
				<section className="section-break brand-name">
					articles.media
				</section>

				{/* We Have a Plan! */}
				<section className="intro-section base">
					<div className="background"></div>
					<div className="content">
						<div className="container">

							<div className="custom-panel">

								<div className="top">
									<div className="row">

										<div className="col-12 col-md-6">
											<div className="left">

												<div className="content-title mb-4" style={{lineHeight: "45px"}}>Dear America, We Have a Plan!</div>
												<h6 className="content-highlight content-text">It's a bit to explain though...</h6>
												<div className="content-text">
													Articles is a for-profit political organization and platform, working to make America a better place for the people through avenues of transparency, clothing, news and politics.
												</div>

											</div>
										</div>

										<div className="col-12 col-md-6">
											<div className="right">
												<img className="img-fluid" height="376px" src="https://www.economist.com/sites/default/files/images/print-edition/20130921_USD000_0.jpg" alt=""/>
											</div>
										</div>

									</div>
								</div>

							</div>

						</div>
					</div>
				</section>

				{/* Motto */}
				<section className="section-break motto">
					<div className="text-center motto-block">Something To Stand For</div>
				</section>

				<section className="avenues-section">

				</section>

				<section className="tour-section">
					
					<div className="content">

					<div className="container ">

						<div className="controls noselect">
							<div className="avenue-selector">
								<div onClick={() => this.jumpTo( (avenueTab === 0 ? avenueTabDetails.length - 1 : avenueTab - 1) )} className="avenue avenue-control prev"> { '<' } </div>

								<div className="avenue-filler"></div>
								<div onClick={() => this.jumpTo(0, true)} className={"avenue transparency ml-0 " + (avenueTab === 0 ? 'active' : '')}>Transparency</div>
								<div onClick={() => this.jumpTo(1, true)} className={"avenue clothing " + (avenueTab === 1 ? 'active' : '')}>Clothing</div>
								<div onClick={() => this.jumpTo(2, true)} className={"avenue news " + (avenueTab === 2 ? 'active' : '')}>News</div>
								<div onClick={() => this.jumpTo(3, true)} className={"avenue politics " + (avenueTab === 3 ? 'active' : '')}>Politics</div>
								<div className="avenue-filler"></div>

								<div onClick={() => this.jumpTo( (avenueTab === avenueTabDetails.length - 1 ? 0 : avenueTab + 1) )} className="avenue avenue-control next"> > </div>
							</div>

							<div className="timer">
								
								<div className="time">{ 10 }</div>

								<div onClick={() => this.toggleAvenueScroll()} className="pause-play"><i className={"far " + (avenueScroll === true ? 'fa-pause-circle' : 'fa-play-circle')}></i></div>

								<div className="progress">
									<div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: timeProgress + "%"}}></div>
								</div>

								{/* <div className="timer-bar">
									<div className="progress"></div>
								</div> */}

							</div>
						</div>

						</div>

						<div className="container">

							<NewCustomPanel identifier={this.state.avenueTabDetails[this.state.avenueTab]}/>

							<div className="d-none">
								<div className={"custom-panel " + (avenueTab === 0 ? '' : 'd-none')}>
	
									<div className="top">
	
										<div className="row">
	
											<div className="col-12 col-md-8">
												<div className="left">
	
													<div className="content-title mb-4" style={{lineHeight: "45px"}}>Transparency</div>
													{/* <h6 className="content-highlight content-text">It's a bit to explain though...</h6> */}
													<div className="content-text">
														All money that is handled by Articles such as clothign sales, donations, ad revenue or whatever else we find ourselves venturing into, will be public for the people to see and criticize.
													</div>
	
												</div>
											</div>
	
											<div className="col-12 col-md-4">
												<div className="right w-100">
													{/* <img className="img-fluid" height="376px" src="https://www.economist.com/sites/default/files/images/print-edition/20130921_USD000_0.jpg" alt=""/> */}
													<div className="fake-sales">
														<div className="sale">
															<div className="amount revenue">$20</div>
															<div className="person">Casey Newton</div>
	
														</div>
														<div className="sale">
															<div className="amount revenue">$30</div>
															<div className="person">Frank Walker</div>
	
														</div>
														<div className="sale">
															<div className="amount expense">$10</div>
															<div className="person">User Memberships</div>
	
														</div>
														<div className="sale">
															<div className="amount revenue">$10</div>
															<div className="person">Athena A.A</div>
	
														</div>
														<div className="sale">
															<div className="amount expense">$50</div>
															<div className="person">Website Servers</div>
	
														</div>
														<div className="sale">
															<div className="amount expense">$10</div>
															<div className="person">Mileage Reimbursement</div>
	
														</div>
													</div>
												</div>
											</div>
	
										</div>
									</div>
	
								</div>
	
								<div className={"custom-panel " + (avenueTab === 1 ? '' : 'd-none')}>
	
									<div className="top">
										<div className="row">
	
											<div className="col-12 col-md-8">
												<div className="left">
	
													<div className="content-title mb-4" style={{lineHeight: "45px"}}>Clothing</div>
													{/* <h6 className="content-highlight content-text">It's a bit to explain though...</h6> */}
													<div className="content-text">
														All money that is handled by Articles such as clothign sales, donations, ad revenue or whatever else we find ourselves venturing into will be public live for the people to see and criticize.
													</div>
	
												</div>
											</div>
	
											<div className="col-12 col-md-4">
												<div className="right" style={{transform: "translateX(-25%) translateY(-50%) scale(0.5)"}}>
													<div className="scale-down store-page d-flex">
														<StoreItem catalogId='1' price={3000} title="Wolf Hoodie" sale="%15" banner="Original" color="articles"/>
														<StoreItem catalogId='1' price={3000} title="Wolf Hoodie" sale="%15" banner="Original" color="articles"/>
														<StoreItem catalogId='1' price={3000} title="Wolf Hoodie" sale="%15" banner="Original" color="articles"/>
													</div>
												</div>
											</div>
	
										</div>
									</div>
	
								</div>
	
								<div className={"custom-panel " + (avenueTab === 2 ? '' : 'd-none')}>
	
									<div className="top">
										<div className="row">
	
											<div className="col-12 col-md-8">
												<div className="left">
	
													<div className="content-title mb-4" style={{lineHeight: "45px"}}>News</div>
													{/* <h6 className="content-highlight content-text">It's a bit to explain though...</h6> */}
													<div className="content-text">
														All money that is handled by Articles such as clothign sales, donations, ad revenue or whatever else we find ourselves venturing into will be public live for the people to see and criticize.
													</div>
	
												</div>
											</div>
	
											<div className="col-12 col-md-4">
												<div className="right w-100">
													<div className="news-paper"></div>
												</div>
											</div>
	
										</div>
									</div>
	
								</div>
	
								<div className={"custom-panel " + (avenueTab === 3 ? '' : 'd-none')}>
	
									<div className="top">
										<div className="row">
	
											<div className="col-12 col-md-8">
												<div className="left">
	
													<div className="content-title mb-4" style={{lineHeight: "45px"}}>Politics</div>
													{/* <h6 className="content-highlight content-text">It's a bit to explain though...</h6> */}
													<div className="content-text">
														All money that is handled by Articles such as clothign sales, donations, ad revenue or whatever else we find ourselves venturing into will be public live for the people to see and criticize.
													</div>
	
												</div>
											</div>
	
											<div className="col-12 col-md-4">
												<div className="right w-100">
													{/* <img className="img-fluid" height="376px" src="https://www.economist.com/sites/default/files/images/print-edition/20130921_USD000_0.jpg" alt=""/> */}
													<div className="circles">
														<div className="blue"></div>
														<div className="red"></div>
													</div>
												</div>
											</div>
	
										</div>
									</div>
	
								</div>
							</div>

						</div>

					</div>

				</section>

				<section className="more-section d-none">
					<div className="background"></div>
					<div className="content">

						<div className="info">
							<div className="title">Skeptical?</div>
							<p>Good, read more about our misison here, then take our tour to get to know the site.</p>
							<button className="btn btn-articles-light alt">Read On</button>
						</div>
						<div className="info">
							<div className="title">Ready?</div>
							<p>Get started with an account today and start participating in our platform.</p>
							<button className="btn btn-articles-light alt">Sign Up</button>
						</div>

					</div>

				</section>
				
				<section className="intro-section d-none accent">
					<div className="background"></div>
					<div className="content">
						<div className="container">

							<div className="custom-panel">

								<div className="top">
									<div className="row">

										<div className="col-12 col-md-6">
											<div className="left">

												<div className="content-title mb-4" style={{lineHeight: "45px"}}>Transparency</div>
												<h6 className="content-highlight content-text">It's a bit to explain though...</h6>
												<div className="content-text">
													Articles is a for-profit political organization and platform, working to make America a better place for the people through avenues of transparency, clothing, news and politics.
												</div>

											</div>
										</div>

										<div className="col-12 col-md-6">
											<div className="right">
												<img className="img-fluid" height="376px" src="https://www.economist.com/sites/default/files/images/print-edition/20130921_USD000_0.jpg" alt=""/>
											</div>
										</div>

									</div>
								</div>

							</div>

						</div>
					</div>
				</section>

				<footer>

					<img className="text-center d-block ml-auto mr-auto" src={logo} height="35px" alt=""/>

				</footer>

				<section className="intro-section base">
					<div className="background"></div>
					<div className="content">
						<div className="container">

							<div className="custom-panel">

								<div className="top">
									<div className="row">

										<div className="col-12 col-md-6">
											<div className="left">

												<div className="content-title mb-4" style={{lineHeight: "45px"}}>Clothing</div>
												<h6 className="content-highlight content-text">It's a bit to explain though...</h6>
												<div className="content-text">
													Articles is a for-profit political organization and platform, working to make America a better place for the people through avenues of transparency, clothing, news and politics.
												</div>

											</div>
										</div>

										<div className="col-12 col-md-6">
											<div className="right">
												<img className="img-fluid" height="376px" src="https://www.economist.com/sites/default/files/images/print-edition/20130921_USD000_0.jpg" alt=""/>
											</div>
										</div>

									</div>
								</div>

							</div>

						</div>
					</div>
				</section>

				<footer>

					<img className="text-center d-block ml-auto mr-auto" src={flag} height="35px" alt=""/>

				</footer>

				<section className="intro-section accent">
					<div className="background"></div>
					<div className="content">
						<div className="container">

							<div className="custom-panel">

								<div className="top">
									<div className="row">

										<div className="col-12 col-md-6">
											<div className="left">

												<div className="content-title mb-4" style={{lineHeight: "45px"}}>News</div>
												<h6 className="content-highlight content-text">It's a bit to explain though...</h6>
												<div className="content-text">
													Articles is a for-profit political organization and platform, working to make America a better place for the people through avenues of transparency, clothing, news and politics.
												</div>

											</div>
										</div>

										<div className="col-12 col-md-6">
											<div className="right">
												<img className="img-fluid" height="376px" src="https://www.economist.com/sites/default/files/images/print-edition/20130921_USD000_0.jpg" alt=""/>
											</div>
										</div>

									</div>
								</div>

							</div>

						</div>
					</div>
				</section>

				<footer>

					<img className="text-center d-block ml-auto mr-auto" src={logo} height="35px" alt=""/>

				</footer>

				<section className="intro-section base">
					<div className="background"></div>
					<div className="content">
						<div className="container">

							<div className="custom-panel">

								<div className="top">
									<div className="row">

										<div className="col-12 col-md-6">
											<div className="left">

												<div className="content-title mb-4" style={{lineHeight: "45px"}}>Politics</div>
												<h6 className="content-highlight content-text">It's a bit to explain though...</h6>
												<div className="content-text">
													Articles is a for-profit political organization and platform, working to make America a better place for the people through avenues of transparency, clothing, news and politics.
												</div>

											</div>
										</div>

										<div className="col-12 col-md-6">
											<div className="right">
												<img className="img-fluid" height="376px" src="https://www.economist.com/sites/default/files/images/print-edition/20130921_USD000_0.jpg" alt=""/>
											</div>
										</div>

									</div>
								</div>

							</div>

						</div>
					</div>
				</section>

				<footer>

					<img className="text-center d-block ml-auto mr-auto" src={logo} height="35px" alt=""/>

				</footer>

				<section>
					<div className="container">
						<div className="row">
							<div className="col-12 col-md-6">Learn</div>
							<div className="col-12 col-md-6">Don't</div>
						</div>
					</div>
				</section>

			</div>
		)
	}
}

function NewCustomPanel(props) {

	const {title, description, avenueExpanded, avenueVisible, component} = props.identifier;

  return (
		<div className={"new-custom-panel " + (avenueVisible ? 'visible' : '')}>

			<div className="one">
				<div className="content-title" style={{lineHeight: "45px"}}>{title}</div>
				<div className="content-text">{description}</div>
			</div>
			
			<div className="slide-out-sleeve-wrap">
			<div className={"slide-out-sleeve " + (avenueExpanded ? 'expand' : '')}>

				<div className={"displayed-component " + (avenueExpanded ? '' : '')}>
					{component}
				</div>
	
				<div className="end-cap">
					{/* Just CSS */}
				</div>

			</div>
			</div>

		</div>
	)

}

export default LandingPage;