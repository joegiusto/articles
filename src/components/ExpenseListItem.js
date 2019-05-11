import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({ id, description, size, amount, createdAt }) => (
  <div>
    <Link to={`/edit/${id}`}>
      <h3>{description}</h3>
    </Link>
    <p>Size - {size}</p>
    <p>${amount / 100}</p>
    <p>Added On - {createdAt = moment().format('LL')}</p>
  </div>
);

export default ExpenseListItem;
