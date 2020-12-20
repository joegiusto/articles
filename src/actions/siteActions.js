import axios from "axios";

export const toggleColorMode = () => dispatch => {
  console.log(`Toggling the color mode option!`);

  dispatch({
    type: 'TOGGLE_COLOR_MODE',
  });
};

export const toggleWeatherPin = () => dispatch => {
  console.log(`Toggling weather pin to nav!`);

  dispatch({
    type: 'TOGGLE_WEATHER_PIN',
  });
};

export const toggleSideMenuOpen = () => dispatch => {
  console.log(`Toggling the side menu open option!`);

  dispatch({
    type: 'TOGGLE_SIDE_MENU_OPEN',
  });
};

export const toggleSideMenuFixed = () => dispatch => {
  console.log(`Toggling the side menu fixed option!`);

  dispatch({
    type: 'TOGGLE_SIDE_MENU_FIXED',
  });
};

export const toggleUserSubscriptions = () => dispatch => {
  console.log(`Toggling the display of only user subscriptions!`);

  dispatch({
    type: 'TOGGLE_USER_SUBSCRIPTIONS',
  });
};

export const filterIssuesDateType = () => dispatch => {
  console.log(`Toggling the filter on date type display!`);

  dispatch({
    type: 'FILTER_ISSUE_DATE_TYPE',
  });
};

export const pendingPWAUpdate = () => dispatch => {
  console.log(`Tells Redux that a PWA update is awaiting user install`);

  dispatch({
    type: 'PENDING_PWA_UPDATE',
  });
};

export const updateSubscriptionToIssue = subscription => dispatch => {

  console.log("Update to Issue last viewed date");

  dispatch({
    type: 'UPDATE_SUBSCRIPTION',
    subscription
  })
  
};

export const removeSubscription = subscription_id => dispatch => {
  console.log(`Removing ${subscription_id}`);

  axios
    .post("/api/removeSubscription", {
      subscription_id
    })
    .then( res => {
      console.log(res);

      dispatch({
        type: 'REMOVE_SUBSCRIPTION',
        subscription_id
      })
    }
    ) 
    .catch(err =>
      console.log(err.response.data)
    );
  
};

export const addSubscription = subscription => dispatch => {
  console.log(`Adding Subscription`);

  axios
    .post("/api/addSubscription", {
      subscription_id: subscription._id
    })
    .then( res => {
      console.log(res);

      dispatch({
        type: 'ADD_SUBSCRIPTION',
        subscription
      })
    }
    ) 
    .catch(err =>
      console.log(err.response.data)
    );
  
};

export const addOrder = order => dispatch => {
  console.log(`Adding Order to User Details`);

  console.log(order)

  dispatch({
    type: 'ADD_ORDER',
    order
  })
  
};