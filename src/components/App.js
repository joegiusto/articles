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

import StorePage from './Store'
import StoreCheckoutPage from './Store/Checkout'
import StoreSubmissionsPage from './Store/Submissions'

import NewsPage from './News'
import TownHallPage from './News/TownHall'

import PartyPage from './Party'
import PartyProposalsPage from './Party/Proposals'
import IssuesPage from './Party/Issues'
import MythsPage from './Party/Myths'

import MeshPage from './Mesh'

import SupportPage from './Support'
import JobsPage from './Support/Jobs'
import PressPage from './Support/Press'
import TranslationsPage from './Support/Translations'

import EmployeePage from './Employees'
import EmployeePageDetails from './Employees/Directory'

import AccountPage from './Account';
import PasswordForgetPage from './PasswordForget';

import AdminPage from './Admin';
import DonatePage from './Donate';

// import PlaygroundPage from './Playground';

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
        <Route path={ROUTES.REPORTS} component={ReportsPage} />
  
        <Route exact path={ROUTES.STORE} component={StorePage} />
        <Route path={ROUTES.CHECKOUT} component={StoreCheckoutPage} />
        <Route path={ROUTES.STORE_SUBMISSIONS} component={StoreSubmissionsPage} />
  
        <Route exact path={ROUTES.NEWS} component={NewsPage} />
        <Route path={ROUTES.TOWN_HALL} component={TownHallPage} />
  
        <Route exact path={ROUTES.PARTY} component={PartyPage} />
        <Route path={ROUTES.PROPOSALS} component={PartyProposalsPage} />
        <Route path={ROUTES.MYTHS} component={MythsPage} />
        <Route path={ROUTES.ISSUES} component={IssuesPage} />
  
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

        {/* <Route path={ROUTES.PLAYGROUND} component={PlaygroundPage} /> */}
  
        <Route component={NotFoundPage} />
      </Switch>

      {/* <Redirect from="*" to="/outset"/> */}

    </div>
  </Router>
);

export default withAuthentication(App);