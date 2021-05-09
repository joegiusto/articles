const initialState = {
    colorModeDark: false,
    animatedSideMenuSectionHeaders: false,
    weatherPin: false,
    sideMenuOpen: false,
    sideMenuFixed: false,
    pendingPWAUpdate: false,
    userSubscriptions: false,
    dateType: 'post',
    notification: {
        text: 'Test'
    }
};
export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_SIDE_MENU_OPEN':


        // if (state.sideMenuOpen) {
        //     document.body.style.overflowY = "";
        // } else if (!state.sideMenuOpen && !state.sideMenuOpen) {
        //     document.body.style.overflowY = "hidden";
        // }

        return {
                ...state,
                sideMenuOpen: !state.sideMenuOpen
        };
    case 'TOGGLE_ANIMATED_SIDE_MENU_SECTION_HEADERS':
        return {
            ...state,
            animatedSideMenuSectionHeaders: !state.animatedSideMenuSectionHeaders
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
    case 'PENDING_PWA_UPDATE':
        return {
            ...state,
            pendingPWAUpdate: true
        };
    case 'SET_PWA_UPDATE':
        return {
            ...state,
            pendingPWAUpdate: action.value
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