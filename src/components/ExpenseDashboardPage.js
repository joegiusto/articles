import React from 'react';
import ExpenseList from './ExpenseList';
import EmployeeListt from './EmployeeListt';
import ExpenseListFilters from './ExpenseListFilters';
import { Link } from "react-router-dom";

const ExpenseDashboardPage = () => (
  <div className="container">

    <ExpenseListFilters />

    <ExpenseList />

    {/* <EmployeeListt /> */}

    <Link to='checkout'><button className='btn btn-dark mb-5'>Checkout</button></Link>
  </div>
);

export default ExpenseDashboardPage;
