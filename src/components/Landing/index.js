import React, { Component } from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { NewsCard } from '../News/index'

import StoreItemBeta from '../Store/Items/Beta.js';

// import ShowcaseCard from './ShowcaseCard';
// import slideHead from '../../assets/img/slide-head.png';
// import StoreItem from '../Store/StoreItemAlpha';
// import placeholder from '../../assets/img/placeholder.png'

import * as ROUTES from '../../constants/routes'
import { Link } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import flag from '../../assets/img/flag.png'
import newsWave from '../../assets/gif/news-wave.gif'

class LandingPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			// Time Progress is used for keeping track of current slide time and showing visuals
			timeProgress: 0,
			// Time at which the time progress will be set t 0 and next slide will be displayed
			timeToNextTime: 100,

			newsTotals: {
				stories: 0,
				issues: 0,
				myths: 0
			},

			proposalsTotals: {
				fundamental: 0,
				social: 0,
				financial: 0,
				education: 0
			},

			newsShowcase: 'stories',
			newsShowcaseStories: 0,
			newsShowcaseIssues: 0,
			newsShowcaseMyths: 0,

			doesTheListReallyGoOn: false,

			products: [],

			avenueTab: 0,
			avenueScroll: false,
			// avenueControls
			avenueTabDetails: [
				{
					title: 'Transparency',
					description: 'All money that is handled by Articles such as donations, clothing sales, ad revenue or whatever else we find ourselves venturing into will be public live for the people to see and ask about.',
					component: 
					<div className="fake-sales">
						{this.startSalesAnimation()}

						<div className="fake-note">This data is for display purposes only, live data on <Link to={ROUTES.REPORTS}>report page</Link></div>

						<div className="sale active" style={{'animationDelay': '0s'}}>
							<div className="amount revenue">$20</div>
							<div className="person">Casey Newton</div>
						</div>

						<div className="sale active" style={{'animationDelay': '0.7s'}}>
							<div className="amount revenue">$30</div>
							<div className="person">Frank Walker</div>
						</div>

						<div className="sale active" style={{'animationDelay': '1.4s'}}>
							<div className="amount expense">$10</div>
							<div className="person">User Memberships</div>
						</div>

						<div className="sale active" style={{'animationDelay': '2.1s'}}>
							<div className="amount revenue">$10</div>
							<div className="person">Athena A.A</div>
						</div>

						<div className="sale active" style={{'animationDelay': '2.8s'}}>
							<div className="amount expense">$50</div>
							<div className="person">Website Servers</div>
						</div>

						<div className="sale active" style={{'animationDelay': '3.5s'}}>
							<div className="amount expense">$10</div>
							<div className="person">Mileage Reimbursement</div>
						</div>

						<div className="sale active" style={{'animationDelay': '4.2s'}}>
							<div className="amount revenue">$10</div>
							<div className="person">Mileage Reimbursement</div>
						</div>

					</div>,
					avenueExpanded: false,
					avenueVisible: false
				},
				{
					title: 'Clothing',
					description: 'To help support the platform and raise awareness of our mission we will be selling clothing for our supporters to wear.',
					component: 
					<div className="store-scene">

						<div className="row">
							<div className="col-4">
								<div className="icon"><i className="fas fa-3x fa-tshirt"></i></div>
							</div>

							<div className="col-4">
								<div className="icon"><i className="fas fa-3x fa-tshirt"></i></div>
							</div>

							<div className="col-4">
								<div className="icon"><i className="fas fa-3x fa-tshirt"></i></div>
							</div>
						</div>

						<div className="row mt-5">
							<div className="col-4">
								<div style={{animationDelay: '-.5s'}} className="icon"><i className="fas fa-4x fa-tshirt"></i></div>
							</div>

							<div className="col-4">
								<div style={{animationDelay: '-.5s'}} className="icon"><i className="fas fa-4x fa-tshirt"></i></div>
							</div>

							<div className="col-4">
								<div style={{animationDelay: '-.5s'}} className="icon"><i className="fas fa-4x fa-tshirt"></i></div>
							</div>
						</div>

					</div>,
					avenueExpanded: false,
					avenueVisible: false
				},
				{
					title: 'News',
					description: 'As the state of mainstream news continues to decay we will be stepping in to fight misinformation and easeabilty .',
					component: 
					<div className="news-scene">
						<img className="news-wave" src={newsWave} alt=""/>
						{/* <img style={{animationDelay: '0s'}} className="news-sheep" src={sheep} alt=""/> */}
						{/* <img style={{animationDelay: '1s'}} className="news-sheep" src={sheep} alt=""/> */}
						{/* <img style={{animationDelay: '2s'}} className="news-sheep" src={sheep} alt=""/> */}
					</div>,
					avenueExpanded: false,
					avenueVisible: false
				},
				{
					title: 'Politics',
					description: 'To be trasparent from the start, we plan to use the platform to encourage politcal reform. As we build a household name and gain the turst of users we will take this battle to a national level and fix some of the problems that plague this nation',
					avenueExpanded: false,
					avenueVisible: false,
					component: 
					<div className="politics-screen">
						<div className="red-circle"></div>
						<div className="blue-circle"></div>
						<div className="pink-circle"></div>
					</div>
				},
			]

		}
	}

	componentDidMount() {
		const self = this;

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

		axios.get('/api/getNewsCount')
    .then(function (response) {
			console.log(response);
			
			self.setState({
				newsTotals: {
					stories: response.data.stories,
					issues: response.data.issues,
					myths: response.data.myths
				},
			})
    })
    .catch(function (error) {
      console.log(error);
		});
		
		axios.get('/api/getProposalCount')
    .then(function (response) {
			console.log(response);
			
			self.setState({
				proposalsTotals: {
					fundamental: response.data.fundamental,
					social: response.data.social,
					financial: response.data.financial,
					education: response.data.education,
				},
			})
    })
    .catch(function (error) {
      console.log(error);
    });

		// Default scroll of slides if avenue scroll is enabled
		if (this.state.avenueScroll) {
			this.interval = setInterval(this.thingToDo, 100);
		}
		
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		// const vh = window.innerHeight;
		// Then we set the value in the --vh custom property to the root of the document
		// document.documentElement.style.setProperty('--vh', `${vh}px`);

		const thisCopy = this;

		this.startSalesAnimation();

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

	startSalesAnimation() {
		console.log("Sales Animation Started!");

		// var i = 0;
		// var sales = [];
		// sales = document.getElementsByClassName('sale');

		// myLoop();

		// function myLoop() {
			
		// 	         //  create a loop function
		// 	setTimeout(function() {   
		// 		console.log(i);
		// 		sales[i].classList.add('active');   //  your code here
		// 		i++;
				
		// 		                 //  increment the counter
		// 		if (i < sales.length) {           //  if the counter < 10, call the loop function
		// 			myLoop();             //  ..  again which will trigger another 
		// 		}          
		// 		             //  ..  setTimeout()
		// 	}, 700)
		// }

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

				{/* Welcome Block - October 2020 Remodel */}
				<div className="welcome-block">

					<div className="background">
						<div className="bg"></div>
						<div className="bg bg2"></div>
						<div className="bg bg3"></div>
					</div>

					<div className="content">

						<div className="details">
							<div className="small">Welcome To</div>
		
							<div className="brand">Articles Media</div>
		
							<div className="text">
								A political organization and platform, working to make America a better place for the people through avenues of transparency, clothing, news and politics.
							</div>
		
							<div className="looking-for-section">
								<div className="header">Looking for one of the following pages?</div>
			
								<div className="links">
									<Link to={ROUTES.REPORTS}><button className="btn btn-articles-light">Transparency</button></Link>
									<Link to={ROUTES.STORE}><button className="btn btn-articles-light">Clothing</button></Link>
									<Link to={ROUTES.NEWS}><button className="btn btn-articles-light">News</button></Link>
									<Link to={ROUTES.PARTY}><button className="btn btn-articles-light">Politics</button></Link>
									{/* <span className="link">Transparency</span>
									<span className="link">Clothing</span>
									<span className="link">News</span>
									<span className="link">Politics</span> */}
								</div>
							</div>
						</div>

						<div className="image">
							<img src="https://www.economist.com/sites/default/files/images/print-edition/20130921_USD000_0.jpg" alt=""/>
						</div>
						
					</div>

				</div>

				{/* Think about it - October 2020 Remodel */}
				<div className="think-about-it">

					<div className="content">

						<div className="articles-heading">
							Think about it
						</div>

						<div className="tiles">

							<div className="tile">
								School Shootings
								<div className="more">
									An average of one school shooting a week in 2019.
								</div>
							</div>

							<div className="tile">
								Botched Gun Laws
								<div className="more">
									Gun show loophole still available in some states
								</div>
							</div>

							<div className="tile">
								Corporate Tax Evasion
								<div className="more">
									Amazon paid $0 in Federal Tax in 2019
								</div>
							</div>

							<div className="tile">
								School Lunch Debt
								<div className="more">
									High Schools withholding diplomas over lunch debt
								</div>
							</div>

							<div className="tile">
								Underfunded NASA Programs
								<div className="more">
									Annual budget of less then half of 1% in 2019 
								</div>
							</div>

							<div className="tile">
								Disproportionate Military Spending
								<div className="more">
									WIP 
								</div>
							</div>

							<div className="tile">
								Increasing Automation of Jobs
								<div className="more">
									Taxi and tractor trailer drivers are just a fraction of the jobs we are saying goodbye to forever 
								</div>
							</div>

							<div className="tile">
								National Decaying Infrastructure
								<div className="more">
								The ASCE estimates the US needs to spend some $4.5 trillion by 2025 to fix the country's infrastructure.  
								</div>
							</div>

							<div className="tile">
								Wealth Inequality
								<div className="more">
									The wealthiest 1 percent of American households own 40 percent of the country's wealth 
								</div>
							</div>

							<div className="tile">
								Global Warming
								<div className="more">
									Since 1880 global temperature is up 2°F and 19 of the 20 warmest years on record have occurred since 2001
								</div>
							</div>

							<div className="tile">
								Two Party Partisanship
								<div className="more">
									WIP
								</div>
							</div>

							<div className="tile">
								Affordable Healthcare
								<div className="more">
									WIP
								</div>
							</div>

							<div className="tile">
								Climate Change
								<div className="more">
									WIP
								</div>
							</div>

							<div className="tile">
								Accessible Voting
								<div className="more">
									WIP
								</div>
							</div>

							<div className="tile">
								Two Party System
								<div className="more">
									WIP
								</div>
							</div>

							<div onClick={() => this.setState({doesTheListReallyGoOn: !this.state.doesTheListReallyGoOn})} className="tile click">
								The List Goes On...
								<div className="more">
									It does, click again!
								</div>
							</div>

							{this.state.doesTheListReallyGoOn ?
							<> 
							<div className="tile">WIP</div>
							<div className="tile">WIP</div>
							<div className="tile">WIP</div>
							<div className="tile">WIP</div>

							<div className="tile">WIP</div>
							<div className="tile">WIP</div>
							<div className="tile">WIP</div>
							<div className="tile">WIP</div>

							<div className="tile">WIP</div>
							<div className="tile">WIP</div>
							<div className="tile">WIP</div>

							<div className="tile">
								And More!
								<div className="more">
									But that's all for now
								</div>
							</div>
							</>
							:
							null
							}
						</div>

						<div className="bottom-text">Is our nations media outlets and leaders tackling any of the problems that plague this nation as well as we need them to?</div>

					</div>

				</div>

				{/* How we help - October 2020 Remodel */}
				<div className="how-we-help">

					<div className="content">

						<div className="articles-heading">
							How we help
						</div>

						<div className="tiles">

							{/* Transparency Tile */}
							<div className="tile">
								<div className="header">Transparency</div>
									
								<div className="transparency-showcase">

									<div className="icon">
										<i className="fas fa-paste" aria-hidden="true"></i>
									</div>

									<div className="fake-note">This data is for display purposes only, live data available on the <Link style={{textDecoration: 'underline'}} to={ROUTES.REPORTS}>Reports Page</Link></div>

									<div className="fake-sales">
										{this.startSalesAnimation()}

										<div className="sale active" style={{'animationDelay': '0s'}}>
											<div className="amount revenue">+$10</div>
											<div className="reason">Donation</div>
											<div className="person">Casey Newton</div>
										</div>

										<div className="sale active" style={{'animationDelay': '0.7s'}}>
											<div className="amount revenue">+$30</div>
											<div className="reason">Store Order</div>
											<div className="person">Frank Walker</div>
										</div>

										<div className="sale active" style={{'animationDelay': '1.4s'}}>
											<div className="amount expense">-$7.50</div>
											<div className="reason">Expense</div>
											<div className="person">Email Servers</div>
										</div>

										<div className="sale active" style={{'animationDelay': '2.1s'}}>
											<div className="amount revenue">+$1</div>
											<div className="reason">Membership</div>
											<div className="person">David Nix</div>
										</div>

										<div className="sale active" style={{'animationDelay': '2.8s'}}>
											<div className="amount revenue">+$5</div>
											<div className="reason">Membership</div>
											<div className="person">Athena A.A</div>
										</div>

										<div className="sale active" style={{'animationDelay': '3.5s'}}>
											<div className="amount expense">-$50</div>
											<div className="reason">Expense</div>
											<div className="person">Website Servers</div>
										</div>

										<div className="sale active" style={{'animationDelay': '4.2s'}}>
											<div className="amount expense">-$10</div>
											<div className="reason">Expense</div>
											<div className="person">Mileage Reimbursement</div>
										</div>

										<div className="sale active" style={{'animationDelay': '4.9s'}}>
											<div className="amount revenue">+$10</div>
											<div className="reason">Store Order</div>
											<div className="person">Joey Giusto</div>
										</div>

									</div>

								</div>

								<p className="text mt-auto">At Articles everything we do is as transparent as we can possible make it. View our bank balance and explore live Donations, Store Orders, Payroll, Taxes, Manufacturing Cost, you name it!</p>
							</div>

							{/* Clothing Tile */}
							<div className="tile">
								<div className="header">Clothing</div>

								<div className="clothing-showcase">
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
	
									<StoreItemBeta
										setPopOutVisible={this.setPopOut}
										product={this.state.products.find(element => element._id === "5eb3aaaba316c3077c598cc4")}
										color="articles"
										// userSavedProducts={this.props.user_details.saved_products}
										isSaved={this.props.user_details?.saved_products?.find(o => o.product_id === '5eb3aaaba316c3077c598cc4')}
									/>
								</div>

								<p className="text mt-auto">We have our own clothing store! Sales of our politically motivated merch help fund the development of our movement. Explore our collections and even submit designs!</p>
							</div>

							{/* News Tile */}
							<div className="tile">

								<div className="header">News</div>

								<div className="news-showcase">

									<div className="stats">

										<div onClick={() => this.setState({newsShowcase: 'stories'})} className={"stat " + (this.state.newsShowcase === 'stories' ? 'active' : '')}>
											<div className="number">{this.state.newsTotals.stories}</div>
											<div className="type">Stories</div>
											<div className="active-dot"></div>
										</div>

										<div onClick={() => this.setState({newsShowcase: 'issues'})} className={"stat " + (this.state.newsShowcase === 'issues' ? 'active' : '')}>
											<div className="number">{this.state.newsTotals.issues}</div>
											<div className="type">Issues</div>
											<div className="active-dot"></div>
										</div> 

										<div onClick={() => this.setState({newsShowcase: 'myths'})} className={"stat " + (this.state.newsShowcase === 'myths' ? 'active' : '')}>
											<div className="number">{this.state.newsTotals.myths}</div>
											<div className="type">Myths</div>
											<div className="active-dot"></div>
										</div>

									</div>

									<div className="news">
										{/* <img src="https://eh9ti3qk8yf3m8xqr5gt2fp4-wpengine.netdna-ssl.com/wp-content/uploads/2020/10/22937693_web1_CP110166417.jpg" alt="" class="background"/>

										<div className="date">
											10/07/2020
										</div>
										
										<div className="title">
											All Canadians will get COVID-19 vaccine for free, Trudeau confirms
										</div> */}

										{this.state.newsShowcase === 'stories' ? this.props.stories.loading ? null : <NewsCard key={''} document={this.props.stories.stories[this.state.newsShowcaseStories]}/> : null}
										{this.state.newsShowcase === 'issues' ? this.props.issues.loading ? null : <NewsCard key={''} document={this.props.issues.issues[this.state.newsShowcaseIssues]}/> : null}
										{this.state.newsShowcase === 'myths' ? this.props.myths.loading ? null : <NewsCard key={''} document={this.props.myths.myths[this.state.newsShowcaseMyths]}/> : null}

										<div className="controls">

											{
												this.state.newsShowcase === 'stories' ? 
												<>
				
												<button onClick={() => this.setState({newsShowcaseStories: this.state.newsShowcaseStories - 1})} disabled={this.state.newsShowcaseStories === 0 ? true : false} className={"prev"}> 
													<i className="far fa-hand-point-left"></i>
												</button>

												<button onClick={() => this.setState({newsShowcaseStories: this.state.newsShowcaseStories + 1})} disabled={this.state.newsShowcaseStories === (this.props.stories.stories.length - 1) ? true : false}  className="next">
													<i className="far fa-hand-point-right"></i>
												</button>
												</>
												:
												null
											}

											{
												this.state.newsShowcase === 'issues' ? 
												<>
												<button onClick={() => this.setState({newsShowcaseIssues: this.state.newsShowcaseIssues - 1})} disabled={this.state.newsShowcaseIssues === 0 ? true : false} className="prev"><i className="far fa-hand-point-left"></i></button>
												<button onClick={() => this.setState({newsShowcaseIssues: this.state.newsShowcaseIssues + 1})} disabled={this.state.newsShowcaseIssues === (this.props.issues.issues.length - 1) ? true : false} className="next"><i className="far fa-hand-point-right"></i></button>
												</>
												:
												null
											}

											{
												this.state.newsShowcase === 'myths' ? 
												<>
												<button onClick={() => this.setState({newsShowcaseMyths: this.state.newsShowcaseMyths - 1})} disabled={this.state.newsShowcaseMyths === 0 ? true : false} className="prev"><i className="far fa-hand-point-left"></i></button>
												<button onClick={() => this.setState({newsShowcaseMyths: this.state.newsShowcaseMyths + 1})} disabled={this.state.newsShowcaseMyths === (this.props.myths.myths.length - 1) ? true : false} className="next"><i className="far fa-hand-point-right"></i></button>
												</>
												:
												null
											}

										</div>


										{/* <NewsCard key={''} document={this.props?.stories?.stories[0]}/> */}
									</div>

								</div>

								{/* <small className="d-flex justify-content-center mt-3">With more being added everyday!</small> */}

								<p className="text mt-3">Packed with features like the ability to subscribe to issues, we let our users pick the news they wish to see. Stay updated on the things that are most important to you!</p>

							</div>

							{/* Politics Tile */}
							<div className="tile">
								<div className="header">Politics</div>

								<div className="politics-showcase">

									<div className="stats">

										<Link className="w-100" to={ROUTES.PROPOSALS}>
											<div className="stat">
												<div className="number">{this.state.proposalsTotals.fundamental}</div>
												<div className="type">Fundamental</div>
											</div>
										</Link>

										<Link className="w-100" to={ROUTES.PROPOSALS}>
											<div className="stat">
												<div className="number">{this.state.proposalsTotals.social}</div>
												<div className="type">Social</div>
											</div>
										</Link>

										<Link className="w-100" to={ROUTES.PROPOSALS}>
											<div className="stat">
												<div className="number">{this.state.proposalsTotals.education}</div>
												<div className="type">Education</div>
											</div>
										</Link>

										<Link className="w-100" to={ROUTES.PROPOSALS}>
											<div className="stat">
												<div className="number">{this.state.proposalsTotals.financial}</div>
												<div className="type">Financial</div>
											</div>
										</Link>

									</div>

									<div className="image">
										<img src="https://thumbs.gfycat.com/ThinMajorIridescentshark-max-14mb.gif" alt=""/>
									</div>
									
								</div>

								<p className="text mt-3">We create Proposals as we encounter all the issues going on in the nation. Here are just some of the proposals we are advocating for and soon hope to campaign on.</p>
							</div>

						</div>

					</div>

				</div>

				{/* Read about our mission - October 2020 Remodel */}
				<div className="our-mission">

					<div className="content">

						<div className="mission-snippet">
							<div className="title">Read about our mission</div>
							<div className="text">All the details about what we are doing and the direction we want to take this company.</div>
							<Link to={ROUTES.MISSION}><div className="btn btn-articles-light">Mission</div></Link>
						</div>
	
						<div className="link-panels">
	
							<Link to={ROUTES.STORE}>
								<div className="link-panel">
									<div className="title">Store</div>
									<div className="text">Shop our collection of clothing, as well as products made in collaboration with other brands.</div>
									<div className="arrow">></div>
								</div>
							</Link>
			
							<Link to={ROUTES.NEWS}>
								<div className="link-panel">
									<div className="title">News</div>
									<div className="text">Our take on the truth, source based facts, clear stated opinions.</div>
									<div className="arrow">></div>
								</div>
							</Link>
				
							<Link to={ROUTES.STORE_SUBMISSIONS}>
								<div className="link-panel">
									<div className="title">Submissions</div>
									<div className="text">Submit designs you have for a chance to get them printed and make some money.</div>
									<div className="arrow">></div>
								</div>
							</Link>
				
							<Link to={ROUTES.REPORTS}>
								<div className="link-panel">
									<div className="title">Reports</div>
									<div className="text">An inside look into our finances. We believe transparency is key to ending corruption.</div>
									<div className="arrow">></div>
								</div>
							</Link>
					
							<Link to={ROUTES.SIGN_UP}>
								<div className="link-panel">
									<div className="title">Sign Up</div>
									<div className="text">Create an account for all sorts of benifits and access to the entire site.</div>
									<div className="arrow">></div>
								</div>
							</Link>
					
							<Link to={ROUTES.PRESS}>
								<div className="link-panel">
									<div className="title">Press and Buisness</div>
									<div className="text">To reach out with questions or any other inquires</div>
									<div className="arrow">></div>
								</div>
							</Link>				
	
						</div>
						
					</div>

				</div>

				{/* Think about it */}
				<section className="header-section d-none">

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
				<section className="section-break brand-name d-none">
					articles.media
				</section>

				{/* We Have a Plan! */}
				<section className="intro-section base d-none">
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
													Articles is a political organization and platform, working to make America a better place for the people through avenues of transparency, clothing, news and politics.
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
				<section className="section-break motto d-none">
					<div className="text-center motto-block">Something To Stand For</div>
				</section>

				<section className="tour-section d-none">
					
					<div className="content">

						<div className="container ">
							
							<div className="controls noselect">
								<div className="avenue-selector">
									<div onClick={() => this.jumpTo( (avenueTab === 0 ? avenueTabDetails.length - 1 : avenueTab - 1) )} className="avenue avenue-control prev"> { '<' } </div>

									<span className="avenue-filler"></span>
									<div onClick={() => this.jumpTo(0, true)} className={"avenue transparency ml-0 " + (avenueTab === 0 ? 'active' : '')}>Transparency</div>
									<div onClick={() => this.jumpTo(1, true)} className={"avenue clothing " + (avenueTab === 1 ? 'active' : '')}>Clothing</div>
									<div onClick={() => this.jumpTo(2, true)} className={"avenue news " + (avenueTab === 2 ? 'active' : '')}>News</div>
									<div onClick={() => this.jumpTo(3, true)} className={"avenue politics " + (avenueTab === 3 ? 'active' : '')}>Politics</div>
									<span className="avenue-filler"></span>

									<div onClick={() => this.jumpTo( (avenueTab === avenueTabDetails.length - 1 ? 0 : avenueTab + 1) )} className="avenue avenue-control next"> > </div>
								</div>

								{/* TODO - Once site is done, finish this and get it working for mobile, to much to do right now with just myself working on this :( ) */}
								<div className="timer d-none">
									
									<div className="time">{ 10 }</div>

									<div onClick={() => this.toggleAvenueScroll()} className="pause-play"><i className={"far mr-0 " + (avenueScroll === true ? 'fa-pause-circle' : 'fa-play-circle')}></i></div>

									<div className="progress">
										<div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: timeProgress + "%"}}></div>
									</div>

								</div>
							</div>

						</div>

						<div className="container">

							<NewCustomPanel identifier={this.state.avenueTabDetails[this.state.avenueTab]}/>

						</div>

					</div>

				</section>

				<section className="more-section">
					<div className="background"></div>
					<div className="content">

						<div className="info">
							<div className="title">Skeptical?</div>
							<p>Good, as one should be. Read more about our mission and values here, as well as the direction we want to take this company.</p>
							<Link to={ROUTES.MISSION}><button className="btn btn-articles-light alt">Read On</button></Link>
						</div>

						<div className="info">
							<div className="title">Ready?</div>
							<p>Get started with an account today and start participating to support our platform.</p>
							<Link to={ROUTES.SIGN_UP}><button className="btn btn-articles-light alt">Sign Up</button></Link>
						</div>

						<div className="info">
							<div className="title">Check us out on Youtube!</div>
							<p>Right now we just post development and company updates but soon we will start producing our own news videos.</p>
							<a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCeftkiTtcniDx87GqoEmFAg"><button className="btn btn-articles-light alt">Visit</button></a>
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

				<div className="section-break d-none">

					<img className="text-center d-block ml-auto mr-auto" src={logo} height="35px" alt=""/>

				</div>

				<section className="intro-section d-none">

					<div className="background"></div>

					<div className="content link-panels-wrap">
						<div className="container">

							<div className="mission-snippet">
								<div className="title">Read about our mission</div>
								<div className="text">All the details about what we are doing and the direction we want to take this company.</div>
								<Link to={ROUTES.MISSION}><div className="btn btn-articles-light">Mission</div></Link>
							</div>

							<div className="link-panels">

								<Link to={ROUTES.STORE}>
									<div className="link-panel">
										<div className="title">Store</div>
										<div className="text">Shop our collection of clothing, as well as products made in collaboration with other brands.</div>
										<div className="arrow">></div>
									</div>
								</Link>
				
								<Link to={ROUTES.NEWS}>
									<div className="link-panel">
										<div className="title">News</div>
										<div className="text">Our take on the truth, source based facts, clear stated opinions.</div>
										<div className="arrow">></div>
									</div>
								</Link>
					
								<Link to={ROUTES.STORE_SUBMISSIONS}>
									<div className="link-panel">
										<div className="title">Submissions</div>
										<div className="text">Submit designs you have for a chance to get them printed and make some money.</div>
										<div className="arrow">></div>
									</div>
								</Link>
					
								<Link to={ROUTES.REPORTS}>
									<div className="link-panel">
										<div className="title">Reports</div>
										<div className="text">An inside look into our finances. We believe transparency is key to ending corruption.</div>
										<div className="arrow">></div>
									</div>
								</Link>
						
								<Link to={ROUTES.SIGN_UP}>
									<div className="link-panel">
										<div className="title">Sign Up</div>
										<div className="text">Create an account for all sorts of benifits and access to the entire site.</div>
										<div className="arrow">></div>
									</div>
								</Link>
						
								<Link to={ROUTES.PRESS}>
									<div className="link-panel">
										<div className="title">Press and Buisness</div>
										<div className="text">To reach out with questions or any other inquires</div>
										<div className="arrow">></div>
									</div>
								</Link>				

							</div>

						</div>
					</div>

				</section>

				<div className="section-break d-none">
					<img className="text-center d-block ml-auto mr-auto" src={flag} height="35px" alt=""/>
				</div>

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

// export default LandingPage;

const mapStateToProps = state => ({
	stories: state.stories,
	issues: state.issues,
	myths: state.myths,
});

export default connect(
  mapStateToProps
)(LandingPage);