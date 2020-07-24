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
        user_details: action.payload.user
      };
    case 'SET_CURRENT_USER_DETAILS_TO_EMPTY':
      return {
        ...state,
        user_details: {}
      };
    case 'UPDATE_SUBSCRIPTION':
      console.log(state.user_details.subscriptions)
      // console.log(action)
      let tempIndex = state.user_details.subscriptions.findIndex((issue) => issue.news_id === action.subscription.news_id)
      let tempFetchedIndex = state.user_details.subscriptionsFetched.findIndex((issue) => issue._id === action.subscription.news_id)

      console.log("Here 1")
      console.log(tempIndex)
      

      let newSubscriptions = state.user_details.subscriptions;

      console.log("Here 2")
      console.log(newSubscriptions)
      
      newSubscriptions[tempIndex].lastRead = new Date();

      let newSubscriptionsFetched = state.user_details.subscriptionsFetched
      newSubscriptionsFetched[tempFetchedIndex].lastRead = new Date();

      return {
        ...state,
        user_details: {
          ...state.user_details,
          subscriptions: [ ...newSubscriptions ],
          subscriptionsFetched: [ ...newSubscriptionsFetched ]
        }
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}