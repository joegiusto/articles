import React, { Component } from "react";
import Slider from "react-slick";

import ShowcaseCard from './ShowcaseCard';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default class CenterMode extends Component {
  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "50px",
      slidesToShow: 1,
      speed: 500
    };
    return (
      <div className="d-lg-none mt-3">
        <Slider {...settings}>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
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
        </Slider>
      </div>
    );
  }
}