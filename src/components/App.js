import React, {Component, useEffect} from 'react';
import { Helmet } from "react-helmet";

import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import PrivateRoute from "./private-route/PrivateRoute";

import Navigation from './Navigation';
import Footer from './Navigation/Footer'

import LandingPage from './Landing';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';

import OutsetPage from './Outset';
import SettingsPage from './Settings';

import HomePage from './Home';
import HomePageOld from './Home/components/HomePageThree'

import MissionPage from './Mission';
import ReportsPage from './Reports';
import ReportsCharts from './Reports';
import ReportsManagePage from './Reports/Manage';

import StorePage from './Store'
import StoreCheckoutPage from './Store/Checkout'

import OrdersPage from './Store/Orders'
import SingleOrderPage from './Store/Orders/single'

import StoreSubmissionsPage from './Store/Submissions'
import StoreSubmissionsSubmitPage from './Store/Submissions'
import StoreManage from './Store/Manage'

import NewsPage from './News'
import NewsManagePage from './News/Manage'

import IssuesPage from './News/Issues'
import IssuePage from './News/Issues/single.js'
import MythsPage from './News/Myths'
import MythPage from './News/Myths/single.js'
import StoriesPage from './News/Stories'
import StoryPage from './News/Stories/single.js'


import PartyPage from './Party'
import PartyProposalsPage from './Party/Proposals'
import TownHallPage from './Party/TownHall'

import MeshPage from './Mesh'



import SupportPage from './Support'
import Privacy from './Support/Privacy'
import UpdatesPage from './Support/Updates'
import JobsPage from './Support/Jobs'
import PressPage from './Support/Press'
import TranslationsPage from './Support/Translations'

import EmployeePage from './Employees'
import EmployeePageDetails from './Employees/Directory'

import AccountPage from './Account';
import PasswordForgetPage from './PasswordForget';

import MailPage from './Mail';

import AdminPage from './Admin';
import DonatePage from './Donate';

import PlaygroundPage from './Playground';
import Chat from './Chat';

import NotFoundPage from './Navigation/NotFoundPage';

import * as ROUTES from '../constants/routes';
// import { withAuthentication } from './Session';

// import { AuthUserContext } from './Session';

import { connect } from "react-redux";
import { setUserDetails } from "../actions/authActions";

