import React, { Component, useState, useEffect } from 'react';
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

const OutsetBaseWrap = (props) => (
  <AuthUserContext.Consumer>
    {authUser =>
      <Outset authUser={authUser}/>
    }
  </AuthUserContext.Consumer>
);

class OutsetBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,

      // If more steps are added change this
      totalSteps: 5,
      focus: '',

      // Step One States
      nameFirst: props.authUser.nameFirst,
      nameLast: props.authUser.nameLast,
      age: '',
      zip: '',
      city: '',
      state: '',

      // Step Two States
      clothingCut: '', 
      shirtSize: '',
      shoeSize: '',

      // Step Three States
      subscriptions: [],

      // Step Four States
      partyAffiliation: '',

      // Step Five States
      privacyAccept: false,
      termsAccept: false,
      cookieAccept: false,
    };

    this.changeFocus = this.changeFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // console.log(event);
    this.setState({[name]: value});
  }

  changeCut = cut => {
    this.setState({ clothingCut: cut });
  };

  changeShirtSize = size => {
    this.setState({ shirtSize: size });
  };

  toggleSubscriptions = id => {

    if (this.state.subscriptions.indexOf(id) === -1) {
      this.setState({
        subscriptions: [...this.state.subscriptions, id]
      });
    } else {
      var array = [...this.state.subscriptions];
      var index = array.indexOf(id)
      array.splice(index, 1);
      this.setState({subscriptions: array})
    }
    
  }

  changeShoeSize = size => {
    this.setState({ shoeSize: size });
  };

  changeParty = party => {
    this.setState({ partyAffiliation: party });
  };

  changeStep(step) {
    this.setState({step: step })
  }

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
      case 'firstName':
        return "We use your first name to address you across the site and in emails. Only your first name is visble to other users."
      case 'lastName':
        return (<div>Again, we just use your last name to address you across the site and in emails. This will <b>not</b> be visble to other users.</div> )
      case 'city':
        return "We use this info to recommend popular stories in your area and get an idea of where our users live."
      case 'state':
        return "We use this info to recommend popular stories in your area and get an idea of where our users live."
      case 'zip':
        return "We use this info to recommend popular stories in your area and get an idea of where our users live."
      case 'cell':
        return (<span>By entering your cell phone number we can send you minimal updates about whats going on with Articles.<hr/><span style={{fontSize: '0.85rem'}} className="text-muted">If you don't have unlimited texting - Msg rates may apply</span></span>)
      case 'age':
        return "Using your age we can recommend popular stories that others in your age range are subscribed to."
      

      case 'stories-age':
        return ( <div className="intro-message">Using the age you provided in step one we can look up stories that are popular with users in your age group.<hr/>Pick three to start | {this.state.subscriptions.length}/3</div> )
      case 'stories-location':
        return ( <div className="intro-message">Using the loaction you provided in step one we can look up stories that are popular in your area.<hr/>Pick three to start | {this.state.subscriptions.length}/3</div> )
      case 'stories-popular':
        return ( <div className="intro-message">These are stories that are popular amongst users on the site.<hr/>Pick three to start | {this.state.subscriptions.length}/3</div> )
      case 'stories-relevant':
        return ( <div className="intro-message">To get you started we picked a few stories that we find interesting.<hr/>Pick three to start | {this.state.subscriptions.length}/3</div> )
      case 'stories-forgotten':
        return ( <div className="intro-message">With so much happening these days it is easy for people to forget major issues and even easier for corporations to silence news. Here we have issues that the news has gotten quiet on.<hr/>Pick three to start | {this.state.subscriptions.length}/3</div> )
      default:
        return ""
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

  renderTitle(step) {
    switch(step) {
      case 0: 
        return (
          <div className="intro-title">Welcome to Articles!</div>
        )
      case 1:
        return (
          <div className="intro-title">General Info</div>
        )
      case 2: 
        return (
          <div className="intro-title">Clothing Details</div>
        )
      case 3: 
        return (
          <div className="intro-title">News Prefrences</div>
        )
      case 4: 
        return (
          <div className="intro-title">Party Affiliation</div>
        )
      case 5: 
        return (
          <div className="intro-title">Terms and All That...</div>
        )
      default:
       return (
        <div className="done-image-container" style={{height: '100%', position: 'relative'}}>
          <img className="img-fluid" alt="GIF of DMV worker from Zootopia taking forever to stamp" src="https://media0.giphy.com/media/l2JHVUriDGEtWOx0c/giphy.gif"></img>
          {/* <div className="done-image-credit">Property of Walt Disney Studios Motion Pictures</div> */}
        </div>
      )
    }
  }

  renderMessage(step, authUser) {
    switch(step) {
      case 0: 
        return (
          <div className="intro-message">During the outset we ask some questions to better understand you. We share none of this data with other companies. <hr/> <span style={{fontWeight: 'bold'}}>We will explain each piece of info we collect on you and how we use it.</span></div>
        )
      case 1:
        return (
          <div className="intro-message"><b>{this.state.nameFirst}</b>, that's a nice name! We just want to collect a little more information on you. Click an input to learn what we will do with that info.</div>
        )
      case 2: 
        return (
          <div className="intro-message">We sell clothing to help spread our message and to continue development of our site. If you provide us with your clothing details we can prefill your size in the store.</div>
        )
      case 3: 
        return (
          // This one is a little tricky because one of the tabs are visbile at start so we have to show the explanation with the step message.
          <div className="intro-message">We think it's a problem when the news decides what the people see. Pick some stories to subscribe to from the categories provided.<hr/>Using the age you provided in step one we can look up stories that are popular with users in your age group.</div>
        )
      case 4: 
        return (
          <div className="intro-message">At Articles we promote independent thought, it still helps us get to know our users if we know which side you align with. In the future we plan on using this info to recommend stories that might be relevant to you, and to get a better understanding of our users.</div>
        )
      case 5: 
        return (
          <div className="intro-message">Every site has them, if you could just accept the following you will be on your way!</div>
        )
      default:
        // Should always be case 0
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
          <StepOne {...this.state} handleChange={this.handleChange} onChange={this.onChange} changeFocus={this.changeFocus} authUser={authUser}/>
        )
      case 2:
        // Clothing Information
        return (
          <StepTwo canShow={this.canShow(this.state.shirtSize)} totalSteps={this.state.totalSteps} log={this.log} clothingCut={this.state.clothingCut} shoeSize={this.state.shoeSize} shirtSize={this.state.shirtSize} changeCut={this.changeCut} changeShoeSize={this.changeShoeSize} changeShirtSize={this.changeShirtSize} action={this.onChange}/>
        )
      case 3:
        // News Information
        return (
          <StepThree totalSteps={this.state.totalSteps} age={this.state.age} toggleSubscriptions={this.toggleSubscriptions} changeFocus={this.changeFocus}/>
        )
      case 4:
        // Party Information
        return (
          <StepFour totalSteps={this.state.totalSteps} currentParty={this.state.partyAffiliation} changeParty={this.changeParty}/>
        )
      case 5:
        // Privacy Information
        return (
          <StepFive log={this.log} privacyChecked={this.state.privacyAccept} cookieChecked={this.state.cookieAccept} termsChecked={this.state.termsAccept} handleChange={this.handleChange} totalSteps={this.state.totalSteps}/>
        )
      default:
        return (<div className="intro-message text-center">0%<br/>Submitting</div>)
    }
  }

  render() {

    const {
      nameFirst,
      clothingCut,
      shirtSize,
      shoeSize,
      subscriptions,
      partyAffiliation,
      cookieAccept,
      termsAccept,
      privacyAccept,
    } = this.state;

    const stepOneIsInvalid = nameFirst === '';
    const stepTwoIsInvalid = clothingCut === '';
    const stepThreeIsInvalid = subscriptions.length < 3;
    const stepFourIsInvalid = partyAffiliation === '';
    const stepFiveIsInvalid = (cookieAccept && termsAccept && privacyAccept) === false;


    return (
    <AuthUserContext.Consumer>

      {authUser => (

        <div className="larger-conainer">

          {/* <div className="what-i-need"></div> */}

          <div className={"background-images d-none step-" + this.state.step}>

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

          <div className="outset-form my-auto">
            <div className="row">
              
              <div className="col-12 col-md-6">
                {this.renderTitle(this.state.step)}

                {/* NOTE Was for debug purposes, just gonna leave for now */}
                {/* <div><span>Step One:</span> {stepOneIsInvalid ? ' No' : ' Yes'}</div>
                <div><span>Step Two:</span> {stepTwoIsInvalid ? ' No' : ' Yes'}</div>
                <div><span>Step Three:</span> {stepThreeIsInvalid ? ' No' : ' Yes'}</div>
                <div><span>Step Four:</span> {stepFourIsInvalid ? ' No' : ' Yes'}</div>
                <div><span>Step Five:</span> {stepFiveIsInvalid ? ' No' : ' Yes'}</div> */}

                {this.state.focus === '' ? 
                  this.renderMessage(this.state.step, authUser)
                : 
                  ''
                }

                <div className="intro-message">{this.renderReasonForInformation(this.state.focus)}</div>
              </div>

              <div className="col-12 col-md-6 m-auto">

                {this.state.step === 0 ?
                  <div className="done-image-container" style={{height: '100%', position: 'relative'}}>
                    <img alt="GIF of man riding horse into sunset holding American Flag" className="img-fluid" src="https://media2.giphy.com/media/C1L8yq5ZEz0cg/source.gif"></img>
                  </div>
                  // <div className="intro-placeholder-container">
                  //   <span className="intro-placeholder-text">Questions will appear here</span>
                  // </div>
                  :
                  this.renderStep(this.state.step, authUser)
                }

              </div>

            </div>

            <div className={"step-count" + (this.state.step === 0 ? ' d-none' : this.state.step === 6 ? ' d-none' : '')}>
              <span>Step </span>
              <span>{this.state.step + '/' + this.state.totalSteps}</span>
            </div>

            <div className="step-controls">
                <button className={"btn btn-lg btn-articles-light step-controls-start" + (this.state.step === 0 ? '' : ' d-none')} onClick={() => (this.increment())}>Start</button>
                <button className={"btn btn-lg btn-articles-light step-controls-back" + (this.state.step === 0 ? ' d-none' : this.state.step >= 6 ? ' d-none' : ' d-inline-block')} onClick={() => (this.decrement() + this.changeFocus(''))}>Back</button>

                {/* TODO Easiest think I could think of here is putting all logic into whether a user cna go to next step into a function then letting that function do the logic via a if statement, will this need to be fixed? Most likley but works for now :) */}
                {/* <button className={"btn btn-lg btn-articles-light step-controls-next" + (this.state.step === 0 ? ' d-none' : this.state.step >= 5 ? ' d-none' : ' d-inline-block')} onClick={() => (this.increment() + this.changeFocus(''))}>Next</button> */}
                {/* <button className={"btn mr-0 btn-lg btn-articles-light step-controls-done" + (this.state.step === 5 ? ' d-inline-block' : ' d-none' )} onClick={() => (this.increment())}>Done</button> */}
                <CanGoToNextStep step={this.state.step} increment={() => (this.increment())} changeFocus={() => (this.changeFocus(''))} stepOneIsInvalid={stepOneIsInvalid} stepTwoIsInvalid={stepTwoIsInvalid} stepFiveIsInvalid={stepFiveIsInvalid} stepFourIsInvalid={stepFourIsInvalid} stepThreeIsInvalid={stepThreeIsInvalid}></CanGoToNextStep>
                
                <button className={"btn btn-lg btn-articles-light step-controls-back" + (this.state.step === 6 ? '' : ' d-none')} onClick={() => (this.decrement() + this.changeFocus(''))}>Submitting</button>

                <div className="dots">
                  <div className={"dot" + (this.state.step === 1 ? ' active' : '') + (this.state.step > 1 ? ' complete' : '')}></div>
                  <div className={"dot" + (this.state.step === 2 ? ' active' : '') + (this.state.step > 2 ? ' complete' : '')}></div>
                  <div className={"dot" + (this.state.step === 3 ? ' active' : '') + (this.state.step > 3 ? ' complete' : '')}></div>
                  <div className={"dot" + (this.state.step === 4 ? ' active' : '') + (this.state.step > 4 ? ' complete' : '')}></div>
                  <div className={"dot" + (this.state.step === 5 ? ' active' : '') + (this.state.step > 5 ? ' complete' : '')}></div>
                </div>

              </div>

          </div>
  
          <div className="outset-wrapper d-none">
            <div className="container container-custom mx-auto">
  
              <div className={"walkthrough-box-clip-path-hides-box-shadow-work-around " + (this.state.step > 0 ? 'to-top' : '')}>
                <div className={"walkthrough-box " + (this.state.step > 0 ? 'to-top' : '')}>
    
                  <h1 className={(this.state.step > 0 ? 'shrink' : '')}>{authUser.nameFirst}, that's a nice name.</h1>
    
                  <h5 className="focus-explanation">{this.renderReasonForInformation(this.state.focus)}</h5>
    
                  <button id="goFull" className={"btn btn-lg btn-custom-white " + (this.state.step === 0 ? '' : ' d-none')} onClick={() => (this.increment())}>Start</button>
    
                  <div className="debug-id">ID: {authUser.uid}</div>
                </div>
              </div>
  
              <div className={"steps-box mx-auto" + (this.state.step === 0 ? '' : ' show')}>{this.renderStep(this.state.step, authUser)}</div>

            </div>

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
      )}

      
    </AuthUserContext.Consumer>
    )
  }
}

