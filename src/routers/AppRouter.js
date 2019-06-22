import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import ArticlesHomePage from '../components/ArticlesHomePage';
import ArticlesReports from '../components/ArticlesReports';
import StorePage from '../components/StorePage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
// import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import ArticlesPress from '../components/ArticlesPress';
import LoginPage from '../components/LoginPage';
import Profile from '../components/Profile';
import TownHall from '../components/TownHall';
import Submissions from '../components/Submissions';
import Issues from '../components/Issues';
import Myths from '../components/Myths';
import Mesh from '../components/Mesh';
import Mission from '../components/Mission';
import NewsHomepage from '../components/NewsHomepage';

import CheckoutPage from '../components/CheckoutPage';

import AddItem from '../components/AddItem';

import { connect } from 'react-redux';
import { uiToggle, menuToggle, pinToggle } from '../actions/site';
import { startLogout } from '../actions/auth'

import whiteBack from '../images/crossword.png';
import darkBack from '../images/crossword-dark.png';

import { createBrowserHistory } from 'history';
import EmployeePage from '../components/EmployeePage';
import EmployeeList from '../components/EmployeeList';
export const history = createBrowserHistory();

var whiteBackCSS = "url(" +  whiteBack + ")";
var darkBackCSS = "url(" +  darkBack + ")";

const AppRouter = (props) => (
  <Router history={history}>
    <div>
      <SideMenu 
        menuOpen={props.site.menuOpen}
        pinOpen={props.site.pinOpen}
        uiMode={props.site.ui_mode}
        cartTotal={props.expenses.length}
        currentUser={props.site.currentUser}
        menuToggle={() => {
          props.dispatch(menuToggle());
        }}
        pinToggle={() => {
          props.dispatch(pinToggle());
        }}
        uiNight={() => {
          props.dispatch(uiToggle('night'));
          document.getElementById("body").style.backgroundImage=darkBackCSS;
          document.body.classList.add("night-mode");
        }}
        uiDay={() => {
          props.dispatch(uiToggle('day'));
          document.getElementById("body").style.backgroundImage=whiteBackCSS;
          document.body.classList.remove("night-mode");
          document.body.removeAttribute("class");
        }}
        onClickLogout={startLogout}
      />
      <Switch>

        {/* {history.listen( ()=>  {
        console.log('New Page' + history.length);
        props.dispatch(menuToggle());
        })} */}

        {/* {history.listen((location, action) => {
          console.log(
            `The current URL is ${location.pathname}${location.search}${location.hash}`
          );
          console.log(`The last navigation action was ${action}`);
        })} */}

        <Route path="/" component={ArticlesHomePage} exact={true} />
        <Route path="/reports" component={ArticlesReports}/>
        <Route path="/store" component={StorePage} />
        <Route path="/help" component={HelpPage} />
        <Route path="/cart" component={ExpenseDashboardPage} />
        <Route path="/press" component={ArticlesPress} />
        <Route path="/login" component={LoginPage} />

        <Route path="/profile" component={Profile} />

        <Route path="/town-hall" component={TownHall} />
        <Route path="/profile" component={Profile} />
        <Route path="/mesh" component={Mesh} />
        <Route path="/issues" component={Issues} />
        <Route path="/mission" component={Mission} />
        <Route path="/news" component={NewsHomepage} />
        <Route path="/submissions" component={Submissions} />
        <Route path="/myths" component={Myths} />
        <Route path="/add" component={AddItem} />
        <Route path="/checkout" component={CheckoutPage} />

        <Route path="/employees" component={EmployeeList} exact={true}/>
        <Route path="/employees/:id" component={EmployeePage} />

        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    site: state.site,
    // startLogout: () => dispatch(startLogout())
  };
};

export default connect(mapStateToProps)(AppRouter);
