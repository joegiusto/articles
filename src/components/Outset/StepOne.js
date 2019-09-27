import React from 'react';

const StepOne = (props) => (
  <>
    <div className="dual-header">
      <h2>General Info</h2>
      <h5>Step 1/{props.totalSteps}</h5>
    </div>
    <hr/>

    <div className="outset-form-group">
      <div className="name">First Name:</div>
      <input type="text" onFocus={() => (props.changeFocus("firstName"))} value={props.authUser.nameFirst}/>
    </div>

    <div className="outset-form-group">
      <div className="name">Last Name:</div>
      <input type="text" onFocus={() => (props.changeFocus("lastName"))} value={props.authUser.nameLast}/>
    </div>

    <div className="row">

      <div className="col-3">
        <div className="outset-form-group">
          <div className="name">Age:</div>
          <input type="number" onFocus={() => (props.changeFocus("age"))} placeholder=""/>
        </div>
      </div>

      <div className="col-5">
        <div className="outset-form-group">
          <div className="name">Zip Code:</div>
          <input type="number" onFocus={() => (props.changeFocus("zip"))} placeholder=""/>
        </div>
      </div>

      <div className="col-4">
        <div className="outset-form-group">
          <div className="input-guess-explanation"></div>
          <div className="name">State:</div>
          
          <div className="input-guess">
            <input className="input-guess-input" type="number" onFocus={() => (props.changeFocus("state"))} placeholder="NY"></input>
            <span className="input-guess-explanation d-none">
              ?
              <div className="input-guess-explanation-content">We can explain: <p>We got this info from your IP.</p></div>
            </span>
          </div>

        </div>
      </div>

    </div>
  </>
)

export default StepOne;