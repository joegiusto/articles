import React, { useState, useEffect, Component } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

import * as ROUTES from '../../../constants/routes'

function AdNew(props) {
	// props.setLocation(props.tabLocation);

	const [donations, setDonations] = useState([]);

	const [donation, setDonation] = useState({
		createdBy: '5e90cc96579a17440c5d7d52',
		amount: 100,
		user_id: '',
		message: ''
	});

	const [ad, setAd] = useState({});
    const [modalShow, setModalShow] = useState(false);
	// const [modalLoading, setModalLoading] = useState(false);
	const [adDetailsExpanded, setAdDetailsExpanded] = useState('');

	const [selectedDate, handleDateChange] = useState(new Date());

	useEffect(() => {

        axios.get('/api/getAd', {
            params: {
              ad_id: props.ad_id
            }
        })
        .then(function (response) {
            console.log(response);
            setAd(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });

	}, []);

	const addDonation = () => {

		if (donation.user_id == '') {
			delete donation.user_id;
		}

		axios.post('/api/secure/addDonation', {
			donation,
			selectedDate
		})
		.then( (response) => {
			console.log(response)
			// setDonations(donations.filter(item => item._id !== response.data.removed_id));
			setDonations(prevState => ([
				...prevState,
				response.data.populatedDonation
			]));
		})
		.catch( (error) => {
			console.log(error);
		});
	}

	const deleteDonation = (id) => {
		// console.log(id)

		axios.post('/api/secure/deleteDonation', {
			id
		})
		.then( (response) => {
			console.log(response)
			setDonations(donations.filter(item => item._id !== response.data.removed_id));
		})
		.catch( (error) => {
			console.log(error);
		});
	}

    const editDonation = (id) => {
		console.log(id);

        setModalShow(true);

        // setExpense(prevState => ({
		// 	...prevState,
		// 	_id: id
		// }));

		// axios.post('/api/secure/deleteDonation', {
		// 	id
		// })
		// .then( (response) => {
		// 	console.log(response)
		// 	setDonations(donations.filter(item => item._id !== response.data.removed_id));
		// })
		// .catch( (error) => {
		// 	console.log(error);
		// });
	}

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const popover = (
        <Popover className="hours-popover " id="popover-basic">
            <Popover.Title as="h3">Store Hours</Popover.Title>
            <Popover.Content>
                <div className="day-wrap">
                    <div className="day">Sunday:</div> 
                    <div className="hours">6:30AM–8PM</div>
                </div>
                <div className="day-wrap active">
                    <div className="day"><b>Monday:</b></div>
                    <div className="hours">6:30AM–8PM</div>
                </div>
                <div className="day-wrap">
                    <div className="day">Tuesday:</div>
                    <div className="hours">6:30AM–8PM</div>
                </div>
                <div className="day-wrap">
                    <div className="day">Wednesday:</div>
                    <div className="hours">6:30AM–8PM</div>
                </div>
                <div className="day-wrap">
                    <div className="day">Thursday:</div>
                    <div className="hours">6:30AM–8PM</div>
                </div>
                <div className="day-wrap">
                    <div className="day">Friday:</div>
                    <div className="hours">6:30AM–8PM</div>
                </div>
                <div className="day-wrap">
                    <div className="day">Saturday:</div>
                    <div className="hours">6:30AM–8PM</div>
                </div>
            </Popover.Content>
        </Popover>
    );

    function adDetailsExpandedToggle() {
        setAdDetailsExpanded(!adDetailsExpanded);
        // this.setState({
        //     adDetailsExpanded: !this.state.adDetailsExpanded
        // })
    }

    return (
        <div className="ad" style={
            {
                // backgroundColor: ad.background_color,
                borderColor: ad.border_color
            }
        }>

            <div style={
                {
                    backgroundColor: ad.background_color,
                    borderColor: ad.border_color
                }
            } className={"details-slide-out " + (adDetailsExpanded ? 'expand' : '')}>

                <div>This ad is being shown to you for the following reasons</div>

                <hr className="border w-50 border-white"/>

                <div className="badge badge-light">{ad.business}</div>
                <div>Is advertising to all zip codes within a</div>
                <span><div className="badge badge-light">15 Mile Radius</div></span>
                <div>of it's business</div>

                <hr className="border w-50 border-white"/>

                <div className="d-flex align-items-center">
                    <div>Your Zip code</div>
                    <div className="badge badge-light ml-2">12524</div>
                    <div className="ml-2">is</div>
                    <div className="badge badge-light ml-2">1.7 miles away</div>
                </div>

                <hr className="w-501"/>

                <div className="grow"></div>

                {/* <div className="reason">Details about this ads financial impact can be found <Link>Here</Link>.</div> */}

                <div className="reason">As always all ads we display to you will be completely transparent and follow our privacy policy. To change your Zip code settings.</div>

                <Link to={ROUTES.SETTINGS_ACCOUNT} className="btn btn-articles-light btn-sm">Settings</Link>

                <p className="text-center mb-0 mt-2">Ad ID: <b>{ad._id}</b></p>

                {/* <div onClick={() => adDetailsExpandedToggle()} className="explanation">
                    Ad Details
                </div> */}

            </div>

            <div style={
                {
                    backgroundColor: ad.background_color,
                    borderColor: ad.border_color
                }
                } 
                className="main-panel"
            >
                
                <div className="ad-warning text-center">Local Advertisement</div>

                <div className="photo-banner">
    
                    <div className="logo">
                        <img src={ad.logo} alt=""/>
                    </div>
    
                    <div className="icon d-none">
                        <i className="fas fa-mug-hot"></i>
                    </div>
    
                    <img className="photo" src={ad.background} alt=""/>
                    
                </div>
    
                <div className="detail-title">
                    <div className="detail w-100">
                        {/* <span className="icon"><i className="fas fa-store-alt"></i></span> */}
                        <span>{ad.business}</span>
                    </div>
                </div>
    
                <div className="details">
    
                    <div className="detail">
                        <span className="icon"><i className="fas fa-search-location"></i></span>
                        <span>{ad.city}, {ad.state}</span>
                    </div>
    
                    <div className="detail">
                        <span className="icon"><i className="fas fa-user-friends"></i></span>
                        <span>5-10 Employees</span>
                    </div>
    
                    <div className="detail">
                        <span className="icon"><i className="fas fa-user-friends"></i></span>
                        <span>Outdoor Seating</span>
                    </div>
    
                    <div className="detail">
                        <span className="icon"><i className="fas fa-clock"></i></span>
                        <span>
                            6:30AM–8PM 
                            {/* <i className="fas fa-caret-square-down mr-0 ml-1"></i> */}
                            <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={popover}>
                                {/* <Button variant="success">Click me to see</Button> */}
                                <i style={{cursor: 'pointer'}} className="fas fa-caret-square-down mr-0 ml-1"></i>
                            </OverlayTrigger>
                        </span>
                    </div>
    
                </div>
    
                <p className="short-description">This arty hangout with eclectic furniture offers espresso drinks, local craft beer & light bites.</p>

                <hr style={{borderColor: 'white'}} className="my-0"/>
    
                <div className="action-wrap d-flex justify-content-lg-between px-3 py-3">
                        
                    <div onClick={() => adDetailsExpandedToggle()} className="explanation flex-grow-1 flex-shrink-0">
                        Ad Details
                    </div>
    
                    <div className="action flex-grow-1 flex-shrink-0">
                        Menu
                    </div>
    
                </div>
            </div>

        </div>
    )
}
class Ad extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      adDetailsExpanded: false,
      actionButtonExpanded: false
    };

  }

  componentDidMount() {
    const width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

    if (width < 768) {
      this.setState({adDetailsExpanded: true})
    }

    const self = this;

    axios.get('/api/getAd', {
      params: {
        ad_id: this.props.ad_id
      }
    })
    .then(function (response) {
      console.log(response);

    //   self.setState({
    //     ...response.data.document,
    //     loading: false
    //   });

    })
    .catch(function (error) {
      console.log(error);

    //   self.setState({
    //     editLoading: false
    //   });

    });

  }

  adDetailsExpandedToggle() {
    this.setState({
      adDetailsExpanded: !this.state.adDetailsExpanded
    })
  }
  
  render(props) {

    return (
        <div className="ad">

            <div className={"details-slide-out " + (this.state.adDetailsExpanded ? 'expand' : '')}>

            <div>This ad is being shown to you for the following reasons</div>
            <hr/>
            <div className="badge badge-light">Bank Square</div>
            <div>Is advertising to all zip codes within a</div>
            <span><div className="badge badge-light">15 Mile Radius</div></span>
            <div>of it's business</div>
            <hr/>
            <div>Your Zip code</div>
            <span><div className="badge badge-light">12524</div></span>
            <div>is</div>
            <div className="badge badge-light">1.7 miles away</div>

            <hr/>

            <div className="grow"></div>

            <div className="reason">As always all ads we display to you will be completely transparent and follow our privacy policy.To change your Zip code settings click here (Note to testers this is hard edited in so this page is not working yet)</div>

            <div onClick={() => this.adDetailsExpandedToggle()} className="explanation">
                Ad Details
            </div>

            </div>

            <div className="main-panel">
                <div className="photo-banner">
    
                    <div className="ad-warning">Advertisement</div>
    
                    <div className="logo">
                        <img src="https://i.pinimg.com/originals/85/0d/54/850d54feba288afe7fb40a93283fde56.jpg" alt=""/>
                    </div>
    
                    <div className="icon d-none">
                        <i className="fas fa-mug-hot"></i>
                    </div>
    
                    <img className="photo" src="https://media-cdn.tripadvisor.com/media/photo-s/0c/8b/a7/c7/photo0jpg.jpg" alt=""/>
                    
                </div>
    
                <div className="detail-title">
                    <div className="detail w-100">
                        <span className="icon"><i className="fas fa-store-alt"></i></span>
                        <span>Bank Square</span>
                    </div>
                </div>
    
                <div className="details">
    
                    <div className="detail">
                        <span className="icon"><i className="fas fa-search-location"></i></span>
                        <span>Beacon, NY</span>
                    </div>
    
                    <div className="detail">
                        <span className="icon"><i className="fas fa-user-friends"></i></span>
                        <span>5-10 Employees</span>
                    </div>
    
                    <div className="detail">
                        <span className="icon"><i className="fas fa-user-friends"></i></span>
                        <span>Outdoor Seating</span>
                    </div>
    
                    <div className="detail">
                        <span className="icon"><i className="fas fa-clock"></i></span>
                        <span>6:30AM–8PM <i className="fas fa-caret-square-down mr-0 ml-1"></i></span>
                    </div>
    
                </div>
    
                <p className="short-description">This arty hangout with eclectic furniture offers espresso drinks, local craft beer & light bites.</p>

                <hr style={{borderColor: 'white'}} className="my-0"/>
    
                <div className="action-wrap d-flex justify-content-lg-between px-3 py-3">
                        
                    <div onClick={() => this.adDetailsExpandedToggle()} className="explanation flex-grow-1 flex-shrink-0">
                        Ad Details
                    </div>
    
                    <div className="action flex-grow-1 flex-shrink-0">
                        Menu
                    </div>
    
                </div>
            </div>

        </div>
    )
  }
}

export default AdNew;