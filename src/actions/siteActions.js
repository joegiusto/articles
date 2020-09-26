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

export const updateSubscriptionToIssue = subscription => dispatch => {

  console.log("Update to Issue last viewed date");

  dispatch({
    type: 'UPDATE_SUBSCRIPTION',
    subscription
  })
  
};

export const removeSubscription = subscription_id => dispatch => {

  console.log(`Removing ${subscription_id}`);

  dispatch({
    type: 'REMOVE_SUBSCRIPTION',
    subscription_id
  })
  
};

export const addSubscription = subscription => dispatch => {

  console.log(`Adding subscription`);
  console.log(subscription);

  dispatch({
    type: 'ADD_SUBSCRIPTION',
    subscription
  })
  
};