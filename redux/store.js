import { useMemo } from 'react'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import thunk from 'redux-thunk';

import expensesReducer from "./reducers/expensesReducer";
import siteReducer from "./reducers/siteReducer";
import cartReducer from "./reducers/cartReducer";
import storiesReducer from "./reducers/storiesReducer";
import issuesReducer from "./reducers/issuesReducer";
import mythsReducer from "./reducers/mythsReducer";

let store

const exampleInitialState = {
    lastUpdate: 0,
    light: false,
    count: 0,
    exampleData: [],
    error: null,
    // colorModeDark: false,
    // sideMenuOpen: false,
}

export const actionTypes = {
    TICK: 'TICK',
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
    RESET: 'RESET',
    LOAD_EXAMPLE_DATA: 'LOAD_EXAMPLE_DATA',
    LOADING_DATA_FAILURE: 'LOADING_DATA_FAILURE',
    // TOGGLE_COLOR_MODE: 'TOGGLE_COLOR_MODE',
    // TOGGLE_SIDE_MENU_OPEN: 'TOGGLE_SIDE_MENU_OPEN'
}

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    // case actionTypes.TOGGLE_COLOR_MODE:
    //     return {
    //       ...state,
    //       colorModeDark: !state.colorModeDark
    //     }
    // case actionTypes.TOGGLE_SIDE_MENU_OPEN:
    //     return {
    //         ...state,
    //         sideMenuOpen: !state.sideMenuOpen,
    //     }
    case actionTypes.TICK:
      return {
        ...state,
        lastUpdate: action.ts,
        light: !!action.light,
      }
    case actionTypes.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      }
    case actionTypes.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      }
    case actionTypes.RESET:
      return {
        ...state,
        count: exampleInitialState.count,
      }
    case actionTypes.LOAD_EXAMPLE_DATA:
      return {
        ...state,
        exampleData: action.data,
      }
    case actionTypes.LOADING_DATA_FAILURE:
      return { ...state, error: true }
    default:
      return state
  }
}

// ACTIONS
// export const toggleColorMode = () => {
//     return { type: actionTypes.TOGGLE_COLOR_MODE }
// }

// export const toggleSideMenuOpen = () => {
//     return { type: actionTypes.TOGGLE_SIDE_MENU_OPEN }
// }

export const serverRenderClock = () => {
  return { type: actionTypes.TICK, light: false, ts: Date.now() }
}

export const startClock = () => {
  return { type: actionTypes.TICK, light: true, ts: Date.now() }
}

export const incrementCount = () => {
  return { type: actionTypes.INCREMENT }
}

export const decrementCount = () => {
  return { type: actionTypes.DECREMENT }
}

export const resetCount = () => {
  return { type: actionTypes.RESET }
}

export const loadExampleData = (data) => {
  return { type: actionTypes.LOAD_EXAMPLE_DATA, data }
}

export const loadingExampleDataFailure = () => {
  return { type: actionTypes.LOADING_DATA_FAILURE }
}

const persistConfig = {
    key: 'primary',
    storage,
    //   whitelist: ['exampleData'], // place to select which state you want to persist
}

// const persistedReducer = persistReducer(
//     persistConfig, 
//     // combineReducers({
//     //     expenses: expensesReducer,
//     //     site: siteReducer
//     // })
//     reducer
// )

const persistedReducer = persistReducer(
    persistConfig, 
    combineReducers({
        expenses: expensesReducer,
        cart: cartReducer,
        //   auth: authReducer,
        //   errors: errorReducer,
        //   notificationArea: notificationAreaReducer,
        stories: storiesReducer,
        issues: issuesReducer,
        myths: mythsReducer,
        //   submissions: submissionsReducer,
        // site: siteReducer,
        site: siteReducer,
        // filters: filtersReducer,
        // site: siteReducer,
        // employees: employeesReducer
        // ...reducer
    })
  );

function makeStore(initialState = exampleInitialState) {
  return createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  )
}

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}