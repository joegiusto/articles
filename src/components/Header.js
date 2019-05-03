import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className='container'>
    <h1>Articles</h1>
    <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
    {/*<NavLink to="/create" activeClassName="is-active">Create Expense</NavLink>*/}
    <NavLink to="/cart" activeClassName="is-active">Cart</NavLink>
    <NavLink to="/help" activeClassName="is-active">Help</NavLink>
  </header>
);

export default Header;
