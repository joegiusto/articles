import React from 'react';
import ProfileForm from './ProfileForm';
import { connect } from 'react-redux';
// import database from '../firebase/firebase';
// import { currentUser, currentUserInfo } from '../actions/site';

const LoginPage = (props) => (
  <div className='container'>
    <div className="row justify-content-center">

      <div className="col-12 col-md-4">
        <ProfileForm/>
      </div>

      <div className="col-12 col-md-6">

        <div className="row">

          <div className="col-12">{props.site.currentUser.uid}</div>

          {/* {props.expenses.map((expense) => {
            return <CheckoutPageItem key={expense.id} {...expense} />;
          })} */}

          <div className="col-6">
            <div className="profile-stat bg-white p-2 shadow-sm">
              <h5>Joined Date</h5>
              <div className="subheading-font">{props.site.currentUser.createdAt}</div>
            </div>
          </div>
  
          <div className="col-6">
            <div className="profile-stat bg-white p-2 shadow-sm">
              <h5>Last Login</h5>
              <div className="subheading-font">{props.site.currentUser.lastLoginAt}</div>
            </div>
          </div>
  
          <div className="col-6">
            <div className="profile-stat bg-white p-2 shadow-sm">
              <h5>Stories Read</h5>
              <div className="subheading-font">4</div>
            </div>
          </div>
  
          <div className="col-6">
            <div className="profile-stat bg-white p-2 shadow-sm">
              <h5>Items Purchased</h5>
              <div className="subheading-font">0</div>
            </div>
          </div>

          <div className="col-12">
            <div className="profile-stat bg-white p-2 shadow-sm">
              <h5>Interest</h5>
              <div className="subheading-font py-5"></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    site: state.site
  };
};

export default connect(mapStateToProps)(LoginPage);