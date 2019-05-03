import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

const ExpenseDashboardPage = () => (
  <div className="container">
    <ExpenseListFilters />
    <ExpenseList />
    <button className='btn btn-dark'>Checkout</button>
  </div>
);

export default ExpenseDashboardPage;
