import React from 'react';
import Slider from "react-slick";

import ShowcaseCard from './ShowcaseCard';

import slideHead from '../../assets/img/slide-head.png';

import StoreItem from '../Store/StoreItemAlpha';

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
<div className="landing-page landing-new">

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

	<section className="intro-section">
		<div className="background"></div>
		<div className="content">
			<div className="container h-100">

				<div className="custom-panel">

					<div className="top">
						<div className="row">

							<div className="col-12 col-md-6">
								<div className="left">

									<div className="content-title mb-4" style={{lineHeight: "45px"}}>Dear America, We Have A Plan!</div>
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

					{/* <div className="middle">
						<div>This is where a intro message will go before we get into the snippets of each thing.</div>
						<div>This is where a intro message will go before we get into the snippets of each thing.</div>
						<div>This is where a intro message will go before we get into the snippets of each thing.</div>
						<div>This is where a intro message will go before we get into the snippets of each thing.</div>
						<div>This is where a intro message will go before we get into the snippets of each thing.</div>
						<div>This is where a intro message will go before we get into the snippets of each thing.</div>
						<div>This is where a intro message will go before we get into the snippets of each thing.</div>
						<div>This is where a intro message will go before we get into the snippets of each thing.</div>
					</div> */}

					{/* <div className="bottom">
						<div className="row pb-3">

							<div className="col-12 col-md-6 mt-3">
								<div className="card shadow">Transparency</div>
							</div>

							<div className="col-12 col-md-6 mt-3">
								<div className="card shadow">Clothing</div>
							</div>

							<div className="col-12 col-md-6 mt-3">
								<div className="card shadow">News</div>
							</div>

							<div className="col-12 col-md-6 mt-3">
								<div className="card shadow">Politics</div>
							</div>

						</div>
					</div> */}

				</div>

			</div>
		</div>
	</section>

	<section className="tour-section">
		<div className="background"></div>
		<div className="content">

			<div className="container">
				<div className="custom-panel">

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

				<div className="custom-panel">

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

				<div className="custom-panel">

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

				<div className="custom-panel">

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

	</section>

	<section className="more-section">
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

	<section className="footer-section">

	</section>

	<footer>
		<div className="container inside">
			<div>
				<img className="logo" height="200px" style={{filter: 'drop-shadow(0px 0px 2px #edd)'}} src={logo} alt="" />
				<div className="text-center tag">Something To Stand For</div>
			</div>
			<div>Quick Links</div>
			<div>Socials</div>
			<div>
				<div className="title">Apps</div>

				<div className="app-list">

					<div className="app">
						<div className="platform-logo">@</div>
						<div className="platform-date">Late 2020</div>
					</div>

					<div className="app">
						<div className="platform-logo">@</div>
						<div className="platform-date">Late 2020</div>
					</div>

				</div>

			</div>
		</div>
	</footer>

</div>
);

export default LandingPage;