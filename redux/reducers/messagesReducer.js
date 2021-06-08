const initialState = {
    // isAuthenticated: false,
    messages: [],
    loading: false
};

export default function Reducer(state = initialState, action) {
    switch (action.type) {

        case 'SET_MESSAGES':
            return {
                ...state,
                messages: [...action.payload],
                loading: action.loading
            };
        case 'SET_MESSAGES_LOADING':
            return {
                ...state,
                loading: action.loading
            }
        default:
            return state;

    }
}