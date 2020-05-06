import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

// import { withFirebase } from '../Firebase';
// import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Users from './components/Users';
import News from '../News/Manage';
import Products from './components/Products'
import Submissions from './components/Submissions'

class Admin extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      tab: localStorage.getItem( 'admin-portal-tab' ) || 'users',
    };

  }

  activeTab(newTab) {
    localStorage.setItem( 'admin-portal-tab', newTab );

    this.setState({
      tab: newTab
    })
  }

  activeContent(currentTab) {
    switch(currentTab) {
      case 'users':
        return (
          <Users></Users>
        )
      case 'news':
        return (
          <News match={this.props.match}></News>
        )
      case 'products':
        return (
          <Products match={this.props.match}></Products>
        )
      case 'submissions':
        return (
          <Submissions match={this.props.match}></Submissions>
        )
      case 'donations':
        return (
          <div className="mt-5 alert alert-danger">This data is still located on Firebase</div>
        )
      case 'expenses':
        return (
          <div className="mt-5 alert alert-danger">This data is still located on Firebase</div>
        )
      default:
        // code block
    }
  }

  render() {

    return (
      <div className="admin-page">

        <div className="tab-bar">
          <div className="container-fluid">

            <span onClick={() => this.activeTab('users')} className={"tab" + (this.state.tab === 'users' ? ' active' : '')}>Users</span>
            <span onClick={() => this.activeTab('news')} className={"tab" + (this.state.tab === 'news' ? ' active' : '')}>News</span>
            <span onClick={() => this.activeTab('products')} className={"tab" + (this.state.tab === 'products' ? ' active' : '')}>Products</span>
            <span onClick={() => this.activeTab('submissions')} className={"tab" + (this.state.tab === 'submissions' ? ' active' : '')}>Submissions</span>
            <span onClick={() => this.activeTab('donations')} className={"tab" + (this.state.tab === 'donations' ? ' active' : '')}>Donations</span>
            <span onClick={() => this.activeTab('expenses')} className={"tab" + (this.state.tab === 'expenses' ? ' active' : '')}>Expenses</span>

          </div>
        </div>

        <div className="tab-content">
          <div className="container-fluid">
            {this.activeContent(this.state.tab)}
          </div>
        </div>

      </div>
    );
  }
}

export default Admin