import uuid from 'uuid';
import database from '../firebase/firebase';

// SET_EXPENSE
export const setEmployees = (employees) => ({
  type: 'SET_EMPLOYEE',
  employees
});

export const startSetEmployees = () => {
  return (dispatch) => {
    return database.ref('employees').once('value').then((snapshot) => {
      const employees = [];

      snapshot.forEach((childSnapshot) => {
        employees.push ({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });

      dispatch(setEmployees(employees));
    })
  }
};