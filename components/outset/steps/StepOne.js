import React, { Component, useState } from 'react';

import moment from 'moment';
import axios from 'axios';

// import { Manager, Reference, Popper } from 'react-popper';

// import Popper from 'react-bootstrap/Popper';
// import Popover from 'react-bootstrap/Popover';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import PhoneInput from 'react-phone-number-input/input'
// import Cleave from 'cleave.js/react';

import ProfilePhoto from 'components/user/ProfilePhoto';

const StepOne = (props) => (
    <div className="outset-step-one outset-details-scroll" style={{paddingLeft: '5px', paddingRight: '5px'}}>

        <div className="form-row">

            <div className="top">

                <ProfilePhoto changeFocus={props.changeFocus} user_id={props.user_id}/>

                <div className="grow">
                    <div className="form-row">

                        <div className="col-md-12 mb-3">
                            <label htmlFor="validationTooltip01">First Name</label>
                            <input onFocus={() => (props.changeFocus('first_name'))} type="text" className="form-control" id="validationTooltip01" onChange={(e) => props.handleChange(e)} name="first_name" value={props.first_name} required/>
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>

                        <div className="col-md-12 mb-3">
                            <label htmlFor="validationTooltip02">Last Name</label>
                            <input onFocus={() => (props.changeFocus('last_name'))} type="text" className="form-control" id="validationTooltip02" onChange={(e) => props.handleChange(e)} name="last_name" value={props.last_name} placeholder={""}/>
                            <div className="valid-tooltip">
                                Looks good!
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* <StepOneProfilePhoto changeFocus={props.changeFocus} user_id={props.user_id}/> */}

            {/* <div className="col-12 col-md-auto w-100 mb-3">
                <Example {...props}></Example>
            </div> */}

            <div className="div w-100"></div>

            {/* <div className="col-md-6 mb-3">
                <label htmlFor="validationTooltip01">First name</label>
                <input onFocus={() => (props.changeFocus('first_name'))} type="text" className="form-control" id="validationTooltip01" onChange={(e) => props.handleChange(e)} name="first_name" value={props.first_name} required/>
                <div className="valid-tooltip">
                Looks good!
                </div>
            </div> */}

            {/* <div className="col-md-6 mb-3">
                <label htmlFor="validationTooltip02">Last name</label>
                <input onFocus={() => (props.changeFocus('last_name'))} type="text" className="form-control" id="validationTooltip02" onChange={(e) => props.handleChange(e)} name="last_name" value={props.last_name} placeholder={""}/>
                <div className="valid-tooltip">
                Looks good!
                </div>
            </div> */}

        </div>

        <div className="form-row justify-content-center">

            <div className="col-lg-6">

                <div className="form-row">
                    <div className="col-lg-12">
                        <div className="form-group articles">
                            <label htmlFor="first_name">Address Line One</label>
                            <input className="form-control with-label" name="first_name" id="address" type="text" value={props.address?.lineOne} />
                        </div>
                    </div>
        
                    <div className="col-lg-12">
                        <div className="form-group articles">
                            <label htmlFor="last_name">Address Line Two</label>
                            <input className="form-control with-label" name="last_name" id="address" type="text" value={props.address?.lineTwo} />
                        </div>
                    </div>
                </div>
                
            </div>

            <div className="col-lg-6">

                <div className="form-row">
                    
                    <div className="col-lg-12">
                        <div className="form-group articles">
                            <label htmlFor="last_name">City / Town</label>
                            <input className="form-control with-label" name="last_name" id="address" type="text" value={props.address?.city} />
                        </div>
                    </div>
        
                    <div className="col-lg-6">
                        <div className="form-group articles">
                            <label htmlFor="last_name">State</label>
                            <input className="form-control with-label" name="last_name" id="address" type="text" value={props.address?.state} />
                        </div>
                    </div>
        
                    <div className="col-lg-6">
                        <div className="form-group articles">
                            <label htmlFor="last_name">Zip</label>
                            <input className="form-control with-label" name="last_name" id="address" type="text" value={props.address?.zip} />
                        </div>
                    </div>
                    
                </div>

            </div>

        </div>

        <div className="form-row">

        <div className="col-md-3 mb-3">
            <label htmlFor="validationTooltip05">Zip</label>
            <input onBlur={() => props.onZipBlur(props.zip)} onFocus={() => (props.changeFocus('zip'))} type="zip" className={"form-control" + (props.highlightElement === 'location' ? ' outset-highlight' : '')} id="validationTooltip05" onChange={(e) => props.handleChange(e)} name="zip" value={props.zip} placeholder=""/>
            <div className="invalid-tooltip">
            Please provide a valid zip.
            </div>
        </div>

        <div className="col-1 d-none d-md-block">
            <label htmlFor="validationTooltip03">&nbsp;</label>
            <div style={{
            padding: '0.375rem 0',
            textAlign: 'center'
            }}>Or</div>
        </div>

        <div className="col-md-5 mb-3">
            <label htmlFor="validationTooltip03">City / Town / Village</label>
            <input onFocus={() => (props.changeFocus('city'))} type="text" className={"form-control" + (props.highlightElement === 'location' ? ' outset-highlight' : '')} id="validationTooltip03" onChange={(e) => props.handleChange(e)} name="city" value={props.city} placeholder=""/>
            <div className="invalid-tooltip">
            Please provide a valid city.
            </div>
        </div>

        <div className="col-md-3 mb-3">
            <label htmlFor="validationTooltip04">State</label>
            <input onFocus={() => (props.changeFocus('state'))} type="text" className={"form-control" + (props.highlightElement === 'location' ? ' outset-highlight' : '')} id="validationTooltip04" onChange={(e) => props.handleChange(e)} name="state" value={props.state} placeholder=""/>
            <div className="invalid-tooltip">
            Please provide a valid state.
            </div>
        </div>
        
        </div>

        <div className="form-row">
        
        <div className="col-md-6 mb-3">
            <label htmlFor="validationTooltip03">Cell</label>
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
            <label htmlFor="Birthday">Birthday </label>
            {/* <Cleave
            placeholder=""
            options={{date: true, delimiter: '/', datePattern: ['m','d','Y']}}
            className={"form-control" + (props.highlightElement === 'age' ? ' outset-highlight' : '')}
            onFocus={() => (props.changeFocus('age'))}
            onChange={(e) => props.handleChange(e)}
            value={props.age}
            name="age"
            /> */}
            <small className="pl-2" style={{fontSize: '10px'}}>DD/MM/YYYY</small>
        </div>

        {/* <div className="col-md-3 mb-3">
            <label htmlhtmlFor="validationTooltip04">Age</label>
            <input onFocus={() => (props.changeFocus('age'))} type="number" className={"form-control" + (props.highlightElement === 'age' ? ' outset-highlight' : '')} id="validationTooltip04" onChange={(e) => props.handleChange(e)} name="age" value={props.age} placeholder=""/>
            <div className="invalid-tooltip">
            Please provide a valid state.
            </div>
        </div> */}

        <div className="col-md-3 mb-3">
            <label htmlFor="validationTooltip04">Gender</label>
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

    </div>
)

export default StepOne;