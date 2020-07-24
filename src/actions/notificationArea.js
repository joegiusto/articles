export const pushNotification = (notification) => dispatch => {

  console.log('Testing notifiacation')
  
  dispatch({
    type: 'PUSH_NOTIFICATION',
    notification: {...notification}
  });
};