const initialState = {
  // isAuthenticated: false,
  submissions: [],
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_SUBMISSIONS':
      return {
        ...state,
        submissions: [...action.payload]
      };
    default:
      return state;
  }
}