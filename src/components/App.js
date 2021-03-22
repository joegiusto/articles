import React, {Component, useEffect, Fragment} from 'react';
import { Helmet } from "react-helmet";

import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import PrivateRoute from "./private-route/PrivateRoute";

import Navigation from './Navigation';
import Footer from './Navigation/Footer'

import LandingPage from './Landing';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import VerifyEmailPage from './VerifyEmail'

import OutsetPage from './Outset';
import SettingsPage from './Settings';

import HomePage from './Home';
import HomePageOld from './Home/components/HomePageThree'

import MissionPage from './Mission';
import TransparencyPage from './Transparency';

import StorePage from './Store'
import StoreCheckoutPage from './Store/Checkout'

import OrdersPage from './Store/Orders'
import SingleOrderPage from './Store/Orders/single'

import StoreSubmissionsPage from './Store/Submissions'
import StoreSubmissionsSubmitPage from './Store/Submissions'
// import StoreManage from './Store/Manage'

import NewsPage from './News'
// Moved to Admin
// import NewsManagePage from './News/Manage'
import ExtendedPage from './News/Extended/single.js'

import IssuesPage from './News/Issues'
import IssuePage from './News/Issues/single.js'
import MythsPage from './News/Myths'
import MythPage from './News/Myths/single.js'
import StoriesPage from './News/Stories'
import StoryPage from './News/Stories/single.js'
import ResourcesPage from './News/Resources'
import PresidentsPage from './News/Resources/Presidents'
import CoronavirusPage from './News/Resources/Coronavirus'
import PoliticiansPage from './News/Resources/Politicians'
import PoliticiansHousePage from './News/Resources/Politicians/house'
import PoliticiansSenatePage from './News/Resources/Politicians/senate'

import PartyPage from './Party'
import PartyProposalsPage from './Party/Proposals'
import ProposalSingle from './Party/Proposals/Single'
import TownHallPage from './Party/TownHall'

import AdvertisingPage from './Advertising';
import AdvertisingAccessPage from './Advertising/access';
import AdvertisingManagePage from './Advertising/manage';

import MeshPage from './Mesh'

import SupportPage from './Support'
import FaqPage from './Support/FAQ'
import Privacy from './Support/Privacy'

import UpdatesPage from './Support/Updates'
import UpdatePage from './Support/Updates/single'

import JobsPage from './Support/Jobs'
import PressPage from './Support/Press'
import TranslationsPage from './Support/Translations'
import RoadmapPage from './Support/Roadmap'
import ForumPage from './Support/Forum'
import BetaPage from './Support/Beta'
import OpenSourcePage from './Support/OpenSource'

// import EmployeePage from './Employees'
// import EmployeePageDetails from './Employees/Directory'

// import AccountPage from './Account';
import PasswordForgetPage from './PasswordForget';

import MessagesPage from './Messages';

import AdminPage from './Admin';

import DonatePage from './Donate';

import SubscribePage from './Subscribe'

import PlaygroundPage from './Playground';
// import Chat from './Chat';

import NotFoundPage from './Navigation/NotFoundPage';

import * as ROUTES from '../constants/routes';

import { connect } from "react-redux";
import { setUserDetails } from "../actions/authActions";
import { pendingPWAUpdate, setPWAUpdate } from "../actions/siteActions";

import io from 'socket.io-client'
import SocketContext from "../utils/socket_context/context";

const ENDPOINT = "/";
const socket = io(ENDPOINT);

function ScrollToTopBase({ history, children }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    }
  }, []);

  return <Fragment>{children}</Fragment>;
}

function SwUpdateHandlerBase({ history, children, pendingPWAUpdate }) {
    useEffect(() => {
        const unlisten = history.listen(() => {
            if (window.swUpdateReady) {
                console.log("Update was detected");
                pendingPWAUpdate();
                //   window.swUpdateReady = false;
                //   window.stop();
                //   window.location.reload();
            }
        });
        return () => {
            unlisten();
        }
    }, []);
  
    return <Fragment>{children}</Fragment>;
  }

const ScrollToTop = withRouter(ScrollToTopBase)
const SwUpdateHandler = withRouter(SwUpdateHandlerBase)

class AppBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
        test: 'test',
        width: 0,
        sideMenuFixedMinWidth: 992,
        canBeFixed: true,
        askAboutDarkModeOpen: false
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {

    this.updateWindowDimensions();

    // this.props.setPWAUpdate(true);

    window.addEventListener('resize', this.updateWindowDimensions);

    if (this.props.auth.isAuthenticated) {
      this.props.setUserDetails(this.props.auth.user.id);
    }

    if ( window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
      console.log("User prefers dark mode");
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
            <Router>

                {/* Fallback if page does not have a Helemet element inside it */}
                <Helmet>
                    <title>Articles</title>
                </Helmet>

                <SwUpdateHandler pendingPWAUpdate={this.props.pendingPWAUpdate} setPWAUpdate={this.props.setPWAUpdate}>

                    <ScrollToTop>

                    <SocketContext.Provider value={socket}>

                        <div className={'site-wrap ' + (this.props.site?.sideMenuFixed && this.state.canBeFixed ? 'fixed' : '')}>

                        {/* Future Banner */}

                        {this.props.site.pendingPWAUpdate && 
                            <div className="notification-area">
                                <div className="pwa-message notification show">

                                    <div className="pwa-message-background"></div>

                                    <div className="pwa-message-content">
                                        <div className="icon"><i className="fas fa-download mr-0"></i></div>

                                        <div>A new version of Articles is available</div>
            
                                        <button onClick={() => this.props.setPWAUpdate(false)} className="btn btn-articles-light btn-sm ml-0 ml-md-2">
                                            Update
                                        </button>
                                    </div>

                                </div>
                            </div>
                        }

                        <Navigation />

                        <div className={'content-wrap' + (this.props.site?.sideMenuFixed && this.state.canBeFixed ? ' fixed' : '') + (this.props.site?.colorModeDark ? ' dark-mode' : '')}>

                            <SwUpdateHandler/>

                            <Switch>
                                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                            
                                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                                
                                <Route path={ROUTES.VERIFY_EMAIL} component={VerifyEmailPage} />
                    
                                <Route path={ROUTES.OUTSET} component={OutsetPage} />
                    
                                <PrivateRoute path={ROUTES.SETTINGS_ACCOUNT} component={SettingsPage} />
                                <PrivateRoute path={ROUTES.SETTINGS_MEMBERSHIP} component={SettingsPage} />
                                <PrivateRoute path={ROUTES.SETTINGS_NEWSLETTER} component={SettingsPage} />
                                <PrivateRoute path={ROUTES.SETTINGS_CONNECTIONS} component={SettingsPage} />
                                <PrivateRoute path={ROUTES.SETTINGS_BILLING} component={SettingsPage} />
                                <PrivateRoute path={ROUTES.SETTINGS_EMPLOYEE} component={SettingsPage} />
                                
                                <Route exact path={ROUTES.HOME} component={HomePage} />
                                <Route path={ROUTES.HOME_OLD} component={HomePageOld} />
                    
                                <Route path={ROUTES.MISSION} component={MissionPage} />

                                {/* Transparency */}
                                <Route path={ROUTES.TRANSPARENCY} component={TransparencyPage} exact={true}/>
                                <Route path={ROUTES.TRANSPARENCY_REPORTS} component={TransparencyPage} exact={true}/>
                                <Route path={ROUTES.TRANSPARENCY_CHARTS} component={TransparencyPage} exact={true}/>
                                <Route path={ROUTES.TRANSPARENCY_EMPLOYEES} component={TransparencyPage} exact={true}/>
                                <Route path={ROUTES.TRANSPARENCY_EMPLOYEES_DETAILS} component={TransparencyPage} exact={true}/>
                                <Route path={ROUTES.TRANSPARENCY_FLAG} component={TransparencyPage} exact={true}/>
                            
                                <Route exact path={ROUTES.STORE} component={StorePage} />
                                <Route path={ROUTES.STORE_VIEW} component={StorePage} />
                                <Route path={ROUTES.CHECKOUT} component={StorePage} />

                                <Route exact path={ROUTES.STORE_PRODUCTS} component={StorePage} />
                                <Route exact path={ROUTES.STORE_COLLECTIONS} component={StorePage} />
                    
                                <Route exact path={ROUTES.STORE_ORDERS} component={StorePage}/>
                                <Route path={ROUTES.STORE_ORDERS_DETAILS} component={SingleOrderPage}/>

                                <Route exact path={ROUTES.STORE_SAVED} component={StorePage} />
                    
                                <Route path={ROUTES.STORE_SUBMISSIONS} component={StorePage} />
                                <Route path={ROUTES.STORE_SUBMISSIONS_SUBMIT} component={StoreSubmissionsSubmitPage}/>
                    
                                {/* <Route path={ROUTES.STORE_MANAGE} component={StoreManage} /> */}
                            
                                <Route exact path={ROUTES.NEWS} component={NewsPage} />
                                <Route exact path={ROUTES.NEWS_SEARCH} component={NewsPage} />
                                <Route exact path={ROUTES.NEWS_TAG_DETAILS} component={NewsPage} />
                                <Route exact path={ROUTES.NEWS_LOCAL} component={NewsPage} />
                                <Route exact path={ROUTES.NEWS_STOCKS} component={NewsPage} />
                                <Route exact path={ROUTES.NEWS_CRYPTO} component={NewsPage} />
                    
                                <Route path={ROUTES.EXTENDED} component={NewsPage}></Route>
                                <Route path={ROUTES.EXTEND} component={ExtendedPage}></Route>

                                <Route path={ROUTES.STORIES} component={NewsPage} exact={true}/>
                                <Route path={ROUTES.STORY} component={StoryPage}/>

                                <Route path={ROUTES.ISSUES} component={NewsPage} exact={true}/>
                                <Route path={ROUTES.ISSUE} component={IssuePage}/>

                                <Route path={ROUTES.MYTHS} component={NewsPage} exact={true}/>
                                <Route path={ROUTES.MYTH} component={MythPage}/>

                                <Route path={ROUTES.RESOURCES} component={NewsPage} exact={true}/>
                                <Route path={ROUTES.RESOURCES_PRESIDENTS} component={PresidentsPage} exact={true}/>
                                <Route path={ROUTES.RESOURCES_PRESIDENT} component={PresidentsPage}/>
                                <Route path={ROUTES.RESOURCES_CORONAVIRUS} component={CoronavirusPage}/>
                                
                                <Route exact path={ROUTES.RESOURCES_POLITICIANS} component={PoliticiansPage}/>
                                <Route path={ROUTES.RESOURCES_POLITICIANS_HOUSE} component={PoliticiansHousePage}/>
                                <Route path={ROUTES.RESOURCES_POLITICIANS_SENATE} component={PoliticiansSenatePage}/>
                    
                                <Route path={ROUTES.TOWN_HALL} component={TownHallPage} />
                            
                                <Route exact path={ROUTES.PARTY} component={PartyPage} />
                                <Route exact path={ROUTES.PROPOSALS} component={PartyProposalsPage} />
                                <Route path={ROUTES.PROPOSAL} component={ProposalSingle} />

                                <Route path={ROUTES.ADVERTISING} component={AdvertisingPage} exact={true}/>
                                <Route path={ROUTES.ADVERTISING_ACCESS} component={AdvertisingAccessPage} />
                                <Route path={ROUTES.ADVERTISING_MANAGE} component={AdvertisingManagePage} />
                                
                                <Route path={ROUTES.MESH} component={MeshPage} />
                            
                                <Route exact path={ROUTES.COMMUNITY} component={SupportPage} />
                                <Route exact path={ROUTES.UPDATES} component={UpdatesPage} />
                                <Route exact path={ROUTES.UPDATE} component={UpdatePage} />
                                <Route path={ROUTES.FAQ} component={FaqPage} />
                                <Route path={ROUTES.JOBS} component={JobsPage} />
                                <Route path={ROUTES.PRESS} component={PressPage} />
                                <Route path={ROUTES.TRANSLATIONS} component={TranslationsPage} />
                                <Route path={ROUTES.ROADMAP} component={RoadmapPage} />
                                <Route path={ROUTES.FORUM} component={ForumPage} />
                                <Route path={ROUTES.BETA} component={BetaPage} />
                                <Route path={ROUTES.OPEN_SOURCE} component={OpenSourcePage} />
                            
                                {/* <Route path={ROUTES.ACCOUNT} component={AccountPage} /> */}
                                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                                
                                <Route path={ROUTES.PRIVACY} component={Privacy} />

                                <Route exact path={ROUTES.ADMIN} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_USERS} component={AdminPage} />
                                <Route path={ROUTES.ADMIN_USER_DETAILS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_NEWS} component={AdminPage} />
                                <Route path={ROUTES.ADMIN_NEWS_DETAILS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_PROPOSALS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_PRODUCTS} component={AdminPage} />
                                <Route path={ROUTES.ADMIN_PRODUCT_DETAILS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_SUBMISSIONS} component={AdminPage} />
                                <Route path={ROUTES.ADMIN_SUBMISSION_DETAILS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_DONATIONS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_EXPENSES} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_SOCKET} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_AWS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_COMMENTS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_REPORTS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_ORDERS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_ADS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_MESSAGES} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_PROJECTS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_NEWSLETTER} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_PRESIDENTS} component={AdminPage} />
                                <Route exact path={ROUTES.ADMIN_PRESIDENTS_DETAILS} component={AdminPage} />

                                <Route path={ROUTES.DONATE} component={DonatePage} />
                                <Route path={ROUTES.SUBSCRIBE} component={SubscribePage} />
                    
                                <Route path={ROUTES.MESSAGES} component={MessagesPage} />
                                <Route path={ROUTES.MESH} component={MeshPage} />
                                <Route path={ROUTES.PLAYGROUND} component={PlaygroundPage} />
                                {/* <Route path={ROUTES.CHAT} component={Chat} /> */}
                    
                                <Route component={NotFoundPage} />
                            </Switch>

                            <Footer />

                        </div>

                        </div>

                    </SocketContext.Provider>

                    </ScrollToTop>

                </SwUpdateHandler>
                
            </Router>
        )
    }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  site: state.site
});

const App = connect(
  mapStateToProps,
  { setUserDetails, pendingPWAUpdate, setPWAUpdate}
)(AppBase);

export default App;
