const initialState = {
  colorModeDark: false,
  sideMenuFixed: false,
  userSubscriptions: false,
  dateType: 'post'
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDE_MENU_FIXED':
      return {
        ...state,
        sideMenuFixed: !state.sideMenuFixed
      };
    case 'TOGGLE_COLOR_MODE':
      return {
        ...state,
        colorModeDark: !state.colorModeDark
      };
    case 'TOGGLE_USER_SUBSCRIPTIONS':
      return {
        ...state,
        userSubscriptions: !state.userSubscriptions
      };
    case 'FILTER_ISSUE_DATE_TYPE':
      return {
        ...state,
        dateType: (state.dateType === 'post' ? 'update' : 'post') 
      }
    default:
      return state;
  }
}