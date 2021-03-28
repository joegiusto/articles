import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link'

import ROUTES from '../../../components/constants/routes';

const Page = () => (
    <div style={{height: '100vh', marginTop: '-50px'}} className="container">
        <div className="row h-100 justify-content-center">
            <div className="col-sm-6 my-auto">
                <div className="card card-block p-5">
                <h1>Jobs</h1>
                <p>This will be the place we will put any future job postings.</p>
                </div>
            </div>
        </div>
    </div>
  );
  
  export default Page 