// SET_TEXT_FILTER
export const menuToggle = () => ({
  type: 'MENU_TOGGLE',
});

export const uiToggle = (uiMode) => ({
  type: 'UI_TOGGLE',
  uiMode
});

export const currentUser = (user) => ({
  type: 'CURRENT_USER',
  user
});

export const currentUserInfo = (userInfo) => ({
  type: 'CURRENT_USER_INFO',
  userInfo
});

export const pinToggle = () => ({
  type: 'PIN_TOGGLE',
});

