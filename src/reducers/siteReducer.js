const initialState = {
  colorModeDark: false,
  sideMenuFixed: false
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
    default:
      return state;
  }
}