import axios from "axios";

// import {
//   GET_ERRORS,
//   SET_CURRENT_USER,
//   USER_LOADING,
//   SET_CURRENT_USER_DETAILS 
// } from "./types";

// Register User
export const setIssues = () => dispatch => {
  console.log(`Getting Issues`);

  dispatch({
    type: 'SET_ISSUES_LOADING',
    loading: true
  });

  axios
    .get("/getIssues")
    .then( res => {
      console.log("Got Issues");
      console.log(res.data)
      dispatch({
        type: 'SET_ISSUES',
        payload: res.data,
        loading: false
      });
    }
    ) 
    .catch(err =>
      console.log(err.response.data)
    );

};