import React from 'react';
import Slider from "react-slick";

import ShowcaseCard from './ShowcaseCard';

import slideHead from '../../assets/img/slide-head.png';

import placeholder from '../../assets/img/placeholder.png'
// import ArticlesHomePageSlick from './ArticlesHomePageSlick';
import logo from '../../assets/img/logo.png'

class SimpleSlider extends React.Component {
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

const LandingPage = () => (
<header>

	<section className="landing-new">

		<div class="background">
			<div class="bg"></div>
			<div class="bg bg2"></div>
			<div class="bg bg3"></div>
		</div>

		<div className="content">

			<div className="slide">

				<div className="panel-head">
					<div className="hero-side-by-side">
						<div className="left">
							<img height="400px" src={logo} alt="" />
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

			<div className="slide" style={{backgroundColor: "#fff5e6"}}>

				<div className="panel mt-5">
					<div className="content-title">Dear America, we have a plan!</div>
					{/* <img className="d-inline" height="20px" alt="" src="https://upload.wikimedia.org/wikipedia/commons/d/df/Uncle_Sam_%28pointing_finger%29.png"/> */}
					<h6 className="content-highlight content-text">It's a bit to explain though...</h6>
					<div className="content-text">
						Articles is a for-profit political organization and platform, working to make America a better place for the people through avenues of clothing, news, politics and transparency.
					</div>
					<div className="content-text mt-4">
						The first step of fixing any problem is addresing it. We need Americans more involved with what is going on in this country. Through Articles we plan to bring light to the problems  our country faces in a fresh innovative way. Below we highlight just some of the things we are doing to make that happen. Articles will never be complete, , but will always be introducing and testing and demonstrating new materials and systems.
					</div>

					<ol>
						<li>Get people involved</li>
						<li>Provide informative news</li>
						We believe with a large enough following we can change the way politicans think, not by any monetary means but if we group together everyone and
						It will be a community of tomorrow that will never be completed, but will always be introducing and testing and demonstrating new materials and systems.
						
					</ol>

					<ul>
						<li>Everyone gets a shot at the American Dream</li>
						<li>More political parties or none at all. A stagnet two party system is very dangerous</li>
					</ul>

					<h5>The End Goal</h5>
					<div className="content-text">Transparency is key to all of this, so what is the end goal? A United America, one with not so many partisan issues, one where we come together to overcome the problems that face us. One where all  and I believe now is the time we can use technology for good to do so. Lincoln said it best, "My dream is of a place and a time where America will once again be seen as the last best hope of earth."</div>

					<div className="content-text">We have a long road ahead of us and I ask that you join for the ride.</div>

				</div>

				<div className="panel-full my-3">
					<div className="row">

						<div className="col-12 col-md-6">
							<div className="content-card h-100">

								<div className="content-card_title">Transparency</div>
								<div className="content-card_text">All transactions will be live for all of our supporters to peak at and question.</div>
								<div className="content-card_spacer"></div>

								<div className="row justify-content-center mt-2">

									<div className="col-11">
										<div className="sub-card">

											<div className="left-button">
												<i class="fas fa-chevron-left"></i>
											</div>

											<div className="right-button">
												<i class="fas fa-chevron-right"></i>
											</div>

											<div className="left">
												<div className="live content-text">Live</div>
											</div>
											<div className="right">
												Look through every transaction and see them live. Clothing sales, advertising deals, payrole, you name it. We believe political intrest should be transparent.  
											</div>

										</div>
									</div>

									<div className="col-10">
										<div className="content-sub-card">
											<div className="content-card_sub-card_icon"></div>
											<div className="content-card_sub-card_title content-text">Live</div>
										</div>
									</div>

									<div className="dots">
										<div className="dot active"></div>
										<div className="dot"></div>
										<div className="dot"></div>
									</div>

								</div>

							</div>
						</div>

						<div className="col-12 col-md-6">
							<div className="content-card h-100">

								<div className="content-card_title">Clothing</div>
								<div className="content-card_text">Politacally charged clothing for a great cause. All sales help fund the continued development of the platform.</div>
								<div className="content-card_spacer"></div>

								<div className="row justify-content-center mt-2">

									<div className="col-11">
										<div className="sub-card">

											<div className="left-button">
												<i class="fas fa-chevron-left"></i>
											</div>

											<div className="right-button">
												<i class="fas fa-chevron-right"></i>
											</div>

											<div className="left">
												<div className="content-text">Originals</div>
											</div>
											<div className="right">
												Look through every transaction and see them live. Clothing sales, advertising deals, payrole, you name it. We believe political intrest should be transparent.  
											</div>

										</div>
									</div>

									<div className="col-10">
										<div className="content-sub-card">
											<div className="content-card_sub-card_icon"></div>
											<div className="content-card_sub-card_title content-text">Live</div>
										</div>
									</div>

									<div className="dots">
										<div className="dot active"></div>
										<div className="dot"></div>
										<div className="dot"></div>
									</div>

								</div>

							</div>
						</div>

						<div className="col-12 col-md-12 mt-3">
							<div className="content-card">
								<div className="content-card_title">Clothing</div>
								<div className="content-card_text">The sale of our clothing helps fund and spread the Articles name. clothing we can Politacally charged clothing for a great cause. All sales help fund the continued development of the site and our movement.</div>
								<div className="row mt-2">
									<div className="col-3"><div className="content-card_sub_title">Originals</div></div>
									<div className="col-3"><div className="content-card_sub_title">Submisisons</div></div>
									<div className="col-3"><div className="content-card_sub_title">Partnerships</div></div>
									<div className="col-3"><div className="content-card_sub_title">Sponsered</div></div>
								</div>
							</div>
						</div>

						<div className="col-12 col-md-12 mt-2">
							<div className="content-card">
								<div className="content-card_title">News</div>
								<div className="content-card_text">A modern subscription/feed based news platform that serves the peoples needs while maintinaing a fact based agenda.</div>
								<SimpleSlider/>
							</div>
						</div>

						<div className="col-12 col-md-12 mt-2">
							<div className="content-card">
								<div className="content-card_title">Politics</div>
								<div className="content-card_text">Putting power back into the hands of the people. Our agenda is educating people to better serve our country.</div>
							</div>
						</div>

					</div>
				</div>

			</div>

			<div className="slide">

				<div className="panel mt-4">

						<div className="content-title">How does this fix anything?</div>
						<div className="content-text">
							The first step of fixing any problem is addresing it. We need to educate America and bring light to the problems in an innovative way. We don't know everything, in fact we plan to grow Articles and explore. All we are asking for is a chance.
						</div>

						<button className="btn btn-lg mt-3 btn-articles-landing">
							Sign Up
						</button>
					

						<div className="content-title mt-3">Not convinced, skeptical?</div>
						<div className="content-text">
							Good! You should be, Americans have been tricked, bamboozled and lied to for far to long! We encourage you to read through our Mission Page for more details, we understand a lot of text may be boring but we are trying to fix a lot of shit here people.
						</div>
						
						<button className="btn btn-lg mt-3 btn-articles-landing">
							Mission
						</button>
					

					</div>

			</div>

		</div>

	</section>

	<section className="section-showcase container-fluid">
		<div className="row text-center">

			<div className="col-lg-3">
				<div className="card-showcase card-1">

					<div>

						<div className="header-container">
							<img className="logo" src={logo} height="85px" alt="" />
							<div className="d-inline-block">
								<img src={slideHead} width="275px" alt="" />
								<h5 className="card-text">Something To Stand For.</h5>
							</div>
						</div>

						<div className="row d-none">
							<div className="col-6">
								<div className="info-snip flex">
									<div className="title">Users:</div>
									<div className="info">3</div>
								</div>
							</div>

							<div className="col-6">
								<div className="info-snip flex">
									<span className="title">Rasied:</span>
									<span className="info">$114.00</span>
								</div>
							</div>

							<div className="col-6">
								<div className="info-snip flex">
									<span className="title">Views:</span>
									<span className="info">251</span>
								</div>
							</div>

							<div className="col-6">
								<div className="info-snip flex">
									<span className="title">Stories:</span>
									<span className="info">12</span>
								</div>
							</div>

							<div className="col-6">
								<span className="quick-links">Learn More</span>
							</div>

							<div className="col-6">
								<span className="quick-links">Sign In / Sign Up</span>
							</div>

						</div>

					</div>

					<div className="landing-blocks">
						<div className="landing-block block-1">
							<div className="title">Clothing</div>
							<div className="more-info">
								<div>Politacally charged clothing for a great cause. All sales help fund the continued development of
									the site and our movement.</div>
								<div className="dual-header">
									<div>Visit Store</div>
									<div>Learn More</div>
								</div>
							</div>
						</div>
						<div className="landing-block block-2">
							<div className="title">News</div>
							<div className="more-info">

							</div>
						</div>
						<div className="landing-block block-3">
							<div className="title">Party</div>
							<div className="more-info">

							</div>
						</div>
					</div>

					<div className="d-none d-lg-block" id="flex-grow"></div>

					{/*
					<ArticlesHomePageSlick /> */}

					<div className="row">
						{/* <div className="col-6">
							<div className="card-quote mb-3">
								<h5 className="mb-1">Cartoon of the day:</h5>
								<div className="w-50"><img width="100%"
										src="https://scontent-lga3-1.cdninstagram.com/vp/827176db749cfa0c57b0d6ac41b567c4/5D58DDA0/t51.2885-15/e35/56811565_799547743750665_8335480773094490725_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com"
										alt="" /></div>
								<a style={{color: 'gray'}}
									href="https://www.instagram.com/nathanwpylestrangeplanet/">@nathanwpylestrangeplanet</a>
							</div>
						</div> */}

						<div className="col-12">
							<div className="card-quote-background">
								{/* <img src={placeholder} height="220px" alt="" /> */}
							</div>
							<div className="card-quote">
								<h5>Quote of the day:</h5>
								<h6 style={{color: 'gray'}}>My dream is of a place and a time where America will once
									again be seen as the last best hope of earth.<br /><br /> - Abraham Lincoln</h6>
							</div>
						</div>

						{/* <div className="col-12 mt-4"><button id="learn-more" className="btn btn-black">Learn More</button></div>
						*/}

					</div>


				</div>
			</div>

			<div className="col-9 d-none d-lg-block">
				<div className="row">
					<ShowcaseCard cardClass={'card-2'} title={'Clothing'} stage={'One'} 
						description={'Politacally charged clothing for a great cause. All sales help fund the continued development of the site and our movement.'}
						percent={20} stageOne="Online Store" stageTwo="Introductory Videos" stageThree="Partnerships and Sponsers"
						stageFour="Design Submissions" stageFive="Intergration and funding of News" buttonLink=""
						buttonText="View the Store" />

					<ShowcaseCard cardClass={'card-3'} title={'News'} stage={'Zero'} 
						description={'A modern subscription/feed based news platform that serves the peoples needs while maintinaing a fact based agenda.'} percent={12}
						stageOne="Online Platform" stageTwo="Writers and Content Creators"
						stageThree="Scheduled Videos and Articles" stageFour="Interactive Pages and Tools" stageFive=""
						buttonLink="" buttonText="Visit News" />
					<ShowcaseCard cardClass={'card-4'} title={'Party'} stage={'Zero'} 
						description={'Putting power back into the hands of the people. Help us expose the corruption of democracy and get our country back on track.'}
						percent={4} stageOne="" stageTwo="" stageThree="" stageFour="End Bipartisan Politics"
						stageFive="Serve People over Party" buttonLink="" buttonText="View Political Issues" />
				</div>
			</div>

		</div>
	</section>
	{/*
	<StartCheck name="Test" /> */}
</header>
);

export default LandingPage;