function ScrollToTop() {
  const { pathname } = useLocation();
  const parts = pathname.split('/');

  useEffect(() => {
    if (parts[1] === 'admin' || parts[1] === 'news') {
      // Was a page where router changes within like admin lookups
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'test',
      width: 0,
      sideMenuFixedMinWidth: 992,
      canBeFixed: true
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {

    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    if (this.props.auth.isAuthenticated) {
      this.props.setUserDetails(this.props.auth.user.id);
    } 
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });

    if (window.innerWidth < this.state.sideMenuFixedMinWidth) {
      this.setState({
        canBeFixed: false
      })
    } else {
      this.setState({
        canBeFixed: true
      })
    }
    
  }

  render(props) {
    return (
      <Router onUpdate={() => window.scrollTo(0, 0)}>

        {/* Fallback if page does not have a Helemet element inside it */}
        <Helmet>
          <title>Articles</title>
        </Helmet>

        <ScrollToTop />

        <div className={'site-wrap ' + (this.props.site?.sideMenuFixed && this.state.canBeFixed ? 'fixed' : '')}>

          <Navigation />

          <div className={'content-wrap' + (this.props.site?.sideMenuFixed && this.state.canBeFixed ? ' fixed' : '') + (this.props.site?.colorModeDark ? ' dark-mode' : '')}>

            <Switch>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
        
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
  
              <Route path={ROUTES.OUTSET} component={OutsetPage} />
  
              <PrivateRoute path={ROUTES.SETTINGS} component={SettingsPage} />
              
              <Route exact path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.HOME_OLD} component={HomePageOld} />
  
              <Route path={ROUTES.MISSION} component={MissionPage} />
              <Route path={ROUTES.REPORTS} component={ReportsPage} exact={true}/>
              <Route path={ROUTES.REPORTS_CHARTS} component={ReportsPage} exact={true}/>
              <Route path={ROUTES.REPORTS_REPORT} component={ReportsPage} exact={true}/>
              <Route path={ROUTES.REPORTS_MANAGE} component={ReportsManagePage} />
        
              <Route exact path={ROUTES.STORE} component={StorePage} />
              <Route exact path={ROUTES.STORE_VIEW} component={StorePage} />
              <Route path={ROUTES.CHECKOUT} component={StoreCheckoutPage} />
  
              <Route exact path={ROUTES.STORE_ORDERS} component={OrdersPage}/>
              <Route path={ROUTES.STORE_ORDERS_DETAILS} component={SingleOrderPage}/>
  
              <Route path={ROUTES.STORE_SUBMISSIONS} component={StoreSubmissionsPage} />
              <Route path={ROUTES.STORE_SUBMISSIONS_SUBMIT} component={StoreSubmissionsSubmitPage}/>
  
              <Route path={ROUTES.STORE_MANAGE} component={StoreManage} />
        
              <Route exact path={ROUTES.NEWS} component={NewsPage} />
  
              {/* <Route path={ROUTES.STORIES} component={StoriesPage} exact={true}/> */}
              <Route path={ROUTES.STORIES} component={NewsPage} exact={true}/>
              <Route path={ROUTES.STORY} component={StoryPage}/>
              {/* <Route path={ROUTES.ISSUES} component={IssuesPage} exact={true}/> */}
              <Route path={ROUTES.ISSUES} component={NewsPage} exact={true}/>
              <Route path={ROUTES.ISSUE} component={IssuePage}/>
              {/* <Route path={ROUTES.MYTHS} component={MythsPage} exact={true}/> */}
              <Route path={ROUTES.MYTHS} component={NewsPage} exact={true}/>
              <Route path={ROUTES.MYTH} component={MythPage}/>
              
              <Route exact path={ROUTES.MANAGE} component={NewsManagePage} />
              <Route path={ROUTES.MANAGE_DETAILS} component={NewsManagePage} />
  
              <Route path={ROUTES.TOWN_HALL} component={TownHallPage} />
        
              <Route exact path={ROUTES.PARTY} component={PartyPage} />
              <Route path={ROUTES.PROPOSALS} component={PartyProposalsPage} />
              
              <Route path={ROUTES.MESH} component={MeshPage} />
        
              <Route exact path={ROUTES.SUPPORT} component={SupportPage} />
              <Route exact path={ROUTES.UPDATES} component={UpdatesPage} />
              <Route path={ROUTES.JOBS} component={JobsPage} />
              <Route path={ROUTES.PRESS} component={PressPage} />
              <Route path={ROUTES.TRANSLATIONS} component={TranslationsPage} />
        
              <Route path={ROUTES.EMPLOYEES} component={EmployeePage} exact={true}/>
              <Route path={ROUTES.EMPLOYEES_DETAILS} component={EmployeePageDetails} />
        
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              
              <Route path={ROUTES.PRIVACY} component={Privacy} />

              <Route exact path={ROUTES.ADMIN_USERS} component={AdminPage} />
              <Route path={ROUTES.ADMIN_USER_DETAILS} component={AdminPage} />

              <Route exact path={ROUTES.ADMIN_NEWS} component={AdminPage} />
              <Route path={ROUTES.ADMIN_NEWS_DETAILS} component={AdminPage} />

              <Route exact path={ROUTES.ADMIN_PRODUCTS} component={AdminPage} />
              <Route path={ROUTES.ADMIN_PRODUCT_DETAILS} component={AdminPage} />

              <Route exact path={ROUTES.ADMIN_SUBMISSIONS} component={AdminPage} />
              <Route path={ROUTES.ADMIN_SUBMISSION_DETAILS} component={AdminPage} />

              <Route exact path={ROUTES.ADMIN_DONATIONS} component={AdminPage} />
              <Route exact path={ROUTES.ADMIN_EXPENSES} component={AdminPage} />
              <Route exact path={ROUTES.ADMIN_SOCKET} component={AdminPage} />

              <Route path={ROUTES.DONATE} component={DonatePage} />
  
              <Route path={ROUTES.MAIL} component={MailPage} />
              <Route path={ROUTES.MESH} component={MeshPage} />
              <Route path={ROUTES.PLAYGROUND} component={PlaygroundPage} />
              <Route path={ROUTES.CHAT} component={Chat} />
  
              <Route component={NotFoundPage} />
            </Switch>

            <Footer />
          </div>

        </div>
        
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  site: state.site
});

export default connect(
  mapStateToProps,
  { setUserDetails }
)(App);