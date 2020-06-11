import React from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input'
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';

import * as outsetPhotos from './outsetPhotos';
import * as ROUTES from '../../constants/routes';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import StepFive from './StepFive';

import { setUserDetails } from "../../actions/authActions";

class OutsetBase extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      highlightElement: '',

      // Suggestions API
      storySuggestionAge: [],
      storySuggestionLocation: {
        city: [],
        state: [],
        zip: [],
      },

      // If more steps are added change this
      totalSteps: 5,
      focus: '',

      // Step One States
      // nameFirst: props.user.first_name,
      first_name: props.user?.first_name || '',
      last_name: props.user?.last_name || '',
      
      zip: props.user?.address?.zip || '',
      city: props.user?.address?.city || '',
      state:  props.user?.address?.state ||'',
      
      cell: props.user?.cell || '',
      age: moment.unix(props.user?.birth_date).format('MM-DD-YYYY') || '',
      gender: props.user?.gender || '',

      // Step Two States
      clothingCut: props.user?.clothing?.cut || '', 
      shirtSize: props.user?.clothing?.shirt || '',
      shoeSize: props.user?.clothing?.shoe || '',

      // Step Three States
      subscriptions: [],
      // UI Only, not to be passed to firebase object
      uiStuff: {
        activeTab: 1, 
        viewedTabs: {
          one: true,
          two: false,
          three: false,
          four: false,
          five: false
        }
      },

      // Step Four States
      partyAffiliation: '',

      // Step Five States
      privacyAccept: false,
      termsAccept: false,
      cookieAccept: false,

      error: ''
    };

    this.changeFocus = this.changeFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCellTwo = this.handleCellTwo.bind(this);
    this.setActiveTab = this.setActiveTab.bind(this);
    // this.submitData = this.submitData.bind(this);

    this.onZipBlur = this.onZipBlur.bind(this);

    this.setCell = this.setCell.bind(this);

    // this.getStorySuggestionLocation = this.getStorySuggestionLocation.bind(this);
    // this.getStorySuggestionLocationOther = this.getStorySuggestionLocationOther.bind(this);

    // this.test = this.test.bind(this);

    this.changeStep = this.changeStep.bind(this);
    this.highlightElement = this.highlightElement.bind(this);
    
  }

  // async getStorySuggestionLocationOther(locationObject) {
  //   console.log(locationObject)

  //   let response = await fetch("/storySuggestionLocationOther", {
  //     method: "POST",
  //     headers: {"Content-Type": "text/plain"},
  //     body: "Hello"
  //   })
    
  //   console.log(response);
  //   console.log(response.body.json);

  // }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData() {
    const self = this

    const myobj = {...this.state}

    // Whitelist object keys server side because the data is already here!
    const allowedKeys = ['first_name', 'last_name', 'zip', 'city', 'state', 'cell', 'gender', 'age', 'zip', 'partyAffiliation', 'subscriptions', 'clothingCut', 'shirtSize', 'shoeSize'];

    const newobj = Object.keys(myobj)
    .filter(key => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = myobj[key];
      return obj;
    }, {});

    console.log(newobj)

    axios.post('/api/outsetUpdate', {
      user: this.props.user._id,
      outsetState: newobj
    })
    .then(function (response) {
      console.log(response);

      // Will be turned on and off many times...
      self.props.setUserDetails(self.props.user_id);
      self.props.history.push(ROUTES.HOME);

    })
    .catch(function (error) {
      console.log(error);
    });

  }

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

  onZipBlur = zip => {
    var clientKey = "js-cz2jSZISmtnobh2q8zKT6nIjTV0JPlVjUdk4HdcGiGicCsh9O1IuE1nPemjphKID";

    console.log("Looking up " + zip)

    const zipcode = zip;

    var cache = {};
    var errorDiv = "";

    let currentComponent = this;

    /** Handle successful response */
		// function handleResp(data)
		// {
		// 	// Check for error
		// 	if (data.error_msg)
		// 		errorDiv = data.error_msg;
		// 	else if ("city" in data)
		// 	{
    //     // Set city and state
        
		// 		// container.find("input[name='city']").val(data.city);
    //     // container.find("input[name='state']").val(data.state);

    //     currentComponent.setState({city: data.city, state: data.state})
		// 	}
		// }
	

    if ( zipcode.length === 5 && /^[0-9]+$/.test(zipcode) ) {
				// Clear error
        // errorDiv.empty();
        // errorDiv = ""
				
				// Check cache
				// if (zipcode in cache)
				// {
				// 	handleResp(cache[zipcode]);
				// }
				// else
				// {
          const self = this
					// Build url
          var url = "https://www.zipcodeapi.com/rest/"+clientKey+"/info.json/" + zipcode + "/radians";
          
          // Zip Code API
          // axios.post('/outsetUpdate', {
          //   user: this.props.user._id,
          //   outsetState: newobj
          // })
          // .then(function (response) {
          //   console.log(response);
      
          //   // Will be turned on and off many times...
          //   self.props.history.push(ROUTES.HOME);
      
          // })
          // .catch(function (error) {
          //   console.log(error);
          // });

          var instance = axios.create();
          delete instance.defaults.headers.common['Authorization'];

          // instance.get("http://api.com");

          instance.get(url, {}, {
            'Accept': 'application/json',
          })
            .then(function (response) {

              // handle success
              console.log(response.data);

              self.setState({
                city: response.data.city, 
                state: response.data.state});
              })
            .catch(function (error) {
              // handle error
              console.log(error);

              // self.setState({ resultsLoading: true });
              // self.setState({ resultsLoadingError: error });
            });
					
					// Make AJAX request
					// $.ajax({
					// 	"url": url,
					// 	"dataType": "json"
					// }).done(function(data) {
					// 	handleResp(data);
						
					// 	// Store in cache
					// 	cache[zipcode] = data;
					// }).fail(function(data) {
					// 	if (data.responseText && (JSON = $.parseJSON(data.responseText)))
					// 	{
					// 		// Store in cache
					// 		cache[zipcode] = JSON;
							
					// 		// Check for error
					// 		if (JSON.error_msg)
          //       // errorDiv.text(JSON.error_msg);
          //       errorDiv = JSON.error_msg
					// 	}
					// 	else
					// 		errorDiv = 'Request failed.';
          // });
          
				// }
      }
      
      // console.log(cache);
      // console.log(errorDiv);
  }

  theAPI() {
    const newCall = this.props.firebase.functions.httpsCallable("storyAPINew");

    newCall({ location: {
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    } }).then(function(result) {
      // Read result of the Cloud Function.
      var sanitizedMessage = result.data.text;
      console.log(sanitizedMessage);
      // ...
    });
  }
  

  componentDidMount() {
    const self = this;

    axios.get('/api/getIssues')
    .then(function (response) {

      // handle success
      console.log(response.data);

      self.setState({
        allIssues: response.data,
      }, () => {
        // self.mergeStuff()
      });

      // this.setState({ newsAllLoading: false });

    })
    .catch(function (error) {
      console.log(error);
    });

  }

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
    this.setState({step: step });
  }

  highlightElement(element) {
    this.setState({highlightElement: element});
  }

  // NOTE - Moved into setActiveTab
  // setViewedTabs(lastState, tab) {
  //   this.setState({
  //     uiStuff: {
  //       ...lastState,
  //       viewedTabs: {
  //         tab
  //       }
  //     }
  //   })
  // }

  setActiveTab(tab, viewedTab) {
    this.setState({
      uiStuff: {
        activeTab: tab,
        viewedTabs: {
          ...this.state.uiStuff.viewedTabs,
          [viewedTab]: true
        }
      }
    })
  }

  setCell(value) {
    this.setState({cell: value})

    // Needed for checking cell phone validation
    // TODO - Understand why typing cell phone then backspacing results in undefined state for cell rather then empty string so this can be deleted.
    if (value === undefined) {
      this.setState({cell: ''})
    }

  }

  increment() {
    this.setState({step: this.state.step + 1 })
  }

  decrement() {
    this.setState({step: this.state.step - 1 })
  }

  handleCellTwo(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
 
    this.setState({ [name]: this.state.cell.replace(/\D[^\.]/g, "") });
  }

  changeFocus(focus) {
    this.setState({
      focus: focus,
      highlightElement: ""
    });
  }

  renderReasonForInformation(focus) {
    switch(focus) {
      case 'first_name':
        return "We use your first name to address you on the site and in emails. Only your first name is visble to other users if you decide to post or submit any content."
      case 'last_name':
        return (<div>This will <b>not</b> be visble to other users. We just use your last name to address you on the site and in emails.</div>)
      case 'city' :
        return "We use this info to suggest news content and ads from your area and to get an idea of where our users base lives."
      case 'state':
        return "We use this info to suggest news content and ads from your area and to get an idea of where our users base lives."
      case 'zip':
        return "We use this info to suggest news content and ads from your area and to get an idea of where our users base lives."
      case 'cell':
        return (<span>By entering your cell phone number we can send you minimal updates about whats going on with Articles.<hr/><span style={{fontSize: '0.85rem'}} className="text-muted">Text messaging rates may apply - If you have unlimited text messaging then you are good 👍</span></span>)
      case 'age':
        return "Using your age we can recommend popular stories that others in your age range are subscribed to."
      case 'gender':
        return "We use your gender to get insights on our user base."
      

      case 'stories-age':
        return ( <div className="intro-message">Using the age you provided in step one we can look up stories that are popular with users in your age group.{this.renderReasonForInformationStoriesExtra()}</div> )
      case 'stories-location':
        return ( <div className="intro-message">Using the loaction you provided in step one we can look up stories that are popular in your area.{this.renderReasonForInformationStoriesExtra()}</div> )
      case 'stories-popular':
        return ( <div className="intro-message">These are stories that are popular amongst users on the site.{this.renderReasonForInformationStoriesExtra()}</div> )
      case 'stories-relevant':
        return ( <div className="intro-message">To get you started we picked a few stories that we find interesting.{this.renderReasonForInformationStoriesExtra()}</div> )
      case 'stories-forgotten':
        return ( <div className="intro-message">With so much happening these days it is easy for people to forget major issues and even easier for corporations to silence news. Here we have issues that the news has gotten quiet on.{this.renderReasonForInformationStoriesExtra()}</div> )
      default:
        return ""
    }
  }

  renderReasonForInformationStoriesExtra() {
    // So... when you change the focus of Step Three (NEWS PREFRENCES) we let users know how many stories they have selected, only once they change the focus once on the step so we can explain the step they are on first.
    return (
      <span className={this.state.focus === "" ? ' d-none' : ''}><hr/>Pick three to start | {this.state.subscriptions.length}/3</span>
    )
  }

  tabToFocus(tab) {
    // So... when you change the focus to Step Three (NEWS PREFRENCES) we show users the point of the step and the explanation of the focused tab. We only know the active tab when we switch back and not the focus so here we get that info.
    switch(tab) {
      case 1:
        return 'stories-age'
      case 2:
        return 'stories-location'
      case 3:
        return 'stories-popular'
      case 4:
        return 'stories-relevant'
      case 5:
        return 'stories-forgotten'
      default:
        return ""
    }
  }

  canShow(size) {
    // For showing more shirt sizes when a certain size is selected
    if (size.match( /^(OTHER|4XL|MORE|SKIP)$/ ) )  {
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
          <>
          <div className="intro-title">Clothing Details</div>
          {/* {this.theAPI()} */}
          </>
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

  renderMessage(step) {
    switch(step) {
      case 0: 
        return (
          <div className="intro-message">During the outset we ask some questions to better understand you. We share none of this data with other companies. <hr/> <span style={{fontWeight: 'bold'}}>We will explain each piece of info we collect on you and how we use it.</span></div>
        )
      case 1:
        return (
          <div className="intro-message"><b>{this.state.first_name}</b>, that's a nice name! We just want to collect a little more information on you. Click an input to learn what we will do with that info.</div>
        )
      case 2: 
        return (
          <div className="intro-message">We sell clothing to help spread our message and to continue development of our site. If you provide us with your clothing details we can prefill your size in the store.</div>
        )
      case 3: 
        return (
          // This one is a little tricky because one of the tabs are visbile at start so we have to show the explanation with the step message.
          <div className="intro-message">We think it's a problem when the news decides what the people see. Pick at least three stories to subscribe to from the categories provided.<hr/>{this.renderReasonForInformation(this.tabToFocus(this.state.uiStuff.activeTab))}</div>
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
          <StepOne {...this.state} onZipBlur={this.onZipBlur} handleCellTwo={this.handleCellTwo} setCell={this.setCell} handleChange={this.handleChange} onChange={this.onChange} changeFocus={this.changeFocus} user={this.props.user} authUser={authUser}/>
        )
      case 2:
        // Clothing Information
        return (
          <StepTwo canShow={this.canShow(this.state.shirtSize)} totalSteps={this.state.totalSteps} log={this.log} clothingCut={this.state.clothingCut} shoeSize={this.state.shoeSize} shirtSize={this.state.shirtSize} changeCut={this.changeCut} changeShoeSize={this.changeShoeSize} changeShirtSize={this.changeShirtSize} action={this.onChange}/>
        )
      case 3:
        // News Information
        return (
          <StepThree {...this.state} setViewedTabs={this.setViewedTabs} setActiveTab={this.setActiveTab} toggleSubscriptions={this.toggleSubscriptions} changeFocus={this.changeFocus} changeStep={this.changeStep} highlightElement={this.highlightElement} getStorySuggestionLocation={this.getStorySuggestionLocation} getStorySuggestionLocationOther={this.getStorySuggestionLocationOther} test={this.test}/>
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
        return (
        <div className="intro-message text-center">
          {/* 0%<br/>Submitting
          <button onClick={() => (this.submitData())} className="btn btn-articles-light">Test</button> */}
          <div>Review the information below and make sure everything looks correct, if you wish to go back and fix anything now is the time to do so.</div>
          <div>Name: {this.state.first_name} {this.state.last_name}</div>
          <div>Address: </div>
        </div>
        )
    }
  }

  render() {

    const {
      nameFirst,
      cell,
      clothingCut,
      shirtSize,
      shoeSize,
      subscriptions,
      partyAffiliation,
      cookieAccept,
      termsAccept,
      privacyAccept,
    } = this.state;

    const stepOneIsInvalid = (nameFirst === '') || (cell !== '' && !isValidPhoneNumber(cell));
    const stepTwoIsInvalid = (clothingCut === '') || (clothingCut === 'male' && shirtSize === '') ||  (clothingCut === 'female' && shirtSize === '');
    const stepThreeIsInvalid = subscriptions.length < 3;
    const stepFourIsInvalid = partyAffiliation === '';
    const stepFiveIsInvalid = (cookieAccept && termsAccept && privacyAccept) === false;

    return (



        <div className="larger-container">

          {/* <div className="what-i-need"></div> */}

          <div className={"background-images d-none d-md-block  step-" + this.state.step}>

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

          <div className="outset-form">
            <div className="row">
              
              <div className="col-12 col-md-6">
                {this.renderTitle(this.state.step)}

                {/* NOTE Was for debug purposes, just gonna leave for now
                <div><span>Step One:</span> {stepOneIsInvalid ? ' No' : ' Yes'}</div>
                <div><span>Step Two:</span> {stepTwoIsInvalid ? ' No' : ' Yes'}</div>
                <div><span>Step Three:</span> {stepThreeIsInvalid ? ' No' : ' Yes'}</div>
                <div><span>Step Four:</span> {stepFourIsInvalid ? ' No' : ' Yes'}</div>
                <div><span>Step Five:</span> {stepFiveIsInvalid ? ' No' : ' Yes'}</div> */}

                {this.state.focus === '' ? 
                  this.renderMessage(this.state.step)
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
                  this.renderStep(this.state.step)
                }

              </div>

            </div>

            <div className={"step-count" + (this.state.step === 0 ? ' d-none' : this.state.step === 6 ? ' d-none' : '')}>
              <span>Step </span>
              <span>{this.state.step + '/' + this.state.totalSteps}</span>
            </div>

            <div className="step-controls">
                <div className="buttons">
                  <button className={"btn btn-lg btn-articles-light step-controls-start" + (this.state.step === 0 ? '' : ' d-none')} onClick={() => (this.increment())}>Start</button>
                  <button className={"btn btn-lg btn-articles-light step-controls-back" + (this.state.step === 0 ? ' d-none' : this.state.step >= 6 ? ' d-none' : ' d-inline-block')} onClick={() => (this.decrement() + this.changeFocus(''))}>Back</button>
  
                  {/* TODO Easiest think I could think of here is putting all logic into whether a user cna go to next step into a function then letting that function do the logic via a if statement, will this need to be fixed? Most likley but works for now :) */}
                  {/* <button className={"btn btn-lg btn-articles-light step-controls-next" + (this.state.step === 0 ? ' d-none' : this.state.step >= 5 ? ' d-none' : ' d-inline-block')} onClick={() => (this.increment() + this.changeFocus(''))}>Next</button> */}
                  {/* <button className={"btn mr-0 btn-lg btn-articles-light step-controls-done" + (this.state.step === 5 ? ' d-inline-block' : ' d-none' )} onClick={() => (this.increment())}>Done</button> */}
                  <CanGoToNextStep step={this.state.step} increment={() => (this.increment(), window.scroll(0, 0))} changeFocus={() => (this.changeFocus(''))} stepOneIsInvalid={stepOneIsInvalid} stepTwoIsInvalid={stepTwoIsInvalid} stepFiveIsInvalid={stepFiveIsInvalid} stepFourIsInvalid={stepFourIsInvalid} stepThreeIsInvalid={stepThreeIsInvalid}></CanGoToNextStep>
                  
                  <button className={"btn btn-lg btn-articles-light step-controls-back" + (this.state.step === 6 ? '' : ' d-none')} onClick={() => (this.submitData())}>Finish</button>
                </div>

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
    
                  <h1 className={(this.state.step > 0 ? 'shrink' : '')}>FILL IN, that's a nice name.</h1>
    
                  <h5 className="focus-explanation">{this.renderReasonForInformation(this.state.focus)}</h5>
    
                  <button id="goFull" className={"btn btn-lg btn-custom-white " + (this.state.step === 0 ? '' : ' d-none')} onClick={() => (this.increment())}>Start</button>
    
                  <div className="debug-id">ID: FILL IN</div>
                </div>
              </div>
  
              <div className={"steps-box mx-auto" + (this.state.step === 0 ? '' : ' show')}>{this.renderStep(this.state.step)}</div>

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
    return <button className={"btn btn-lg btn-articles-light step-controls-next" + (step === 0 ? ' d-none' : step >= 5 ? ' ' : ' d-inline-block')} onClick={() => (increment() + changeFocus(''))}>{step === 5 ? 'Finish' : 'Next'}</button>
  } else {
    return <button disabled className={"btn btn-lg btn-articles-light step-controls-next" + (step === 0 ? ' d-none' : step >= 5 ? ' ' : ' d-inline-block')} onClick={() => (increment() + changeFocus(''))}>{step === 5 ? 'Finish' : 'Next'}</button>
  }
}

const mapStateToProps = (state) => {
  return {
    // expenses: state.expenses,
    // expensesTotal: (state.expenses).length,
    // site: state.site,
    user: state.auth?.user_details,
    user_id: state.auth?.user?.id,
    // first_name: state.auth.user_details?.user?.first_name,
    // isAuth: state.auth.isAuthenticated
  };
};

export default connect(
  mapStateToProps,
  { setUserDetails }
  )(OutsetBase);