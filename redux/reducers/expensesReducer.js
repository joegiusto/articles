// Expenses Reducer
const expensesReducerDefaultState = [];

// export default function Reducer(state = initialState, action) {

export default function Reducer(state = expensesReducerDefaultState, action) {
    switch (action.type) {

        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'REMOVE_ALL':
            return [];
        case 'EDIT_EXPENSE':
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