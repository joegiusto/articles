// Site Reducer

const siteReducerDefaultState = {
  language: 'en',
  fontSize: 10,
  ui_mode: 'day',
  tos: 0,
  menuOpen: false,
  pinOpen: false,
  currentUser: {},
  currentUserInfo: {
    nameFirst: '',
    nameLast: '',
    party: '',
    newsletter: false,
    email: ''
  }
};

export default (state = siteReducerDefaultState, action) => {
  switch (action.type) {
    case 'UI_TOGGLE':
      return {
        ...state,
        ui_mode: action.uiMode
      };
    case 'MENU_TOGGLE':
      return {
        ...state,
        menuOpen: !state.menuOpen
      };
    case 'CURRENT_USER':
      return {
        ...state,
        currentUser: action.user
      };
      case 'CURRENT_USER_INFO':
        return {
          ...state,
          currentUserInfo: action.userInfo
        };
    case 'PIN_TOGGLE':
      return {
        ...state,
        pinOpen: !state.pinOpen
      };
    default:
      return state;
  }
};
