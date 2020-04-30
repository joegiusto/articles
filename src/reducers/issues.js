import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_DETAILS,
  USER_LOADING
} from "../actions/types";
// const isEmpty = require("is-empty");
const initialState = {
  // isAuthenticated: false,
  issues: [],
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_ISSUES':
      return {
        ...state,
        issues: [...action.payload],
        loading: action.loading
      };
    case 'SET_ISSUES_LOADING':
      return {
        ...state,
        loading: action.loading
      }
    default:
      return state;
  }
}