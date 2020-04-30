import axios from "axios";

// import {
//   GET_ERRORS,
//   SET_CURRENT_USER,
//   USER_LOADING,
//   SET_CURRENT_USER_DETAILS 
// } from "./types";

// Register User
export const setSubmissions = () => dispatch => {
  console.log(`Getting Stories`);

  dispatch({
    type: 'SET_SUBMISSIONS_LOADING',
    loading: true
  });

  axios
    .get("/getSubmissions")
    .then( res => {
      console.log("Got Submissions")
      dispatch({
        type: 'SET_SUBMISSIONS',
        payload: res.data,
        loading: false
      });
    }
    ) 
    .catch(err =>
      console.log(err.response.data)
    );

};