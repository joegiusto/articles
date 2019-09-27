import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization, withEmailVerification } from '../Session';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { auth } from 'firebase';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

import * as outsetPhotos from './outsetPhotos';

class OutsetBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,

      // If more steps are added change this
      totalSteps: 5,
      focus: '',

      // Step One States
      nameFirst: '',
      nameLast: '',
      age: '',
      zip: '',
      state: '',

      // Step Two States
      shirtSize: '',
      shoeSize: '',

      // Step Three States
      subscribitions: [],

      // Step Four States
      partyAffiliation: '',

      // Step Five States
      privacyAccept: false,
      TermsAccept: false,
    };

    this.changeFocus = this.changeFocus.bind(this);
  }

  onChange = event => {
    console.log(event);
    this.setState({ [event.target.name]: event.target.value });
  };

  changeShirtSize = size => {
    this.setState({ shirtSize: size });
  };

  changeShoeSize = size => {
    this.setState({ shoeSize: size });
  };

  changeParty = party => {
    this.setState({ partyAffiliation: party });
  };

  increment() {
    this.setState({step: this.state.step + 1 })
  }

  decrement() {
    this.setState({step: this.state.step - 1 })
  }

  changeFirst(newValue) {
    this.setState({
      nameFirst: newValue,
    });
  }

  log(string) {
    console.log(string);
  }

  changeFocus(focus) {
    this.setState({
      focus: focus,
    });
  }

  renderReasonForInformation(focus) {
    switch(focus) {
      // Arrow Click
      case 'step-one':
        return ""
      case 'step-two':
        return "Clothing"
      case 'step-three':
        return ""
      case 'step-four':
        return ""
      case 'step-five':
        return ""

      // Input Click
      case 'firstName':
        return "We use this information to address you across the site and in emails"
      case 'lastName':
        return "Again, we use this information to address you across the site and in emails. This one is optional by the way, only boxes with red are required but the more you fill out the better we can talior an experence to you."
      case 'age':
        return "Using your age we can reccomend popular topics amongst others your age and get an idea of our user base."
      case 'zip':
        return "Like age, we use this to reccomend popular stories in your area and so we know more about our users."
      default:
        return "Some quick questions before you get started. We will display relavent info about what you are filling out in this box."
    }
  }

  canShow(size) {
    if (size.match( /^(OTHER|2XL|3XL|4XL|SKIP)$/ ) )  {
      return true
    }
    else {
      return false
    }
  }

  renderStep(step, authUser) {
    switch(step) {
      case 0: 
        return (
          null
        )
      case 1: 
        // General Information
        return (
          <StepOne totalSteps={this.state.totalSteps} changeFocus={this.changeFocus} authUser={authUser}/>
        )
      case 2:
        // Clothing Information
        return (
          <StepTwo canShow={this.canShow(this.state.shirtSize)} totalSteps={this.state.totalSteps} log={this.log} shoeSize={this.state.shoeSize} shirtSize={this.state.shirtSize} changeShoeSize={this.changeShoeSize} changeShirtSize={this.changeShirtSize} action={this.onChange}/>
        )
      case 3:
        // News Information
        return (
          <StepThree totalSteps={this.state.totalSteps} />
        )
      case 4:
        // Party Information
        return (
          <StepFour totalSteps={this.state.totalSteps} party={this.state.partyAffiliation} changeParty={this.changeParty}/>
        )
      case 5:
        // Privacy Information
        return (
          <StepFive log={this.log} hhtotalSteps={this.state.totalSteps}/>
        )
      default:
        return 'Error detected, we have automaticlly captured the problem and will check on this soon. Please come back later.'
    }
  }

  render() {
    return (
    <AuthUserContext.Consumer>

      {authUser => (

        <div className="larger-conainer">

          <div className={"background-images step-" + this.state.step}>

            {/* Step Zero */}
            <img className="join" src={outsetPhotos.join} alt=""/>
            <img className="liberty" src={outsetPhotos.liberty} alt=""/>
            <img className="voice" src={outsetPhotos.voice} alt=""/>
            <img className="sam" src={outsetPhotos.sam} alt=""/>
            <img className="power" src={outsetPhotos.power} alt=""/>
            <img className="tread" src={outsetPhotos.tread} alt=""/>
            <img className="occupy" src={outsetPhotos.occupy} alt=""/>
            <img className="george" src={outsetPhotos.george} alt=""/>
            <img className="martin" src={outsetPhotos.martin} alt=""/>

            {/* Step One */}
            <img className="fingers" src={outsetPhotos.fingers} alt=""/>
            <img className="mistletoe" src={outsetPhotos.mistletoe} alt=""/>
            <img className="saw" src={outsetPhotos.saw} alt=""/>
            <img className="yinyang" src={outsetPhotos.yinyang} alt=""/>
            <img className="peace" src={outsetPhotos.peace} alt=""/>
            <img className="technocrat" src={outsetPhotos.technocrat} alt=""/>
            <img className="eagle" src={outsetPhotos.eagle} alt=""/>
            <img className="think" src={outsetPhotos.think} alt=""/>
            <img className="wallStreet" src={outsetPhotos.wallStreet} alt=""/>

            {/* Step Two */}
            <img className="flappers" src={outsetPhotos.flappers} alt=""/>
            <img className="styleMain" src={outsetPhotos.styleMain} alt=""/>
            <img className="styleHat" src={outsetPhotos.styleHat} alt=""/>
            <img className="styleShoe" src={outsetPhotos.styleShoe} alt=""/>

            {/* Step Three */}


            {/* Step Four */}
            <img className="fatCats" src={outsetPhotos.fatCats} alt=""/>
            <img className="jerkAndCreeps" src={outsetPhotos.jerkAndCreeps} alt=""/>
            <img className="shitParty" src={outsetPhotos.shitParty} alt=""/>
            <img className="slowingDown" src={outsetPhotos.slowingDown} alt=""/>

          </div>
  
          <div className="outset-wrapper">
            <div className="container container-custom mx-auto">
  
              <div className={"walkthrough-box-clip-path-hides-box-shadow-work-around " + (this.state.step > 0 ? 'to-top' : '')}>
                <div className={"walkthrough-box " + (this.state.step > 0 ? 'to-top' : '')}>
    
                  <h1 className={(this.state.step > 0 ? 'shrink' : '')}>{authUser.nameFirst}, that's a nice name.</h1>
    
                  <h5 className="focus-explanation">{this.renderReasonForInformation(this.state.focus)}</h5>
    
                  <button className={"btn btn-lg btn-custom-white" + (this.state.step === 0 ? '' : ' d-none')} onClick={() => (this.increment())}>Start</button>
    
                  <div className="debug-id">ID: {authUser.uid}</div>
                </div>
              </div>
  
              <div className={"steps-box mx-auto " + (this.state.step === 0 ? '' : ' show')}>{this.renderStep(this.state.step, authUser)}</div>

              <div className="bottom-walthrough-container">
                <div className={"bottom-walthrough mx-auto" + (this.state.step === 0 ? '' : ' show')}>
                  <div className="dual-header">
                    
                      <button className={"btn btn-lg btn-custom-white w-100" + (this.state.step > 0 ? '' : ' d-none ') + (this.state.step === 5 ? ' shorten' : '')} disabled={this.state.step === 0} onClick={() => (this.decrement())}> <span>&#8612;</span> </button>
                      <button className={"btn btn-lg btn-custom-white w-100" + (this.state.step > 0 ? '' : ' d-none ') + (this.state.step === 5 ? ' shorten' : '')} disabled={this.state.step === this.state.totalSteps} onClick={() => (this.increment())}> <span>&#8614;</span> </button>

                      <button className={"btn btn-lg btn-custom-white" + (this.state.step === 5 ? '' : ' d-none')} disabled={this.state.step === this.state.totalSteps} onClick={() => (this.increment())}> <span>Finish</span> </button>
                  </div>
                </div>
              </div>
  
            </div>
          </div>

        </div>
      )}

      
    </AuthUserContext.Consumer>
    )
  }
}

const Outset = withFirebase(OutsetBase);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(Outset);