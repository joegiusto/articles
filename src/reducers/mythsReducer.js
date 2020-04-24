const initialState = {
  // isAuthenticated: false,
  myths: [],
  loading: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_MYTHS':
      return {
        ...state,
        myths: [...action.payload]
      };
    default:
      return state;
  }
}