function CanGoToNextStep(props) {

  const {
    step,
    stepOneIsInvalid,
    stepTwoIsInvalid,
    stepThreeIsInvalid,
    stepFourIsInvalid,
    stepFiveIsInvalid,
    increment,
    changeFocus
   } = props

   // New way

   if ((step === 1 && !stepOneIsInvalid) || (step === 2 && !stepTwoIsInvalid) || (step === 3 && !stepThreeIsInvalid) || (step === 4 && !stepFourIsInvalid) || (step === 5 && !stepFiveIsInvalid)) {
    return <button className={"btn btn-lg btn-articles-light step-controls-next" + (step === 0 ? ' d-none' : step >= 5 ? ' d-nonee' : ' d-inline-block')} onClick={() => (increment() + changeFocus(''))}>{step === 5 ? 'Finish' : 'Next'}</button>
  } else {
    return <button disabled className={"btn btn-lg btn-articles-light step-controls-next" + (step === 0 ? ' d-none' : step >= 5 ? ' d-nonee' : ' d-inline-block')} onClick={() => (increment() + changeFocus(''))}>{step === 5 ? 'Finish' : 'Next'}</button>
  }

  // Old way

  // if (step === 1 && !stepOneIsInvalid) {
  //   return <button className={"btn btn-lg btn-articles-light step-controls-next" + (step === 0 ? ' d-none' : step >= 5 ? ' d-none' : ' d-inline-block')} onClick={() => (increment() + changeFocus(''))}>Next</button>
  // } else if (step === 2 && !stepTwoIsInvalid) {
  //   return "true"
  // } else if (step === 3 && !stepThreeIsInvalid) {
  //   return "true"
  // } else if (step === 4 && !stepFourIsInvalid) {
  //   return "true"
  // } else if (step === 5 && !stepFiveIsInvalid) {
  //   return "true"
  // } else {
  //   return <button disabled className={"btn btn-lg btn-articles-light step-controls-next" + (step === 0 ? ' d-none' : step >= 5 ? ' d-none' : ' d-inline-block')} onClick={() => (increment() + changeFocus(''))}>Next</button>
  // }

  // return (
  //   <div>Helllo {goOn ? 'true' : 'false'}</div>
  // )
}

// const Outset = withFirebase(OutsetBase);

// const condition = authUser => !!authUser;

// export default compose(
//   withAuthorization(condition),
// )(Outset);

const Outset = withFirebase(OutsetBase);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(OutsetBaseWrap);