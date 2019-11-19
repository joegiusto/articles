import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization, withEmailVerification } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>The Admin Page is accessible by every signed in admin user.</p>
    <Switch>
      {/* <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} /> */}
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
    {/* <div className="container-fluid p-0"><SimpleSlider/></div> */}
  </div>
);

class SimpleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: 0,
      activeSlide: 0,
    };
  }

  componentDidMount() {
    this.setState({slides: document.querySelectorAll('.slick-slide:not(.slick-cloned)').length})
  }

  render() {
    const settings = {
      focusOnSelect: true,
      dots: true,
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "250px",
      slidesToShow: 3,
      arrows: false,
      beforeChange: (current, next) => this.setState({ activeSlide: next }),
      speed: 250,
      responsive: [
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            centerPadding: "100px",
            dots: true
          }
        }
      ]
    };
    return (
      <div className="submission-page">
        <div className="">
          <h3>Item {this.state.activeSlide + 1} out of {this.state.slides}</h3>
        </div>

        <Slider {...settings}>
          <div className="slick-card">
            <h3>1</h3>
            <h5>Joey Giusto</h5>
            <h5>NY</h5>
            <h5>Votes: +138</h5>
          </div>
          <div className="slick-card">
            <h3>2</h3>
            <h5>Joey Giusto</h5>
            <h5>NY</h5>
            <h5>Votes: +138</h5>
          </div>
          <div className="slick-card">
            <h3>3</h3>
            <h5>Joey Giusto</h5>
            <h5>NY</h5>
            <h5>Votes: +138</h5>
          </div>
          <div className="slick-card">
            <h3>4</h3>
            <h5>Joey Giusto</h5>
            <h5>NY</h5>
            <h5>Votes: +138</h5>
          </div>
          <div className="slick-card">
            <h3>5</h3>
            <h5>Joey Giusto</h5>
            <h5>NY</h5>
            <h5>Votes: +138</h5>
          </div>
          <div className="slick-card">
            <h3>6</h3>
            <h5>Joey Giusto</h5>
            <h5>NY</h5>
            <h5>Votes: +138</h5>
          </div>
        </Slider>
      </div>
    );
  }
}

class UserListBase extends Component {
  constructor(props) {
  super(props);
  this.state = {
  loading: false,
  users: [],
  };
  }
  componentDidMount() {
  this.setState({ loading: true });
  this.props.firebase.users().on('value', snapshot => {
  const usersObject = snapshot.val();
  const usersList = Object.keys(usersObject).map(key => ({
    ...usersObject[key],
    uid: key,
    }));
    this.setState({
    users: usersList,
    loading: false,
    });
    });
    }
  componentWillUnmount() {
  this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
    <div>
    <h2>Users</h2>
    {loading && <div>Loading ...</div>}
    <ul>
    {users.map(user => (
    <li key={user.uid}>
    <span>
    <strong>ID:</strong> {user.uid}
    </span>
    <span>
    <strong>E-Mail:</strong> {user.email}
    </span>
    <span>
    <strong>Name:</strong> {user.nameFirst + ' ' + user.nameLast}
    </span>
    <span>
    <Link to={`${ROUTES.ADMIN}/${user.uid}`}>
    Details
    </Link>
    </span>
    </li>
    ))}
    </ul>
    </div>
    );
  }
}

const UserItem = ({ match }) => (
  <div>
  <h2>User ({match.params.id})</h2>
  </div>
);

const condition = authUser =>
authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(AdminPage);