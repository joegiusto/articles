import React, { useState } from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import PhoneInput from 'react-phone-number-input/input'
import Cleave from 'cleave.js/react';

class MyComponent extends React.Component {
  onChange(event) {

      // formatted pretty value
      console.log(event.target.value);

      // raw value
      console.log(event.target.rawValue);
  }

  render() {
      return (
          <Cleave placeholder="Enter your credit card number"
              options={{date: true, delimiter: '-', datePattern: ['m','d','Y']}}
              onChange={this.onChange.bind(this)}
              className="form-control" />
      );
  }
}

function Example(props) {
  const [shouldShowElement, setShouldShowElement] = useState(false);

  return (
  <Manager>
    <Reference>
      {({ ref }) => (
        // <button className="btn btn-primary" type="button" ref={ref} onMouseEnter={() => {setShouldShowElement(true)}} onMouseLeave={() => {setShouldShowElement(false)}}>
        //   Reference element
        // </button>

        <div ref={ref} onMouseEnter={() => {setShouldShowElement(true)}} onMouseLeave={() => {setShouldShowElement(false)}}>
          <label for="validationTooltip02">Email</label>
          <input disabled onFocus={() => (props.changeFocus('email'))} type="text" className="form-control" id="validationTooltip03" placeholder={props.authUser.email}/>
          <div className="valid-tooltip">
            Looks good!
          </div>
        </div>
      )}
    </Reference>
    {shouldShowElement ? (
      <Popper placement="right">
      {({ ref, style, placement, arrowProps }) => (
        <div className="popper-help-wrap" ref={ref} style={style} data-placement={placement}>
          <div className="popper-help">
            You can not change your email at this time, if this is incorrect please restart.
          </div>
          <div ref={arrowProps.ref} style={arrowProps.style} />
        </div>
      )}
    </Popper>
    ) : null}
    
  </Manager>
  )
}

const StepOne = (props) => (
  <>

  <div className="dual-header d-none">
    <h2>General Info</h2>
    <h5>Step 1/{props.totalSteps}</h5>
  </div>

  <div className="form-row">
    <div className="col-md-4 mb-3">
      <label for="validationTooltip01">First name</label>
      <input onFocus={() => (props.changeFocus('firstName'))} type="text" className="form-control" id="validationTooltip01" onChange={(e) => props.handleChange(e)} name="nameFirst" value={props.nameFirst} placeholder={"George"} required/>
      <div className="valid-tooltip">
        Looks good!
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <label for="validationTooltip02">Last name</label>
      <input onFocus={() => (props.changeFocus('lastName'))} type="text" className="form-control" id="validationTooltip02" onChange={(e) => props.handleChange(e)} name="nameLast" value={props.nameLast} placeholder={"Washington"}/>
      <div className="valid-tooltip">
        Looks good!
      </div>
    </div>

    <div className="col-md-4 mb-3">
      <Example {...props}></Example>
    </div>

  </div>

  <div className="form-row">
    <div className="col-md-6 mb-3">
      <label for="validationTooltip03">City / Town / Village</label>
      <input onFocus={() => (props.changeFocus('city'))} type="text" class={"form-control" + (props.highlightElement === 'location' ? ' outset-highlight' : '')} id="validationTooltip03" onChange={(e) => props.handleChange(e)} name="city" value={props.city} placeholder="Mount Vernon"/>
      <div className="invalid-tooltip">
        Please provide a valid city.
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label for="validationTooltip04">State</label>
      <input onFocus={() => (props.changeFocus('state'))} type="text" class={"form-control" + (props.highlightElement === 'location' ? ' outset-highlight' : '')} id="validationTooltip04" onChange={(e) => props.handleChange(e)} name="state" value={props.state} placeholder="VA"/>
      <div className="invalid-tooltip">
        Please provide a valid state.
      </div>
    </div>
    <div className="col-md-3 mb-3">
      <label for="validationTooltip05">Zip</label>
      <input onBlur={() => props.onZipBlur(props.zip)} onFocus={() => (props.changeFocus('zip'))} type="zip" class={"form-control" + (props.highlightElement === 'location' ? ' outset-highlight' : '')} id="validationTooltip05" onChange={(e) => props.handleChange(e)} name="zip" value={props.zip} placeholder="22309"/>
      <div className="invalid-tooltip">
        Please provide a valid zip.
      </div>
    </div>
  </div>

  <div className="form-row">
    
    <div className="col-md-6 mb-3">
      <label for="validationTooltip03">Cell</label>
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png" style={{marginRight: '2px'}} height="10px"/></div>
        </div>
        
        {/* <input onFocus={() => (props.changeFocus('cell'))} type="tel" className="form-control" id="inlineFormInputGroup" onChange={(e) => props.handleCellTwo(e)} name="cell" value={props.cell} placeholder="000-000-0000"/> */}
        
        <PhoneInput
          placeholder="Enter phone number"
          country="US"
          className="form-control"
          type="tel"
          onFocus={() => (props.changeFocus('cell'))}
          value={ props.cell }
          onChange={ value => props.setCell(value) }
        />

      </div>
      <div className="invalid-tooltip">
        Please provide a valid city.
      </div>
    </div>

    <div className="col-md-3 mb-3">
      <label htmlFor="Birthday">Birthday</label>
      {/* <MyComponent></MyComponent> */}
      <Cleave placeholder=""
              options={{date: true, delimiter: '-', datePattern: ['m','d','Y']}}
              // onChange={this.onChange.bind(this)}
              className={"form-control" + (props.highlightElement === 'age' ? ' outset-highlight' : '')}
              onFocus={() => (props.changeFocus('age'))}
              onChange={(e) => props.handleChange(e)}
              value={props.age}
              name="age"
              />
    </div>

    {/* <div className="col-md-3 mb-3">
      <label htmlFor="validationTooltip04">Age</label>
      <input onFocus={() => (props.changeFocus('age'))} type="number" class={"form-control" + (props.highlightElement === 'age' ? ' outset-highlight' : '')} id="validationTooltip04" onChange={(e) => props.handleChange(e)} name="age" value={props.age} placeholder=""/>
      <div className="invalid-tooltip">
        Please provide a valid state.
      </div>
    </div> */}

    <div className="col-md-3 mb-3">
      <label for="validationTooltip04">Gender</label>
      <select onFocus={() => (props.changeFocus('gender'))} onChange={(e) => (props.handleChange(e))} value={props.gender} className="form-control" name="gender" id="">
        <option value="">Choose</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Non-Binary</option>
      </select>
      <div className="invalid-tooltip">
        Please provide a valid state.
      </div>
    </div>

  </div>

  </>
)

export default StepOne;