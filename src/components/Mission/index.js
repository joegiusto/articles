import React, { useState } from 'react';
import { Manager, Reference, Popper } from 'react-popper';

import Scrollspy from 'react-scrollspy';

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theposition: 0,
      titleLocations: {}
    };

    this.jumpTo = this.jumpTo.bind(this);
  }
  
  componentDidMount() {
    var titleLocations  = {
      tldr: getPosition(document.getElementById('title-tldr')),
      about: getPosition(document.getElementById('title-about')),
      mission: getPosition(document.getElementById('title-mission')),
      transparency: getPosition(document.getElementById('title-transparency')),
      reports: getPosition(document.getElementById('title-reports')),
      store: getPosition(document.getElementById('title-store')),
      submissions: getPosition(document.getElementById('title-submissions')),
      synopsis: getPosition(document.getElementById('title-synopsis')),
      stories: getPosition(document.getElementById('title-stories')),
      issues: getPosition(document.getElementById('title-issues')),
      myths: getPosition(document.getElementById('title-myths')),
      reforms: getPosition(document.getElementById('title-reforms')),
      townHall: getPosition(document.getElementById('title-town-hall')),
      seatTracker: getPosition(document.getElementById('title-seat-tracker')),
      privacy: getPosition(document.getElementById('title-privacy')),
      failure: getPosition(document.getElementById('title-failure')),
      payrole: getPosition(document.getElementById('title-payrole')),
  }

    for (var location in titleLocations) {
      titleLocations[location].passed = false;
    }

    // QUESTION to anyone reading this, the for loop above obviuously makes it easy to add this property to all the titles but how would I do this inline?
    // EXAMPLE tldr: getPosition(document.getElementById('title-tldr')).passed = false,
    // This does not work and I was wondering how to add key and values to objects that are returned inline via function when setting an object

    // Do not move this because we need to manipulate titleLocations before pusing it to state with that for loop
    this.setState({titleLocations});

    function getPosition(element) {
      var xPosition = 0;
      var yPosition = 0;
  
      while(element) {
          xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
          element = element.offsetParent;
      }
  
      return { x: xPosition, y: yPosition };
    }

    console.log(titleLocations);

    var scHeight =  document.getElementById('section-container').offsetHeight;
    document.getElementById('tracker-container').style.height = scHeight - 56 + 'px';

    window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  
    const scrolled = winScroll / height
  
    this.setState({
      theposition: scrolled,
      theheight: winScroll
    })

    // console.log(this.state.theposition.about);
    for (var title in this.state.titleLocations) {
      // console.log(this.state.titleLocations[title]);

      if (!this.state.titleLocations[title].passed && winScroll > this.state.titleLocations[title].y) {

        console.log(title + ' was passed.')
        console.log(this.state.titleLocations[title])

        document.getElementById('section-' + title).classList.add('passed');

        this.setState({
          titleLocations: {
            ...this.state.titleLocations,
            [title]: {
              ...this.state.titleLocations[title],
              passed: true
            }
          }
        });

      } else if (this.state.titleLocations[title].passed && winScroll < this.state.titleLocations[title].y) {
        document.getElementById('section-' + title).classList.remove('passed');

        this.setState({
          titleLocations: {
            ...this.state.titleLocations,
            [title]: {
              ...this.state.titleLocations[title],
              passed: false
            }
          }
        });
      }

    }
  }

  jumpTo(elementID) {
    // console.log(elementID);
    // console.log(this.state.titleLocations);
    var y = this.state.titleLocations[elementID].y;
    window.scrollTo(0, y - 1);

    // This might need to be done
    // this.listenToScroll();
  }

  render() {
    return (
      <Mission jumpTo={this.jumpTo} theposition={this.state.theposition}></Mission>
    )
  }
}

