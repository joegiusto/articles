import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";
// import {
//   GET_ERRORS,
//   SET_CURRENT_USER,
//   USER_LOADING,
//   SET_CURRENT_USER_DETAILS 
// } from "./types";

// Register User
// export const registerUser = (userData, history) => dispatch => {
//   axios
//     .post("/api/users/register", userData)
//     .then(res => history.push("/signin")) // re-direct to login on successful register
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//       + console.log(err.response.data)
//     );
// };

// Login - get user token
// export const loginUser = userData => dispatch => {
//   axios
//     .post("/api/users/login", userData)
//     .then(res => {
//       // Save to localStorage
//       // Set token to localStorage
//       const { token } = res.data;
//       localStorage.setItem("jwtToken", token);
      
//       // Set token to Auth header
//       setAuthToken(token);

//       // Decode token to get user data
//       const decoded = jwt_decode(token);

//       // Set current user
//       dispatch(setCurrentUser(decoded));

//       // console.log("THis is the decoded object")
//       // dispatch(setUserDetails(decoded.id));

//     })
//     .catch(err => {
//         console.log(err)
//         dispatch({
//             type: GET_ERRORS,
//             payload: err.response
//         })
//     }
//   );
// };

// Set logged in user
// export const setCurrentUser = decoded => {
//   return {
//     type: SET_CURRENT_USER,
//     payload: decoded
//   };
// };

// Login - get user token
export const setUserDetails = userData => dispatch => {
  // let self = this;
    console.log('setUserDetails called')

    const fetchData = async () => {
        const res = await fetch('/api/getUserDetails')
        const json = await res.json()

        // console.log(json)

        dispatch({
            type: 'SET_CURRENT_USER_DETAILS',
            payload: json
        });
    }

    fetchData()

    // axios
    // .post("/api/secure/getUserDetails", {
    //     user: userData
    // })
    // .then(res => {

    //     dispatch({
    //         type: SET_CURRENT_USER_DETAILS,
    //         payload: res.data
    //     });

    // })
    // .catch(err =>
    //     console.log(err)
    // );

};

export const clearUserDetails = userData => dispatch => {
    console.log('clearUserDetails called');

    dispatch({
        type: 'CLEAR_CURRENT_USER_DETAILS',
    });
}

// User loading
// export const setUserLoading = () => {
//   return {
//     type: USER_LOADING
//   };
// };

// Log user out
// export const logoutUser = () => dispatch => {
//   // Remove token from local storage
//   localStorage.removeItem("jwtToken");
//   // Remove auth header for future requests
//   setAuthToken(false);
//   // Set current user to empty object {} which will set isAuthenticated to false
//   dispatch(setCurrentUser({}));
//   dispatch({
//     type: 'SET_CURRENT_USER_DETAILS_TO_EMPTY'
//   })
// };

// verifyEmail - get user token
// export const verifyEmail = () => dispatch => {
//   console.log("Here")

//   dispatch({
//     type: 'VERIFY_EMAIL',
//   })

// };