const initialState = {
  colorModeDark: false,
  weatherPin: false,
  sideMenuOpen: false,
  sideMenuFixed: false,
  userSubscriptions: false,
  dateType: 'post',
  notification: {
    text: 'Test'
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDE_MENU_OPEN':
      return {
        ...state,
        sideMenuOpen: !state.sideMenuOpen
      };
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
    case 'TOGGLE_WEATHER_PIN':
      return {
        ...state,
        weatherPin: !state.weatherPin
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