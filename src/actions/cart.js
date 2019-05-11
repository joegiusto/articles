import uuid from 'uuid';

// ADD_EXPENSE
export const addExpense = (
  {
    storeItem = 0,
    description = '',
    note = '',
    amount = 0,
    size,
    createdAt = 0
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    storeItem,
    description,
    note,
    amount,
    size,
    createdAt
  }
});