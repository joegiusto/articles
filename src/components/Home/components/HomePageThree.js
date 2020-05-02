import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
import Modal from 'react-modal';
import { connect } from "react-redux";

import HeroVideo from '../../../assets/img/cover.mp4';
import NoMatchCard from "./NoMatchCard"
import Dropdown from 'react-bootstrap/Dropdown';
import * as ROUTES from '../../../constants/routes';
const customStyles = {
  content : {
    top          : null,
    left         : '50%',
    right        : 'auto',
    bottom       : 'auto',
    marginRight  : '-50%',
    transform    : 'translate(-50%, -50%)',
    border       : 'initial',
    borderRadius : 'initial',
    width        : '95vw',
    minHeight    : '70vh',
    overflow     : 'initial'
  }
};

class HomePageThree extends React.Component {
  constructor(props) {
    super(props);

      this.state = {

        // What tab the user is viewing: 'stories', 'issues', 'myths', 'orders', 'submissions', 'outset'
        activeTab: sessionStorage.getItem( 'activeTab' ) || 'stories',

        // For detecting if tabs should show when further down the page
        scroll: 0,

        // Can be 'user' or 'all'
        filter: localStorage.getItem( 'filter' ) || 'user',

        // Can be 'card' or 'list'
        view: localStorage.getItem( 'view' ) || 'card',

        // Side bar expansion states
        visibleChat: false,
        visibleNewsletter: false,

        // Users issues and fetched data related to it
        issues: [],
        matchedIssues: [],
        stories: [],
        matchedStories: [],
        myths: [],
        matchedMyths: [],
        orders: [],
        submissions: [],
        modalOpen: false

      };

     this.closeModal = this.closeModal.bind(this);
     this.removeUserSub = this.removeUserSub.bind(this);
  }

	componentDidMount() {
    if (this.props?.auth?.isAuthenticated !== true) {

      console.log("Was not auth");
      this.props.history.push('/signin');

    }

		window.addEventListener('scroll', this.listenToScroll);
  }
  
  componentWillUnmount() {
		window.removeEventListener('scroll', this.listenToScroll);
	}

  listenToScroll = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop

