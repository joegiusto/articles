import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'
import moment from 'moment'

import AdminLayout from '../../components/layouts/admin.js';

function Presidents(props) {
    const [presidents, setPresidents] = useState([]);
  
    const [president_id, setPresidentID] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [photo, setPhoto] = useState('');
    const [terms, setTerms] = useState([]);
  
    useEffect(() => {
  
    //   props.setLocation(props.tabLocation);
      
      axios.get('/api/getPresidents', {
  
      })
      .then( (response) => {
        console.log(response)
        
        setPresidents(response.data);
      })
      .catch( (error) => {
        console.log(error);
      });
  
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
  
    useEffect(() => {
  
      if (president_id !== '') {
  
        console.log(president_id)
  
        axios.post('/api/getPresident', {
          president_id
        })
        .then( (response) => {
          console.log(response)
          setFirstName(response.data.first_name)
          setLastName(response.data.last_name)
          setPhoto(response.data.photo)
          setTerms( Array.isArray(response.data.terms) ? response.data.terms : [] )
        })
        .catch( (error) => {
          console.log(error);
        });
  
      }
  
    }, [president_id]);
  
    function addPresident() {
  
      axios.post('/api/secure/addPresident', {
        first_name,
        last_name,
        photo
      })
      .then( (response) => {
        console.log(response)
        setFirstName('')
        setLastName('')
        setTerms([])
        setPhoto('')
      })
      .catch( (error) => {
        console.log(error);
      });
  
    }
  
    function cancel() {
      setPresidentID('')
      setFirstName('')
      setLastName('')
      setTerms([])
      setPhoto('')
      props.history.push(ROUTES.ADMIN_PRESIDENTS);
    }
    
    return (
        <section className="admin-page admin-presidents">

            <Head>
                <title>Admin Presidents - Articles</title>
            </Head>
    
            <div className="main w-100">
    
            <div className="presidents-container card">
        
                <div className="container">
                <h1>Manage Presidents</h1>
                <p>Click a president to manage their details</p>
            
                <div className="presidents">
                    {presidents.map((president) => 
        
                    <Link to={`${ROUTES.ADMIN_PRESIDENTS}/${president._id}`} onClick={() => setPresidentID(president._id)}>
                        <PresidentCard president={president}/>
                    </Link>
        
                    )}
                </div>
                </div>
        
            </div>
        
            <div className="manage-president container">
        
                <div className="p-3">
                <div className="form-group articles">
                    <label for="address">First Name</label>
                    <input className="form-control with-label" onChange={e => setFirstName(e.target.value)} name="first_name" id="first_name" type="text" value={first_name}/>
                </div>
        
                <div className="form-group articles">
                    <label for="address">Last Name</label>
                    <input className="form-control with-label" onChange={e => setLastName(e.target.value)} name="last_name" id="last_name" type="text" value={last_name}/>
                </div>
        
                <div className="form-group articles">
                    <label for="address">Photo</label>
                    <input className="form-control with-label" onChange={e => setPhoto(e.target.value)} name="photo" id="photo" type="text" value={photo}/>
                </div>
    
                <div className="card mb-3">
                    <div className="card-body">
    
                    {terms.map(term => 
                        <div className="mb-3">
    
                        <div className="d-flex d-flex-lg-row align-items-center">
    
                            <i className="far fa-edit"></i>
    
                            <div>
                            <div>{moment(term.start_date).format("LL")} - {moment(term.end_date).format("LL")}</div>
                            <div>{term.party}</div>
                            </div>
    
                        </div>
    
                        </div>
                    )}
    
                    <div className="row">
    
                        <div className="col-md-6">
                        <div className="form-group articles">
                            <label for="start_date">Start Date</label>
                            <input className="form-control with-label" name="start_date" id="start_date" type="text"/>
                        </div>
                        </div>
    
                        <div className="col-md-6">
                        <div className="form-group articles">
                            <label for="end_date">End Date</label>
                            <input className="form-control with-label" name="end_date" id="end_date" type="text"/>
                        </div>
                        </div>
    
                        <div className="col-md-6">
                        <div className="form-group articles">
                            <label for="party">Party</label>
                            <input className="form-control with-label" name="party" id="party" type="text"/>
                        </div>
                        </div>
    
                    </div>
    
                    <button className="btn btn-articles-light">Add Term</button>
    
                    </div>
                </div>
    
                <button onClick={() => cancel()} className="btn btn-articles-light">Cancel</button>
                <button onClick={() => addPresident()} className="btn btn-articles-light">Add</button>
    
                </div>
        
            </div>
    
            </div>
    
        </section>
    );
}

Presidents.Layout = AdminLayout;
export default Presidents