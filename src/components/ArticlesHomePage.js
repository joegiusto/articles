import React from 'react';
// import logo from '../images/logo.png';
import slideHead from '../images/slide-head.png';
// import StartCheck from './StartCheck'

import ShowcaseCard from './ShowcaseCard';
import ArticlesHomePageSlick from './ArticlesHomePageSlick';

const ArticlesHomePage = () => (
<header>
    <section className="section-showcase">
        <div style={{width: '100%'}} className="row text-center">

            <div className="col-lg-3">
                <div className="card-showcase card-1">

                    <div>
                        <img src={slideHead} width="275px" alt="" />
                        <h5 className="card-text">Something To Stand For.</h5>
                        
                    </div>

                    <div className="d-none d-lg-block" id="flex-grow"></div>

                    <ArticlesHomePageSlick/>

                    <div className="row">
                        {/* <div className="col-6">
                            <div className="card-quote mb-3">
                                <h5 className="mb-1">Cartoon of the day:</h5>
                                <div className="w-50"><img width="100%" src="https://scontent-lga3-1.cdninstagram.com/vp/827176db749cfa0c57b0d6ac41b567c4/5D58DDA0/t51.2885-15/e35/56811565_799547743750665_8335480773094490725_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com" alt=""/></div>
                                <a style={{color: 'gray'}} href="https://www.instagram.com/nathanwpylestrangeplanet/">@nathanwpylestrangeplanet</a>
                            </div>
                        </div> */}
    
                        <div className="col-12">
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
                        description={'The beginning of our journey. Help us build and become a part of the movement.'} 
                        percent={20}
                        stageOne="Online Store"
                        stageTwo="Introductory Videos"
                        stageThree="Partnerships and Sponsers"
                        stageFour="Design Submissions"
                        stageFive="Intergration and funding of News"
                    />
        
                    <ShowcaseCard 
                        cardClass={'card-3'} 
                        title={'News'} 
                        stage={'Zero'} 
                        description={'A modern innovative news platform that serves the peoples needs while maintinaing a fact based agenda.'} 
                        percent={12}
                        stageOne="Online Platform"
                        stageTwo="Writers and Content Creators"
                        stageThree="Scheduled Videos and Articles"
                        stageFour="Interactive Pages and Tools"
                        stageFive=""
                    />
                    <ShowcaseCard 
                        cardClass={'card-4'} 
                        title={'Party'} 
                        stage={'Zero'} 
                        description={'Our final step, encourage politicians to once again serve the people of the United States not thier political parties.'} 
                        percent={4}
                        stageOne=""
                        stageTwo=""
                        stageThree=""
                        stageFour="End Bipartisan Politics"
                        stageFive="Serve People over Party"
                    />
                </div>
            </div>

        </div>
    </section>
    {/* <StartCheck name="Test" /> */}
</header>
);

export default ArticlesHomePage;