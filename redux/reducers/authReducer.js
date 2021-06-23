// import {
//     SET_CURRENT_USER,
//     SET_CURRENT_USER_DETAILS,
//     USER_LOADING
// } from "../actions/types";

// const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    user: {},
    user_details: {},
    loading: false
};

export default function Reducer (state = initialState, action) {
    switch (action.type) {
    // case SET_CURRENT_USER:
    //     return {
    //     ...state,
    //     isAuthenticated: !isEmpty(action.payload),
    //     user: action.payload
    //     };
    case 'SET_CURRENT_USER_DETAILS':
        return {
        ...state,
        user_details: action.payload.user
        };
    case 'CLEAR_CURRENT_USER_DETAILS':
        return {
        ...state,
        user_details: {}
        };
    case 'UPDATE_SUBSCRIPTION':
        console.log(state.user_details.subscriptions)
        console.log(action.subscription.news_id)

        let tempIndex = state.user_details.subscriptions.findIndex((issue) => issue.news_id === action.subscription.news_id)
        let tempFetchedIndex = state.user_details.subscriptionsFetched.findIndex((issue) => issue._id === action.subscription.news_id)

        let newSubscriptions = state.user_details.subscriptions;
        let newSubscriptionsFetched = state.user_details.subscriptionsFetched

        if (tempIndex >= 0 ) {
        console.log("Already Here")
        newSubscriptions[tempIndex].lastRead = new Date();

        } else {
        console.log("Gotta add")

        }

        if (tempFetchedIndex >= 0 ) {
        console.log("Already Here")
        newSubscriptionsFetched[tempFetchedIndex].lastRead = new Date();

        } else {
        console.log("Gotta add")
        }

        return {
        ...state,
        user_details: {
            ...state.user_details,
            subscriptions: [ ...newSubscriptions ],
            subscriptionsFetched: [ ...newSubscriptionsFetched ]
        }
        }
    case 'REMOVE_SUBSCRIPTION':
        return {
        ...state,
        user_details: {
            ...state.user_details,
            subscriptions: state.user_details.subscriptions.filter( subscription => subscription.news_id !== action.subscription_id),
            subscriptionsFetched: state.user_details.subscriptionsFetched.filter( subscription => subscription._id !== action.subscription_id),
        }
        }
    case 'ADD_SUBSCRIPTION':
        return {

        ...state,

        user_details: {
            ...state.user_details,

            subscriptions: [
            ...state.user_details.subscriptions,
            {
                news_id: action.subscription._id,
            }
            ],
            subscriptionsFetched: [
            ...state.user_details.subscriptionsFetched,
            action.subscription
            ],
        }
        }
    case 'ADD_ORDER':
        return {
        
        ...state,
        user_details: {
            ...state.user_details,
            ordersFetched: [
            ...state.user_details.ordersFetched,
            action.order
            ]
        }

        }
    case 'VERIFY_EMAIL':
        console.log('VERIFY_EMAIL called')
        return {
        ...state,
        user_details: {
            ...state.user_details,
            isVerified: true
        }

        }
    case 'USER_LOADING':
        return {
        ...state,
        loading: true
        };
    default:
        return state;
    }
}