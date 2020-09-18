import uuid from 'uuid';
// import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    preview = "",
    size,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    preview,
    note,
    amount,
    size,
    createdAt
  }
});

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_EXPENSE
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSE',
  expenses
});

// CLEAR_EXPENSE
export const clearExpenses = () => ({
  type: 'REMOVE_ALL'
});