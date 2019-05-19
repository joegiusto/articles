// Expenses Reducer

const employeesReducerDefaultState = [];

export default (state = employeesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EMPLOYEE':
      return [
        ...state,
        action.expense
      ];
    case 'REMOVE_EMPLOYEE':
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EMPLOYEE':
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
