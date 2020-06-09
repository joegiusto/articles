const initialState = {
  colorModeDark: false,
  sideMenuFixed: false,
  userSubscriptions: false
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
      }
    default:
      return state;
  }
}