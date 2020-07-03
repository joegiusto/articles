const initialState = {
  notification: {
    text: 'Initial',
    clearAfter: 0
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'PUSH_NOTIFICATION':
      console.log('Not Testing');
      console.log(action.notification);
      return {
        ...state,
        notification: {
          ...state.notification,
          ...action.notification,
          // text: action.notification.text,
          clearAfter: parseInt(action.notification.clearAfter),
          // visible: action.notification.visible
        }
      }
    default:
      return state;
  }
}