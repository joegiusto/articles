export const toggleColorMode = () => dispatch => {
  console.log(`Toggling the color mode option!`);

  dispatch({
    type: 'TOGGLE_COLOR_MODE',
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