// Expenses Reducer
const cartReducerDefaultState = [];

// export default function Reducer(state = initialState, action) {

export default function Reducer(state = cartReducerDefaultState, action) {
    switch (action.type) {

        case 'ADD_CART_ITEM':
            return [
                ...state,
                action.cart_item
            ];
        case 'REMOVE_CART_ITEM':
            return state.filter(({ id }) => id !== action.id);
        case 'REMOVE_ALL_CART_ITEMS':
            return [];
        case 'EDIT_CART_ITEM':
            return state.map((expense) => {
                if (expense.id === action.id) {
                return {
                    ...expense,
                    ...action.updates
                };
                } else {
                return expense;
                };
            });
        default:
            return state;

    }
};