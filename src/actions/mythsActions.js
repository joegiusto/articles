import axios from "axios";

// import {
//   GET_ERRORS,
//   SET_CURRENT_USER,
//   USER_LOADING,
//   SET_CURRENT_USER_DETAILS 
// } from "./types";

// Register User
export const setMyths = () => dispatch => {
  console.log(`Getting Myths`);

  axios
  .get("/api/getMyths")
  .then( res => {
    console.log("Got Myths")
    dispatch({
      type: 'SET_MYTHS',
      payload: res.data
    });
  }
  ) 
  .catch(err =>
    console.log(err.response.data)
  );

};