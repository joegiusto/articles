import React from 'react';
import slideHead from '../../assets/img/slide-head.png';

import ShowcaseCard from './ShowcaseCard';
import placeholder from '../../assets/img/placeholder.png'
// import ArticlesHomePageSlick from './ArticlesHomePageSlick';

const LandingPage = () => (
<header>
    <section className="section-showcase">
        <div style={{width: '100%'}} className="row text-center">

            <div className="col-lg-3">
                <div className="card-showcase card-1">

                    <div>
                        <img src={slideHead} width="275px" alt="" />
                        <h5 className="card-text">Something To Stand For.</h5>

                        <div className="row">
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

                        </div>

                    </div>

                    <div className="d-none d-lg-block" id="flex-grow"></div>

                    {/* <ArticlesHomePageSlick/> */}

                    <div className="row">
                        {/* <div className="col-6">
                            <div className="card-quote mb-3">
                                <h5 className="mb-1">Cartoon of the day:</h5>
                                <div className="w-50"><img width="100%" src="https://scontent-lga3-1.cdninstagram.com/vp/827176db749cfa0c57b0d6ac41b567c4/5D58DDA0/t51.2885-15/e35/56811565_799547743750665_8335480773094490725_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com" alt=""/></div>
                                <a style={{color: 'gray'}} href="https://www.instagram.com/nathanwpylestrangeplanet/">@nathanwpylestrangeplanet</a>
                            </div>
                        </div> */}
    
                        <div className="col-12">
                            <div className="card-quote-background">
                                <img src={placeholder} height="220px" alt=""/>
                            </div>
                            <div className="card-quote">
                                <h5>Quote of the day:</h5>
                                <h6 style={{color: 'gray'}}>My dream is of a place and a time where America will once
                                    again be seen as the last best hope of earth.<br /><br /> - Abraham Lincoln</h6>
                            </div>
                        </div>

                        {/* <div className="col-12 mt-4"><button id="learn-more" className="btn btn-black">Learn More</button></div> */}

                    </div>


                </div>
            </div>

            <div className="col-9 d-none d-lg-block">
                <div className="row">
                    <ShowcaseCard 
                        cardClass={'card-2'} 
                        title={'Clothing'} 
                        stage={'One'} 
                        description={'Politacally charged clothing for a great cause. All sales help fund the continued development of the site and our movement.'} 
                        percent={20}
                        stageOne="Online Store"
                        stageTwo="Introductory Videos"
                        stageThree="Partnerships and Sponsers"
                        stageFour="Design Submissions"
                        stageFive="Intergration and funding of News"
                        buttonLink=""
                        buttonText="View the Store"
                    />
        
                    <ShowcaseCard 
                        cardClass={'card-3'} 
                        title={'News'} 
                        stage={'Zero'} 
                        description={'A modern subscription/feed based news platform that serves the peoples needs while maintinaing a fact based agenda.'} 
                        percent={12}
                        stageOne="Online Platform"
                        stageTwo="Writers and Content Creators"
                        stageThree="Scheduled Videos and Articles"
                        stageFour="Interactive Pages and Tools"
                        stageFive=""
                        buttonLink=""
                        buttonText="Visit News"
                    />
                    <ShowcaseCard 
                        cardClass={'card-4'} 
                        title={'Party'} 
                        stage={'Zero'} 
                        description={'Putting power back into the hands of the people. Help us expose the corruption of democracy and get our country back on track.'} 
                        percent={4}
                        stageOne=""
                        stageTwo=""
                        stageThree=""
                        stageFour="End Bipartisan Politics"
                        stageFive="Serve People over Party"
                        buttonLink=""
                        buttonText="View Political Issues"
                    />
                </div>
            </div>

        </div>
    </section>
    {/* <StartCheck name="Test" /> */}
</header>
);

export default LandingPage;