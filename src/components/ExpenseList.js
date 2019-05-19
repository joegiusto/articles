import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
import database from '../firebase/firebase';

const ExpenseList = (props) => (
  <div>
    <h1>Shopping Cart</h1>
    <div className="row">
      {props.expenses.map((expense) => {
        return <ExpenseListItem key={expense.id} {...expense} />;
      })}
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: selectExpenses(state.expenses, state.filters)
  };
};

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

export default connect(mapStateToProps)(ExpenseList);
