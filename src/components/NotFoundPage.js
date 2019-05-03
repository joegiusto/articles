import React from 'react';
import { Link } from 'react-router-dom';
import errorPageImage from '../images/404.jpg';

const NotFoundPage = () => (
  <div className='container text-center'>
    <img className="img-fluid" src={errorPageImage} alt=""/>
    <h2>404</h2>
    <p>Page not found, pleae check the web address and try again</p>
    <Link className="btn btn-black" to="/">Go home</Link>
  </div>
);

export default NotFoundPage;
