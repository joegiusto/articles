import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_DETAILS,
  USER_LOADING
} from "../actions/types";
const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  user_details: {},
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case SET_CURRENT_USER_DETAILS:
      return {
        ...state,
        user_details: action.payload
      };
    case 'SET_CURRENT_USER_DETAILS_TO_EMPTY':
      return {
        ...state,
        user_details: {}
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}