const Mission = (props) => {
  const [shouldShowVersionInfo, setShouldShowVersionInfo] = useState(false);
  const [shouldShowMenu, setShouldShowMenu] = useState(false);

  return(
    <div className='container-fluid container-custom container-mission'>
      {/* <Content/> */}
      <div className="mission-page">
        <div className="row h-100 justify-content-center">

          <div className="col-3">
          <div className={"side-bar" + (shouldShowMenu ? ' out' : '')}>

            <div onClick={() => (setShouldShowMenu(!shouldShowMenu))} className={"mobile-pop-out d-md-none" + (shouldShowMenu ? ' out' : '')}>
              <i className="fas fa-map-signs"></i>
              <div className="pop-out-percent">{(props.theposition * 100).toFixed(0)}%</div>
              <div className="little-border"></div>
            </div>

            <div className="progress-container">
              {/* <div className="progress">
                0%
              </div> */}
              <div><span className="d-none d-md-block">{((props.theposition * 100).toFixed(0) === '100' ? '🎉100%🎉' : 'Progress: ' + (props.theposition * 100).toFixed(0) + '%') }</span></div>
            </div>

            <div className="version-container">

              {/* <div><i className="fas fa-info-circle"></i>Release 1.0</div> */}
              <Manager>
                <Reference>
                  {({ ref }) => (
                    <>
                      <div className="noselect cursor-pointer" ref={ref} onClick={() => (setShouldShowVersionInfo(!shouldShowVersionInfo))}><i className="fas fa-info-circle m-0"></i><span className="version-highlight d-none">Release 1</span></div>
                      <div className={"popper-bridge" + (shouldShowVersionInfo ? ' ' : ' d-none')}></div>
                    </>
                  )}
                </Reference>
                {shouldShowVersionInfo ? (
                  <Popper placement="left">
                  {({ ref, style, placement, arrowProps }) => (
                    <div className="popper-mission-wrap" ref={ref} style={style} data-placement={placement}>
                      <div className="popper-mission">
                        <div>We save every version of this mission page to ensure we stay on track with all of our goals and visions. Many companies change these as they grow and make excusses to make things easier on themselves. Even if it is a typo or a few words, we save that. Because we are on release one, there are no previous versions of this document available at this time but this is where they will be stored.</div>
                        {/* <hr/>
                        <div>Versions</div>
                        <div className="cursor-pointer">1</div> */}
                      </div>
                      <div ref={arrowProps.ref} style={arrowProps.style} />
                    </div>
                  )}
                </Popper>
                ) : null}
                
              </Manager>
              
            </div>

            

            <div id="tracker-container" className="tracker-track">
              <div style={{top: ((props.theposition * 100).toFixed(0) + '%') }} className="tracker"></div>
            </div>

            <div id="section-container">
              <div className="section-head">Intro</div>
              <div onClick={() => props.jumpTo('tldr')} id="section-tldr" className="section-sub">TLDR</div>
              <div onClick={() => props.jumpTo('about')} id="section-about" className="section-sub">About</div>
              <div onClick={() => props.jumpTo('mission')} id="section-mission" className="section-sub">Mission</div>
              <div onClick={() => props.jumpTo('transparency')} id="section-transparency" className="section-sub">Transparency</div>
              <div onClick={() => props.jumpTo('reports')} id="section-reports" className="section-sub">Reports</div>
  
              <div id="section-clothing" className="section-head">Clothing</div>
              <div onClick={() => props.jumpTo('store')} id="section-store" className="section-sub">Store</div>
              <div onClick={() => props.jumpTo('submissions')} id="section-submissions" className="section-sub">Submissions</div>
  
              <div id="section-news" className="section-head">News</div>
              <div onClick={() => props.jumpTo('synopsis')} id="section-synopsis" className="section-sub">Synopsis</div>
              <div onClick={() => props.jumpTo('stories')} id="section-stories" className="section-sub">Stories</div>
              <div onClick={() => props.jumpTo('issues')} id="section-issues" className="section-sub">Issues</div>
              <div onClick={() => props.jumpTo('myths')} id="section-myths" className="section-sub">Myths</div>
  
              <div id="section-party" className="section-head">Party</div>
              <div onClick={() => props.jumpTo('reforms')} id="section-reforms" className="section-sub">Reforms</div>
              <div onClick={() => props.jumpTo('townHall')} id="section-townHall" className="section-sub">Town Hall</div>
              <div onClick={() => props.jumpTo('seatTracker')} id="section-seatTracker" className="section-sub">Seat Tracker</div>
  
              <div id="section-ntkb" className="section-head">NTKB</div>
              <div onClick={() => props.jumpTo('privacy')} id="section-privacy" className="section-sub">Privacy</div>
              <div onClick={() => props.jumpTo('failure')} id="section-failure" className="section-sub">Failure</div>
              <div onClick={() => props.jumpTo('payrole')} id="section-payrole" className="section-sub">Payrole</div>
              {/* <div className="section-sub">Employees</div> */}
            </div>

          </div>
          </div>

          {/* <div className="col-3"></div> */}

          {/* <div className="col-2"></div> */}
          <div className="col-12 col-offset-1 col-md-8 col-lg-9 col-xl-7 my-auto">
            <div className="content mt-3 mt-xl-5">

              <img height="200px" src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png" alt=""/>

              <div className="mission-section-container">

                <span className="youtube-inline-link special d-block"><i className="fab fa-youtube mx-2"></i>Prefer a video instead? (Video coming soon!)</span>

                <div className="mission-section font-mission-text">

                  <div style={{height: '75px'}} className="mt-5"></div>

                  <h1 className="">Intro</h1>
    
                  <div className="sub-wrap pt-2">

                    <div className="sub-title" id="title-tldr">TLDR?</div>
                    <div className="sub-text">
                      <p>Articles is a for-profit political organization and platform, working to make America a better place for the people through avenues of clothing, news, politics and transparency.</p>
                      <span className="black-highlight">
                        At Articles we align with no political party and actively try to promote independent thought through all of our ventures. 
                      </span>
                    </div>
                    

                  </div>

                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-about">About</div>
                    <div className="sub-text">
                      <p>To expand on what's above, we first need to explain a little more about who we are. Articles at the end of the day is a political organization that’s aim is to advocate and promote laws that enable individuals to better live the American Dream. </p>

                      <div className="dream-quote py-1">
                        <h4><b>What is the American Dream?</b></h4>
                        <p><i>“The ideal by which equality of opportunity is available to any American, allowing the highest aspirations and goals to be achieved.”</i></p>
                      </div>

                      <p>
                        Today we have many leaders aligned with political parties occupying Americas executive branch that care more about their party then the fundamentals behind the laws in which they are trying to pass. We have a terrifying amount of partisan issues that no side wishes to budge on and little has been done to provide compromise to these issues. How do the two political parties in power that speak of the American Dream and fairness for all, allow issues such as school lunch debt, abuse of second amendment rights, sweatshops, offshore accounts, flawed welfare systems and many more to plague this nation?
                      </p>

                      <p>Many Americans have great ideas on how this can be done but not a lot of people wish to listen, here at Articles we are building out a platform to encourage more people to become involved in news and politics in a more modern and refreshing way, as well as raise awareness for the issues that bog down our country. America is becoming sick and outlined below is just a start on how we plan to go about making it better. We ask that you spend 10 minutes reading what we have below and whether you agree or not share your feedback with us. This is not something we can do alone. Articles is built by the people, for the people and that includes you.</p>

                      
                      <p className="mb-0">Corporate America need not apply...</p>

                    </div>

                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-mission">Mission</div>

                    <div className="sub-text">
                      <p className="d-none">Our mission is simple one, yet very complex. Like every other group that tries to help the USA in the name of profit we also say that we want to make this country a better place <span role="img" aria-label="puke-emoji">🤮</span> but we heard that one before, so let us explain.</p>

                      {/* <hr/> */}

                      <p>So what we really want to focus on is laws that promote the American dream, transparency and fairness. Making everyone's life better for the time that we are here. Two things are required for this.</p>

                      <ul className="ml-4">
                        <li>A Trustworthy Platform</li>
                        <li>Money</li>
                      </ul>

                      <hr/>

                      <p>In this document we will explain many of the ways we are working to build the platform out. The brutal truth is though we will need a lot of money to do this and that is where the clothing and news plays a part to our mission. We will be selling clothing as well as providing news to Americans to cover the cost of operations so we have no reason to rely on funding from corporations that have political motivation.  Due to the nature of our work and the fact that we rely on the people we want to start off with transparency, something deeply ingrained in every aspect of what we do.</p>
                    </div>
                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-transparency">Transparency</div>
                    <div className="sub-text">
                      <p>At Articles, everything is transparent from day one. Donations, sales, ad-revenue, payroll, cost of operations, you name it, all available live over at our Reports page.</p>

                      <p>Money corrupts many organizations and leaders so we want to make sure the same does not happen to us, transparency is also one of the most ethical things a company involved in politics can do if done right. Many other companies do this yes, but to acquire this data proves very challenging and can be hard. That data is also sometimes missing bits and pieces as well as delayed to onlookers.</p>

                      <p>Every transaction we process will appear live, just bought a shirt from us? Head over to the reports page and there you will see that purchase as well as the amount of money sitting in our accounts. Whenever we need to take money from that account say for events, resupplying products, or anything really, those transactions show up there too. Each expense of ours includes a Why report on why we spent that money along with a system for supporters to ask more questions about the transaction and flag it if they do not agree with it.</p>

                      <div className="dream-quote">
                        <div><b>Perspective{/*Break*/}</b></div>
                        <p>Could you imagine the outrage if one of us at Articles spent $3,000 on some dinner and a few drinks? Politicians can’t because they are still doing it, and we can’t do much about that. This is why open, attainable records must be a priority for any political affiliations.</p>
                      </div>

                      <p>Providing this data to everyone can serve more than just winning the public over with morals. Though we are not at the point of paying people yet, once we are, fellow employees can see what others in their department are making, and see if they are making what they deserve, opening conversation and putting an end to issues like gender pay gaps. If you have an extra four minutes and twelve seconds there is a good video on this from the show <a target="_blank" href='https://www.youtube.com/watch?v=7xH7eGFuSYI'><span className="articles-inline-link noselect">Adam Ruins Everything</span></a> that is a good watch. Although a solution like this may not be viable for every field it certainly will be for us, one thing we need to note on this is privacy. Knowing what your counterparts make serves well for many reasons and due to our public nature it all makes sense but at Articles we also respect privacy. In the future we will allow employees to hide their name in the payroll/employee directory but we publicly show their pay and what department they belong to.</p>

                    </div>
                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-reports">Reports</div>
                    <div className="sub-text">
                      <p>To expand on the Reports page a little more we have broken down everything into Revenue and Expenses along with hot-links into popular sub pages. In real time you can look at our bank balance and everything that includes. Supporters that have signed up with Articles can see this data live and at times of increase traffic people who are not supporters (users who signed up) may receive delayed results. In the event of severe increased traffic or DDOS attacks this data may be delayed for all users but we will do our best to mitigate these issues.</p>
                    </div>
                  </div>
                </div>
  
                <div className="mission-section">
                  <h1>Clothing</h1>
    
                  <div className="sub-wrap pt-2 mb-2">
                    <div className="sub-title" id="title-store">Store</div>
                    <div className="sub-text">
                      <p>In figuring out how we are going to do all of this, questions had to be asked, how will we raise money? Money again, is one of the things required to run this operation. So what is something that we all have in common that we need? Well that answer was wearing clothes. Many times throughout history and even today clothing is used as a means of expression. Movements like the Flappers and Flower Children used clothing as a way of expression and we plan to do the same. While all of our clothing will not be politically woke, everything we sell will help the platform to a degree. In our store we will be selling four types of products as we develop and grow.</p>

                      <p className="d-none">We all share something in common, we are all American yes but thats not all, we all wear clothes. Many times in recent history clothing has served as a form of expression. Movements like the Flappers and modern streetwear stand for more then just the look it gives at face value. Using clothing we hope to spread the Artricles mission while raising funds to continue development of the site and reinvesting in ourself. At our online marketplace people can support us, our partners and some of the charities we sponsor. We have three tiers of products. Clothing has evolved so much in the past century. From pushes in equality via movements like the Flappers to quite literally the words and images we can now print on out shirts, clothing has always been a very expressive form. We see brands like Supreme and other popular streetwear brands take off and grow large followings. We also see fans buying an artist’s or creator’s clothing to show support. If we could create a brand and movement to get people to show us that same support, then we would have a very good stream of income off that while creating awareness from people advertising our mission. With this we can push on to pursue achievement of our goals. Many brands have untraditionally created names for themselves in the industry, some examples would be Supreme, Mr. Beast, Yes Theory and more. These companies sell thousands of items to fund themselves and their platforms. Using this approach, we can sell clothing that encourages thought to get people thinking about the system we live in and the inequalities and hardships others face. Through advertising and creating videos while partnering with brands and creators Articles will sell products that people feel proud to wear.</p>

                      
                    </div>
                  </div>
                  
                  <div className="row mb-5">

                    <p className="ml-3 mb-0"><b>Below we have the four types of items available on our store.</b></p>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="card clothing-card">
                        <div className="card-title">
                          <span>Originals</span>
                          <span className="profit-tag">100% Net Profit</span>
                        </div>

                        <div className="card-body">
                          Items availble on the store made and sold by us. We recieve all of the net profits from these items.
                        </div>

                        <div className="card-footer">

                          <div className="click-text">More</div>
                          <span className="click-icon">
                            <i className="fas fa-hand-point-up"></i>
                          </span>
                          <div className="click-text">Info</div>
                        
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="card clothing-card">

                        {/* <div className="card-title">Partnership Items</div> */}
                        <div className="card-title">
                          <span>Partnerships</span>
                          <span className="profit-tag">20% - 80% Net Profit</span>
                        </div>
                        
                        <div className="card-body">
                          Items available on the store that we sell in partnership with a brand or creator. Net profits of these items are split a percentage to benifit both parties. We plan to raise awareness and work with others to grow our platform with these items.
                        </div>
                        <div className="card-footer">

                          {/* Profit Breakdown */}
                          <div className="click-text">More</div>
                          <span className="click-icon">
                            <i className="fas fa-hand-point-up"></i>
                          </span>
                          <div className="click-text">Info</div>

                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="card clothing-card">

                        {/* <div className="card-title">Sponsered Goods</div> */}
                        <div className="card-title">
                          <span>Sponsered</span>
                          <span className="profit-tag">0% - 5% Net Profit</span>
                        </div>

                        <div className="card-body">
                          Using our platform we plan to help smaller chairties and orginaiztions by providing a platform for them to sell on. Online sales and hosting can get tricky so we hope to help others focus on thier mission for a small fee per sale.
                        </div>

                        <div className="card-footer">

                          <div className="click-text">More</div>
                          <span className="click-icon">
                            <i className="fas fa-hand-point-up"></i>
                          </span>
                          <div className="click-text">Info</div>
                          
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-md-6 mb-3">
                      <div className="card clothing-card">

                        {/* <div className="card-title">Sponsered Goods</div> */}
                        <div className="card-title">
                          <span>Submission</span>
                          <span className="profit-tag">50% Net Profit</span>
                        </div>

                        <div className="card-body">
                          Using our Submissions page users can submit clothing mock-ups once signed up for our site for others to vote on. More details provided in the next part of the Clothing section.
                        </div>

                        <div className="card-footer">

                          <div className="click-text">More</div>
                          <span className="click-icon">
                            <i className="fas fa-hand-point-up"></i>
                          </span>
                          <div className="click-text">Info</div>
                          
                        </div>
                      </div>
                    </div>

                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-submissions">Submissions</div>
                    <div className="sub-text">
                      <p>As you can see above, one type of product that appears on our store is a submission product. On the Submissions page users can submit shirt designs to be voted on by the community. At the end of every month we will take the design with the most votes and put it up on the store for people to buy. Every submission is subject to our approval and must meet the guidelines laid out on the submissions page.</p>
                    </div>
                  </div>
                </div>
  
                <div className="mission-section">
                  <h1>News</h1>

                  <div className="subwrap pt-2">
                    <div className="sub-title" id="title-synopsis">Synopsis</div>
                    <div className="sub-text">
                      <p>A huge majority of American publishing is owned by just 6 companies, all of which give politcal donations to our government. Take a look at the image below</p>

                      <img className="news-media-image mb-4" src="https://i.stack.imgur.com/lAT2b.jpg" height="400px" alt=""/>

                      <p>With current news providers falling out of touch with the average American and providing content not in the interest of the American people, it is time for something to be done. We are developing interactive source-based articles that make news less bias. Source based and trackable stories/issues are a great focus and a huge part of Articles.</p>

                      <p>Online news platforms are so dry with content and littered with ads today. With the help of clothing sales, we will build and maintain a new kind of news platform. A platform that is not biased and corporate focused. Timeline based news threads that users can subscribe to if they are interested and get notified on developments. <span className="d-none">New gun law bills, or Flint Michigan water progress? Many of these stories lose focus in the spotlight but users can keep the things they care most close to them.</span></p>

                      <div className="dream-quote">
                        <p>TODO/REMOVE B4 LAUNCH: This is by far my least favorite section to read and neads to be the most powerful section to read by launch, more info on whats wrong with the current news system and sources to go along with it.</p>
                        
                        <ul className="ml-4 d-none">
                          <li>Lack of Edward Snowden Information and the disrespect shown by media towards him</li>
                          <li>Lack of Hong Kong coverage and how China threatens our way of life</li>
                          <li>Examples of the press running to the goverment and all of a sudden not running stories</li>
                          <li>Lack of coverage about things like the Panama Papers, Jeffrey Epstein and literally every problem that exist, yet lets talk about sports and weather?</li>
                          <li>Lack of Hong Kong coverage and how China threatens our way of life</li>
                          <li>Lack of partnerships with growing creators way more talented then shmucks held up in a fancy NYC office writting dumb fucking news stories</li>
                          <li>Lack of pressure on goverment yet you pay the goverment for your interest?</li>
                        </ul>

                      </div>

                    </div>
                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-stories">Stories</div>
                    <div className="sub-text">
                      <p>Stories is the place where we put our more general news and current events. Stories are not subscribable but the tags associated with them are. You can bookmark a story for future reading but most stories that develop get switched to an issue.</p>
                    </div>
                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-issues">Issues</div>
                    <div className="sub-text">
                      <p>Issues are like stories except they can be subscribed to directly. Although Issues still have tags to be searched by, Issues are for events that receive updates to them. Think about ongoing issues like the Mueller Report and Flint Michigan Water Status which are both issues you can subscribe to today!</p>
                    </div>
                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-myths">Myths</div>
                    <div className="sub-text">
                      <p>Lastly, our final type of news content, Myths. Myths are where users can go to clear up confusion on common misconceptions. This area is home to questions like "Do electric car batteries pollute more than gasoline cars?" and "Do windmills actually cause cancer?". We provide sources and data on all the topics we cover here so users can leave educated and confident, not being fooled by rumors that travel the nation.</p>
                    </div>
                  </div>
                </div>
  
                <div className="mission-section">
                  <h1>Party</h1>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-reforms">Reforms</div>
                    <div className="sub-text">Articles has a strong underlying politcal aspect to it and we want that to be known. We want to keep our opinions clear as day throughout the news portions of our platform. The Reforms section is a place we talk about some of the changes we feel should happen in the politcal landscape of the country and the facts and details behind our conclusions. All are welcome to contribute and voice thier thoughts on the Reforms so we can shape it into what this country needs. We plan on sharing what parties, members of congress, senator's and political candidate's have said on the matter and thier stance here, as well as providing history to the issues at hand. Although we don't have a reform page for every issue page, think of reforms as our answer to the issues we have on the site.</div>
                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-town-hall">Town Hall</div>
                    <div className="sub-text">
                      <p>The Town Hall page is still a work in progress and if you took the time to read this far, thank you. We could use everyones help here, we want Articles to be by the people, for the people, so we are building out a section where users can voice thier concerns, provide input to the platform, vote on features, talk with others in thier community and with everyone at large. More details will come with time but we really wanted to get this idea out there and start taking suggestions. More details of this will be placed in the next version of our mission page in 2020.</p>
                      <hr/>
                      <p className="mb-0">Joey here, Feel free to message me from the <Link to={ROUTES.EMPLOYEES + '/42'}><span className="articles-inline-link noselect">here</span></Link> with suggestions.</p>
                      
                      </div>
                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-seat-tracker">Seat Tracker</div>
                    <div className="sub-text">Articles is a for-profit political orginization working to make America a better place for the people through avenues of clothing, news, politics and transparency.</div>
                  </div>
                </div>
  
                <div className="mission-section">
                  <h1>NTKB</h1>
                  <p>And we think everyone should know!</p>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-privacy">Privacy</div>
                    <div className="sub-text">
                      <p>Privacy is a big concern for us, and despite what other companies say your data is very valuable. We use your data to dictate the future of what stories we should write and the direction to take the platform. One thing we will never do at Articles is sell any of your data to another company or provide any information unless you specifically agree to it on a per piece basis. To see a full breakdown on all the data we have on you at any time and how it is used head to the Account page.</p>
                    </div>
                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-failure">Failure</div>
                    <div className="sub-text">
                      <p>Let's be honest, if everything fails there will be a lot of questions, instead of figuring that out then, we are trying to figure that out now. In the event of failure or lack of support and we have to pull the plug on everything all money left will be donated to a cause of our users choice. Start placing suggestions here. More info on this will come in the future. </p>
                    </div>
                  </div>
    
                  <div className="sub-wrap pt-2">
                    <div className="sub-title" id="title-payrole">Payrole</div>
                    <div className="sub-text">
                      <p>At this time no one at Articles is receiving any sort of pay until things pick up a little bit. This will not always be the case and we want people to know that from day one. All information on how much is being given to employees and statistics on that can be found at the Reports Page and the <Link to={ROUTES.EMPLOYEES + '/a'}><span className="articles-inline-link noselect">Employee Directory Page</span></Link>.</p>
                    </div>
                  </div>

                  <div className="mb-4" style={{height: '100px'}}></div>
    
                  {/* Repetetive? */}
                  <div className="sub-wrap pt-2 d-none">
                    <div className="sub-title">Employees</div>
                    <div className="sub-text">Articles is a for-profit political orginization working to make America a better place for the people through avenues of clothing, news, politics and transparency.</div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          <div className="col-lg-3">
          </div>

        </div>
      </div>
    </div>
  )
}

export default Wrapper;

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