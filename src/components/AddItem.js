import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
  <div>
    <h1>Add Expense</h1>

    <button onClick={(expense) => {
        props.dispatch(addExpense({
          description: "Wolf Sweatshirt",
      note: "Large",
      amount: 3000,
      createdAt: 0
        }));
        // props.history.push('/');
      }}>
      Add Wolf Sweatshirt
    </button>

    <button onClick={(expense) => {
        props.dispatch(addExpense({
          description: "Sheep Sweatshirt",
      note: "Large",
      amount: 3000,
      createdAt: 0
        }));
        // props.history.push('/');
      }}>
      Add Sheep Sweatshirt
    </button>

    <button onClick={(expense) => {
        props.dispatch(addExpense({
          description: "Partner Item",
      note: "Large",
      amount: 1600,
      createdAt: 0
        }));
        // props.history.push('/');
      }}>
      Add Partner Item
    </button>

    {/* <ExpenseForm
      onSubmit={(expense) => {
        props.dispatch(addExpense(expense));
        props.history.push('/');
      }}
    /> */}

  </div>
);

export default connect()(AddExpensePage);