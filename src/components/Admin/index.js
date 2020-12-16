import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { ScrollPercentage } from 'react-scroll-percentage'

// import { compose } from 'recompose';
// import { withAuthorization, withEmailVerification } from '../Session';
// import * as ROLES from '../../constants/roles';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import * as ROUTES from '../../constants/routes';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import News from './components/News/';
import Proposals from './components/Proposals';
import Products from './components/Products'
import Submissions from './components/Submissions'
import Donations from './components/Donations'
import Expenses from './components/Expenses'
import Sockets from './components/Socket'
import AWS from './components/Aws'
import Comments from './components/Comments'
import Reports from './components/Reports'
import Orders from './components/Orders'
import Ads from './components/Ads'
import Messages from './components/Messages'
import Projects from './components/Projects'
import Newsletter from './components/Newsletter'

const nav_links = [
  [ ROUTES.ADMIN_USERS, 'Users', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_NEWS, 'News', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_PRODUCTS, 'Products', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_SUBMISSIONS, 'Submissions', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_DONATIONS, 'Donations', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_EXPENSES, 'Expenses', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_DONATIONS, 'Donations', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_SOCKET, 'Sockets', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_REPORTS, 'Reports', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_ORDERS, 'Orders', <i className="fas fa-money-bill fa-3x"></i> ],
  [ ROUTES.ADMIN_ADS, 'Ads', <i className="fas fa-money-bill fa-3x"></i> ]
]
class Admin extends Component {
  constructor(props) {
    super(props);
    this.setLocation = this.setLocation.bind(this)
    this.scrollEvent = this.scrollEvent.bind(this)
    this.handleResize = this.handleResize.bind(this)
    this.tabBar = React.createRef();
  
    this.state = {
      tab: '',

      tabBarScrollPosition: 0,
      tabBarScrollWidth: 0,
      tabBarWidth: 0
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize)

    if (!this.props.user?.roles?.isAdmin === true) {
      this.props.history.push("/home");
    }

    this.tabBar.current.scrollLeft = 1;
    this.tabBar.current.scrollLeft = 0;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize() {
    this.scrollEvent( {target: this.tabBar.current} )
  }

  setLocation(tab) {
    this.setState({
      tab: tab
    })
  }

  activeTab(newTab) {
    localStorage.setItem( 'admin-portal-tab', newTab );

    this.setState({
      tab: newTab
    })
  }

  scrollEvent(e) {
    const self = this;
    const target = e.target;

    self.setState({
      tabBarScrollPosition: target.scrollLeft,
      tabBarWidth: target.offsetWidth,
      tabBarScrollWidth: target.scrollWidth
    });

    // console.log('Current scroll position:', target.scrollLeft);
    // console.log('Element width:', target.scrollWidth);
    // console.log('Current scroll elementWidth:', target.offsetWidth);

    // console.log(target);
  }

  render() {

    return (
      <div className="admin-container">

        <div className="tab-bar-wrapper">

          <div ref={this.tabBar} onScroll={this.scrollEvent} className="tab-bar">
  
            <div className="container-fluid">
  
              <Link to={ROUTES.ADMIN}><span className={"tab" + (this.state.tab === 'dashboard' ? ' active' : '')}>Dashboard</span></Link>
              <Link to={ROUTES.ADMIN_USERS}><span className={"tab" + (this.state.tab === 'users' ? ' active' : '')}>Users</span></Link>
              <Link to={ROUTES.ADMIN_NEWS}><span className={"tab" + (this.state.tab === 'news' ? ' active' : '')}>News</span></Link>
              <Link to={ROUTES.ADMIN_PROPOSALS}><span className={"tab" + (this.state.tab === 'proposals' ? ' active' : '')}>Proposals</span></Link>
              <Link to={ROUTES.ADMIN_PRODUCTS}><span className={"tab" + (this.state.tab === 'products' ? ' active' : '')}>Products</span></Link>
              <Link to={ROUTES.ADMIN_SUBMISSIONS}><span className={"tab" + (this.state.tab === 'submissions' ? ' active' : '')}>Submissions</span></Link>
              <Link to={ROUTES.ADMIN_DONATIONS}><span className={"tab" + (this.state.tab === 'donations' ? ' active' : '')}>Donations</span></Link>
              <Link to={ROUTES.ADMIN_EXPENSES}><span className={"tab" + (this.state.tab === 'expenses' ? ' active' : '')}>Expenses</span></Link>
              <Link to={ROUTES.ADMIN_SOCKET}><span className={"tab" + (this.state.tab === 'sockets' ? ' active' : '')}>Sockets</span></Link>
              <Link to={ROUTES.ADMIN_AWS}><span className={"tab" + (this.state.tab === 'aws' ? ' active' : '')}>Aws</span></Link>
              <Link to={ROUTES.ADMIN_COMMENTS}><span className={"tab" + (this.state.tab === 'comments' ? ' active' : '')}>Comments</span></Link>
              <Link to={ROUTES.ADMIN_REPORTS}><span className={"tab" + (this.state.tab === 'reports' ? ' active' : '')}>Reports</span></Link>
              <Link to={ROUTES.ADMIN_ORDERS}><span className={"tab" + (this.state.tab === 'orders' ? ' active' : '')}>Orders</span></Link>
              <Link to={ROUTES.ADMIN_ADS}><span className={"tab" + (this.state.tab === 'ads' ? ' active' : '')}>Ads</span></Link>
              <Link to={ROUTES.ADMIN_MESSAGES}><span className={"tab" + (this.state.tab === 'messages' ? ' active' : '')}>Messages</span></Link>
              <Link to={ROUTES.ADMIN_PROJECTS}><span className={"tab" + (this.state.tab === 'projects' ? ' active' : '')}>Projects</span></Link>
              <Link to={ROUTES.ADMIN_NEWSLETTER}><span className={"tab" + (this.state.tab === 'newsletter' ? ' active' : '')}>Newsletter</span></Link>
  
            </div>
          </div>

          <div className={"scroll-alert scroll-left-alert " + (this.state.tabBarScrollPosition > 80 && 'active')}>
            <i class="fas fa-caret-left mr-0"></i>
          </div>
          
          <div className={"scroll-alert scroll-right-alert " + (this.state.tabBarScrollPosition < (this.state.tabBarScrollWidth - this.state.tabBarWidth - 80) && 'active')}>
            <i class="fas fa-caret-right mr-0"></i>
          </div>

        </div>

        <div className="tab-content">

          <Switch>

            <Route exact path={ROUTES.ADMIN} render={() => <Dashboard 
              match={this.props.match} 
              tabLocation='dashboard' 
              setLocation={this.setLocation}
            ></Dashboard>}/>

            <Route exact path={ROUTES.ADMIN_USERS} render={() => <Users 
              match={this.props.match} 
              tabLocation='users' 
              setLocation={this.setLocation}
            ></Users>}/>

            <Route exact path={ROUTES.ADMIN_NEWS} render={() => <News 
              match={this.props.match} 
              tabLocation='news' 
              setLocation={this.setLocation}
            ></News> }/>

            <Route exact path={ROUTES.ADMIN_PROPOSALS} render={() => <Proposals 
              match={this.props.match} 
              tabLocation='proposals' 
              setLocation={this.setLocation}
            ></Proposals> }/>

            <Route path={ROUTES.ADMIN_NEWS_DETAILS} render={() => <News 
              match={this.props.match} 
              tabLocation='news' 
              setLocation={this.setLocation}
            ></News> }/>

            <Route path={ROUTES.ADMIN_PRODUCTS} render={() => <Products
              match={this.props.match}
              tabLocation='products'
              setLocation={this.setLocation}
            ></Products> }/>

            <Route path={ROUTES.ADMIN_SUBMISSIONS} render={() => <Submissions
              match={this.props.match}
              tabLocation='submissions'
              setLocation={this.setLocation}
            ></Submissions> }/>

            <Route exact path={ROUTES.ADMIN_DONATIONS} render={() => <Donations 
              match={this.props.match}
              tabLocation='donations'
              setLocation={this.setLocation}
              ></Donations>
            }/>

            <Route exact path={ROUTES.ADMIN_EXPENSES} render={() => <Expenses 
              match={this.props.match}
              tabLocation='expenses'
              setLocation={this.setLocation}
            ></Expenses> 
            }/>

            <Route exact path={ROUTES.ADMIN_SOCKET} render={() => <Sockets 
              match={this.props.match}
              tabLocation='sockets'
              setLocation={this.setLocation}
            ></Sockets> 
            }/>

            <Route exact path={ROUTES.ADMIN_AWS} render={() => <AWS 
              match={this.props.match}
              tabLocation='aws'
              setLocation={this.setLocation}
            ></AWS> 
            }/>

            <Route exact path={ROUTES.ADMIN_COMMENTS} render={() => <Comments 
              match={this.props.match}
              tabLocation='comments'
              setLocation={this.setLocation}
            ></Comments> 
            }/>

            <Route exact path={ROUTES.ADMIN_REPORTS} render={() => <Reports 
              match={this.props.match}
              tabLocation='reports'
              setLocation={this.setLocation}
            ></Reports> 
            }/>

            <Route exact path={ROUTES.ADMIN_ORDERS} render={() => <Orders 
              match={this.props.match}
              tabLocation='orders'
              setLocation={this.setLocation}
            ></Orders> 
            }/>

            <Route exact path={ROUTES.ADMIN_ADS} render={() => <Ads 
              match={this.props.match}
              tabLocation='ads'
              setLocation={this.setLocation}
            ></Ads> 
            }/>

            <Route exact path={ROUTES.ADMIN_MESSAGES} render={() => <Messages 
              match={this.props.match}
              tabLocation='messages'
              setLocation={this.setLocation}
            /> 
            }/>

            <Route exact path={ROUTES.ADMIN_PROJECTS} render={() => <Projects 
              match={this.props.match}
              tabLocation='projects'
              setLocation={this.setLocation}
            /> 
            }/>

            <Route exact path={ROUTES.ADMIN_NEWSLETTER} render={() => <Newsletter 
              match={this.props.match}
              tabLocation='newsletter'
              setLocation={this.setLocation}
            /> 
            }/>

          </Switch>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user_details,
});

export default connect(
  mapStateToProps,
)(Admin);