import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_DETAILS,
  USER_LOADING
} from "../actions/types";
// const isEmpty = require("is-empty");
const initialState = {
  // isAuthenticated: false,
  stories: [],
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_STORIES':
      return {
        ...state,
        stories: [...action.payload]
      };
    default:
      return state;
  }
}