// Expenses Reducer

const cartReducerDefaultState = [];

export default (state = cartReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_ITEM':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_ITEM':
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
