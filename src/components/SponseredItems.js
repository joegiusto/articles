import React from 'react';
import StoreItem from './StoreItem';

export function One() {
  return (
    <div className="row text-center">
      <div className="col-3"><div className='mb-3 mt-5' style={{width: '100px', height: '100px', backgroundColor: 'white'}}></div></div>
      <div className="col-3"><div className='mb-3 mt-5' style={{width: '100px', height: '100px', backgroundColor: 'white'}}></div></div>
      <div className="col-3"><div className='mb-3 mt-5' style={{width: '100px', height: '100px', backgroundColor: 'white'}}></div></div>
      <div className="col-3"><div className='mb-3 mt-5' style={{width: '100px', height: '100px', backgroundColor: 'white'}}></div></div>
      <div className="col-3"><div className='mb-3' style={{width: '100px', height: '100px', backgroundColor: 'white'}}></div></div>
      <div className="col-3"><div className='mb-3' style={{width: '100px', height: '100px', backgroundColor: 'white'}}></div></div>
      <div className="col-3"><div className='mb-3' style={{width: '100px', height: '100px', backgroundColor: 'white'}}></div></div>
      <div className="col-3"><div className='mb-3' style={{width: '100px', height: '100px', backgroundColor: 'white'}}></div></div>
    </div>
  )
}

export function Two() {
  return (
    <div className="slick-container text-center">
      <div className="mr-5 d-inline"><StoreItem catalogId='4' price={2000} title="Sponsered Item" banner="Sponsered" color="danger"/></div>
      <StoreItem catalogId='5' price={2000} title="Sponsered Item" banner="Sponsered" color="primary"/>
    </div>
  )
}

export function Three() {
  return (
    <div style={{color: 'white'}}>
      Example of the  future Apparel component
    </div>
  )
}

export function Four() {
  return (
    <div style={{color: 'white'}}>
      Example of the  future Membership component
    </div>
  )
}