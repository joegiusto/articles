import React, { Component } from 'react';
// import { Switch, Route } from 'react-router'
import { Switch, Route, Link, Router } from 'react-router-dom';

// import { compose } from 'recompose';
// import { withFirebase } from '../Firebase';
// import { withAuthorization, withEmailVerification } from '../Session';
// import * as ROLES from '../../constants/roles';
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import * as ROUTES from '../../constants/routes';
import Users from './components/Users';
import News from './components/News/';
import Products from './components/Products'
import Submissions from './components/Submissions'
import Donations from './components/Donations'
import Expenses from './components/Expenses'

const Test = () => {
  return(
    <div>Hello</div>
  )
}

class Admin extends Component {
  constructor(props) {
  super(props);
  this.setLoaction = this.setLoaction.bind(this)
  
    this.state = {
      tab: '',
    };

  }

  setLoaction(tab) {
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

  // Has to be done by React Router
  // activeContent(currentTab) {
  //   switch(currentTab) {
  //     case 'users':
  //       return (
  //         <Users></Users>
  //       )
  //     case 'news':
  //       return (
  //         <News match={this.props.match}></News>
  //       )
  //     case 'products':
  //       return (
  //         <Products match={this.props.match}></Products>
  //       )
  //     case 'submissions':
  //       return (
  //         <Submissions match={this.props.match}></Submissions>
  //       )
  //     case 'donations':
  //       return (
  //         <div className="mt-5 alert alert-danger">This data is still located on Firebase</div>
  //       )
  //     case 'expenses':
  //       return (
  //         <div className="mt-5 alert alert-danger">This data is still located on Firebase</div>
  //       )
  //     default:
  //       // code block
  //   }
  // }

  render() {

    return (
      <div className="admin-page">

        <div className="tab-bar">
          <div className="container-fluid">

            {/* <span onClick={() => this.activeTab('users')} className={"tab" + (this.state.tab === 'users' ? ' active' : '')}>Users</span>
            <span onClick={() => this.activeTab('news')} className={"tab" + (this.state.tab === 'news' ? ' active' : '')}>News</span>
            <span onClick={() => this.activeTab('products')} className={"tab" + (this.state.tab === 'products' ? ' active' : '')}>Products</span>
            <span onClick={() => this.activeTab('submissions')} className={"tab" + (this.state.tab === 'submissions' ? ' active' : '')}>Submissions</span>
            <span onClick={() => this.activeTab('donations')} className={"tab" + (this.state.tab === 'donations' ? ' active' : '')}>Donations</span>
            <span onClick={() => this.activeTab('expenses')} className={"tab" + (this.state.tab === 'expenses' ? ' active' : '')}>Expenses</span> */}

            <Link to={ROUTES.ADMIN_USERS}><span className={"tab" + (this.state.tab === 'users' ? ' active' : '')}>Users</span></Link>
            <Link to={ROUTES.ADMIN_NEWS}><span className={"tab" + (this.state.tab === 'news' ? ' active' : '')}>News</span></Link>
            <Link to={ROUTES.ADMIN_PRODUCTS}><span className={"tab" + (this.state.tab === 'products' ? ' active' : '')}>Products</span></Link>
            <Link to={ROUTES.ADMIN_SUBMISSIONS}><span className={"tab" + (this.state.tab === 'submissions' ? ' active' : '')}>Submissions</span></Link>
            <Link to={ROUTES.ADMIN_DONATIONS}><span className={"tab" + (this.state.tab === 'donations' ? ' active' : '')}>Donations</span></Link>
            <Link to={ROUTES.ADMIN_EXPENSES}><span className={"tab" + (this.state.tab === 'expenses' ? ' active' : '')}>Expenses</span></Link>

          </div>
        </div>

        <div className="tab-content">
          <div className="container-fluid">

            <Switch>
              <Route path={ROUTES.ADMIN_USERS} render={() => <Users match={this.props.match} tabLocation='users' setLoaction={this.setLoaction}></Users>}/>

              <Route exact path={ROUTES.ADMIN_NEWS} render={() => <News match={this.props.match} tabLocation='news' setLoaction={this.setLoaction}></News> }/>
              <Route path={ROUTES.ADMIN_NEWS_DETAILS} render={() => <News match={this.props.match} tabLocation='news' setLoaction={this.setLoaction}></News> }/>

              <Route path={ROUTES.ADMIN_PRODUCTS} render={() => <Products
                match={this.props.match}
                tabLocation='products'
                setLoaction={this.setLoaction}
              ></Products> }/>

              <Route path={ROUTES.ADMIN_SUBMISSIONS} render={() => <Submissions
                match={this.props.match}
                tabLocation='submissions'
                setLoaction={this.setLoaction}
              ></Submissions> }/>

              <Route exact path={ROUTES.ADMIN_DONATIONS} render={() => <Donations 
                match={this.props.match}
                tabLocation='donations'
                setLoaction={this.setLoaction}
                ></Donations>
              }/>

              <Route exact path={ROUTES.ADMIN_EXPENSES} render={() => <Expenses 
                match={this.props.match}
                tabLocation='expenses'
                setLoaction={this.setLoaction}
                ></Expenses> 
              }/>

            </Switch>

          </div>
        </div>

      </div>
    );
  }
}

export default Admin