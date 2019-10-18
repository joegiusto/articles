import React from 'react';

const StepOne = (props) => (
  <>

  <div className="dual-header d-none">
    <h2>General Info</h2>
    <h5>Step 1/{props.totalSteps}</h5>
  </div>

  <div class="form-row">
    <div class="col-md-4 mb-3">
      <label for="validationTooltip01">First name</label>
      <input onFocus={() => (props.changeFocus('firstName'))} type="text" class="form-control" id="validationTooltip01" onChange={(e) => props.handleChange(e)} name="nameFirst" value={props.nameFirst} placeholder={"George"} required/>
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <label for="validationTooltip02">Last name</label>
      <input onFocus={() => (props.changeFocus('lastName'))} type="text" class="form-control" id="validationTooltip02" onChange={(e) => props.handleChange(e)} name="nameLast" value={props.nameLast} placeholder={"Washington"}/>
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>

    <div class="col-md-4 mb-3">
      <label for="validationTooltip02">Email</label>
      <input onFocus={() => (props.changeFocus('email'))} disabled type="text" class="form-control" id="validationTooltip03" placeholder={props.authUser.email}/>
      <div class="valid-tooltip">
        Looks good!
      </div>
    </div>
  </div>

  <div class="form-row">
    <div class="col-md-6 mb-3">
      <label for="validationTooltip03">City</label>
      <input onFocus={() => (props.changeFocus('city'))} type="text" class="form-control" id="validationTooltip03" onChange={(e) => props.handleChange(e)} name="city" value={props.city} placeholder="Mount Vernon"/>
      <div class="invalid-tooltip">
        Please provide a valid city.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationTooltip04">State</label>
      <input onFocus={() => (props.changeFocus('state'))} type="text" class="form-control" id="validationTooltip04" onChange={(e) => props.handleChange(e)} name="state" value={props.state} placeholder="VA"/>
      <div class="invalid-tooltip">
        Please provide a valid state.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationTooltip05">Zip</label>
      <input onFocus={() => (props.changeFocus('zip'))} type="zip" class="form-control" id="validationTooltip05" placeholder="22309"/>
      <div class="invalid-tooltip">
        Please provide a valid zip.
      </div>
    </div>
  </div>

  <div class="form-row mt-5 pt-5">
    <div class="col-md-6 mb-3">
      <label for="validationTooltip03">Cell</label>
      <div class="input-group mb-2">
        <div class="input-group-prepend">
          <div class="input-group-text"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1280px-Flag_of_the_United_States.svg.png" style={{marginRight: '2px'}} height="10px"/>+1</div>
        </div>
        <input onFocus={() => (props.changeFocus('cell'))} type="tel" name="phone" class="form-control" id="inlineFormInputGroup" placeholder="000-000-0000"/>
      </div>
      <div class="invalid-tooltip">
        Please provide a valid city.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationTooltip04">Age</label>
      <input onFocus={() => (props.changeFocus('age'))} type="number" class="form-control" id="validationTooltip04" placeholder=""/>
      <div class="invalid-tooltip">
        Please provide a valid state.
      </div>
    </div>
    <div class="col-md-3 mb-3">
      <label for="validationTooltip04">Gender</label>
      <select onFocus={() => (props.changeFocus('gender'))} className="form-control" name="gender" id="">
        <option value=""></option>
        <option value="Male"></option>
        <option value="Female"></option>
        <option value="Other"></option>
      </select>
      <div class="invalid-tooltip">
        Please provide a valid state.
      </div>
    </div>
  </div>

  </>
)

export default StepOne;