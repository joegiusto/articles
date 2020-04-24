import axios from "axios";

// import {
//   GET_ERRORS,
//   SET_CURRENT_USER,
//   USER_LOADING,
//   SET_CURRENT_USER_DETAILS 
// } from "./types";

// Register User
export const setStories = () => dispatch => {
  console.log(`Getting Stories`);

  axios
    .get("/getStories")
    .then( res => {
      console.log("Got Stories")
      dispatch({
        type: 'SET_STORIES',
        payload: res.data
      });
    }
    ) 
    .catch(err =>
      console.log(err.response.data)
    );

};