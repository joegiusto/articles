import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navigation from './Navigation';

import LandingPage from './Landing';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';

import OutsetPage from './Outset';

import HomePage from './Home';
import MissionPage from './Mission';
import ReportsPage from './Reports';
import ReportsManagePage from './Reports/Manage';

import StorePage from './Store'
import StoreCheckoutPage from './Store/Checkout'
import StoreSubmissionsPage from './Store/Submissions'
import StoreManage from './Store/Manage'

import NewsPage from './News'
// Stroies placeholder
import IssuesPage from './News/Issues'
import IssuePage from './News/Issues/single.js'
import MythsPage from './News/Myths'
import NewsManagePage from './News/Manage'

import PartyPage from './Party'
import PartyProposalsPage from './Party/Proposals'
import TownHallPage from './Party/TownHall'

import MeshPage from './Mesh'

import SupportPage from './Support'
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

// import PlaygroundPage from './Playground';
import Chat from './Chat';

import NotFoundPage from './Navigation/NotFoundPage';

import * as ROUTES from '../constants/routes';
import { withAuthentication } from './Session';

import { AuthUserContext } from './Session';

const App = () => (
  <Router>
    <div>

      <Navigation />

      {/* <AuthUserContext.Consumer>
        {authUser =>
          <div style={{position: 'absolute', top: '0px', zIndex: '1000', color: 'red', pointerEvents: 'none'}}>

          {!authUser ? (
            <div>Assume Completion of Outset while authUser loads</div>
          ) : (
            <>
              {authUser.outset.completed ? 'Completed, site can be used' : "Not completed, plesae complete Outset"}
            </>
          )
          }

        </div>
        }
      </AuthUserContext.Consumer> */}

      <Switch>
        {/* Something like this? */}
        {/* <Route path="*" component={OutsetPage}/> */}
        {/* <Redirect from="*" to="/outset"/> */}

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
  
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />

        <Route path={ROUTES.OUTSET} component={OutsetPage} />
        
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.MISSION} component={MissionPage} />

        <Route path={ROUTES.REPORTS} component={ReportsPage} exact={true}/>
        <Route path={ROUTES.REPORTS_MANAGE} component={ReportsManagePage} />
  
        <Route exact path={ROUTES.STORE} component={StorePage} />
        <Route exact path={ROUTES.STORE_VIEW} component={StorePage} />
        <Route path={ROUTES.CHECKOUT} component={StoreCheckoutPage} />
        <Route path={ROUTES.STORE_SUBMISSIONS} component={StoreSubmissionsPage} />
        <Route path={ROUTES.STORE_MANAGE} component={StoreManage} />
  
        <Route exact path={ROUTES.NEWS} component={NewsPage} />
        <Route path={ROUTES.MYTHS} component={MythsPage} />
        <Route path={ROUTES.ISSUES} component={IssuesPage} exact={true}/>
        <Route path={ROUTES.ISSUE} component={IssuePage}/>
        
        <Route path={ROUTES.MANAGE} component={NewsManagePage} />

        <Route path={ROUTES.TOWN_HALL} component={TownHallPage} />
  
        <Route exact path={ROUTES.PARTY} component={PartyPage} />
        <Route path={ROUTES.PROPOSALS} component={PartyProposalsPage} />
        
        <Route path={ROUTES.MESH} component={MeshPage} />
  
        <Route exact path={ROUTES.SUPPORT} component={SupportPage} />
        <Route path={ROUTES.JOBS} component={JobsPage} />
        <Route path={ROUTES.PRESS} component={PressPage} />
        <Route path={ROUTES.TRANSLATIONS} component={TranslationsPage} />
  
        <Route path={ROUTES.EMPLOYEES} component={EmployeePage} exact={true}/>
        <Route path={ROUTES.EMPLOYEES_DETAILS} component={EmployeePageDetails} />
  
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.DONATE} component={DonatePage} />

        <Route path={ROUTES.MAIL} component={MailPage} />

        {/* <Route path={ROUTES.PLAYGROUND} component={PlaygroundPage} /> */}
        <Route path={ROUTES.CHAT} component={Chat} />

        <Route component={NotFoundPage} />
      </Switch>

      {/* <Redirect from="*" to="/outset"/> */}

    </div>
  </Router>
);

export default withAuthentication(App);