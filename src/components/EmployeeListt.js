import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
// import selectExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
  <div>
    <h1>Employee List</h1>
    <div className="row">
      {props.employees.map((employee) => {
        return <ExpenseListItem key={employee.id} {...employee} />;
      })}
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    employees: state.employees
  };
};

export default connect(mapStateToProps)(ExpenseList);
