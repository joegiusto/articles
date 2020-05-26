import React, { useState } from 'react';

export function ClothingTable () {
  return (
  <>
    <div className="full-table">
      <table className='table articles-table table-sm table-hover table-bordered'>
        <thead>
          <tr className="table-articles-head">
            {/* <th scope="col">Order #</th> */}
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Order Summary</th>
            <th className='text-right' scope="col">Total</th>
          </tr>
        </thead>
        <tbody>

          <tr>
            <td colspan="4">
              <div className="mx-auto">No clothing sales yet to report.</div>
            </td>
          </tr>

          {/* {sales.map((object, i) =>

            <tr key={i} className="bg-light">
              <td>{object.date || 'test'}</td>
              <td>{object.name}</td>
              <td>{object.note}</td>
              <td className='text-right'>${object.total.toFixed(2)}</td>
            </tr>

          )} */}

          <tr>
            <td colSpan="2" className="border-right-0 table-articles-head">

                <div className="results-dual-header">

                  {/* <div className="page noselect">
                    <i className="fas fa-chevron-circle-left"></i>
                    Page 0/0
                    <i style={{marginLeft: '10px'}} className="fas fa-chevron-circle-right"></i>
                  </div> */}
                
                  {/* <span className="results noselect">
                    <span>Results:</span>
                    <span className={"result result-active"}>10</span>
                    <span className={"result"}>50</span>
                    <span className={"result"}>100</span>
                    <span className={"result"}>250</span>
                  </span> */}

                </div>

            </td>

            <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
            <td colSpan="1" className="border-left-0 table-articles-head">$00.00</td>
          </tr>

        </tbody>

      </table>
    </div>
    <div className="pl-2 pb-2 d-none">Preorder and unfinalized sales are not included in any reports.</div>
    </>
  )
}

