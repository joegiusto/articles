import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import { Link } from "react-router-dom";

const ExpenseDashboardPage = () => (
  <div className="container">
    <ExpenseListFilters />
    <ExpenseList />
    <button className='btn btn-dark'><Link to='checkout'>Checkout</Link></button>
  </div>
);

export default ExpenseDashboardPage;
