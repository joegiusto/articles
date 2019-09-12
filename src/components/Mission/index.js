import React from 'react';
import Scrollspy from 'react-scrollspy';

const Mission = () => (
  <div className='container-fluid container-custom container-mission'>
    <Content/>

  </div>
);

export default Mission;

const Content = () => (
  <div className='mission-page'>

    <div className='row'>
      <div className="col-4 col-lg-2 mission-page-side">
        <Scrollspy offset={ -250 } className={'sticky-top'} style={{zIndex: '10'}} items={ ['section-1', 'section-2', 'section-3','section-4'] } currentClassName="is-current" scrolledPastClassName='is-past'>
          <li className='scroll-spy-item'><a href="#section-1">Intro</a></li>
          <li className="sub-item">Transparency</li>
          <li className='scroll-spy-item'><a href="#section-2">Clothing</a></li>
          <li className="sub-item">Store</li>
          <li className="sub-item">Submissions</li>
          <li className='scroll-spy-item'><a href="#section-3">News</a></li>
          <li className="sub-item">Stories</li>
          <li className="sub-item">Issues</li>
          <li className='scroll-spy-item'><a href="#section-4">Party</a></li>
          <li className="sub-item">Myths</li>
          <li className="sub-item">Issues</li>
          <li className="sub-item">Reforms</li>
        </Scrollspy>
      </div>

      <div className="col-8 col-lg-10 mission-page-content">

        <div>
          <div className="quote mt-4">
            <div className="quote-background-container">
              <div className="quote-background"></div>
            </div>

            <div className="quote-text">
              “Have you ever wondered what would happen, if all the geniuses, the artists, the scientists, the smartest, most creative people in the world decided to actually change it? Where, where could they even do such a thing? They'd need a place free from politics and bureaucracy, distractions, greed - a secret place where they could build whatever they were crazy enough to imagine...”
            </div>
            <div className="quote-credit">
              - Hugo, Tomorrowland. Brad Bird
            </div>

          </div>

          <h1 className='page-title responsive-header'>Welcome</h1>
          <section id="section-1">
            Articles at it's core is a platform by the people for the people. <br/>Articles in its simplest definition is a movement. This movement will explore many avenues to achieve goals that benefit the American working class, and while those goals will change with time, we will be a movement dedicated to solving conflict and creating a better life for the citizens of this country. This movement aims to encourage and make it easier for the people of America to become more politically knowledgably, active and expressive while at the same time stressing the importance of independent thought and freethinking. Many of the problems that plague this nation are met with much resistance and little compromise.  The Republicans and Democrats alike have proven over the years they would rather choose to put their interest over the people of the United States. These political parties have weakened our government and have successfully created divides amongst the people, leading up to the very tense place we find ourselves today. These divides within our communities cannot be tolerated and must come to an end for the betterment of not only our people but those who wish to become a part of the country we have worked hard to create. We are building a completely transparent platform where we sell socially charged clothing and other merchandise, to fund an innovative new way of delivering news and information to Americans. Our platform is being built to encourage independent free thought aiming to fix Americas political  and social system.  
          </section>

          <h1 className="page-title">Transparency</h1>
          <section id="sub-section-1">
            At Articles, everthing that can be transparent will be from day one. 
            <br/>Payrole, so our employees know they are getting paid similir to what other people in thier department and experecne level are being paid. 
            <br/>Sales, sales help suport and drive our platform so it is only fair for those who but to not only see they are helping but to also see where thier money is going to. 
            <br/>Donations, in and out we want complete transparency so our supporters know who we take in money from as well where it goes.
            <br/>Lastly expenses, elected representative spending $2,500 on a dinner? That doesn't right. Obviously we have operating cost but we are mindful to the etc...
            Every sale, donation, expense, paycheck, etc. live, transparent for our supporters to see.  Supporters can see exactly how we spend money, so they know we are making wise decisions that benefit the company at the end of the day. Showing this information may be untraditional but we hope will get people invested in our platform. Visitors to our site can see how much money we have at any given time. When you buy a product, you can see your transaction within minutes on the site. Fellow employees can see what others in their department are making, and see if they are making what they deserve, opening conversation and closing pay gaps setting an example for the future of this country. 
          </section>

          <h1 className='page-title'>Clothing</h1>
          <section id="section-2">
            Clothing has evolved so much in the past century. From pushes in equality via movements like the Flappers to quite literally the words and images we can now print on out shirts, clothing has always been a very expressive form. We see brands like Supreme and other popular streetwear brands take off and grow large followings. We also see fans buying an artist’s or creator’s clothing to show support. If we could create a brand and movement to get people to show us that same support, then we would have a very good stream of income off that while creating awareness from people advertising our mission.  With this we can push on to pursue achievement of our goals. Many brands have untraditionally created names for themselves in the industry, some examples would be Supreme, Mr. Beast,  Yes Theory and more. These companies sell thousands of items to fund themselves and their platforms. Using this approach, we can sell clothing that encourages thought to get people thinking about the system we live in and the inequalities and hardships others face. Through advertising and creating videos while partnering with brands and creators Articles will sell products that people feel proud to wear.
          </section>
          
          <h1 className='page-title'>News</h1>
          <section id="section-3">
            With current news providers falling out of touch with the average American and providing content not in the interest of the American people, we are developing interactive source-based articles that make news less bias. Source based and trackable stories are a great focus and a huge part of Articles. More info will be coming soon on the website. Innovative source-based news. Online news platforms are so dry with content and littered with ads today. With the help of clothing sales, we will build and maintain a new kind of news platform. A platform that is not biased and corporate focused. Timeline based news threads that users can subscribe to if they are interested and get notified on developments. New gun law bills, or Flint Michigan water progress? Many of these stories lose focus in the spotlight but users can keep the things they care most close to them.
          </section>
          
          <h1 className='page-title'>Party</h1>
          <section id="section-4">Party text here.</section>
        </div>

        <h5 className="mt-5">Version 1.0</h5>
        <div className="mb-5">This page will change with time, yet we never want to alter what we stand for here at Articles. Whenever we change something on this page to make up for all the changes we will go trhough we will save old versions for people to look through and make sure we don't forget our roots.</div>

      </div> {/* End  col mission-page-content */}
    </div> {/* End row */}
  </div> /* End mission-page */
);