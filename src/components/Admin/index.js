import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from "react-redux";

// import { compose } from 'recompose';
// import { withAuthorization, withEmailVerification } from '../Session';
// import * as ROLES from '../../constants/roles';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import * as ROUTES from '../../constants/routes';
import Users from './components/Users';
import News from './components/News/';
import Proposals from './components/Proposals';
import Products from './components/Products'
import Submissions from './components/Submissions'
import Donations from './components/Donations'
import Expenses from './components/Expenses'
import Sockets from './components/Socket'
import Comments from './components/Comments'
import Reports from './components/Reports'
import Orders from './components/Orders'
import Ads from './components/Ads'

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
  
    this.state = {
      tab: '',
    };
  }

  componentDidMount() {
    if (!this.props.user?.roles?.isAdmin === true) {
      this.props.history.push("/home");
    }
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

  render() {

    return (
      <div className="admin-container">

        <div className="tab-bar">
          <div className="container-fluid">

            <Link to={ROUTES.ADMIN_USERS}><span className={"tab" + (this.state.tab === 'users' ? ' active' : '')}>Users</span></Link>
            <Link to={ROUTES.ADMIN_NEWS}><span className={"tab" + (this.state.tab === 'news' ? ' active' : '')}>News</span></Link>
            <Link to={ROUTES.ADMIN_PROPOSALS}><span className={"tab" + (this.state.tab === 'proposals' ? ' active' : '')}>Proposals</span></Link>
            <Link to={ROUTES.ADMIN_PRODUCTS}><span className={"tab" + (this.state.tab === 'products' ? ' active' : '')}>Products</span></Link>
            <Link to={ROUTES.ADMIN_SUBMISSIONS}><span className={"tab" + (this.state.tab === 'submissions' ? ' active' : '')}>Submissions</span></Link>
            <Link to={ROUTES.ADMIN_DONATIONS}><span className={"tab" + (this.state.tab === 'donations' ? ' active' : '')}>Donations</span></Link>
            <Link to={ROUTES.ADMIN_EXPENSES}><span className={"tab" + (this.state.tab === 'expenses' ? ' active' : '')}>Expenses</span></Link>
            <Link to={ROUTES.ADMIN_SOCKET}><span className={"tab" + (this.state.tab === 'sockets' ? ' active' : '')}>Sockets</span></Link>
            <Link to={ROUTES.ADMIN_COMMENTS}><span className={"tab" + (this.state.tab === 'comments' ? ' active' : '')}>Comments</span></Link>
            <Link to={ROUTES.ADMIN_REPORTS}><span className={"tab" + (this.state.tab === 'reports' ? ' active' : '')}>Reports</span></Link>
            <Link to={ROUTES.ADMIN_ORDERS}><span className={"tab" + (this.state.tab === 'orders' ? ' active' : '')}>Orders</span></Link>
            <Link to={ROUTES.ADMIN_ADS}><span className={"tab" + (this.state.tab === 'ads' ? ' active' : '')}>Ads</span></Link>

          </div>
        </div>

        <div className="tab-content">
          {/* <div className="container-fluid"> */}

          <Switch>

            <Route path={ROUTES.ADMIN_USERS} render={() => <Users 
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

          </Switch>

          {/* </div> */}
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