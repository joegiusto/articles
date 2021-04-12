const initialState = {
    // isAuthenticated: false,
    myths: [],
    loading: false
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {

        case 'SET_MYTHS':
            return {
                ...state,
                myths: [...action.payload],
                loading: action.loading
            };
        case 'SET_MYTHS_LOADING':
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;

    }
}