		this.setState({
			scroll: winScroll
		})
  }

	renderActiveTab(tab) {
		switch(tab) {
		  case 'stories':
			 return [
				<i className='fas fa-newspaper'></i>,
				"Stories", 
				"",
				"http://newsimg.bbc.co.uk/media/images/44712000/jpg/_44712249_paperboy466getty.jpg",   
				<div className="subscriptions issues-display">

          {this.props.stories.loading ?
          'loading'
          :
          this.props.stories.stories.length > 0 ? 
            this.props.stories.stories.map((thing => (
              <div className="issue">
                <div className="date">{moment(thing.news_date).format("LL")}</div>
                <div className="updates">0 Updates</div>
                <div className="title">{thing.news_title}</div>
                <Link to={ROUTES.STORIES + '/' + thing._id}><div className="view-button btn btn-articles-light">View</div></Link>
              </div>
              // <SubscriptionCard get={this.props.get} sub={this.props.sub} object={thing}/> 
            )))
            :
            <NoMatchCard type="stories"/>
          }

				</div>

			 ]
		  case 'issues':
			 return [
				<i className='fas fa-person-booth'></i>,
				"Issues", 
				"",
				"https://149366112.v2.pressablecdn.com/wp-content/uploads/2014/03/How-Big-Oil-Harms-Animals.jpg",
				<div className="subscriptions issues-display">
          
          {this.props.user.subscriptionsFetched.length > 0 ? 
            this.props.user.subscriptionsFetched.map((thing => (
              <div className="issue">
                <div className="date">{moment(thing.news_date).format("LL")}</div>
                <div className="updates">0 Updates</div>
                <div className="title">{thing.news_title}</div>
                <Link to={ROUTES.ISSUES + '/' + thing._id}><div className="view-button btn btn-articles-light">View</div></Link>
              </div>
              // <SubscriptionCard get={this.props.get} sub={this.props.sub} object={thing}/> 
            )))
            :
            <NoMatchCard type="issues"/>
          }

				</div>
			 ]
		  case 'myths':
			 return [
				<i className="fas fa-ghost"></i>,
				"Myths",
				"",
				"https://specials-images.forbesimg.com/imageserve/5dd5bb37ea103f000652ec3f/960x0.jpg?fit=scale",
				<div className="subscriptions issues-display">

          {this.props.myths.myths.length > 0 ? 
            this.props.myths.myths.map((myth => (
              <div className="issue">
                <div className="date">{moment(myth.news_date).format("LL")}</div>
                <div className="updates">0 Updates</div>
                <div className="title">{myth.news_title}</div>
                <Link to={ROUTES.MYTHS + '/' + myth._id}><div className="view-button btn btn-articles-light">View</div></Link>
              </div>
              // <SubscriptionCard get={this.props.get} sub={this.props.sub} object={thing}/> 
            )))
            :
            <NoMatchCard type="myths"/>
          }

				</div>
			 ]
		  case 'orders':
			 return [
				<i className={"fas fa-shopping-cart"}></i>,
				"Orders",
				"",
        "https://www.packsize.com/wp-content/uploads/2015/05/white-paper-05a.jpg",
        <div className="orders-display">
          {this.props.myths.myths.length > 0 ?
          this.props.auth.user_details.ordersFetched.map(order => (
            <div className="order">
              <Link to={ROUTES.STORE_ORDERS + '/' + order._id}><h1>{order.order_title}</h1></Link>
              <div>{moment.unix(order.order_date).format("LLL")}</div>
              <div>${order.order_total}</div>
            </div>
          ))
          :
          <NoMatchCard type="Orders"/>
          }
        </div>
			 ]
		  case 'submissions':
			 return [
				<i className={"fas fa-lightbulb"}></i>,
				"Submissions",
				"",
        "data:image/jpeg;base64,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",
        <div className="submissions-display">
          {this.props.auth.user_details?.submissionsFetched?.length > 0 ?
          this.props.auth.user_details.submissionsFetched?.map(order => (
            <div className="submission">
              <Link to={ROUTES.STORE_SUBMISSIONS + '/' + order._id}><h1>{order.title}</h1></Link>
              {/* <div>{moment.unix(order.order_date).format("LLL")}</div> */}
              {/* <div>${order.order_total}</div> */}
            </div>
          ))
          :
          <NoMatchCard type="submissions"/>
          }
        </div>

        // <div className="submissions-empty">
        //   <div className="alert alert-info">No Submissions for the current period, to create a submisison click here, to view previous submissions click here.</div>
        // </div>
       ]
       
		  case 'outset':
			 return [
				<i className={"fas fa-horse"}></i>,
				"Outset",
				"",
        "https://cdn.britannica.com/64/152164-050-BDE65ADA/Paul-Revere-Boston-British-residents-April-18-1775.jpg",
        <div className="outset-empty">
          <div className="alert alert-info">No Outset updates to go over</div>
        </div>
			 ]
		  default:
			 return('');
		}
	}

	setActiveTabHijack(tab) {
		document.body.scrollTop = 500; // For Safari
		document.documentElement.scrollTop = 500; // For Chrome, Firefox, IE and Opera

		this.setState({
			activeTab: tab
    })
    
    sessionStorage.setItem( 'activeTab', tab );

		// setActiveTab(tab);
		// var myElement = document.getElementsByClassName('icons');
		// var topPos = myElement.offsetTop;
		// myElement.scrollLeft(0);
		// myElement.scrollBy(-1000, 0);
	}

	renderNewHomeBar() {
		return (
		<div className="new-home-bar">
			<div className="icons dual-header">

				<span className="right-group d-flex">
				  <span onClick={() => this.openModal()} className="tab-button noselect my-auto"><i className="fas fa-play"></i>Sequence <span className="badge badge-dark">Beta</span></span>
				</span>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}

          // TODO Remove this and figure out screenreader error 
          // ariaHideApp={false}

          style={customStyles}
      >
          <button className="close-modal" onClick={this.closeModal}>X</button>

          <h2>
            Sequence
          </h2>
          
          <div>
            <div>Use Sequence to get all your news in a more consolidated matter with the option of redirecting at the end to get back to your dailey activites. Sequence is in alpha right now so bugs are expected.</div>
            <input type="text"/>
          </div>

        </Modal>

				<span className="left-group">
				<span onClick={() => this.setActiveTabHijack('stories')} className={"tab-selection " + (this.state.activeTab === 'stories' ? ' active' : '')}><i className={"fas fa-newspaper"}></i><div className="tab-name d-none d-md-block">Stories</div></span>
				<span onClick={() => this.setActiveTabHijack('issues')} className={"tab-selection " + (this.state.activeTab === 'issues' ? ' active' : '')}><i className={"fas fa-person-booth"}></i><div className="tab-name d-none d-md-block">Issues</div></span>
				<span onClick={() => this.setActiveTabHijack('myths')} className={"tab-selection " + (this.state.activeTab === 'myths' ? ' active' : '')}><i className={"fas fa-ghost"}></i><div className="tab-name d-none d-md-block">Myths</div></span>
				<span onClick={() => this.setActiveTabHijack('orders')} className={"tab-selection " + (this.state.activeTab === 'orders' ? ' active' : '')}><i className={"fas fa-shopping-cart"}></i><div className="tab-name d-none d-md-block">Orders</div></span>
				<span onClick={() => this.setActiveTabHijack('submissions')} className={"tab-selection " + (this.state.activeTab === 'submissions' ? ' active' : '')}><i className={"fas fa-lightbulb"}></i><div className="tab-name d-none d-md-block">Submissions</div></span>
				{/* <span onClick={() => this.setActiveTabHijack('outset')} className={"tab-selection " + (this.state.activeTab === 'outset' ? ' active' : '')}><i className={"fas fa-horse"}></i><div className="tab-name d-none d-md-block">Outset</div></span> */}
				</span>
				
			</div>
		</div>
		)
  }
  
  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  removeUserSub = (uid) => {
    // Remove from users firebase list
    console.log("test")

    // When promise returns we remove it from the matched state
    this.setState({
      matchedIssues: this.state.matchedIssues.filter((obj) => {
        return obj.uid !== uid
      })
    })

  }

  setFilter = (newFilter) => {
    localStorage.setItem( 'filter', newFilter );

    this.setState({
      filter: newFilter
    })
  }

  setView = (newView) => {
    localStorage.setItem( 'view', newView );
    
    this.setState({
      view: newView
    })
  }

	render () {
    const {activeTab, scroll, visibleChat, visibleNewsletter} = this.state;
		
		return (
      <div className="home-page-three-page">
        <div className={"new-home-mobile-bar " + (scroll > 570 ? 'visible' : '')}>
        {this.renderNewHomeBar()}
        </div>

        <div className="new-home-background">
          <video poster="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/polina.jpg" id="bgvid" playsInline autoPlay muted loop>
            <source src={HeroVideo} type="video/webm"/>
            <source src="http://thenewcode.com/assets/videos/polina.mp4" type="video/mp4"/>
          </video>
        </div>

        <div className="new-home">
          <div className="container-fluid">
            
            <div className="new-home-text">
              <h1>Welcome {this.props.auth?.user_details?.user?.first_name
              }, here's a glance at what's happening.</h1>
              {/* <p>Heres a glance at what's happening.</p> */}

            <div>
              <div className="sequence d-none">

                <div className="header"></div>
                
                <div className="dual-header">
                  <div className="play">
                  <i className="fas fa-play"></i>
                  {/* <div className="text"></div> */}
                  </div>
        
                  <div className="slogan">
                  <div>Try Sequence (Beta)</div>
                  </div>
                </div>

                <div className="footer">
                  Reduced screen time reader for cathing up!
                </div>
      
              </div>
            </div>

            </div>

            <div className="entire-panel">

              <div className="row">
                <div className="col-12 col-md-9 pr-md-2">
                  <div className="new-home-main">

                    {this.renderNewHomeBar()}

                    <div className="new-home-content">
                      
                      <div className={"top " + this.renderActiveTab(activeTab)[1]}>

                          <div className="row">
                          <div className="col-12 col-lg-8 col-xl-6">
              
                            <div className="left">
                              <h1>
                              {/* <i className={"fas fa-newspaper"}></i> */}
                              {this.renderActiveTab(activeTab)[0]}
                              {/* Stories */}
                              {this.renderActiveTab(activeTab)[1]}
                              </h1>
                
                              <div className="description">{this.renderActiveTab(activeTab)[2]}</div>
                
                              <div className="options">

                              <Dropdown className="d-inline-block" drop={"down"}>

                                <Dropdown.Toggle style={{textTransform: 'capitalize'}} className="btn btn-articles-light" id="dropdown-custom-1">{this.state.filter === 'user' ? <span><i className="fas fa-user"></i>{this.state.filter}</span> : <span><i className="fas fa-flag-usa"></i>{this.state.filter}</span>} {this.renderActiveTab(activeTab)[1]}</Dropdown.Toggle>

                                <Dropdown.Menu alignRight className="dropdown-custom pull-right noselect">
                                  <Dropdown.Item onClick={() => this.setFilter('user')} eventKey="1"><i className="fas fa-user"></i>User {this.renderActiveTab(activeTab)[1]}</Dropdown.Item>
                                  <Dropdown.Item onClick={() => this.setFilter('all')} eventKey="2"><i className="fas fa-flag-usa"></i>All {this.renderActiveTab(activeTab)[1]}</Dropdown.Item>
                                  {/* <Dropdown.Item eventKey="3">{}</Dropdown.Item> */}
                                  {/* <Dropdown.Item eventKey="3">
                                  Active Item
                                  </Dropdown.Item>
                                  <Dropdown.Divider />
                                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
                                </Dropdown.Menu>

                              </Dropdown>

                              <Dropdown className="d-inline-block ml-1" drop={"down"}>

                                <Dropdown.Toggle style={{textTransform: 'capitalize'}} className="btn btn-articles-light" id="dropdown-custom-1">{this.state.view === 'card' ? <span><i className="fas fa-th-large"></i>Card View</span> : <span><i className="fas fa-list"></i>List View</span>}</Dropdown.Toggle>

                                <Dropdown.Menu alignRight className="dropdown-custom pull-right noselect">
                                  <Dropdown.Item onClick={() => this.setView('card')} eventKey="1"><i className="fas fa-th-large"></i>Card View</Dropdown.Item>
                                  <Dropdown.Item onClick={() => this.setView('list')} eventKey="2"><i className="fas fa-list"></i>List View</Dropdown.Item>
                                  {/* <Dropdown.Item eventKey="3">{}</Dropdown.Item> */}
                                  {/* <Dropdown.Item eventKey="3">
                                  Active Item
                                  </Dropdown.Item>
                                  <Dropdown.Divider />
                                  <Dropdown.Item eventKey="4">Separated link</Dropdown.Item> */}
                                </Dropdown.Menu>

                              </Dropdown>

                              {/* <button className="btn btn-articles-light ml-1">Manage</button> */}
                              {/* <button className="btn btn-articles-light ml-1" onClick={() => setGet('all')}>View All</button> */}
                              {/* <button className="btn btn-articles-light ml-1" onClick={() => setGet('user')}>View User</button> */}
                              </div>
            
                            </div>
              
                          </div>
                
                          <div className="col-12 col-lg-4 col-xl-6">
                            <div className="right"><img src={this.renderActiveTab(activeTab)[3]} alt=""/></div>
                          </div>
                          </div>

                      </div>

                      <div className="subscriptions-container">
                        <div className="section-title mb-4 d-none">{this.renderActiveTab(activeTab)[1]}</div>

                        {this.renderActiveTab(activeTab)[4]}

                      </div>
                    
                    </div>
                  
                  </div>
                </div>
        
                <div className="col-12 col-md-3 pl-md-2 mt-3 mt-md-0">
                  <div className="new-home-side">

                    <div className="section">
                    <div className="profile">
                      <div className="photo"></div>
                      <div className="name">Joey Giusto</div>
                    </div>
                    <div className="member-status">Member Since June 2019</div>
                    </div>

                    <div className="section">

                      <div className={"will-expand " + (visibleChat ? 'expanded' : '')}>

                        <div className={"top p-1 " + (visibleChat ? 'active' : '')} onClick={() => {this.setState({visibleChat: !visibleChat})}}>
                          <div className="ml-1">Chat</div>
                          <div><i className={"far fa-arrow-alt-circle-down " + (visibleChat ? 'fa-rotate-180' : '')}></i></div>
                        </div>

                        <div className="chat-wrapper mt-2">
                          <div className="text-muted">Will be removed in release</div>
                          
                          <div>Messages was for Firebase, has to be redone. Put component here.</div>

                        </div>

                      </div>
                    
                    </div>

                    <div className="section">

                      <div className={"will-expand " + (visibleNewsletter ? 'expanded' : '')}>

                        <div className="top p-1" onClick={() => {this.setState({visibleNewsletter: !visibleNewsletter})}}>
                          <div className="ml-1">Newsletter</div>
                          <div><i className="far fa-arrow-alt-circle-down"></i></div>
                        </div>

                        <div>Newslettter was for Firebase, has to be redone. Put component here.</div>

                      </div>

                    </div>

                    <div className="section">
                    <div>Quick Links</div>
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
		)
		
	}
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user_details,
  stories: state.stories,
  myths: state.myths,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  // { logoutUser, setUserDetails }
)(HomePageThree);