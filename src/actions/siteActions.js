import axios from "axios";

// import {
//   GET_ERRORS,
//   SET_CURRENT_USER,
//   USER_LOADING,
//   SET_CURRENT_USER_DETAILS 
// } from "./types";

// Register User
export const toggleColorMode = () => dispatch => {
  console.log(`Toggling the color mode option!`);

  dispatch({
    type: 'TOGGLE_COLOR_MODE',
    // payload: res.data
  });

  // axios
  //   .get("/getMyths")
  //   .then( res => {
  //     console.log("Got Myths")
  //     
  //   }
  //   ) 
  //   .catch(err =>
  //     console.log(err.response.data)
  //   );

};

export const toggleSideMenuFixed = () => dispatch => {
  console.log(`Toggling the side menu fixed option!`);

  dispatch({
    type: 'TOGGLE_SIDE_MENU_FIXED',
    // payload: res.data
  });

  // axios
  //   .get("/getMyths")
  //   .then( res => {
  //     console.log("Got Myths")
  //     dispatch({
  //       type: 'SET_MYTHS',
  //       payload: res.data
  //     });
  //   }
  //   ) 
  //   .catch(err =>
  //     console.log(err.response.data)
  //   );

};