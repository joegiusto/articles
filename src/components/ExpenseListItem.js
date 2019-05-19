import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({ id, description, size, amount, createdAt }) => (
  <div className="col-12 col-sm-6 col-md-4">
<div className="bg-white shadow-sm rounded">
      <Link to={`/edit/${id}`}>
        <h3>{description}</h3>
      </Link>
      <p>Size - {size}</p>
      <p>${amount / 100}</p>
      <p>Added On - {createdAt = moment().format('LL')}</p>
</div>
  </div>
);

export default ExpenseListItem;
