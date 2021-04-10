// import uuid from 'uuid';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// ADD_EXPENSE
export const addCartItem = (
    {
        description = '',
        note = '',
        amount = 0,
        preview = "",
        size,
        createdAt = 0
    } = {}
    ) => ({
    type: 'ADD_CART_ITEM',
    cart_item: {
        id: uuidv4(),
        description,
        preview,
        note,
        amount,
        size,
        createdAt
    }
});

// REMOVE_EXPENSE
export const removeCartItem = ({ id } = {}) => ({
  type: 'REMOVE_CART_ITEM',
  id
});

// EDIT_EXPENSE
export const editCartItem = (id, updates) => ({
  type: 'EDIT_CART_ITEM',
  id,
  updates
});

// // SET_EXPENSE
// export const setExpenses = (expenses) => ({
//   type: 'SET_EXPENSE',
//   expenses
// });

// CLEAR_EXPENSE
export const clearCartItems = () => ({
  type: 'REMOVE_ALL_CART_ITEMS'
});